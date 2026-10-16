import type { Metadata } from "next";
import { getPostBySlug } from "@/lib/posts";
import { SITE_NAME } from "@/lib/site";
import Breadcrumbs from "@/components/Breadcrumbs";
import NewsletterForm from "@/components/NewsletterForm";

export const metadata: Metadata = {
  title: "Atelier IA pour débutants : parents et lycéens",
  description: `Deux ateliers ouverts au grand public sur l’intelligence artificielle, pour les parents et pour les lycéens, dans le cadre du Novembre numérique 2026, avec les supports de ${SITE_NAME}.`,
  alternates: { canonical: "/atelier-ia/" },
};

// Page des ateliers « IA » du Novembre numérique 2026 (programme P4H × IFM).
// Deux programmes distincts : « L’IA au quotidien » (parents) et « Cap sur
// les études avec l’IA » (lycéens). Les dates et le lieu n’étant pas encore
// communiqués, la page n’en affiche aucun.
const PROGRAMMES = [
  {
    id: "parents",
    titre: "L’IA au quotidien : un coup de main pour les parents",
    public: "Parents, débutants ou curieux de découvrir l’IA.",
    objectif:
      "Apprendre à utiliser l’intelligence artificielle pour des besoins du quotidien et accompagner les usages des enfants avec discernement.",
    modules: [
      {
        titre: "Découvrir et prendre en main l’IA",
        texte:
          "Comprendre simplement ce qu’est une IA générative, ce qu’elle peut faire et ses limites. Découvrir l’interface d’un assistant, écrire une première demande et poursuivre une conversation.",
      },
      {
        titre: "Apprendre à bien formuler ses demandes",
        texte:
          "Préciser son besoin, donner le contexte et indiquer ses contraintes. Demander une réponse adaptée, ajouter des précisions et améliorer le résultat par le dialogue.",
      },
      {
        titre: "Utiliser l’IA dans la vie quotidienne",
        texte:
          "Organiser une journée, préparer des repas, trouver des activités familiales, rédiger un message, reformuler un document ou mettre en forme un budget.",
      },
      {
        titre: "Accompagner ses enfants avec l’IA",
        texte:
          "Comprendre les usages scolaires et personnels des enfants. Utiliser l’IA pour expliquer et encourager l’apprentissage. Définir des règles familiales et maintenir le dialogue sur les usages.",
      },
      {
        titre: "Garder les bons réflexes",
        texte:
          "Vérifier les informations et les calculs, reconnaître une réponse inadaptée et protéger les données personnelles. Adapter les suggestions à sa situation et garder la décision finale.",
      },
    ],
    liens: ["agent-ia", "chatgpt-ou-gemini", "prompt-chatgpt"],
  },
  {
    id: "lyceens",
    titre: "Cap sur les études avec l’IA",
    public: "Lycéens, débutants ou souhaitant améliorer leurs usages de l’IA.",
    objectif:
      "Apprendre à utiliser l’intelligence artificielle pour comprendre, s’entraîner et réviser, tout en développant son autonomie et son esprit critique.",
    modules: [
      {
        titre: "Découvrir et prendre en main l’IA",
        texte:
          "Comprendre le fonctionnement général d’un assistant IA et ses limites. Découvrir l’interface, poser une première question, relancer et commencer une nouvelle conversation.",
      },
      {
        titre: "Poser des questions utiles pour apprendre",
        texte:
          "Préciser sa matière, son niveau et sa difficulté. Demander une explication, un exemple ou un indice. Ajuster ses demandes et reformuler les réponses avec ses propres mots.",
      },
      {
        titre: "Comprendre ses cours et progresser dans les exercices",
        texte:
          "Faire expliquer une notion, clarifier un passage difficile, comparer des exemples et analyser une erreur. Utiliser des indices pour poursuivre son raisonnement et refaire un exercice de manière autonome.",
      },
      {
        titre: "Réviser et préparer ses travaux",
        texte:
          "Créer des questions de révision, s’entraîner avec un quiz, organiser ses révisions et préparer un oral. Répondre avant de consulter la correction et identifier les points à retravailler.",
      },
      {
        titre: "Vérifier et utiliser l’IA avec responsabilité",
        texte:
          "Comparer les réponses au cours et à des sources fiables. Repérer les erreurs, protéger ses données et respecter les consignes des enseignants. Comprendre pourquoi les connaissances acquises à l’école restent essentielles.",
      },
    ],
    liens: ["intelligence-artificielle-guide-debutants", "claude-ou-chatgpt", "prompt-chatgpt"],
  },
];

export default function AtelierIAPage() {
  return (
    <div className="page">
      <Breadcrumbs items={[{ name: "Accueil", href: "/" }, { name: "Atelier IA", href: "/atelier-ia/" }]} />

      <h1>Ateliers IA du Novembre numérique 2026</h1>
      <p className="lead">
        Deux ateliers ouverts à toutes et à tous, pour découvrir l’intelligence artificielle
        en pratique. Aucune connaissance n’est demandée.
      </p>

      <nav className="atelier-sommaire" aria-label="Choisir un atelier">
        {PROGRAMMES.map((p) => (
          <a key={p.id} href={`#${p.id}`} className="btn btn--secondary">
            {p.id === "parents" ? "Atelier parents" : "Atelier lycéens"}
          </a>
        ))}
      </nav>

      {PROGRAMMES.map((p) => (
        <section key={p.id} id={p.id} className="atelier-programme">
          <h2>{p.titre}</h2>
          <p>
            <strong>Public :</strong> {p.public}
          </p>
          <p>
            <strong>Objectif :</strong> {p.objectif}
          </p>

          <h3>Programme</h3>
          <ol className="atelier-modules">
            {p.modules.map((m) => (
              <li key={m.titre}>
                <strong>{m.titre}</strong>
                <span>{m.texte}</span>
              </li>
            ))}
          </ol>

          <h3>Pour aller plus loin</h3>
          <ul>
            {p.liens.map((slug) => {
              const post = getPostBySlug(slug);
              return post ? (
                <li key={slug}>
                  <a href={`/${slug}/`}>{post.title}</a>
                </li>
              ) : null;
            })}
          </ul>
        </section>
      ))}

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
