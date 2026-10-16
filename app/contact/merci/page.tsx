import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/site";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Message envoyé",
  description: `Ton message a bien été transmis à l'équipe ${SITE_NAME}.`,
  alternates: { canonical: "/contact/merci/" },
  robots: { index: false, follow: true },
};

// Page affichée après l'envoi du formulaire de contact : c'est la
// `envoyée par le formulaire de contact une fois le message transmis à
// Zoho (components/LeadForm.tsx). noindex : elle n'a aucune raison d'apparaître dans Google.
export default function MerciPage() {
  return (
    <div className="page">
      <Breadcrumbs items={[{ name: "Accueil", href: "/" }, { name: "Contact", href: "/contact/" }, { name: "Message envoyé", href: "/contact/merci/" }]} />
      <h1>Message envoyé</h1>
      <p>
        Merci, ton message est bien arrivé. On le lit et on te répond à
        l&apos;adresse que tu as indiquée.
      </p>
      <p>
        En attendant, retourne à <a href="/">l&apos;accueil</a> ou choisis un thème qui te
        parle : <a href="/intelligence-artificielle/">l&apos;IA</a>,{" "}
        <a href="/maison-connectee/">la maison connectée</a>,{" "}
        <a href="/programmation/">la programmation</a>…
      </p>
    </div>
  );
}
