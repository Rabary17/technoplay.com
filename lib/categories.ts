// Arborescence éditoriale du site (structure validée le 2026-10-02) :
// textes rédigés selon la charte de ton (tutoiement, ton direct — voir la
// doc projet « Charte de ton »).
// 4 rubriques, chacune découpée en sous-catégories. Source de vérité
// unique, réutilisée par :
//   - le menu principal et le pied de page (app/layout.tsx) ;
//   - les pages hub de rubrique (/<rubrique>/) et de sous-catégorie
//     (/<rubrique>/<sous-categorie>/) — voir app/[slug]/ ;
//   - le frontmatter des articles : champ `category` = slug d'une
//     SOUS-CATÉGORIE (ex. "windows-mac"), la rubrique parente en est déduite ;
//   - scripts/generate-covers.js pour les visuels de secours.
// Ajouter une sous-catégorie ici suffit à la faire apparaître partout
// (penser à relancer `npm run generate-covers` pour son visuel).
//
// `seoTarget` = cible de mots-clés interne (brief de l'étude de mots-clés),
// jamais affichée sur le site.
import type { IconName } from "@/components/Icon";

export type SectionSlug =
  | "guides-tutos"
  | "comparatifs-achats"
  | "decryptage-concepts"
  | "actu-tech";

export type SubcategorySlug =
  // Guides & Tutos
  | "windows-mac"
  | "android-ios"
  | "reseau-stockage"
  | "securite-vpn"
  // Comparatifs & Achats
  | "materiel-pc-composants"
  | "peripheriques-ecrans"
  | "audio-mobilite"
  | "domotique-maison-connectee"
  // Décryptage & Concepts
  | "intelligence-artificielle"
  | "hardware-innovation"
  | "culture-tech"
  // Actu Tech
  | "annonces-produits"
  | "cyberattaques-failles"
  | "logiciels-mises-a-jour";

export interface Subcategory {
  slug: SubcategorySlug;
  title: string;
  icon: IconName;
  /** Une à deux phrases affichées sur la page hub et la page de la sous-catégorie. */
  body: string;
  /** Cible SEO interne — brief pour l'étude de mots-clés, non affichée. */
  seoTarget: string;
}

export interface Section {
  slug: SectionSlug;
  title: string;
  /** Libellé court pour le menu et les étiquettes. */
  short: string;
  icon: IconName;
  /** Phrase d'accroche (meta description, cartes). */
  description: string;
  /** Paragraphe de présentation (page hub + accueil). */
  body: string;
  subcategories: Subcategory[];
}

export const SECTIONS: Section[] = [
  {
    slug: "guides-tutos",
    title: "Guides & Tutos",
    short: "Guides & Tutos",
    icon: "wrench",
    description:
      "Tutos pas à pas et solutions de dépannage pour Windows, Mac, Android, iOS, ton réseau et ta sécurité.",
    body: "Un bug qui revient, un réglage introuvable, une sauvegarde à mettre en place ? Ici, chaque guide part d'une question précise et va droit au but : étapes numérotées, captures quand elles aident, et un plan B si la première méthode ne marche pas chez toi.",
    subcategories: [
      {
        slug: "windows-mac",
        title: "Windows & Mac",
        icon: "laptop",
        body: "Booste ton ordi, règle les bugs les plus courants et gagne du temps au quotidien sur Windows 11 et macOS.",
        seoTarget: "optimisation OS, astuces productivité, résolution bugs",
      },
      {
        slug: "android-ios",
        title: "Android & iOS",
        icon: "smartphone",
        body: "Sauvegardes, transferts, autonomie, réglages cachés : tire le meilleur de ton smartphone, iPhone ou Android.",
        seoTarget: "tutoriels applications, sauvegardes, astuces batterie",
      },
      {
        slug: "reseau-stockage",
        title: "Réseau & Stockage",
        icon: "router",
        body: "Wi-Fi qui décroche, box à paramétrer, NAS à installer : des guides clairs pour un réseau qui tient la route et des données bien rangées.",
        seoTarget: "routeurs wi-fi, installation NAS, sécurité box",
      },
      {
        slug: "securite-vpn",
        title: "Sécurité & VPN",
        icon: "shield-check",
        body: "Virer un malware, choisir un gestionnaire de mots de passe, protéger ta vie privée en ligne : la sécurité sans parano ni jargon.",
        seoTarget: "suppression malwares, gestionnaires mots de passe, vie privée",
      },
    ],
  },
  {
    slug: "comparatifs-achats",
    title: "Comparatifs & Achats",
    short: "Comparatifs",
    icon: "scale",
    description:
      "Guides d'achat et comparatifs pour choisir ton matériel PC, tes périphériques, ton audio et ta domotique selon ton usage et ton budget.",
    body: "Avant d'acheter, la vraie question n'est pas « quel est le meilleur produit ? » mais « quel est le bon produit pour moi ? ». Nos comparatifs partent de ton usage et de ton budget, séparent les critères qui comptent vraiment du blabla marketing… et n'hésitent pas à te dire quand un produit ne vaut pas son prix.",
    subcategories: [
      {
        slug: "materiel-pc-composants",
        title: "Matériel PC & Composants",
        icon: "cpu",
        body: "Cartes graphiques, processeurs, SSD, configs complètes : choisis les bons composants pour monter ou upgrader ton PC, sans payer pour des perfs dont tu n'as pas besoin.",
        seoTarget: "cartes graphiques, processeurs, SSD, config PC",
      },
      {
        slug: "peripheriques-ecrans",
        title: "Périphériques & Écrans",
        icon: "monitor",
        body: "Souris, claviers mécaniques, écrans : les critères qui font vraiment la différence à l'usage, pour bosser comme pour jouer.",
        seoTarget: "souris gaming, claviers mécaniques, moniteurs vidéo",
      },
      {
        slug: "audio-mobilite",
        title: "Audio & Mobilité",
        icon: "headphones",
        body: "Casques à réduction de bruit, écouteurs sans fil, batteries externes : de quoi t'équiper pour les trajets, le télétravail et les voyages.",
        seoTarget: "casques réduction bruit, écouteurs sans fil, batteries externes",
      },
      {
        slug: "domotique-maison-connectee",
        title: "Domotique & Maison connectée",
        icon: "house",
        body: "Caméras, ampoules connectées, assistants vocaux : construis une maison connectée vraiment utile, compatible… et qui respecte ta vie privée.",
        seoTarget: "caméras surveillance, ampoules connectées, assistants vocaux",
      },
    ],
  },
  {
    slug: "decryptage-concepts",
    title: "Décryptage & Concepts",
    short: "Décryptages",
    icon: "lightbulb",
    description:
      "IA, hardware et culture tech expliqués simplement : comprends enfin comment marchent les technologies que tu utilises tous les jours.",
    body: "Comment un LLM « réfléchit »-il ? Pourquoi une puce ARM consomme-t-elle moins qu'une puce x86 ? Ici, on prend le temps d'expliquer ce qu'il y a sous le capot, avec des analogies simples et des schémas, pour que tu te fasses ton propre avis au lieu de répéter des slogans.",
    subcategories: [
      {
        slug: "intelligence-artificielle",
        title: "Intelligence artificielle",
        icon: "brain-circuit",
        body: "Comprendre les LLM, écrire des prompts qui marchent, démêler le jargon de l'IA : l'intelligence artificielle sans fantasme ni poudre aux yeux.",
        seoTarget: "comprendre les LLM, prompts efficaces, lexique IA",
      },
      {
        slug: "hardware-innovation",
        title: "Hardware & Innovation",
        icon: "circuit-board",
        body: "Chiffrement, puces ARM contre x86, nouvelles technos d'écran ou de batterie : ce qui se passe vraiment sous le capot.",
        seoTarget: "fonctionnement chiffrement, architectures puces ARM vs x86",
      },
      {
        slug: "culture-tech",
        title: "Culture Tech",
        icon: "history",
        body: "L'histoire des grandes marques, les coulisses du web, l'impact environnemental du numérique : la tech racontée autrement.",
        seoTarget: "histoire des marques, coulisses du web, impact environnemental numérique",
      },
    ],
  },
  {
    slug: "actu-tech",
    title: "Actu Tech",
    short: "Actu",
    icon: "newspaper",
    description:
      "L'actu tech qui te concerne vraiment : lancements de produits, alertes de sécurité et nouveautés des logiciels que tu utilises.",
    body: "Toutes les annonces ne se valent pas. On suit l'actu tech avec un filtre simple : qu'est-ce que ça change concrètement pour toi ? Lancements majeurs, failles à corriger d'urgence, mises à jour qui bousculent tes habitudes — l'essentiel, vérifié, sans emballement.",
    subcategories: [
      {
        slug: "annonces-produits",
        title: "Annonces & Produits",
        icon: "rocket",
        body: "Les lancements majeurs d'Apple, Google, Nvidia, Microsoft et des autres acteurs qui comptent, résumés et remis en perspective : la hype, mais filtrée.",
        seoTarget: "lancements majeurs Apple, Google, Nvidia, Microsoft",
      },
      {
        slug: "cyberattaques-failles",
        title: "Cyberattaques & Failles",
        icon: "shield-alert",
        body: "Les alertes de sécurité qui touchent le grand public, et surtout les bons réflexes à adopter tout de suite pour te protéger.",
        seoTarget: "alertes sécurité grand public, correctifs immédiats",
      },
      {
        slug: "logiciels-mises-a-jour",
        title: "Logiciels & Mises à jour",
        icon: "refresh-cw",
        body: "Nouvelles fonctions et mises à jour des applis populaires : ce qui change, et comment en profiter.",
        seoTarget: "nouveautés applications populaires, nouvelles fonctionnalités",
      },
    ],
  },
];

export const ALL_SUBCATEGORIES: { section: Section; sub: Subcategory }[] =
  SECTIONS.flatMap((section) => section.subcategories.map((sub) => ({ section, sub })));

export function getSection(slug: string | undefined): Section | undefined {
  return SECTIONS.find((s) => s.slug === slug);
}

export function getSubcategory(
  slug: string | undefined
): { section: Section; sub: Subcategory } | undefined {
  return ALL_SUBCATEGORIES.find((entry) => entry.sub.slug === slug);
}

/**
 * Résout le champ `category` d'un article : slug de sous-catégorie
 * (cas normal) ou, à défaut, slug de rubrique. Renvoie la rubrique et,
 * si elle est connue, la sous-catégorie.
 */
export function resolveCategory(
  slug: string | undefined
): { section: Section; sub?: Subcategory } | undefined {
  const entry = getSubcategory(slug);
  if (entry) return entry;
  const section = getSection(slug);
  return section ? { section } : undefined;
}

export function sectionUrl(section: Section) {
  return `/${section.slug}/`;
}

export function subcategoryUrl(section: Section, sub: Subcategory) {
  return `/${section.slug}/${sub.slug}/`;
}
