// Source de vérité unique pour les 8 rubriques du site — réutilisée par la
// page d'accueil (grille de rubriques), par le frontmatter des articles
// (champ `category`) pour l'étiquette affichée sur chaque carte, et par
// scripts/generate-covers.js pour les visuels de secours (voir ce fichier
// et lib/posts.ts). Ajouter une rubrique ici suffit à la faire apparaître
// partout où elle est utilisée.
//
import type { IconName } from "@/components/Icon";

export type CategorySlug =
  | "technologie"
  | "gaming"
  | "vr-ar"
  | "ia"
  | "llm"
  | "robotique"
  | "drones"
  | "crypto";

export interface Category {
  slug: CategorySlug;
  title: string;
  short: string;
  icon: IconName;
  body: string;
}

export const CATEGORIES: Category[] = [
  {
    slug: "technologie",
    title: "Technologie & gadgets",
    short: "Tech & gadgets",
    icon: "smartphone",
    body: "Smartphones, ordinateurs, objets connectés, audio, domotique : cette catégorie couvre le matériel et les services que vous utilisez — ou envisagez d'acheter — au quotidien. On y trouve des tests pratiques, des comparatifs honnêtes entre plusieurs produits, et des explications sur ce qui rend un appareil réellement meilleur qu'un autre, au-delà de la fiche technique marketing. L'idée n'est pas de vous pousser vers le produit le plus cher, mais vers celui qui correspond réellement à votre usage et à votre budget. On y retrouve aussi des guides d'achat saisonniers et des dossiers sur les tendances qui durent — comme la domotique ou l'écoconception — face à celles qui ne sont, pour l'instant, que des effets d'annonce.",
  },
  {
    slug: "gaming",
    title: "Jeux vidéo & gaming",
    short: "Jeux vidéo",
    icon: "gamepad-2",
    body: "Sorties attendues, tests de jeux, actualité de l'esport, matériel gaming (cartes graphiques, PC, périphériques) : la catégorie Jeux couvre le jeu vidéo comme loisir et comme industrie. On y parle aussi bien des grosses productions que des jeux indépendants qui méritent d'être découverts, et des évolutions techniques — moteurs de jeu, cloud gaming — qui redessinent la façon de jouer (la réalité virtuelle a sa propre catégorie, juste à côté). On y aborde aussi les choix de configuration pour jouer dans de bonnes conditions sans se ruiner, et les tendances qui traversent la communauté : abonnements, jeux-services, montée en puissance du jeu mobile.",
  },
  {
    slug: "vr-ar",
    title: "Réalité virtuelle & réalité augmentée",
    short: "VR & AR",
    icon: "glasses",
    body: "Réalité virtuelle, réalité augmentée, réalité mixte : cette catégorie couvre le matériel — casques, lunettes connectées — et les usages, bien au-delà du seul jeu vidéo : formation professionnelle, santé, visite virtuelle, collaboration à distance. On y teste les casques et applications qui comptent vraiment, on explique les différences entre des technologies souvent confondues (VR, AR, XR), et on prend du recul sur les promesses répétées d'un « métavers » qui peine encore à convaincre au-delà des démonstrations. On y suit aussi les usages grand public qui commencent réellement à s'installer, loin des annonces qui ne débouchent sur rien.",
  },
  {
    slug: "ia",
    title: "Intelligence artificielle",
    short: "IA",
    icon: "brain-circuit",
    body: "L'IA est partout, mais rarement expliquée simplement. Cette catégorie couvre ses usages concrets — au travail, dans la création, dans la recherche — ainsi que les questions qu'elle soulève : éthique, régulation, impact sur l'emploi, fiabilité réelle des outils. L'objectif est de séparer ce qui fonctionne vraiment aujourd'hui de ce qui relève encore de la promesse marketing. On y couvre aussi bien les grandes annonces des laboratoires de recherche que les usages plus discrets, déjà intégrés dans des outils que vous utilisez peut-être sans le savoir.",
  },
  {
    slug: "llm",
    title: "LLM & IA générative",
    short: "LLM",
    icon: "message-square-text",
    body: "Les grands modèles de langage (LLM) et les outils d'IA générative — chatbots, générateurs d'images, assistants de code — ont leur propre catégorie tant leur évolution est rapide. On y compare les modèles entre eux, on explique comment les utiliser efficacement, cas d'usage concrets à l'appui, et on prend le temps de signaler leurs limites autant que leurs progrès. On y trouve aussi des guides pratiques pour rédiger de meilleurs prompts, automatiser des tâches répétitives, ou simplement comprendre ce qui se cache derrière l'outil que vous utilisez peut-être déjà.",
  },
  {
    slug: "robotique",
    title: "Robots & robotique",
    short: "Robotique",
    icon: "bot",
    body: "Robots domestiques, robots industriels, humanoïdes : la robotique avance vite, portée par les progrès de l'IA et de la miniaturisation. On y suit les annonces qui comptent réellement, les usages déjà concrets — logistique, santé, agriculture — et ceux qui restent, pour l'instant, au stade de démonstration. On s'intéresse en particulier à la frontière, parfois floue, entre un prototype spectaculaire en vidéo et un produit réellement utilisable au quotidien.",
  },
  {
    slug: "drones",
    title: "Drones",
    short: "Drones",
    icon: "plane",
    body: "Drones grand public, drones professionnels (agriculture, BTP, inspection, cinéma), drone racing, cadre réglementaire : cette catégorie suit un secteur à la croisée de la robotique et de l'aérien. On y teste le matériel destiné aux particuliers — photo, vidéo, loisir — mais aussi les usages professionnels qui se généralisent, souvent moins spectaculaires que les vidéos qui circulent sur les réseaux mais bien plus significatifs pour l'avenir du secteur. On y suit aussi les évolutions réglementaires, qui changent régulièrement ce qu'il est permis de faire voler, où, et sous quelles conditions — un point souvent négligé mais essentiel avant tout achat.",
  },
  {
    slug: "crypto",
    title: "Crypto & Web3",
    short: "Crypto",
    icon: "coins",
    body: "Cryptomonnaies, blockchain, finance décentralisée : cette catégorie décrypte un secteur volatile et souvent mal expliqué. Notre approche est pédagogique et prudente — on explique comment fonctionne une technologie ou un projet, sans jamais recommander un investissement. On y couvre aussi bien les projets déjà établis que les tendances émergentes, avec un regard critique sur les promesses non tenues qui ont marqué ce secteur. Les contenus de cette catégorie sont informatifs, pas des conseils financiers : à vous de faire vos propres recherches avant toute décision, et de ne jamais investir plus que ce que vous pouvez vous permettre de perdre.",
  },
];

export function getCategory(slug: CategorySlug | string | undefined) {
  return CATEGORIES.find((c) => c.slug === slug);
}
