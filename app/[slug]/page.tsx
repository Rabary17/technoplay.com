import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllSlugs, getPostBySlug, resolveCoverImage } from "@/lib/posts";
import { SITE_URL } from "@/lib/site";
import { getCategory } from "@/lib/categories";
import JsonLd from "@/components/JsonLd";
import { blogPostingSchema, breadcrumbSchema } from "@/lib/schema";

// Export statique : chaque slug connu au build devient un fichier HTML réel
// (out/<slug>/index.html) — pas de rendu à la demande, voir next.config.ts.
export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  const url = `${SITE_URL}/${post.slug}/`;
  // Image à la une (réelle ou de secours, voir lib/posts.ts) réutilisée
  // pour l'aperçu Open Graph/Twitter — un article partagé sans vignette a
  // beaucoup moins de clics et paraît moins sérieux.
  const cover = resolveCoverImage(post);
  const image = { url: cover.src, width: 1200, height: 630, alt: cover.alt };
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/${post.slug}/` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      url,
      publishedTime: post.date,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [image.url],
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const cover = resolveCoverImage(post);
  const category = getCategory(post.category);

  return (
    <div className="page">
      <article className="post-content">
        <JsonLd data={blogPostingSchema(post)} />
        <JsonLd
          data={breadcrumbSchema([
            { name: "Accueil", url: `${SITE_URL}/` },
            { name: post.title, url: `${SITE_URL}/${post.slug}/` },
          ])}
        />
        {category ? <span className="tag">{category.short}</span> : null}
        <h1>{post.title}</h1>
        <p className="post-meta">
          <time dateTime={post.date}>{post.date}</time>
          {post.author ? ` · ${post.author}` : ""}
        </p>
        {/* eslint-disable-next-line @next/next/no-img-element -- export
            statique (images.unoptimized dans next.config.ts), un <img>
            simple évite le poids du loader next/image pour rien ici. */}
        <img
          className="post-hero-image"
          src={cover.src}
          alt={cover.alt}
          width={1200}
          height={630}
          fetchPriority="high"
        />
        {/* Contenu Markdown pré-rendu au build (lib/posts.ts) — confiance
            totale dans la source (fichiers du repo), donc pas de risque XSS
            à sanitiser ici comme on le ferait pour du contenu externe/WP. */}
        <div dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
      </article>
    </div>
  );
}
