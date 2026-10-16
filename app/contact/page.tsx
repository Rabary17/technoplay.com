import type { Metadata } from "next";
import { SITE_NAME, COMPANY } from "@/lib/site";
import LeadForm from "@/components/LeadForm";
import CompanyDetails from "@/components/CompanyDetails";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contacter l'équipe ${SITE_NAME}.`,
  alternates: { canonical: "/contact/" },
};

// Formulaire de contact : composant client, envoi vers api/lead.js (Zoho CRM).
export default function ContactPage() {
  return (
    <div className="page">
      <Breadcrumbs items={[{ name: "Accueil", href: "/" }, { name: "Contact", href: "/contact/" }]} />
      <h1>Contact</h1>
      <p>
        Une question, une coquille à signaler, un sujet à proposer ? Écris-nous
        via le formulaire ci-dessous : on lit tout, et on te répond à
        l&apos;adresse que tu indiques.
      </p>

      <LeadForm kind="contact" id="contact" />

      <h2>Coordonnées de l&apos;éditeur</h2>
      <p>
        {SITE_NAME} est édité par {COMPANY.nom}, à Antananarivo (Madagascar).
        Tu peux aussi nous joindre par téléphone aux horaires ci-dessous.
      </p>
      <CompanyDetails />
    </div>
  );
}
