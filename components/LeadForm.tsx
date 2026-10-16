"use client";

import { useState, type FormEvent } from "react";
import { LEAD_ENDPOINT } from "@/lib/site";

// Formulaire unique (contact ou newsletter), dessiné par le site lui-même.
// L'envoi passe par la fonction api/lead.js, qui crée le prospect dans Zoho
// CRM via l'API. Le champ `website` est un piège anti-spam, caché et vide.
type Kind = "contact" | "newsletter";

export default function LeadForm({ kind, id }: { kind: Kind; id: string }) {
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const payload = {
      kind,
      lastName: String(data.get("lastName") || ""),
      email: String(data.get("email") || ""),
      message: String(data.get("message") || ""),
      consent: data.get("consent") === "oui",
      website: String(data.get("website") || ""),
    };
    setStatus("sending");
    try {
      const res = await fetch(LEAD_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json().catch(() => ({ ok: false }));
      if (!res.ok || !json.ok) throw new Error("send_failed");
      if (kind === "contact") {
        window.location.assign("/contact/merci/");
      } else {
        setStatus("ok");
        form.reset();
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "ok" && kind === "newsletter") {
    return <p className="contact-form__note">Merci ! Ton inscription est bien enregistrée.</p>;
  }

  const sending = status === "sending";

  return (
    <form id={id} onSubmit={onSubmit} noValidate={false} className="contact-form">
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        defaultValue=""
        style={{ display: "none" }}
      />

      <label htmlFor={`${id}-nom`}>{kind === "contact" ? "Nom" : "Prénom"}</label>
      <input type="text" id={`${id}-nom`} name="lastName" autoComplete="given-name" maxLength={80} required />

      <label htmlFor={`${id}-email`}>Email</label>
      <input type="email" id={`${id}-email`} name="email" autoComplete="email" maxLength={100} required />

      {kind === "contact" ? (
        <>
          <label htmlFor={`${id}-message`}>Message</label>
          <textarea id={`${id}-message`} name="message" rows={6} maxLength={2000} required />
        </>
      ) : (
        <label className="checkbox-row">
          <input type="checkbox" name="consent" value="oui" required />
          <span>
            Je veux recevoir les actualités de Techno Play par email. Je peux me désinscrire à tout moment.
          </span>
        </label>
      )}

      <button type="submit" className="btn btn--primary" disabled={sending}>
        {kind === "contact" ? (sending ? "Envoi…" : "Envoyer") : sending ? "Envoi…" : "Je m’abonne"}
      </button>

      {status === "error" && (
        <p className="contact-form__note" role="alert">
          L’envoi n’a pas abouti. Réessaie dans un instant, ou écris-nous par téléphone.
        </p>
      )}

      <p className="contact-form__note">
        {kind === "contact"
          ? "En envoyant ce message, tu acceptes que ton nom et ton adresse soient utilisés uniquement pour te répondre. Détails dans la "
          : "Tes données servent uniquement à t’envoyer la newsletter. Détails dans la "}
        <a href="/confidentialite/">politique de confidentialité</a>.
      </p>
    </form>
  );
}
