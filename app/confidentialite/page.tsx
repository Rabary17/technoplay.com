import type { Metadata } from "next";
import { SITE_NAME, COMPANY, COMPANY_ADDRESS, COMPANY_PHONE_HREF } from "@/lib/site";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description: `Comment ${SITE_NAME} traite les données personnelles.`,
  alternates: { canonical: "/confidentialite/" },
};

// Politique volontairement courte : pas de compte utilisateur ; les seules
// collectes réelles sont le formulaire de contact (Zoho CRM, voir
// app/contact/page.tsx) et la mesure d'audience Google Analytics 4 (ajoutée
// le 2026-10-13, voir GA_MEASUREMENT_ID dans lib/site.ts et app/layout.tsx).
// Toute modification de l'un doit se refléter dans l'autre.
export default function ConfidentialitePage() {
  return (
    <div className="page">
      <Breadcrumbs items={[{ name: "Accueil", href: "/" }, { name: "Confidentialité", href: "/confidentialite/" }]} />
      <h1>Politique de confidentialité</h1>

      <p>
        {SITE_NAME} accorde de l&apos;importance à la protection de vos
        données personnelles. Cette page explique quelles données sont
        collectées et pourquoi.
      </p>

      <h2>Responsable du traitement</h2>
      <p>
        Le responsable du traitement des données collectées sur {SITE_NAME}
        est {COMPANY.nom}, éditeur du site : {COMPANY_ADDRESS}. Téléphone :{" "}
        <a href={COMPANY_PHONE_HREF}>{COMPANY.telephone}</a>.
      </p>

      <h2>Formulaire de contact</h2>
      <p>
        Le formulaire de la page <a href="/contact/">contact</a> transmet
        directement vos informations (nom, email, message) au CRM Zoho, où
        elles créent une fiche prospect consultable par l&apos;équipe de{" "}
        {SITE_NAME} ({COMPANY.nom}) dans le seul but de répondre à votre demande (
        <a href="https://www.zoho.com/privacy.html" target="_blank" rel="noreferrer">
          politique de confidentialité de Zoho
        </a>
        ). Une copie du message est aussi transmise par e-mail au rédacteur
        en chef. Ces informations ne sont ni vendues, ni utilisées à des fins
        commerciales tierces. Si vous préférez ne pas utiliser ce formulaire,
        vous pouvez nous joindre par téléphone, aux horaires indiqués sur la
        page <a href="/contact/">contact</a>.
      </p>

      <h2>Mesure d&apos;audience</h2>
      <p>
        Ce site utilise Google Analytics 4, un outil de mesure d&apos;audience
        fourni par Google, pour savoir quelles pages sont lues et améliorer
        nos contenus. Il dépose dans votre navigateur des cookies (
        <code>_ga</code> et <code>_ga_</code> suivi d&apos;un identifiant) qui
        permettent de reconnaître un navigateur d&apos;une visite à l&apos;autre
        et de produire des statistiques de fréquentation. Les données ainsi
        collectées sont transmises à Google, qui les traite selon sa{" "}
        <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer">
          politique de confidentialité
        </a>
        .
      </p>
      <p>
        Pour ne pas être mesuré, vous pouvez bloquer ou supprimer les cookies
        dans les réglages de votre navigateur, ou installer le{" "}
        <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noreferrer">
          module de désactivation de Google Analytics
        </a>
        .
      </p>

      <h2>Vos droits</h2>
      <p>
        Conformément au RGPD, vous disposez d&apos;un droit d&apos;accès, de
        rectification et de suppression des données vous concernant.
        Contactez-nous via la page <a href="/contact/">contact</a>, par
        téléphone ou par courrier à l&apos;adresse de {COMPANY.nom} pour
        exercer ces droits.
      </p>
    </div>
  );
}
