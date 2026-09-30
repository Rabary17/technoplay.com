import type { Metadata } from "next";
import { SITE_NAME, CONTACT_EMAIL } from "@/lib/site";
import JsonLd from "@/components/JsonLd";
import { faqSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "FAQ",
  description: `Questions fréquentes sur ${SITE_NAME} : qui publie, comment nous contacter, avec quelle fréquence.`,
  alternates: { canonical: "/faq/" },
};

// Page FAQ : complète /a-propos/ côté E-E-A-T (qui/pourquoi) en couvrant les
// questions pratiques (fréquence, indépendance, contact) — le JSON-LD
// FAQPage (lib/schema.ts) aide aussi les moteurs génératifs (GEO) à extraire
// des réponses directement. TODO : ajuster les réponses une fois la vraie
// ligne éditoriale/fréquence de publication stabilisée (voir /a-propos/).
const questions = [
  {
    question: `Qui écrit les articles publiés sur ${SITE_NAME} ?`,
    answer: `Les contenus sont rédigés et relus par l'équipe éditoriale de ${SITE_NAME}. Voir la page À propos pour plus de détails.`,
  },
  {
    question: "À quelle fréquence publiez-vous ?",
    answer:
      "La fréquence de publication varie selon l'actualité et le temps nécessaire à la vérification de chaque article — nous privilégions la qualité à la cadence.",
  },
  {
    question: `${SITE_NAME} est-il indépendant ?`,
    answer:
      "Oui. La ligne éditoriale n'est pas influencée par des annonceurs ou des partenaires commerciaux ; tout contenu sponsorisé, le cas échéant, serait clairement identifié comme tel.",
  },
  {
    question: "Comment signaler une erreur ou une correction ?",
    answer: `Écrivez-nous via la page Contact, ou directement à ${CONTACT_EMAIL} — chaque signalement est examiné et l'article corrigé si besoin.`,
  },
];

export default function FaqPage() {
  return (
    <>
      <JsonLd data={faqSchema(questions)} />
      <h1>Questions fréquentes</h1>
      <div>
        {questions.map((q) => (
          <section key={q.question} style={{ marginTop: "1.5rem" }}>
            <h2>{q.question}</h2>
            <p>{q.answer}</p>
          </section>
        ))}
      </div>
    </>
  );
}
