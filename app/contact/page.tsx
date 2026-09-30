import type { Metadata } from "next";
import { SITE_NAME, CONTACT_EMAIL, FORMSPREE_FORM_ID } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contacter l'équipe ${SITE_NAME}.`,
  alternates: { canonical: "/contact/" },
};

// Formulaire 100% statique : POST direct vers Formspree (https://formspree.io),
// aucun backend/serverless requis — compatible avec l'export statique
// (next.config.ts, output: "export"). TODO avant publication : créer un
// compte Formspree gratuit, un formulaire, et remplacer FORMSPREE_FORM_ID
// dans lib/site.ts par l'ID réel (visible dans l'URL d'action fournie par
// Formspree). Tant que ce n'est pas fait, le formulaire ne délivre nulle
// part — testez une soumission après configuration.
export default function ContactPage() {
  const formConfigured = FORMSPREE_FORM_ID !== "YOUR_FORM_ID";

  return (
    <>
      <h1>Contact</h1>
      <p>
        Une question, une correction à signaler, une proposition ? Écrivez-nous
        via le formulaire ci-dessous, ou directement à{" "}
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
      </p>

      {!formConfigured && (
        <p className="empty-state">
          Formulaire pas encore configuré (FORMSPREE_FORM_ID est un
          placeholder dans lib/site.ts) — visible uniquement en développement,
          à corriger avant mise en ligne.
        </p>
      )}

      <form
        method="POST"
        action={`https://formspree.io/f/${FORMSPREE_FORM_ID}`}
        className="contact-form"
      >
        {/* Piège à bots — champ caché, convention Formspree */}
        <input type="text" name="_gotcha" style={{ display: "none" }} tabIndex={-1} autoComplete="off" />

        <label htmlFor="name">Nom</label>
        <input type="text" id="name" name="name" required />

        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" required />

        <label htmlFor="message">Message</label>
        <textarea id="message" name="message" rows={6} required />

        <button type="submit">Envoyer</button>
      </form>
    </>
  );
}
