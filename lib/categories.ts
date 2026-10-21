// Thèmes du site — structure du 2026-10-07, repositionnement « QG des
// débutants en tech » : tous les visiteurs sont pris pour des novices, donc
// une structure la plus simple possible.
//
// 6 thèmes, chacun découpé en 2 à 3 sous-catégories (menu déroulant et page
// du thème, ancres /<theme>/#<sous-catégorie>). Un seul niveau d'URL : les
// sous-catégories ne créent pas de pages. Un débutant choisit son sujet
// (IA, robots, maison connectée…), puis la sous-catégorie, puis son article.
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
  | "cybersecurite";

/** Une question de débutant à laquelle le thème répond (liée à l'article s'il est publié). */
export interface Question {
  question: string;
  /** Slug de l'article qui répond à la question, s'il existe ou existera. */
  slug?: string;
}

/** Sous-catégorie d'un thème : un regroupement d'articles, affiché dans le menu déroulant. */
export interface SousCategorie {
  slug: string;
  titre: string;
  /** Questions de débutant de cette sous-catégorie (liées à l'article quand il existe). */
  questions: Question[];
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
  /** Sous-catégories du thème, de la plus simple à la plus avancée (ordre de lecture). */
  sousCategories: SousCategorie[];
}

/** Base des sous-catégories par thème, de la plus simple à la plus avancée. */
const DONNEES_SOUS_CATEGORIES: Record<CategorySlug, SousCategorie[]> = {
  "intelligence-artificielle": [
    {
      slug: "comprendre-l-ia",
      titre: "Comprendre l'IA",
      questions: [
        { question: "C'est quoi une IA, concrètement ?", slug: "intelligence-artificielle-guide-debutants" },
        { question: "Les outils d'IA pour débutants : lesquels tester ?", slug: "top10-outils-ia-debutants" },
        { question: "Qu'est-ce qu'un modèle de langage ?", slug: "modele-de-langage-c-est-quoi" },
        { question: "Pourquoi l'IA se trompe-t-elle parfois ?", slug: "pourquoi-ia-se-trompe" },
      ],
    },
    {
      slug: "utiliser-un-assistant",
      titre: "Utiliser un assistant",
      questions: [
        { question: "ChatGPT ou Gemini : lequel choisir pour débuter ?", slug: "chatgpt-ou-gemini" },
        { question: "Claude ou ChatGPT : lequel choisir pour coder et écrire ?", slug: "claude-ou-chatgpt" },
        { question: "Comment écrire un bon prompt pour ChatGPT ?", slug: "prompt-chatgpt" },
        { question: "Peut-on faire confiance à une réponse de l'IA ?", slug: "confiance-reponse-ia" },
      ],
    },
    {
      slug: "creer-avec-l-ia",
      titre: "Créer avec l'IA",
      questions: [
        { question: "Les meilleurs outils d'IA pour créer des images", slug: "top10-outils-ia-creer-images" },
        { question: "Créer une image avec l'IA sans risquer les droits d'auteur ?", slug: "image-ia-droits-d-auteur" },
        { question: "Peut-on faire une vidéo avec l'IA sans savoir monter ?", slug: "video-ia-sans-monter" },
      ],
    },
    {
      slug: "automatiser-avec-l-ia",
      titre: "Automatiser avec l'IA",
      questions: [
        { question: "C'est quoi un agent IA, au juste ?", slug: "agent-ia" },
        { question: "Automatiser une tâche répétitive avec l'IA : par où commencer ?", slug: "automatiser-tache-repetitive-ia" },
        { question: "Connecter l'IA à ses propres fichiers : est-ce sûr ?", slug: "ia-fichiers-personnels-securite" },
      ],
    },
    {
      slug: "ia-avancee",
      titre: "Aller plus loin",
      questions: [
        { question: "C'est quoi un RAG, et à quoi ça sert ?", slug: "rag-c-est-quoi" },
        { question: "Comment choisir un modèle d'IA pour son projet ?", slug: "choisir-modele-ia-projet" },
        { question: "Peut-on faire tourner une IA sur son propre ordinateur ?", slug: "ia-sur-son-ordinateur" },
      ],
    },
  ],
  "robotique-drones": [
    {
      slug: "comprendre-les-robots",
      titre: "Comprendre les robots",
      questions: [
        { question: "C'est quoi un robot, exactement ?", slug: "c-est-quoi-un-robot" },
        { question: "Robot, automate ou cobot : quelle différence ?", slug: "robot-automate-cobot" },
        { question: "Comment un robot sait-il où il va ?", slug: "robot-sait-ou-il-va" },
      ],
    },
    {
      slug: "robots-du-quotidien",
      titre: "Les robots du quotidien",
      questions: [
        { question: "Un aspirateur robot, ça vaut le coup ?", slug: "aspirateur-robot-ca-vaut-le-coup" },
        { question: "Tondeuse robot : pour quel jardin ?", slug: "tondeuse-robot-quel-jardin" },
        { question: "Robot de cuisine : faut-il vraiment en acheter un ?", slug: "robot-de-cuisine-utile" },
      ],
    },
    {
      slug: "les-drones",
      titre: "Les drones",
      questions: [
        { question: "Comment un drone fait-il pour rester en l'air ?", slug: "comment-drone-reste-en-l-air" },
        { question: "Faut-il une autorisation pour faire voler un drone ?", slug: "drone-autorisation-france" },
        { question: "Quel drone acheter pour débuter ?", slug: "quel-drone-pour-debuter" },
      ],
    },
    {
      slug: "piloter-un-drone",
      titre: "Piloter un drone",
      questions: [
        { question: "Mon premier vol : les règles à connaître", slug: "premier-vol-drone-regles" },
        { question: "Batteries de drone : comment bien les utiliser ?", slug: "batteries-drone-bien-utiliser" },
        { question: "Filmer avec un drone : les bases", slug: "filmer-avec-un-drone" },
      ],
    },
    {
      slug: "robotique-maker",
      titre: "Construire son robot",
      questions: [
        { question: "Construire un petit robot avec Arduino : par où commencer ?", slug: "arduino-petit-robot-debuter" },
        { question: "Programmer un robot : c'est difficile ?", slug: "programmer-un-robot-difficile" },
        { question: "Les robots humanoïdes, où en est-on ?", slug: "robots-humanoides-ou-en-est-on" },
      ],
    },
  ],
  "maison-connectee": [
    {
      slug: "les-bases-maison",
      titre: "Les bases",
      questions: [
        { question: "C'est quoi une maison connectée ?", slug: "c-est-quoi-une-maison-connectee" },
        { question: "Par quoi commencer : ampoule, prise ou enceinte ?", slug: "par-quoi-commencer-maison-connectee" },
        { question: "Faut-il un abonnement pour une maison connectée ?", slug: "abonnement-maison-connectee" },
      ],
    },
    {
      slug: "commander-sa-maison",
      titre: "Commander sa maison",
      questions: [
        { question: "Alexa ou Google Home : quelle différence ?", slug: "alexa-ou-google-home" },
        { question: "Ampoules connectées : Wi-Fi, Zigbee ou Bluetooth ?", slug: "ampoules-connectees-wifi-zigbee-bluetooth" },
        { question: "Prises connectées : sont-elles sans risque ?", slug: "prises-connectees-risques" },
      ],
    },
    {
      slug: "confort-et-energie",
      titre: "Confort et énergie",
      questions: [
        { question: "Quel thermostat connecté pour un radiateur électrique ?", slug: "thermostat-connecte-radiateur-electrique" },
        { question: "Économiser l'énergie avec une maison connectée", slug: "economiser-energie-maison-connectee" },
        { question: "Volets roulants connectés : ça vaut le coup ?", slug: "volets-roulants-connectes" },
      ],
    },
    {
      slug: "securite-maison",
      titre: "Sécurité de la maison",
      questions: [
        { question: "Caméra connectée : que filmer, et où la placer ?", slug: "camera-connectee-ou-placer" },
        { question: "Détecteur de fumée connecté : utile ou gadget ?", slug: "detecteur-fumee-connecte" },
        { question: "Serrure connectée : avantages et risques", slug: "serrure-connectee-avantages-risques" },
      ],
    },
    {
      slug: "maison-connectee-avancee",
      titre: "Aller plus loin",
      questions: [
        { question: "Home Assistant, c'est quoi ?", slug: "home-assistant-c-est-quoi" },
        { question: "Faire communiquer ses appareils sans passer par le cloud", slug: "communiquer-sans-cloud" },
        { question: "Matter, le standard qui unifie la maison connectée", slug: "matter-standard-maison-connectee" },
      ],
    },
  ],
  programmation: [
    {
      slug: "les-bases-code",
      titre: "Les bases",
      questions: [
        { question: "C'est quoi la programmation, concrètement ?", slug: "c-est-quoi-la-programmation" },
        { question: "C'est quoi le HTML et le CSS ?", slug: "html-css-c-est-quoi" },
        { question: "C'est quoi un algorithme ?", slug: "c-est-quoi-un-algorithme" },
      ],
    },
    {
      slug: "se-lancer",
      titre: "Se lancer",
      questions: [
        { question: "Quel langage de programmation apprendre en premier ?", slug: "quel-langage-apprendre-en-premier" },
        { question: "Peut-on créer un site sans savoir coder ?", slug: "creer-site-sans-savoir-coder" },
        { question: "Où apprendre à coder gratuitement ?", slug: "apprendre-coder-gratuitement" },
      ],
    },
    {
      slug: "premiers-projets",
      titre: "Premiers projets",
      questions: [
        { question: "Créer sa première page web", slug: "creer-premiere-page-web" },
        { question: "Un petit jeu pour apprendre avec Scratch", slug: "petit-jeu-scratch" },
        { question: "Python : écrire son premier programme", slug: "python-premier-programme" },
      ],
    },
    {
      slug: "outils-du-developpeur",
      titre: "Les outils du développeur",
      questions: [
        { question: "Git, c'est quoi ?", slug: "git-c-est-quoi" },
        { question: "VS Code : l'éditeur de code pour débutants", slug: "vs-code-debutant" },
        { question: "C'est quoi une API ?", slug: "c-est-quoi-une-api" },
      ],
    },
    {
      slug: "developper-pour-de-vrai",
      titre: "Développer pour de vrai",
      questions: [
        { question: "Front-end, back-end, full-stack : lequel choisir ?", slug: "front-back-fullstack" },
        { question: "Mettre une application en ligne", slug: "mettre-application-en-ligne" },
        { question: "Tests automatisés : pourquoi c'est utile", slug: "tests-automatises-pourquoi" },
      ],
    },
  ],
  "appareils-internet": [
    {
      slug: "comprendre-internet",
      titre: "Comprendre Internet et ses appareils",
      questions: [
        { question: "C'est quoi Internet, et comment marchent nos appareils ?", slug: "c-est-quoi-internet" },
      ],
    },
    {
      slug: "depanner-telephone",
      titre: "Dépanner son téléphone",
      questions: [
        { question: "Mon iPhone ne charge plus : que faire ?", slug: "iphone-ne-charge-plus" },
        { question: "Mon téléphone chauffe trop : que faire ?", slug: "telephone-chauffe-trop" },
      ],
    },
    {
      slug: "wifi-box",
      titre: "Wi-Fi et box",
      questions: [
        { question: "Comment changer le mot de passe Wi-Fi de ma box ?", slug: "changer-mot-de-passe-wifi" },
        { question: "Le Wi-Fi coupe sans raison : que faire ?", slug: "wifi-coupe-sans-raison" },
      ],
    },
    {
      slug: "choisir-ecran-casque",
      titre: "Choisir un écran ou un casque",
      questions: [
        { question: "OLED ou QLED : quelle différence, concrètement ?", slug: "oled-ou-qled" },
        { question: "Casque Bluetooth pour le sport : comment choisir ?", slug: "casque-bluetooth-sport" },
      ],
    },
    {
      slug: "stockage-sauvegarde",
      titre: "Stockage et sauvegarde",
      questions: [
        { question: "Sauvegarder son iPhone : quelle méthode choisir ?", slug: "sauvegarder-iphone" },
        { question: "Pourquoi mon stockage iPhone est plein ?", slug: "donnees-systeme-iphone" },
        { question: "Messages supprimés : peut-on les récupérer ?", slug: "recuperer-messages-supprimes" },
      ],
    },
    {
      slug: "vie-privee-telephone",
      titre: "Vie privée sur téléphone",
      questions: [
        { question: "Enregistrer un appel : ce que dit la loi", slug: "enregistrer-appel-iphone" },
        { question: "Les réglages de confidentialité de l'iPhone", slug: "reglages-confidentialite-iphone" },
      ],
    },
    {
      slug: "ordinateur",
      titre: "Ordinateur",
      questions: [
        { question: "Faire une capture d'écran sur PC", slug: "capture-ecran-pc" },
        { question: "Windows 11 sans compte Microsoft", slug: "windows-11-sans-compte-microsoft" },
        { question: "Installer Windows sans perdre ses fichiers", slug: "installer-windows-sans-perdre-fichiers" },
      ],
    },
  ],
  cybersecurite: [
    {
      slug: "comprendre-la-cybersecurite",
      titre: "Comprendre la cybersécurité",
      questions: [
        { question: "C'est quoi la cybersécurité, et à quoi ça sert ?", slug: "c-est-quoi-la-cybersecurite" },
      ],
    },
    {
      slug: "mots-de-passe",
      titre: "Mots de passe",
      questions: [
        { question: "Comment choisir un bon mot de passe ?", slug: "choisir-bon-mot-de-passe" },
        { question: "Existe-t-il un gestionnaire de mots de passe gratuit ?", slug: "gestionnaire-mot-de-passe-gratuit" },
        { question: "Activer la double authentification : pourquoi et comment", slug: "double-authentification-activer" },
      ],
    },
    {
      slug: "arnaques-et-protection",
      titre: "Arnaques et protection",
      questions: [
        { question: "Comment reconnaître un faux message (phishing) ?", slug: "reconnaitre-faux-message-phishing" },
        { question: "Arnaques par SMS : les reconnaître", slug: "arnaques-sms-reconnaitre" },
      ],
    },
    {
      slug: "reseau-et-vpn",
      titre: "Réseau et VPN",
      questions: [
        { question: "Un VPN gratuit, est-ce fiable ?", slug: "vpn-gratuit" },
        { question: "Le Wi-Fi public est-il dangereux ?", slug: "wifi-public-dangereux" },
      ],
    },
    {
      slug: "securite-avancee",
      titre: "Aller plus loin",
      questions: [
        { question: "C'est quoi le chiffrement ?", slug: "c-est-quoi-le-chiffrement" },
        { question: "Pourquoi mettre à jour son système ?", slug: "pourquoi-mettre-a-jour-systeme" },
        { question: "Se protéger contre les rançongiciels", slug: "se-proteger-rancongiciels" },
      ],
    },
  ],
};

export const CATEGORIES: Category[] = [
  {
    slug: "intelligence-artificielle",
    title: "Intelligence artificielle",
    short: "IA",
    icon: "brain-circuit",
    description:
      "ChatGPT, Gemini, agents, prompts : l'IA expliquée simplement, ce qu'elle sait faire, comment t'en servir et où elle se trompe.",
    body: "Tout le monde parle d'IA, peu de gens t'expliquent calmement de quoi il s'agit. Ici, on part de zéro : c'est quoi une IA, à quoi elle peut te servir concrètement, comment lui poser une bonne question, et dans quels cas elle se trompe.",
    sousCategories: DONNEES_SOUS_CATEGORIES["intelligence-artificielle"],
  },
  {
    slug: "robotique-drones",
    title: "Robotique & drones",
    short: "Robotique",
    icon: "bot",
    description:
      "Robots, aspirateurs robots, drones : comprendre comment ils fonctionnent, à quoi ils servent et par où commencer.",
    body: "Les robots ne sont plus réservés aux films et aux usines : un aspirateur dans ton salon, un drone dans le ciel, un robot-chien dans une vidéo virale. On t'explique comment ça marche, à quoi ça sert vraiment, et ce qu'il faut savoir avant de t'y mettre.",
    sousCategories: DONNEES_SOUS_CATEGORIES["robotique-drones"],
  },
  {
    slug: "maison-connectee",
    title: "Maison connectée",
    short: "Maison connectée",
    icon: "house",
    description:
      "Ampoules, prises, thermostats, enceintes : la maison connectée expliquée simplement, à mettre en place pas à pas.",
    body: "Une maison connectée, c'est une maison dont certains appareils se commandent depuis ton téléphone ou avec ta voix. Pas besoin de tout changer d'un coup : on t'explique par où commencer, quoi acheter en premier et comment éviter les pièges.",
    sousCategories: DONNEES_SOUS_CATEGORIES["maison-connectee"],
  },
  {
    slug: "programmation",
    title: "Programmation",
    short: "Programmation",
    icon: "code",
    description:
      "Apprendre à coder depuis zéro : ce que c'est, par où commencer et comment réaliser ton premier petit projet.",
    body: "Coder, ce n'est pas réservé aux matheux : c'est donner des instructions claires à un ordinateur, une étape après l'autre. On t'explique les bases avec des exemples de la vie de tous les jours, puis on te guide vers ton premier programme ou ton premier site.",
    sousCategories: DONNEES_SOUS_CATEGORIES["programmation"],
  },
  {
    slug: "appareils-internet",
    title: "Appareils & Internet",
    short: "Appareils & Internet",
    icon: "smartphone",
    description:
      "Smartphone, ordinateur, box, casque, TV : bien les utiliser, les dépanner et choisir le bon sans te tromper.",
    body: "Ton téléphone se vide trop vite, ton Wi-Fi décroche, tu hésites entre deux casques ? On t'explique comment marchent tes appareils du quotidien et Internet, on règle les petits bugs pas à pas, et on t'aide à choisir sans payer pour du marketing.",
    sousCategories: DONNEES_SOUS_CATEGORIES["appareils-internet"],
  },
  {
    slug: "cybersecurite",
    title: "Cybersécurité",
    short: "Cybersécurité",
    icon: "shield-check",
    description:
      "Mots de passe, VPN, arnaques en ligne : te protéger sur Internet sans paranoïa.",
    body: "Se protéger en ligne ne demande pas d'être expert : quelques bons réflexes évitent l'essentiel des problèmes. On t'explique les risques simplement, puis les gestes à adopter, dans le bon ordre.",
    sousCategories: DONNEES_SOUS_CATEGORIES["cybersecurite"],
  },
];

/** Sous-catégorie de chaque article publié (slug d'article -> slug de sous-catégorie). */
export const ARTICLE_SOUS_CATEGORIE: Record<string, string> = {
  "c-est-quoi-internet": "comprendre-internet",
  "c-est-quoi-la-cybersecurite": "comprendre-la-cybersecurite",
  "intelligence-artificielle-guide-debutants": "comprendre-l-ia",
  "top10-outils-ia-debutants": "comprendre-l-ia",
  "chatgpt-ou-gemini": "utiliser-un-assistant",
  "claude-ou-chatgpt": "utiliser-un-assistant",
  "prompt-chatgpt": "utiliser-un-assistant",
  "top10-outils-ia-creer-images": "creer-avec-l-ia",
  "agent-ia": "automatiser-avec-l-ia",
  "c-est-quoi-un-robot": "comprendre-les-robots",
  "aspirateur-robot-ca-vaut-le-coup": "robots-du-quotidien",
  "comment-drone-reste-en-l-air": "les-drones",
  "drone-autorisation-france": "les-drones",
  "c-est-quoi-une-maison-connectee": "les-bases-maison",
  "par-quoi-commencer-maison-connectee": "les-bases-maison",
  "alexa-ou-google-home": "commander-sa-maison",
  "thermostat-connecte-radiateur-electrique": "confort-et-energie",
  "c-est-quoi-la-programmation": "les-bases-code",
  "html-css-c-est-quoi": "les-bases-code",
  "quel-langage-apprendre-en-premier": "se-lancer",
  "creer-site-sans-savoir-coder": "se-lancer",
  "iphone-ne-charge-plus": "depanner-telephone",
  "changer-mot-de-passe-wifi": "wifi-box",
  "oled-ou-qled": "choisir-ecran-casque",
  "casque-bluetooth-sport": "choisir-ecran-casque",
  "sauvegarder-iphone": "stockage-sauvegarde",
  "donnees-systeme-iphone": "stockage-sauvegarde",
  "recuperer-messages-supprimes": "stockage-sauvegarde",
  "enregistrer-appel-iphone": "vie-privee-telephone",
  "capture-ecran-pc": "ordinateur",
  "windows-11-sans-compte-microsoft": "ordinateur",
  "choisir-bon-mot-de-passe": "mots-de-passe",
  "gestionnaire-mot-de-passe-gratuit": "mots-de-passe",
  "reconnaitre-faux-message-phishing": "arnaques-et-protection",
  "vpn-gratuit": "reseau-et-vpn",
  "modele-de-langage-c-est-quoi": "comprendre-l-ia",
  "pourquoi-ia-se-trompe": "comprendre-l-ia",
  "confiance-reponse-ia": "utiliser-un-assistant",
  "image-ia-droits-d-auteur": "creer-avec-l-ia",
  "video-ia-sans-monter": "creer-avec-l-ia",
  "automatiser-tache-repetitive-ia": "automatiser-avec-l-ia",
  "ia-fichiers-personnels-securite": "automatiser-avec-l-ia",
  "rag-c-est-quoi": "ia-avancee",
  "choisir-modele-ia-projet": "ia-avancee",
  "ia-sur-son-ordinateur": "ia-avancee",
  "robot-automate-cobot": "comprendre-les-robots",
  "robot-sait-ou-il-va": "comprendre-les-robots",
  "tondeuse-robot-quel-jardin": "robots-du-quotidien",
  "robot-de-cuisine-utile": "robots-du-quotidien",
  "quel-drone-pour-debuter": "les-drones",
  "premier-vol-drone-regles": "piloter-un-drone",
  "batteries-drone-bien-utiliser": "piloter-un-drone",
  "filmer-avec-un-drone": "piloter-un-drone",
  "arduino-petit-robot-debuter": "robotique-maker",
  "programmer-un-robot-difficile": "robotique-maker",
  "robots-humanoides-ou-en-est-on": "robotique-maker",
  "abonnement-maison-connectee": "les-bases-maison",
  "ampoules-connectees-wifi-zigbee-bluetooth": "commander-sa-maison",
  "prises-connectees-risques": "commander-sa-maison",
  "economiser-energie-maison-connectee": "confort-et-energie",
  "volets-roulants-connectes": "confort-et-energie",
  "camera-connectee-ou-placer": "securite-maison",
  "detecteur-fumee-connecte": "securite-maison",
  "serrure-connectee-avantages-risques": "securite-maison",
  "home-assistant-c-est-quoi": "maison-connectee-avancee",
  "communiquer-sans-cloud": "maison-connectee-avancee",
  "matter-standard-maison-connectee": "maison-connectee-avancee",
  "c-est-quoi-un-algorithme": "les-bases-code",
  "apprendre-coder-gratuitement": "se-lancer",
  "creer-premiere-page-web": "premiers-projets",
  "petit-jeu-scratch": "premiers-projets",
  "python-premier-programme": "premiers-projets",
  "git-c-est-quoi": "outils-du-developpeur",
  "vs-code-debutant": "outils-du-developpeur",
  "c-est-quoi-une-api": "outils-du-developpeur",
  "front-back-fullstack": "developper-pour-de-vrai",
  "mettre-application-en-ligne": "developper-pour-de-vrai",
  "tests-automatises-pourquoi": "developper-pour-de-vrai",
  "telephone-chauffe-trop": "depanner-telephone",
  "wifi-coupe-sans-raison": "wifi-box",
  "reglages-confidentialite-iphone": "vie-privee-telephone",
  "installer-windows-sans-perdre-fichiers": "ordinateur",
  "double-authentification-activer": "mots-de-passe",
  "arnaques-sms-reconnaitre": "arnaques-et-protection",
  "wifi-public-dangereux": "reseau-et-vpn",
  "c-est-quoi-le-chiffrement": "securite-avancee",
  "pourquoi-mettre-a-jour-systeme": "securite-avancee",
  "se-proteger-rancongiciels": "securite-avancee",
};

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
