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

// Éditeur du site : Anmira Studio (informations fournies par Andrianina le
// 2026-10-05). Source unique pour les mentions légales, la page contact,
// À propos, la politique de confidentialité, le pied de page et le JSON-LD.
// NIF et STAT : à renseigner dès qu'on les a — tant qu'ils sont vides, les
// lignes correspondantes n'apparaissent nulle part (ni page, ni JSON-LD).
export interface Horaire {
  jours: string;
  horaires: string;
  /** Pour le JSON-LD (OpeningHoursSpecification) ; absent = fermé. */
  schema?: { jours: string[]; ouvre: string; ferme: string };
}

export const COMPANY = {
  nom: "Anmira Studio",
  adresse: {
    rue: "Andranomanalina",
    ville: "Antananarivo",
    codePostal: "101",
    pays: "Madagascar",
    codePays: "MG",
  },
  telephone: "+261 34 29 917 88",
  nif: "",
  stat: "",
  horaires: [
    {
      jours: "Lundi au vendredi",
      horaires: "9h00 – 16h00",
      schema: {
        jours: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        ouvre: "09:00",
        ferme: "16:00",
      },
    },
    {
      jours: "Samedi",
      horaires: "8h00 – 12h00",
      schema: { jours: ["Saturday"], ouvre: "08:00", ferme: "12:00" },
    },
    { jours: "Dimanche", horaires: "Fermé" },
  ] as Horaire[],
};

export const COMPANY_ADDRESS = `${COMPANY.adresse.rue}, ${COMPANY.adresse.ville} ${COMPANY.adresse.codePostal}, ${COMPANY.adresse.pays}`;
export const COMPANY_PHONE_HREF = `tel:${COMPANY.telephone.replace(/\s+/g, "")}`;

// Marque autonome "Techno Play" (décision du 2026-09-30 — pages E-E-A-T pour
// limiter le risque des mises à jour anti-spam Google : identité vérifiable,
// contact réel, présence sociale). TOUT CE QUI SUIT EST UN PLACEHOLDER
// À REMPLACER avant mise en ligne réelle — voir README.md "À compléter
// avant publication".

// Pas d'email public (décision du 2026-10-05) : tout le monde passe par le
// formulaire de contact, ou par téléphone (COMPANY). La copie des messages
// dans la boîte d'Andrianina se règle dans Zoho CRM (règle de workflow sur
// la création d'un prospect) : l'adresse n'a rien à faire dans ce dépôt,
// qui est public.

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
  // Valeurs copiées telles quelles du code généré par Zoho CRM le 2026-10-05
  // (formulaire « Prospect Technoplay », centre de données crm.zoho.com).
  // Ce sont des identifiants de formulaire, pas des secrets : ils figurent
  // en clair dans le HTML de la page contact. Ne pas les modifier à la main.
  actionUrl: "https://crm.zoho.com/crm/WebToLeadForm",
  xnQsjsdp: "0618c72b947f5dad499a2caea89bbff797a4cbc7c12716b88c7c6e3b6d3f4e21",
  xmIwtLD: "577f5c42d889ee5c4fc7eb5fd34a501273e49751ddff50f869ae8f5f5510a66860fa73f61f2e6c742db07857d25a826a",
  actionType: "TGVhZHM=", // base64 de « Leads »
  // Champ-piège anti-spam de Zoho (base64 de « honeypot ») : caché, doit
  // rester vide — Zoho écarte les envois où il est rempli.
  honeypot: "aG9uZXlwb3Q",
  // Page affichée après soumission (returnURL), identique à celle déclarée
  // dans Zoho : page de remerciement app/contact/merci/ (le serveur ajoute
  // la barre finale par redirection).
  returnUrl: `${SITE_URL}/contact/merci`,
};

// Profils officiels du média : VIDE tant qu'aucun vrai compte n'existe (les
// handles @technoplay d'origine n'étaient que des placeholders, retirés le
// 2026-10-05 : un lien mort ou fictif nuit plus à la crédibilité qu'une
// absence). Ajouter ici un profil réel, `{ label, url }` : il apparaît alors
// dans « Nous suivre » du pied de page et dans le `sameAs` JSON-LD de
// l'organisation (lib/schema.ts). Ordre de priorité pour Google : fiche
// Google Business Profile / Maps d'Anmira Studio, page LinkedIn, chaîne
// YouTube (seulement si on y publie), puis Facebook et X.
export const SOCIAL_LINKS: { label: string; url: string }[] = [];

// Mentions légales : identité de l'éditeur (Anmira Studio) et de
// l'hébergeur. Aucune valeur inventée : la forme juridique n'a pas été
// communiquée, la ligne « Statut » n'existe donc pas ; NIF et STAT
// s'affichent dès qu'ils sont renseignés dans COMPANY.
export const LEGAL = {
  editeur_nom: COMPANY.nom,
  editeur_adresse: COMPANY_ADDRESS,
  editeur_telephone: COMPANY.telephone,
  directeur_publication: "Andrianina RABARIVELO",
  hebergeur_nom: "Vercel Inc.",
  // Adresse relevée le 2026-10-05 dans la section « Contact Us » de
  // vercel.com/legal/privacy-policy (l'ancienne adresse, issue d'un
  // annuaire tiers, n'y figure plus).
  hebergeur_adresse: "440 N Barranca Avenue #4133, Covina, CA 91723, États-Unis",
};
