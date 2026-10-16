import { ZOHO_NEWSLETTER } from "@/lib/site";

// Abonnement à la newsletter : POST direct vers Zoho CRM (Web-to-Lead),
// même principe que le formulaire de contact (app/contact/page.tsx), donc
// compatible avec l'export statique. Le consentement est explicite (case à
// cocher non pré-remplie). Le double opt-in se règle dans Zoho Campaigns.
export default function NewsletterForm({ id = "newsletter" }: { id?: string }) {
  const configure =
    !ZOHO_NEWSLETTER.xnQsjsdp.startsWith("TODO") &&
    !ZOHO_NEWSLETTER.xmIwtLD.startsWith("TODO") &&
    !ZOHO_NEWSLETTER.actionType.startsWith("TODO");

  if (!configure) {
    return (
      <p className="empty-state">
        L’abonnement à la newsletter arrive très bientôt.
      </p>
    );
  }

  return (
    <form id={id} method="POST" action={ZOHO_NEWSLETTER.actionUrl} acceptCharset="UTF-8" className="contact-form">
      <input type="hidden" name="xnQsjsdp" value={ZOHO_NEWSLETTER.xnQsjsdp} />
      <input type="hidden" name="xmIwtLD" value={ZOHO_NEWSLETTER.xmIwtLD} />
      <input type="hidden" name="actionType" value={ZOHO_NEWSLETTER.actionType} />
      <input type="hidden" name="returnURL" value={ZOHO_NEWSLETTER.returnUrl} />
      <input type="hidden" name="Lead Source" value="Newsletter Techno Play" />
      <input
        type="text"
        name={ZOHO_NEWSLETTER.honeypot}
        defaultValue=""
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{ display: "none" }}
      />

      <label htmlFor={`${id}-prenom`}>Prénom</label>
      <input type="text" id={`${id}-prenom`} name="Last Name" autoComplete="given-name" maxLength={80} required />

      <label htmlFor={`${id}-email`}>Email</label>
      <input type="email" id={`${id}-email`} name="Email" autoComplete="email" maxLength={100} required />

      <label className="checkbox-row">
        <input type="checkbox" name="Newsletter Consent" value="oui" required />
        <span>
          Je veux recevoir les actualités de Techno Play par email. Je peux me désinscrire à tout moment.
        </span>
      </label>

      <button type="submit" className="btn btn--primary">
        Je m’abonne
      </button>
      <p className="contact-form__note">
        Tes données servent uniquement à t’envoyer la newsletter. Détails dans la{" "}
        <a href="/confidentialite/">politique de confidentialité</a>.
      </p>
    </form>
  );
}
