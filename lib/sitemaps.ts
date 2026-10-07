// Sitemaps découpés façon Yoast SEO : un index (sitemap_index.xml) qui
// pointe vers un sitemap par type de contenu —
//   post-sitemap.xml    les articles (avec leur image à la une si elle existe) ;
//   page-sitemap.xml    l'accueil et les pages « de service » indexables ;
//   author-sitemap.xml  les auteurs ayant au moins un article.
// Règle d'indexation : seuls les articles, les auteurs et les pages sont
// indexés. Les catégories (les 6 pages de thème) et les tags
// sont en `noindex, follow` et n'ont donc AUCUN sitemap (pas de
// category-sitemap.xml) ; idem pour les auteurs sans article, les mentions
// légales et la page de remerciement. Comme Yoast, l'index ne liste que les
// sitemaps qui contiennent au moins une URL, et les `<lastmod>` viennent des
// vraies dates des articles (jamais inventées : une URL sans date connue n'a
// pas de `<lastmod>`). Pas de changefreq ni de priority : Google les ignore
// et Yoast ne les écrit plus.
//
// Générés au build (export statique) par les route handlers `force-static`
// de app/*-sitemap.xml/route.ts et app/sitemap_index.xml/route.ts — les
// articles sont des fichiers Markdown, donc un rebuild à chaque publication.
import { getAllPosts, getPostsByAuthor, type Post } from "./posts";
import { AUTHORS, authorUrl } from "./authors";
import { SITE_URL } from "./site";

export interface SitemapImage {
  loc: string;
  title?: string;
}

export interface SitemapEntry {
  loc: string;
  /** Date W3C (« AAAA-MM-JJ »), seulement si elle est connue. */
  lastmod?: string;
  images?: SitemapImage[];
}

export interface SitemapFile {
  /** Nom du fichier servi à la racine du site, ex. « post-sitemap.xml ». */
  file: string;
  entries: SitemapEntry[];
}

/** Date de frontmatter → « AAAA-MM-JJ » (gray-matter lit une date non quotée comme un objet Date). */
function toW3cDate(value: unknown): string | undefined {
  if (value instanceof Date) {
    return Number.isNaN(value.getTime()) ? undefined : value.toISOString().slice(0, 10);
  }
  if (typeof value === "string" && !Number.isNaN(Date.parse(value))) return value.trim();
  return undefined;
}

const lastModifiedOf = (post: Post) => toW3cDate(post.updated) ?? toW3cDate(post.date);

/** La date la plus récente d'un lot d'articles (comparaison lexicographique : format ISO). */
function latest(posts: Post[]): string | undefined {
  const dates = posts.map(lastModifiedOf).filter((d): d is string => Boolean(d)).sort();
  return dates[dates.length - 1];
}

const absolute = (url: string) => (/^https?:\/\//.test(url) ? url : `${SITE_URL}${url}`);

export function postEntries(): SitemapEntry[] {
  return getAllPosts().map((post) => ({
    loc: `${SITE_URL}/${post.slug}/`,
    lastmod: lastModifiedOf(post),
    // Seulement une vraie image à la une : les couvertures de secours
    // (public/covers) sont des cartes génériques, sans intérêt en recherche d'images.
    images: post.image ? [{ loc: absolute(post.image), title: post.imageAlt || post.title }] : undefined,
  }));
}

// Pages « de service » indexables. Hors sitemap : /mentions-legales/ et
// /contact/merci/ (noindex).
const PAGES = ["/a-propos/", "/faq/", "/contact/", "/confidentialite/"];

export function pageEntries(): SitemapEntry[] {
  return [
    // L'accueil liste les derniers articles : sa date = celle du plus récent.
    { loc: `${SITE_URL}/`, lastmod: latest(getAllPosts()) },
    ...PAGES.map((path) => ({ loc: `${SITE_URL}${path}` })),
  ];
}

export function authorEntries(): SitemapEntry[] {
  // Auteurs sans article publié : pages en noindex, donc hors sitemap.
  return AUTHORS.filter((author) => getPostsByAuthor(author.slug).length > 0).map((author) => ({
    loc: `${SITE_URL}${authorUrl(author)}`,
    lastmod: latest(getPostsByAuthor(author.slug)),
  }));
}

/** Les sitemaps du site, dans l'ordre de l'index (comme Yoast : articles, pages, auteurs — sans catégories, non indexées). */
export function allSitemaps(): SitemapFile[] {
  return [
    { file: "post-sitemap.xml", entries: postEntries() },
    { file: "page-sitemap.xml", entries: pageEntries() },
    { file: "author-sitemap.xml", entries: authorEntries() },
  ];
}

const escapeXml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");

const XML_HEADER = '<?xml version="1.0" encoding="UTF-8"?>\n';
const NS = "http://www.sitemaps.org/schemas/sitemap/0.9";
const NS_IMAGE = "http://www.google.com/schemas/sitemap-image/1.1";

const lastmodTag = (lastmod?: string) => (lastmod ? `<lastmod>${escapeXml(lastmod)}</lastmod>` : "");

export function renderUrlset(entries: SitemapEntry[]): string {
  const hasImages = entries.some((e) => e.images?.length);
  const urls = entries.map((e) => {
    const images = (e.images ?? [])
      .map(
        (img) =>
          `<image:image><image:loc>${escapeXml(img.loc)}</image:loc>${
            img.title ? `<image:title>${escapeXml(img.title)}</image:title>` : ""
          }</image:image>`
      )
      .join("");
    return `<url><loc>${escapeXml(e.loc)}</loc>${lastmodTag(e.lastmod)}${images}</url>`;
  });
  return `${XML_HEADER}<urlset xmlns="${NS}"${hasImages ? ` xmlns:image="${NS_IMAGE}"` : ""}>\n${urls.join("\n")}\n</urlset>\n`;
}

/** Index : uniquement les sitemaps non vides, `<lastmod>` = date la plus récente de leurs URL. */
export function renderIndex(files: SitemapFile[] = allSitemaps()): string {
  const items = files
    .filter((f) => f.entries.length > 0)
    .map((f) => {
      const dates = f.entries.map((e) => e.lastmod).filter((d): d is string => Boolean(d)).sort();
      return `<sitemap><loc>${escapeXml(`${SITE_URL}/${f.file}`)}</loc>${lastmodTag(dates[dates.length - 1])}</sitemap>`;
    });
  return `${XML_HEADER}<sitemapindex xmlns="${NS}">\n${items.join("\n")}\n</sitemapindex>\n`;
}

export function xmlResponse(body: string): Response {
  return new Response(body, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
}
