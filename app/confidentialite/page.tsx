import type { Metadata } from "next";
import { SITE_NAME, CONTACT_EMAIL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description: `Comment ${SITE_NAME} traite les données personnelles.`,
  alternates: { canonical: "/confidentialite/" },
};

// Politique volontairement courte : le site n'a, à ce stade, ni analytics
// ni compte utilisateur — la seule collecte réelle est le formulaire de
// contact (Formspree, voir app/contact/page.tsx). À étoffer si un outil de
// mesure d'audience (Plausible, GA, etc.) est ajouté plus tard.
export default function ConfidentialitePage() {
  return (
    <>
      <h1>Politique de confidentialité</h1>

      <p>
        {SITE_NAME} accorde de l&apos;importance à la protection de vos
        données personnelles. Cette page explique quelles données sont
        collectées et pourquoi.
      </p>

      <h2>Formulaire de contact</h2>
      <p>
        Le formulaire de la page <a href="/contact/">contact</a> est traité
        par un service tiers, Formspree (
        <a href="https://formspree.io/legal/privacy-policy/" target="_blank" rel="noreferrer">
          politique de confidentialité de Formspree
        </a>
        ). Les informations que vous saisissez (nom, email, message) sont
        transmises à Formspree puis à {SITE_NAME} dans le seul but de
        répondre à votre demande. Elles ne sont ni vendues, ni utilisées à
        des fins commerciales. Vous pouvez aussi nous écrire directement à{" "}
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> si vous
        préférez ne pas utiliser ce formulaire.
      </p>

      <h2>Mesure d&apos;audience</h2>
      <p>
        {/* TODO : mettre à jour cette section si un outil d'analytics est
            ajouté (nom de l'outil, cookies éventuels, durée de
            conservation). */}
        Ce site n&apos;utilise actuellement aucun outil de mesure
        d&apos;audience ni cookie de suivi publicitaire.
      </p>

      <h2>Vos droits</h2>
      <p>
        Conformément au RGPD, vous disposez d&apos;un droit d&apos;accès, de
        rectification et de suppression des données vous concernant.
        Contactez-nous via la page <a href="/contact/">contact</a> pour
        exercer ces droits.
      </p>
    </>
  );
}
