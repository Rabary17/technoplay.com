import type { Metadata } from "next";
import { getPostBySlug } from "@/lib/posts";
import { SITE_NAME } from "@/lib/site";
import Breadcrumbs from "@/components/Breadcrumbs";
import NewsletterForm from "@/components/NewsletterForm";
import { ModulesCliquables, MiniQuiz, type QuestionQuiz } from "@/components/AtelierInteractif";

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
    quiz: [
      {
        question: "L’IA connaît-elle tout de votre vie privée ?",
        choix: ["Oui, elle sait tout", "Non, elle ne connaît que ce qu’on lui écrit"],
        bonne: 1,
        explication: "Elle ne voit que ce que vous tapez. Évitez donc de lui confier des données sensibles : coordonnées bancaires, mots de passe, documents d’identité.",
      },
      {
        question: "Un calcul de budget donné par l’IA est-il forcément juste ?",
        choix: ["Oui, l’IA ne se trompe pas", "Non, il faut le vérifier"],
        bonne: 1,
        explication: "L’IA peut se tromper avec assurance. Vérifiez les chiffres importants avant de vous fier à un résultat.",
      },
      {
        question: "Votre enfant vous montre un devoir fait avec l’IA. Que faites-vous ?",
        choix: ["Je lui demande d’expliquer sa démarche", "Je prends la réponse de l’IA telle quelle"],
        bonne: 0,
        explication: "Faire expliquer la démarche permet de voir si l’enfant a compris. C’est le meilleur moyen de garder le dialogue sur les usages.",
      },
    ] satisfies QuestionQuiz[],
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
    quiz: [
      {
        question: "Une IA peut-elle se tromper ?",
        choix: ["Non, jamais", "Oui, et elle le fait avec assurance"],
        bonne: 1,
        explication: "L’IA peut inventer une réponse qui semble sûre. Vérifie toujours avec ton cours ou une source fiable.",
      },
      {
        question: "Peut-on recopier la réponse de l’IA dans un devoir ?",
        choix: ["Oui, si elle est bien écrite", "Non, il faut respecter les consignes des profs"],
        bonne: 1,
        explication: "Un devoir doit montrer ton travail. Respecte les consignes de ton établissement et utilise l’IA pour comprendre, pas pour remplacer ton raisonnement.",
      },
      {
        question: "Pour réviser, quelle demande est la plus utile ?",
        choix: ["Fais-moi tous les exercices", "Pose-moi des questions et corrige mes réponses"],
        bonne: 1,
        explication: "Tu t’entraînes vraiment quand tu réponds toi-même. L’IA devient un bon coach, pas un distributeur de solutions.",
      },
    ] satisfies QuestionQuiz[],
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
          <p className="atelier-indice">Clique sur une étape pour l’ouvrir.</p>
          <ModulesCliquables modules={p.modules} />

          <h3>Teste-toi</h3>
          <MiniQuiz questions={p.quiz} />

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
