import { CATEGORIES } from "@/lib/categories";
import { getAllPosts } from "@/lib/posts";
import { SITE_NAME, SITE_URL } from "@/lib/site";

// /llms.txt : plan du site lisible par les moteurs génératifs (convention llmstxt.org).
// Généré au build à partir des articles publiés (date <= aujourd'hui, voir lib/posts.ts).
export const dynamic = "force-static";

export function GET() {
  const lignes: string[] = [];
  lignes.push(`# ${SITE_NAME}`);
  lignes.push("");
  lignes.push(
    "> Le QG des débutants en tech : l'intelligence artificielle, la robotique, la maison connectée, la programmation, les appareils et la sécurité, expliqués simplement, avec des exemples concrets. Chaque article commence par une réponse courte (« L'essentiel en 30 secondes »). Édité par Anmira Studio, Antananarivo, Madagascar."
  );
  lignes.push("");
  lignes.push("## Thèmes");
  lignes.push("");
  for (const c of CATEGORIES) {
    lignes.push(`- [${c.title}](${SITE_URL}/${c.slug}/): ${c.description}`);
  }
  lignes.push("");
  lignes.push("## Articles");
  lignes.push("");
  for (const post of getAllPosts()) {
    lignes.push(`- [${post.seoTitle ?? post.title}](${SITE_URL}/${post.slug}/): ${post.description} (publié le ${post.date})`);
  }
  lignes.push("");
  lignes.push("## Pages utiles");
  lignes.push("");
  lignes.push(`- [À propos](${SITE_URL}/a-propos/): qui fait Techno Play et comment les articles sont écrits`);
  lignes.push(`- [Questions fréquentes](${SITE_URL}/faq/): les questions que se posent les débutants`);
  lignes.push(`- [Contact](${SITE_URL}/contact/): poser une question`);
  lignes.push("");
  return new Response(lignes.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
