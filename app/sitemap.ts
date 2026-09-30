import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/posts";
import { SITE_URL } from "@/lib/site";

// Généré au build (export statique) en sitemap.xml — pas besoin de
// régénération à la demande tant que la fréquence de publication reste
// faible (rebuild à chaque nouvel article de toute façon, voir README.md).
// `force-static` requis par Next.js 15 en export statique.
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  return [
    { url: `${SITE_URL}/`, changeFrequency: "daily", priority: 1 },
    ...posts.map((post) => ({
      url: `${SITE_URL}/${post.slug}/`,
      lastModified: post.date,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
