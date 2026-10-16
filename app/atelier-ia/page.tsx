import type { Metadata } from "next";
import { getPostBySlug } from "@/lib/posts";
import { SITE_NAME } from "@/lib/site";
import Breadcrumbs from "@/components/Breadcrumbs";
import NewsletterForm from "@/components/NewsletterForm";

export const metadata: Metadata = {
  title: "Atelier IA pour débutants — parents et enfants",
  description: `Un atelier ouvert au grand public sur l’intelligence artificielle, pour les parents et pour les enfants, avec les supports de ${SITE_NAME}.`,
  alternates: { canonical: "/atelier-ia/" },
};

// Page de l'atelier « Intelligence artificielle (débutant) » du Novembre
// numérique. Deux parcours : parents et enfants. Le programme détaillé
// (dates, horaires, séances) sera ajouté dès réception ; en attendant, la
// page n'affiche aucune date inventée.
const PARCOURS = [
  {
    id: "parents",
    titre: "Pour les parents",
    texte:
      "Comprendre ce qu’est l’IA, ce qu’elle sait faire, comment accompagner votre enfant et repérer les usages à risque.",
    liens: ["agent-ia", "chatgpt-ou-gemini", "prompt-chatgpt"],
  },
  {
    id: "enfants",
    titre: "Pour les enfants",
    texte:
      "Découvrir l’IA avec des exemples simples et des activités concrètes, pour savoir s’en servir et la comprendre.",
    liens: ["claude-ou-chatgpt", "chatgpt-ou-gemini"],
  },
];

export default function AtelierIAPage() {
  return (
    <div className="page">
      <Breadcrumbs items={[{ name: "Accueil", href: "/" }, { name: "Atelier IA", href: "/atelier-ia/" }]} />

      <h1>Atelier : l’intelligence artificielle pour débutants</h1>
      <p className="lead">
        Un atelier ouvert à toutes et à tous, dans le cadre du Novembre numérique.
        Parents et enfants peuvent venir ensemble ou chacun de leur côté : aucune
        connaissance n’est demandée.
      </p>

      <section id="parcours">
        <h2>Choisissez votre parcours</h2>
        <div className="atelier-parcours">
          {PARCOURS.map((p) => (
            <article key={p.id} id={p.id} className="atelier-carte">
              <h3>{p.titre}</h3>
              <p>{p.texte}</p>
              <ul>
                {p.liens.map((slug) => {
                  const post = getPostBySlug(slug);
                  return post ? (
                    <li key={slug}>
                      <a href={`/${slug}/`}>{post.seoTitle || post.title}</a>
                    </li>
                  ) : null;
                })}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section id="programme">
        <h2>Le programme</h2>
        <p className="empty-state">
          Le programme détaillé (dates, horaires, lieu et contenu de chaque séance) sera publié ici très prochainement.
        </p>
      </section>

      <section id="s-abonner">
        <h2>Restez informés</h2>
        <p>
          Abonnez-vous à la newsletter pour recevoir les nouveautés du monde de la technologie, expliquées simplement,
          et suivre les prochaines activités.
        </p>
        <NewsletterForm id="newsletter-atelier" />
      </section>
    </div>
  );
}
