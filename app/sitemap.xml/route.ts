import { renderIndex, xmlResponse } from "@/lib/sitemaps";

// Alias de /sitemap_index.xml (l'adresse déclarée dans robots.txt) : /sitemap.xml
// est l'URL que les outils et les moteurs essaient d'office, et un éventuel
// ancien envoi dans la Search Console continue de fonctionner — il renvoie
// maintenant l'index. Export statique : route `force-static`.
export const dynamic = "force-static";

export function GET() {
  return xmlResponse(renderIndex());
}
