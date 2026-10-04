// Photos de l'accueil — libres de droits (licence Unsplash : usage gratuit,
// commercial compris, sans attribution obligatoire ; on crédite quand même
// les photographes en bas de page, c'est la bonne pratique demandée par
// Unsplash). Fichiers optimisés en WebP sous public/images/accueil/, en
// deux largeurs : 1920 px (Full HD) et 960 px, servies via srcset.
// Relevé des licences : 2026-10-03 (chaque page photo indiquait « Free to
// use under the Unsplash License », aucune image Unsplash+).
export interface PhotoAccueil {
  /** Chemin sans suffixe : `${base}-1920.webp` et `${base}-960.webp`. */
  base: string;
  /** Dimensions du fichier 1920 px (ratio réel, pour éviter le CLS). */
  width: number;
  height: number;
  alt: string;
  auteur: string;
  /** Profil du photographe sur Unsplash. */
  profil: string;
  /** Page de la photo sur Unsplash. */
  page: string;
}

const UTM = "?utm_source=techno_play&utm_medium=referral";

export const PHOTOS_ACCUEIL = {
  hero: {
    base: "/images/accueil/hero-realite-virtuelle",
    width: 1920,
    height: 2663,
    alt: "Joueur de dos, casque de réalité virtuelle sur la tête et manettes lumineuses levées, sous une lumière bleue et violette",
    auteur: "David Dvořáček",
    profil: `https://unsplash.com/@dafidvor${UTM}`,
    page: "https://unsplash.com/photos/GLgjpN4MWaw",
  },
  guides: {
    base: "/images/accueil/guides-reglages-smartphone",
    width: 1920,
    height: 1080,
    alt: "Main tenant un smartphone ouvert sur le panneau des réglages rapides",
    auteur: "Amanz",
    profil: `https://unsplash.com/@amanz${UTM}`,
    page: "https://unsplash.com/photos/4EpPq-bgh80",
  },
  comparatifs: {
    base: "/images/accueil/comparatifs-casque",
    width: 1920,
    height: 1280,
    alt: "Casque audio sans fil noir posé sur un fond jaune vif",
    auteur: "C D-X",
    profil: `https://unsplash.com/@cdx2${UTM}`,
    page: "https://unsplash.com/photos/oBI4NBP2Lhg",
  },
  decryptage: {
    base: "/images/accueil/decryptage-robot",
    width: 1920,
    height: 2560,
    alt: "Robot humanoïde au visage réaliste et au corps mécanique apparent",
    auteur: "Franck V.",
    profil: `https://unsplash.com/@possessedphotography${UTM}`,
    page: "https://unsplash.com/photos/YKW0JjP7rlU",
  },
  actu: {
    base: "/images/accueil/actu-circuit-lumineux",
    width: 1920,
    height: 1281,
    alt: "Panneau de circuit électronique illuminé en bleu dans la pénombre",
    auteur: "Adi Goldstein",
    profil: `https://unsplash.com/@adigold1${UTM}`,
    page: "https://unsplash.com/photos/EUsVwEOsblE",
  },
  marque: {
    base: "/images/accueil/marque-manette",
    width: 1920,
    height: 2560,
    alt: "Manette de jeu blanche posée sur un fond bleu",
    auteur: "Igor Karimov",
    profil: `https://unsplash.com/@ingvar_erik${UTM}`,
    page: "https://unsplash.com/photos/GOIrALkIZY4",
  },
  methode: {
    base: "/images/accueil/methode-bureau",
    width: 1920,
    height: 2560,
    alt: "Bureau de télétravail avec écran, casque audio et accessoires bien rangés",
    auteur: "Matúš Gocman",
    profil: `https://unsplash.com/@matgocman${UTM}`,
    page: "https://unsplash.com/photos/bZ7Qbo_C-P0",
  },
  cta: {
    base: "/images/accueil/cta-circuit",
    width: 1920,
    height: 1080,
    alt: "",
    auteur: "Yogesh Phuyal",
    profil: `https://unsplash.com/@yogeshppl${UTM}`,
    page: "https://unsplash.com/photos/mjwGKmwkDDA",
  },
} satisfies Record<string, PhotoAccueil>;

/** Bento « tendances » de l'accueil (drones, IA, VR, robots…), ajouté le 2026-10-03. */
export const PHOTOS_TENDANCES = {
  ia: {
    base: "/images/accueil/tendance-ia",
    width: 1920,
    height: 1080,
    alt: "Lettres « AI » en relief sur une puce électronique parcourue de lignes de lumière bleue",
    auteur: "Roman Budnikov",
    profil: `https://unsplash.com/@prestige666${UTM}`,
    page: "https://unsplash.com/photos/LrmVfNfhFOw",
  },
  drone: {
    base: "/images/accueil/tendance-drone",
    width: 1920,
    height: 2401,
    alt: "Drone grand public en vol stationnaire dans un ciel bleu",
    auteur: "Yitzhak Rodriguez",
    profil: `https://unsplash.com/@yitzhakrodriguez${UTM}`,
    page: "https://unsplash.com/photos/mVI7sD0nTlA",
  },
  vr: {
    base: "/images/accueil/tendance-realite-virtuelle",
    width: 1920,
    height: 1280,
    alt: "Casque de réalité virtuelle blanc éclairé de reflets roses et bleus",
    auteur: "Remy Gieling",
    profil: `https://unsplash.com/@gieling${UTM}`,
    page: "https://unsplash.com/photos/Zf0mPf4lG-U",
  },
  robot: {
    base: "/images/accueil/tendance-robot",
    width: 1920,
    height: 1280,
    alt: "Robot quadrupède jaune vu de face dans la pénombre",
    auteur: "Mika Baumeister",
    profil: `https://unsplash.com/@kommumikation${UTM}`,
    page: "https://unsplash.com/photos/NnYbRvZUi9A",
  },
  montre: {
    base: "/images/accueil/tendance-montre",
    width: 1920,
    height: 1080,
    alt: "Montre connectée au poignet, cadran allumé",
    auteur: "Daniel Romero",
    profil: `https://unsplash.com/@rmrdnl${UTM}`,
    page: "https://unsplash.com/photos/eX2wDKGHN10",
  },
  maison: {
    base: "/images/accueil/tendance-maison",
    width: 1920,
    height: 1280,
    alt: "Enceinte connectée posée à côté d'un smartphone sur un meuble en bois",
    auteur: "User_Pascal",
    profil: `https://unsplash.com/@user_pascal${UTM}`,
    page: "https://unsplash.com/photos/XMP-MxyDD1k",
  },
  cyber: {
    base: "/images/accueil/tendance-cyber",
    width: 1920,
    height: 1281,
    alt: "Cadenas rouge posé sur un clavier d'ordinateur rétroéclairé en vert",
    auteur: "FlyD",
    profil: `https://unsplash.com/@flyd2069${UTM}`,
    page: "https://unsplash.com/photos/mT7lXZPjk7U",
  },
  gaming: {
    base: "/images/accueil/tendance-gaming",
    width: 1920,
    height: 1280,
    alt: "Manette de jeu sombre aux accents turquoise sur un fond jaune vif",
    auteur: "Pasqualino Capobianco",
    profil: `https://unsplash.com/@photoloni${UTM}`,
    page: "https://unsplash.com/photos/yLX-ZLNBJGg",
  },
} satisfies Record<string, PhotoAccueil>;

export const UNSPLASH_URL = `https://unsplash.com/${UTM}`;

/** Attributs <img> responsive (srcset 960/1920) pour une photo de l'accueil. */
export function imgProps(photo: PhotoAccueil, sizes: string) {
  return {
    src: `${photo.base}-1920.webp`,
    srcSet: `${photo.base}-960.webp 960w, ${photo.base}-1920.webp 1920w`,
    sizes,
    width: photo.width,
    height: photo.height,
    alt: photo.alt,
  };
}
