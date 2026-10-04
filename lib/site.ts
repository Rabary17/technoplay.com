// Constantes du site — seule source de vérité pour le nom/l'URL/la
// description, réutilisée par les métadonnées, le JSON-LD et le sitemap.
// Même principe que lib/site.ts sur monauto/Techcars.
export const SITE_URL = "https://techno-play.com";
export const SITE_NAME = "Techno Play";
export const SITE_DESCRIPTION =
  "Techno Play — tutos et solutions de dépannage, comparatifs d'achat, décryptages de l'IA et actualité tech, expliqués simplement.";
// Locale par défaut du site (balises lang, Open Graph). À changer si le
// site n'est finalement pas francophone.
export const SITE_LOCALE = "fr_FR";
export const SITE_LANG = "fr";

// Marque autonome "Techno Play" (décision du 2026-09-30 — pages E-E-A-T pour
// limiter le risque des mises à jour anti-spam Google : identité vérifiable,
// contact réel, présence sociale). TOUT CE QUI SUIT EST UN PLACEHOLDER
// À REMPLACER avant mise en ligne réelle — voir README.md "À compléter
// avant publication".

// Email affiché sur /contact (indépendamment du formulaire Zoho CRM, pour
// les gens qui préfèrent écrire directement).
export const CONTACT_EMAIL = "contact@techno-play.com"; // TODO : vraie adresse

// Zoho CRM — formulaire "Web-to-Lead" (décision du 2026-09-30, remplace
// Formspree) : POST direct depuis une page statique vers Zoho, sans backend
// — chaque soumission crée un prospect (Lead) directement dans le CRM.
// Marche à suivre dans Zoho CRM : Configuration (⚙) > Canaux > Formulaires
// web (Webforms) > module Prospects (Leads) > Nouveau formulaire. Zoho
// génère alors un extrait HTML contenant le vrai domaine d'action (selon le
// centre de données du compte : crm.zoho.com / .eu / .in / .com.cn / ...)
// et trois champs cachés obligatoires — sa propre documentation prévient
// que le formulaire cesse de fonctionner s'ils sont retirés ou modifiés.
// Copier ces valeurs TELLES QUELLES depuis le code généré par Zoho : elles
// sont propres à ce formulaire/cette organisation et ne peuvent pas être
// devinées ni réutilisées d'un autre compte.
export const ZOHO_WEBFORM = {
  actionUrl: "https://crm.zoho.com/crm/WebToLeadForm", // TODO : confirmer le domaine (centre de données) donné par Zoho
  xnQsjsdp: "TODO — coller la valeur exacte fournie par Zoho CRM",
  xmIwtLD: "TODO — coller la valeur exacte fournie par Zoho CRM",
  actionType: "TODO — coller la valeur exacte fournie par Zoho CRM",
  // Page affichée après soumission — Zoho l'exige (returnURL). Peut rester
  // sur /contact/ tant qu'il n'y a pas de page de remerciement dédiée.
  returnUrl: `${SITE_URL}/contact/`,
};

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
