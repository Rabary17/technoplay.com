// Constantes du site — seule source de vérité pour le nom/l'URL/la
// description, réutilisée par les métadonnées, le JSON-LD et le sitemap.
// Même principe que lib/site.ts sur monauto/Techcars.
export const SITE_URL = "https://techno-play.com";
export const SITE_NAME = "Techno Play";
export const SITE_DESCRIPTION =
  "Techno Play — actualités, tests et décryptages tech.";
// Locale par défaut du site (balises lang, Open Graph). À changer si le
// site n'est finalement pas francophone.
export const SITE_LOCALE = "fr_FR";
export const SITE_LANG = "fr";

// Marque autonome "Techno Play" (décision du 2026-09-30 — pages E-E-A-T pour
// limiter le risque des mises à jour anti-spam Google : identité vérifiable,
// contact réel, présence sociale). TOUT CE QUI SUIT EST UN PLACEHOLDER
// À REMPLACER avant mise en ligne réelle — voir README.md "À compléter
// avant publication".

// Email affiché sur /contact (indépamment du formulaire Formspree, pour les
// gens qui préfèrent écrire directement).
export const CONTACT_EMAIL = "contact@techno-play.com"; // TODO : vraie adresse

// Formspree (https://formspree.io) : compte gratuit, aucun backend requis —
// reste compatible avec l'export statique. Remplacer par l'ID réel une fois
// le compte créé (Formspree → New Form → copier l'ID dans l'URL d'action).
export const FORMSPREE_FORM_ID = "YOUR_FORM_ID"; // TODO

// Réseaux sociaux retenus (décision du 2026-09-30) : X et YouTube. Remplacer
// les URLs par les vrais profils une fois créés — alimente aussi le JSON-LD
// `sameAs` de l'organisation (lib/schema.ts), signal E-E-A-T reconnu par
// Google (cohérence entre le site et une présence externe vérifiable).
export const SOCIAL_LINKS = [
  { label: "X (Twitter)", url: "https://x.com/technoplay" }, // TODO : vrai handle
  { label: "YouTube", url: "https://youtube.com/@technoplay" }, // TODO : vrai handle
];

// Mentions légales — France (LCEN art. 6-III) : identité de l'éditeur
// obligatoire. AUCUNE valeur inventée ici volontairement — à remplir avec
// les vraies informations avant publication (voir README.md).
export const LEGAL = {
  editeur_nom: "TODO — nom de la structure ou de la personne éditrice",
  editeur_statut: "TODO — ex. auto-entrepreneur / SASU Publithings / ...",
  editeur_adresse: "TODO — adresse (ou ville, a minima, si personne physique)",
  editeur_siret: "TODO — si applicable (société/auto-entrepreneur)",
  directeur_publication: "TODO — nom du directeur de la publication",
  hebergeur_nom: "Vercel Inc.",
  // Adresse trouvée par recherche publique (opengovny.com), à reconfirmer sur
  // vercel.com/legal/privacy-policy avant publication — jamais republier une
  // adresse d'hébergeur sans l'avoir vérifiée sur la source officielle.
  hebergeur_adresse: "650 California St., Floor 7, San Francisco, CA 94108, États-Unis (À VÉRIFIER sur vercel.com/legal)",
};
