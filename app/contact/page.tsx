import type { Metadata } from "next";
import { SITE_NAME, CONTACT_EMAIL, ZOHO_WEBFORM, COMPANY } from "@/lib/site";
import CompanyDetails from "@/components/CompanyDetails";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contacter l'équipe ${SITE_NAME}.`,
  alternates: { canonical: "/contact/" },
};

// Formulaire 100% statique : POST direct vers Zoho CRM (Web-to-Lead),
// aucun backend/serverless requis — compatible avec l'export statique
// (next.config.ts, output: "export"). Chaque soumission crée un prospect
// dans le module Prospects (Leads) du CRM. TODO avant publication : générer
// le vrai formulaire dans Zoho CRM (Configuration > Canaux > Formulaires
// web > Prospects > Nouveau formulaire) et reporter les valeurs exactes
// qu'il fournit dans ZOHO_WEBFORM (lib/site.ts) — action, xnQsjsdp,
// xmIwtLD, actionType. Ne jamais modifier ces trois champs cachés une fois
// collés : Zoho prévient explicitement que le formulaire cesse de
// fonctionner s'ils sont altérés. Vérifiez aussi que les attributs `name`
// des champs visibles ci-dessous (Last Name, Email, Description)
// correspondent aux noms d'API du formulaire tel que généré par votre
// compte — un layout Leads personnalisé peut les renommer.
export default function ContactPage() {
  const formConfigured =
    !ZOHO_WEBFORM.xnQsjsdp.startsWith("TODO") &&
    !ZOHO_WEBFORM.xmIwtLD.startsWith("TODO") &&
    !ZOHO_WEBFORM.actionType.startsWith("TODO");

  return (
    <div className="page">
      <h1>Contact</h1>
      <p>
        Une question, une coquille à signaler, un sujet à proposer ? Écris-nous
        via le formulaire ci-dessous, ou directement à{" "}
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
      </p>

      {!formConfigured && (
        <p className="empty-state">
          Formulaire pas encore configuré (ZOHO_WEBFORM contient encore des
          valeurs TODO dans lib/site.ts) — visible uniquement en
          développement, à corriger avant mise en ligne.
        </p>
      )}

      <form method="POST" action={ZOHO_WEBFORM.actionUrl} className="contact-form">
        {/* Champs requis par Zoho CRM — ne pas renommer ni retirer. */}
        <input type="hidden" name="xnQsjsdp" value={ZOHO_WEBFORM.xnQsjsdp} />
        <input type="hidden" name="xmIwtLD" value={ZOHO_WEBFORM.xmIwtLD} />
        <input type="hidden" name="actionType" value={ZOHO_WEBFORM.actionType} />
        <input type="hidden" name="returnURL" value={ZOHO_WEBFORM.returnUrl} />

        <label htmlFor="lastName">Nom</label>
        <input type="text" id="lastName" name="Last Name" required />

        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="Email" required />

        <label htmlFor="message">Message</label>
        <textarea id="message" name="Description" rows={6} required />

        <button type="submit" className="btn btn--primary">
          Envoyer
        </button>
      </form>

      <h2>Coordonnées de l&apos;éditeur</h2>
      <p>
        {SITE_NAME} est édité par {COMPANY.nom}, à Antananarivo (Madagascar).
        Tu peux aussi nous joindre par téléphone aux horaires ci-dessous.
      </p>
      <CompanyDetails />
    </div>
  );
}
