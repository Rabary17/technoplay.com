import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// Requis par Next.js 15 en export statique pour les routes de métadonnées
// (robots.txt) — sans ça, le build échoue. Le sitemap déclaré est l'index
// façon Yoast (voir lib/sitemaps.ts) ; /sitemap.xml en est un alias.
// Robots IA (GEO) : autorisés explicitement, pour que les moteurs génératifs
// puissent lire et citer les articles. Le fichier /llms.txt donne le plan du site.
export const dynamic = "force-static";

const ROBOTS_IA = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: ROBOTS_IA, allow: "/" },
    ],
    sitemap: `${SITE_URL}/sitemap_index.xml`,
    host: SITE_URL,
  };
}
