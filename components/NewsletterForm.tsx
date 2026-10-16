import LeadForm from "@/components/LeadForm";

// Abonnement à la newsletter : formulaire du site, envoyé à Zoho CRM via
// api/lead.js. Le consentement est explicite (case non pré-cochée).
export default function NewsletterForm({ id = "newsletter" }: { id?: string }) {
  return <LeadForm kind="newsletter" id={id} />;
}
