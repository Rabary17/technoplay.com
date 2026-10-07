import { postEntries, renderUrlset, xmlResponse } from "@/lib/sitemaps";

// Export statique : la route doit être `force-static` (voir lib/sitemaps.ts).
export const dynamic = "force-static";

export function GET() {
  return xmlResponse(renderUrlset(postEntries()));
}
