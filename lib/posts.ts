// Source de contenu du blog : fichiers Markdown versionnés dans
// content/posts/*.md, lus au moment du build (export statique — aucun appel
// réseau, aucun CMS). Voir README.md "Ajouter un article" pour la marche à
// suivre : `npm run new-post`, ou copier un fichier existant.
//
// Choix assumé : pas de CMS pour l'instant (cf. décision du 2026-09-30 —
// site sans trafic/stratégie de contenu encore définie). Le jour où un vrai
// back-office éditorial est nécessaire, ce module est le seul point à
// remplacer par un client WordPress/autre CMS — aucune page ne dépend
// directement du système de fichiers ailleurs que dans ce fichier.
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

export type PostFrontmatter = {
  title: string;
  description: string;
  date: string; // format ISO "AAAA-MM-JJ"
  slug: string;
  author?: string;
};

export type Post = PostFrontmatter & {
  contentHtml: string;
};

function readSlugs(): string[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

function readPost(slug: string): Post {
  const raw = fs.readFileSync(path.join(POSTS_DIR, `${slug}.md`), "utf8");
  const { data, content } = matter(raw);
  const fm = data as Omit<PostFrontmatter, "slug">;
  return {
    ...fm,
    slug,
    contentHtml: marked.parse(content, { async: false }) as string,
  };
}

/** Tous les articles, triés du plus récent au plus ancien. */
export function getAllPosts(): Post[] {
  return readSlugs()
    .map(readPost)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

/** Un article précis par son slug (undefined si absent). */
export function getPostBySlug(slug: string): Post | undefined {
  if (!readSlugs().includes(slug)) return undefined;
  return readPost(slug);
}

/** Tous les slugs — pour generateStaticParams (export statique). */
export function getAllSlugs(): string[] {
  return readSlugs();
}
