// Auteurs du site — source de vérité pour l'encart auteur en bas des
// articles, la page /auteur/<slug>/, la page À propos et le JSON-LD
// `Person` (author des BlogPosting, ProfilePage). Signal E-E-A-T central :
// un rédacteur identifié, avec une bio et des profils externes vérifiables
// (`sameAs`), pèse bien plus qu'un article signé « La rédaction ».
//
// Frontmatter d'un article : `author: "andrianina-rabarivelo"` (slug
// ci-dessous). Sans champ `author`, l'article est attribué au rédacteur en
// chef (DEFAULT_AUTHOR_SLUG). À la publication, l'auteur est choisi selon sa
// spécialité : règles dans lib/auteurs-specialites.json, appliquées par
// scripts/generation/choisir-auteur.js et `npm run new-post`. Pas d'email public : le contact passe par
// la page /contact/ (choix du 2026-10-02).
import type { IconName } from "@/components/Icon";
import { ALL_SUBCATEGORIES, type Section, type Subcategory } from "./categories";
import REGLES from "./auteurs-specialites.json";

export interface AuthorSocial {
  label: string;
  url: string;
  icon: IconName;
}

export interface Author {
  slug: string;
  name: string;
  /** Initiales pour l'avatar de repli (tant qu'aucune photo n'est fournie). */
  initials: string;
  role: string;
  /** Photo de profil carrée (chemin sous public/), affichée en rond. */
  image?: string;
  /** Bio courte (encart auteur sous chaque article, ~50 mots). */
  shortBio: string;
  /** Bio longue (page auteur, À propos) — un paragraphe par entrée. */
  bio: string[];
  /** Domaines d'expertise — affichés sur la page auteur et repris en JSON-LD `knowsAbout`. */
  expertise: string[];
  socials: AuthorSocial[];
}

export const AUTHORS: Author[] = [
  {
    slug: "andrianina-rabarivelo",
    name: "Andrianina RABARIVELO",
    initials: "AR",
    role: "Rédacteur en chef",
    image: "/authors/andrianina-rabarivelo.jpg",
    shortBio:
      "Rédacteur en chef de Techno Play, Andrianina RABARIVELO est développeur web et spécialiste du référencement. Au quotidien, il conçoit des automatisations et travaille avec les outils d'IA. Guitariste à ses heures, il applique une règle simple à chaque tuto, comparatif ou décryptage du site : à la fin de l'article, ton problème doit être réglé.",
    bio: [
      "Andrianina RABARIVELO est le rédacteur en chef de Techno Play. Développeur et responsable technique, il passe ses journées à la croisée du web, du référencement et de l'intelligence artificielle : sites WordPress et Next.js, scripts d'automatisation en Python et Node.js, extensions Chrome, infra cloud. Bref, la tech, il ne se contente pas d'en parler : il la fait tourner.",
      "Les grands modèles de langage, il travaille avec tous les jours : ChatGPT, Claude, Gemini et consorts font partie de sa boîte à outils, pour le référencement sur Google comme sur les moteurs de réponse génératifs. De quoi nourrir directement la rubrique Décryptage & Concepts : comment fonctionnent les LLM, ce qu'ils font bien, et là où ils se plantent.",
      "Sur Techno Play, il fixe la ligne éditoriale, choisit les sujets et veille à ce que chaque guide, comparatif ou décryptage réponde à une vraie question, avec des infos vérifiées. Son critère, simple et sans pitié : un bon tuto se juge à une seule chose — est-ce que tu as réglé ton problème à la fin ?",
      "Quand il lâche le clavier, c'est souvent pour prendre sa guitare : Andrianina est aussi guitariste.",
      "Tu peux aussi suivre ses analyses tech et IA, en français et en anglais, sur LinkedIn, X et YouTube.",
    ],
    expertise: [
      "Développement web (WordPress, Next.js)",
      "SEO et GEO (référencement sur les moteurs génératifs)",
      "Intelligence artificielle et LLM",
      "Automatisation (Python, Node.js)",
      "Outils et infrastructures cloud",
    ],
    socials: [
      { label: "LinkedIn", url: "https://www.linkedin.com/in/andrianina-rabarivelo-81b160135/", icon: "linkedin" },
      { label: "X (Twitter)", url: "https://x.com/Rabarvl", icon: "twitter" },
      { label: "YouTube", url: "https://www.youtube.com/@andrianinarabarivelo2320", icon: "youtube" },
      { label: "Instagram", url: "https://www.instagram.com/mouta_rabary/", icon: "instagram" },
      { label: "Facebook", url: "https://www.facebook.com/andrianina.rabarivelo/", icon: "facebook" },
    ],
  },
  {
    slug: "felana-rabarivelo",
    name: "Felana RABARIVELO",
    initials: "FR",
    role: "Spécialiste beauté, mode & tech lifestyle",
    image: "/authors/felana-rabarivelo.jpg",
    shortBio:
      "Chez Techno Play, Felana RABARIVELO couvre la tech qui touche à la beauté, aux cosmétiques et à la mode : appareils de soin, objets connectés à porter, applis et tendances des réseaux. Son fil rouge : te dire si un gadget tient ses promesses au quotidien, au-delà de la jolie fiche produit.",
    bio: [
      "Felana RABARIVELO est spécialiste beauté, mode et tech lifestyle chez Techno Play. Sèche-cheveux et lisseurs dernier cri, appareils de soin du visage, brosses à dents connectées, montres et bijoux qui font aussi tracker d'activité : son terrain de jeu, c'est la tech qu'on porte sur soi ou qu'on utilise devant le miroir.",
      "Elle s'intéresse aussi à la façon dont TikTok et Instagram font et défont les tendances beauté et mode, et aux applis qui promettent de simplifier ta routine. Son angle : l'usage réel avant la fiche technique, avec une question qui revient toujours — est-ce que ça vaut vraiment le prix ?",
      "Tu peux suivre Felana sur Instagram, TikTok, Facebook et LinkedIn.",
    ],
    expertise: [
      "Beauté et cosmétiques",
      "Esthétique et appareils de soin",
      "Mode et accessoires connectés",
      "Tendances des réseaux sociaux (TikTok, Instagram)",
    ],
    socials: [
      { label: "Instagram", url: "https://www.instagram.com/rabaryvelo", icon: "instagram" },
      { label: "TikTok", url: "https://www.tiktok.com/@felana.rabaryvelo", icon: "tiktok" },
      { label: "LinkedIn", url: "https://www.linkedin.com/in/felana-rabarivelo-46b324145/", icon: "linkedin" },
      { label: "Facebook", url: "https://www.facebook.com/felana.rabaryvelo", icon: "facebook" },
    ],
  },
  {
    slug: "andee-rakotovao",
    name: "Andee RAKOTOVAO",
    initials: "AR",
    role: "Spécialiste design, jeux vidéo & création",
    image: "/authors/andee-rakotovao.jpg",
    shortBio:
      "Andee RAKOTOVAO couvre pour Techno Play le design, le graphisme, la photographie, le développement et les jeux vidéo. Écrans, PC, périphériques, logiciels de création : chaque produit est jugé sur ce qui compte quand on crée ou qu'on joue, pour t'aider à choisir sans payer pour du marketing.",
    bio: [
      "Andee RAKOTOVAO est spécialiste design, jeux vidéo et création chez Techno Play. Graphisme, photographie, développement, gaming : ces sujets ont un point commun, ils demandent du bon matériel et des outils bien choisis.",
      "Sur le site, Andee décortique les écrans, les composants PC, les périphériques et les innovations hardware, avec les critères qui comptent vraiment quand on retouche des photos, qu'on code ou qu'on enchaîne les parties. Les fiches techniques gonflées et le marketing « gamer » n'ont qu'à bien se tenir.",
      "Tu peux suivre Andee sur Instagram, TikTok, LinkedIn et Facebook.",
    ],
    expertise: [
      "Design et graphisme",
      "Photographie",
      "Développement",
      "Jeux vidéo et matériel gaming",
      "Écrans, PC et périphériques",
    ],
    socials: [
      { label: "Instagram", url: "https://www.instagram.com/the_wndrfl_mnstr/", icon: "instagram" },
      { label: "TikTok", url: "https://www.tiktok.com/@wndrfl_mnstr", icon: "tiktok" },
      { label: "LinkedIn", url: "https://www.linkedin.com/in/andee-rakotovao", icon: "linkedin" },
      { label: "Facebook", url: "https://www.facebook.com/andee.rakut", icon: "facebook" },
    ],
  },
  {
    slug: "mialy-andriaharisoa",
    name: "Mialy ANDRIAHARISOA",
    initials: "MA",
    role: "Spécialiste famille, cuisine & maison connectée",
    image: "/authors/mialy-andriaharisoa.jpg",
    shortBio:
      "Mialy ANDRIAHARISOA couvre pour Techno Play la tech du quotidien en famille : maison connectée, cuisine, couture, et tout ce qui concerne les enfants, des écrans au contrôle parental. Son critère : un appareil doit faire gagner du temps à la maison, pas en faire perdre.",
    bio: [
      "Mialy ANDRIAHARISOA est spécialiste famille, cuisine et maison connectée chez Techno Play. Maman et enfant, couture, cuisine : ses sujets de prédilection se vivent à la maison, là où la tech prend de plus en plus de place.",
      "Thermostats et objets connectés, robots de cuisine, machines à coudre, babyphones, contrôle parental, enfants et écrans : Mialy passe chaque sujet au filtre d'une question simple. Est-ce que ça facilite vraiment la vie d'une famille, ou est-ce un gadget de plus à recharger ?",
      "Tu peux suivre Mialy sur Facebook, TikTok et LinkedIn.",
    ],
    expertise: [
      "Maman et enfant (écrans, contrôle parental, puériculture connectée)",
      "Cuisine et électroménager",
      "Couture et machines à coudre",
      "Maison connectée",
    ],
    socials: [
      { label: "Facebook", url: "https://www.facebook.com/mialiniaina.andria.92", icon: "facebook" },
      { label: "TikTok", url: "https://www.tiktok.com/@miiiiaaaaly", icon: "tiktok" },
      { label: "LinkedIn", url: "https://www.linkedin.com/in/mialy-andriaharisoa/", icon: "linkedin" },
    ],
  },
  {
    slug: "nekena-judicael",
    name: "Nekena JUDICAËL",
    initials: "NJ",
    role: "Spécialiste tech & business",
    image: "/authors/nekena-judicael.jpg",
    shortBio:
      "Nekena JUDICAËL suit pour Techno Play l'actualité tech et ses coulisses business : annonces produits, mises à jour, stratégies des grandes marques, réseau et stockage. Son rôle : t'expliquer ce qui change vraiment pour toi derrière chaque annonce, sans recopier les communiqués.",
    bio: [
      "Nekena JUDICAËL est spécialiste tech et business chez Techno Play. Sa rubrique de prédilection : l'Actu Tech, des lancements de produits aux mises à jour logicielles, en passant par les stratégies des entreprises qui les fabriquent.",
      "Nekena couvre aussi le réseau, le stockage et la culture tech : l'histoire d'Internet, des grandes inventions et des entreprises qui ont façonné le numérique. Le fil rouge : relier chaque nouveauté à ce qu'elle change concrètement pour toi, ton budget ou ton travail.",
      "Tu peux suivre Nekena sur LinkedIn et Facebook.",
    ],
    expertise: [
      "Actualité tech et annonces produits",
      "Stratégie et business des entreprises tech",
      "Logiciels et mises à jour",
      "Réseau, Wi-Fi et stockage",
      "Histoire et culture tech",
    ],
    socials: [
      { label: "LinkedIn", url: "https://www.linkedin.com/in/nekena-judica%C3%ABl-8916802ba/", icon: "linkedin" },
      { label: "Facebook", url: "https://www.facebook.com/nekenajudi", icon: "facebook" },
    ],
  },
  {
    slug: "dina-rakotoarivelo",
    name: "Dina RAKOTOARIVELO",
    initials: "DR",
    role: "Spécialiste WordPress & intégration web",
    image: "/authors/dina-rakotoarivelo.jpg",
    shortBio:
      "Dina RAKOTOARIVELO couvre pour Techno Play la création de sites web : WordPress, thèmes, plugins, intégration HTML et CSS. Chaque tuto vise un site propre, rapide, qui s'affiche bien sur mobile et que tu sais modifier toi-même, sans passer par trois agences.",
    bio: [
      "Dina RAKOTOARIVELO est spécialiste WordPress et intégration HTML/CSS chez Techno Play. Son terrain : la création de sites web, du thème que tu installes en dix minutes à la page que tu codes ligne par ligne, plugins compris.",
      "Sur le site, Dina traduit le jargon du web en gestes concrets : choisir un thème, régler un plugin, corriger un affichage cassé sur mobile, comprendre ce que fait vraiment une ligne de CSS. Le fil rouge : un site propre, rapide, que tu sais faire évoluer sans appeler au secours.",
      "Tu peux suivre Dina sur LinkedIn et Facebook.",
    ],
    expertise: [
      "WordPress (thèmes et plugins)",
      "Intégration HTML et CSS",
      "Création de sites web",
      "Sites adaptés au mobile",
    ],
    socials: [
      { label: "LinkedIn", url: "https://www.linkedin.com/in/dina-henintsoa-rakotoarivelo", icon: "linkedin" },
      { label: "Facebook", url: "https://www.facebook.com/share/1EkxXgJAtC/", icon: "facebook" },
    ],
  },
];

export const DEFAULT_AUTHOR_SLUG = "andrianina-rabarivelo";

export function getAuthor(slug: string | undefined): Author | undefined {
  return AUTHORS.find((a) => a.slug === slug);
}

/**
 * Auteur d'un article : le slug du frontmatter s'il est connu, sinon le
 * rédacteur en chef. Accepte aussi le nom complet (« Andrianina
 * Rabarivelo ») pour tolérer un frontmatter écrit à la main.
 */
export function resolveAuthor(value: string | undefined): Author {
  const bySlug = getAuthor(value);
  if (bySlug) return bySlug;
  const byName = AUTHORS.find((a) => a.name.toLowerCase() === value?.trim().toLowerCase());
  return byName ?? (getAuthor(DEFAULT_AUTHOR_SLUG) as Author);
}

export function authorUrl(author: Author) {
  return `/auteur/${author.slug}/`;
}

/** Sous-catégories dont l'auteur est titulaire (lib/auteurs-specialites.json). */
export function authorSubcategories(author: Author): { section: Section; sub: Subcategory }[] {
  const categories = REGLES.categories as Record<string, string>;
  return ALL_SUBCATEGORIES.filter(({ sub }) => categories[sub.slug] === author.slug);
}
