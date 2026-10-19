import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/site";
import { PROGRAMMES } from "@/lib/atelier-ia";
import Breadcrumbs from "@/components/Breadcrumbs";
import NewsletterForm from "@/components/NewsletterForm";

export const metadata: Metadata = {
  title: "Atelier IA pour débutants : parents et lycéens",
  description: `Deux ateliers ouverts au grand public sur l’intelligence artificielle, pour les parents et pour les lycéens, dans le cadre du Novembre numérique 2026, avec les supports de ${SITE_NAME}.`,
  alternates: { canonical: "/atelier-ia/" },
};

// Porte d'entrée : deux cartes côte à côte, une par public. Chaque carte
// mène à sa page dédiée (/atelier-ia/parents/ ou /atelier-ia/lyceens/).
export default function AtelierIAPage() {
  return (
    <div className="page">
      <Breadcrumbs items={[{ name: "Accueil", href: "/" }, { name: "Atelier IA", href: "/atelier-ia/" }]} />

      <h1>Ateliers IA du Novembre numérique 2026</h1>
      <p className="lead">
        Deux ateliers ouverts à toutes et à tous, pour découvrir l’intelligence artificielle
        en pratique. Aucune connaissance n’est demandée. Choisis celui qui te correspond.
      </p>

      <div className="atelier-cartes">
        {PROGRAMMES.map((p) => (
          <article key={p.id} className="atelier-carte">
            <p className="atelier-carte__public">{p.id === "parents" ? "Pour les parents" : "Pour les lycéens"}</p>
            <h2>{p.titre}</h2>
            <p>{p.objectif}</p>
            <a className="btn btn--primary" href={`/atelier-ia/${p.id}/`}>
              Voir l’atelier {p.id === "parents" ? "parents" : "lycéens"}
            </a>
          </article>
        ))}
      </div>

      <section id="s-abonner" className="atelier-programme">
        <h2>Restez informés</h2>
        <p>
          Abonnez-vous à la newsletter pour recevoir les nouveautés du monde de la technologie,
          expliquées simplement, et suivre les prochaines activités.
        </p>
        <NewsletterForm id="newsletter-atelier" />
      </section>
    </div>
  );
}
