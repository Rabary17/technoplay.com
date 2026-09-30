import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllSlugs, getPostBySlug } from "@/lib/posts";
import { SITE_URL } from "@/lib/site";
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
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
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

  return (
    <article className="post-content">
      <JsonLd data={blogPostingSchema(post)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Accueil", url: `${SITE_URL}/` },
          { name: post.title, url: `${SITE_URL}/${post.slug}/` },
        ])}
      />
      <h1>{post.title}</h1>
      <p className="post-meta">
        <time dateTime={post.date}>{post.date}</time>
        {post.author ? ` · ${post.author}` : ""}
      </p>
      {/* Contenu Markdown pré-rendu au build (lib/posts.ts) — confiance
          totale dans la source (fichiers du repo), donc pas de risque XSS
          à sanitiser ici comme on le ferait pour du contenu externe/WP. */}
      <div dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
    </article>
  );
}
