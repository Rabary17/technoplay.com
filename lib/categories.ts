// Thèmes du site — structure du 2026-10-07, repositionnement « QG des
// débutants en tech » : tous les visiteurs sont pris pour des novices, donc
// une structure la plus simple possible.
//
// 6 thèmes à PLAT : un seul niveau d'URL (/<theme>/), pas de sous-catégories.
// Un débutant ne sait pas dans quelle « rubrique de rubrique » chercher :
// il choisit son sujet (IA, robots, maison connectée…), puis son article.
// Le type d'article (« c'est quoi ? », « comment faire », « lequel
// choisir ? ») se voit dans le titre et dans le gabarit d'article, pas dans
// l'arborescence — voir README.md, « Structure d'un article ».
//
// Source unique de vérité, réutilisée par :
//   - le menu principal et le pied de page (app/layout.tsx) ;
//   - les pages de thème (/<theme>/) — voir app/[slug]/ et
//     components/CategoryHub.tsx ;
//   - l'accueil (app/page.tsx), À propos, les pages auteur ;
//   - le frontmatter des articles : champ `category` = slug d'un thème ;
//   - scripts/generate-covers.js (visuels de secours) et
//     lib/auteurs-specialites.json (titulaire de chaque thème).
// Ajouter un thème ici suffit à le faire apparaître partout (penser à
// ajouter ses visuels : `npm run generate-covers`, et son titulaire dans
// lib/auteurs-specialites.json).
//
// Indexation : les pages de thème servent à naviguer, pas à se positionner —
// elles sont en `noindex, follow` et hors sitemap (voir lib/sitemaps.ts).
// Textes rédigés selon la charte de ton : tutoiement, mots simples, aucun
// terme technique sans explication.
import type { IconName } from "@/components/Icon";

export type CategorySlug =
  | "intelligence-artificielle"
  | "robotique-drones"
  | "maison-connectee"
  | "programmation"
  | "appareils-internet"
  | "securite-vie-privee";

/** Une question de débutant à laquelle le thème répond (liée à l'article s'il est publié). */
export interface Question {
  question: string;
  /** Slug de l'article qui répond à la question, s'il existe ou existera. */
  slug?: string;
}

export interface Category {
  slug: CategorySlug;
  title: string;
  /** Libellé court pour le menu. */
  short: string;
  icon: IconName;
  /** Une phrase d'accroche (meta description, cartes de l'accueil). */
  description: string;
  /** Paragraphe de présentation (page du thème). */
  body: string;
  /** Exemples de questions de débutant, affichés sur la page du thème. */
  questions: Question[];
}

export const CATEGORIES: Category[] = [
  {
    slug: "intelligence-artificielle",
    title: "Intelligence artificielle",
    short: "IA",
    icon: "brain-circuit",
    description:
      "ChatGPT, Gemini, agents, prompts : l'IA expliquée simplement, ce qu'elle sait faire, comment t'en servir et où elle se trompe.",
    body: "Tout le monde parle d'IA, peu de gens t'expliquent calmement de quoi il s'agit. Ici, on part de zéro : c'est quoi une IA, à quoi elle peut te servir concrètement, comment lui poser une bonne question, et dans quels cas elle se trompe.",
    questions: [
      { question: "C'est quoi une IA, concrètement ?" },
      { question: "Comment écrire un bon prompt pour ChatGPT ?", slug: "prompt-chatgpt" },
      { question: "C'est quoi un agent IA, au juste ?", slug: "agent-ia" },
      { question: "ChatGPT ou Gemini : lequel choisir pour débuter ?", slug: "chatgpt-ou-gemini" },
    ],
  },
  {
    slug: "robotique-drones",
    title: "Robotique & drones",
    short: "Robotique",
    icon: "bot",
    description:
      "Robots, aspirateurs robots, drones : comprendre comment ils fonctionnent, à quoi ils servent et par où commencer.",
    body: "Les robots ne sont plus réservés aux films et aux usines : un aspirateur dans ton salon, un drone dans le ciel, un robot-chien dans une vidéo virale. On t'explique comment ça marche, à quoi ça sert vraiment, et ce qu'il faut savoir avant de t'y mettre.",
    questions: [
      { question: "C'est quoi un robot, exactement ?" },
      { question: "Comment un drone fait-il pour rester en l'air ?" },
      { question: "Faut-il une autorisation pour faire voler un drone ?" },
      { question: "Un aspirateur robot, ça vaut le coup ?" },
    ],
  },
  {
    slug: "maison-connectee",
    title: "Maison connectée",
    short: "Maison connectée",
    icon: "house",
    description:
      "Ampoules, prises, thermostats, enceintes : la maison connectée expliquée simplement, à mettre en place pas à pas.",
    body: "Une maison connectée, c'est une maison dont certains appareils se commandent depuis ton téléphone ou avec ta voix. Pas besoin de tout changer d'un coup : on t'explique par où commencer, quoi acheter en premier et comment éviter les pièges.",
    questions: [
      { question: "C'est quoi une maison connectée ?" },
      { question: "Quel thermostat connecté pour un radiateur électrique ?", slug: "thermostat-connecte-radiateur-electrique" },
      { question: "Par quoi commencer : une ampoule, une prise, une enceinte ?" },
      { question: "Alexa ou Google Home : quelle différence ?" },
    ],
  },
  {
    slug: "programmation",
    title: "Programmation",
    short: "Programmation",
    icon: "code",
    description:
      "Apprendre à coder depuis zéro : ce que c'est, par où commencer et comment réaliser ton premier petit projet.",
    body: "Coder, ce n'est pas réservé aux matheux : c'est donner des instructions claires à un ordinateur, une étape après l'autre. On t'explique les bases avec des exemples de la vie de tous les jours, puis on te guide vers ton premier programme ou ton premier site.",
    questions: [
      { question: "C'est quoi la programmation, concrètement ?" },
      { question: "Quel langage apprendre en premier ?" },
      { question: "Peut-on créer un site sans savoir coder ?" },
      { question: "C'est quoi le HTML et le CSS ?" },
    ],
  },
  {
    slug: "appareils-internet",
    title: "Appareils & Internet",
    short: "Appareils & Internet",
    icon: "smartphone",
    description:
      "Smartphone, ordinateur, box, casque, TV : bien les utiliser, les dépanner et choisir le bon sans te tromper.",
    body: "Ton téléphone se vide trop vite, ton Wi-Fi décroche, tu hésites entre deux casques ? On t'explique comment marchent tes appareils du quotidien et Internet, on règle les petits bugs pas à pas, et on t'aide à choisir sans payer pour du marketing.",
    questions: [
      { question: "Mon iPhone ne charge plus : que faire ?", slug: "iphone-ne-charge-plus" },
      { question: "Comment changer le mot de passe Wi-Fi de ma box ?", slug: "changer-mot-de-passe-wifi" },
      { question: "Comment faire une capture d'écran sur PC ?", slug: "capture-ecran-pc" },
      { question: "OLED ou QLED : quelle différence, concrètement ?", slug: "oled-ou-qled" },
    ],
  },
  {
    slug: "securite-vie-privee",
    title: "Sécurité & vie privée",
    short: "Sécurité",
    icon: "shield-check",
    description:
      "Mots de passe, VPN, arnaques en ligne : te protéger sur Internet sans paranoïa ni jargon.",
    body: "Se protéger en ligne ne demande pas d'être expert : quelques bons réflexes évitent l'essentiel des problèmes. On t'explique les risques simplement, puis les gestes à adopter, dans le bon ordre.",
    questions: [
      { question: "Un VPN gratuit, est-ce fiable ?", slug: "vpn-gratuit" },
      { question: "Comment choisir un bon mot de passe ?" },
      { question: "Comment reconnaître un faux message (phishing) ?" },
      { question: "Existe-t-il un gestionnaire de mots de passe gratuit ?", slug: "gestionnaire-mot-de-passe-gratuit" },
    ],
  },
];

export function getCategory(slug: string | undefined): Category | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}

/** Thème d'un article : le champ `category` de son frontmatter (slug d'un thème). */
export function resolveCategory(slug: string | undefined): Category | undefined {
  return getCategory(slug);
}

export function categoryUrl(category: Category) {
  return `/${category.slug}/`;
}
