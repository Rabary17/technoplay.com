// Constantes du site — seule source de vérité pour le nom/l'URL/la
// description, réutilisée par les métadonnées, le JSON-LD et le sitemap.
// Même principe que lib/site.ts sur monauto/Techcars.
export const SITE_URL = "https://techno-play.com";

// Google Analytics 4 (mesure d'audience) — ajouté le 2026-10-13. Le script
// n'est chargé qu'en production (app/layout.tsx), jamais en `npm run dev`.
// Vide = aucune mesure. La politique de confidentialité
// (app/confidentialite/page.tsx) décrit cet outil : à garder en phase.
export const GA_MEASUREMENT_ID = "G-Y3N6GMWV1F";
export const SITE_NAME = "Techno Play";
export const SITE_DESCRIPTION =
  "Techno Play — le QG des débutants en tech : IA, robotique, maison connectée, programmation, appareils et sécurité, expliqués simplement avec des exemples concrets.";
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

// Profils officiels du média (jamais de lien fictif : les handles @technoplay
// d'origine n'étaient que des placeholders, retirés le 2026-10-05 — un lien
// mort nuit plus à la crédibilité qu'une absence). Chaque profil réel ajouté
// ici, `{ label, url }`, apparaît dans « Nous suivre » du pied de page, sur
// la page À propos et dans le `sameAs` JSON-LD de l'organisation (lib/schema.ts),
// y compris celle qui figure en `publisher` des articles et en `worksFor`
// des auteurs. Page LinkedIn ajoutée le 2026-10-07. Ordre de priorité pour
// Google : fiche Google Business Profile / Maps d'Anmira Studio, page
// LinkedIn, chaîne YouTube (seulement si on y publie), puis Facebook et X.
export const SOCIAL_LINKS: { label: string; url: string }[] = [
  { label: "LinkedIn", url: "https://www.linkedin.com/company/techno-play-com/" },
];

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

// Envoi des formulaires (contact et newsletter) : le navigateur appelle la
// fonction serverless api/lead.js, qui crée le prospect dans Zoho CRM via
// son API. Les identifiants Zoho ne sont jamais dans ce dépôt : ils sont
// dans les variables d'environnement du projet Vercel (voir .env.example).
export const LEAD_ENDPOINT = process.env.NEXT_PUBLIC_LEAD_ENDPOINT || "/api/lead";
