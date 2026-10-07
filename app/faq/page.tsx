import type { Metadata } from "next";
import { SITE_NAME, COMPANY } from "@/lib/site";
import JsonLd from "@/components/JsonLd";
import { faqSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "FAQ",
  description: `Questions fréquentes sur ${SITE_NAME} : pour qui, par où commencer, qui écrit, liens affiliés, comment nous contacter.`,
  alternates: { canonical: "/faq/" },
};

// Page FAQ : complète /a-propos/ côté E-E-A-T (qui/pourquoi) en couvrant les
// questions pratiques (fréquence, indépendance, contact) — le JSON-LD
// FAQPage (lib/schema.ts) aide aussi les moteurs génératifs (GEO) à extraire
// des réponses directement. TODO : ajuster les réponses une fois la vraie
// ligne éditoriale/fréquence de publication stabilisée (voir /a-propos/).
const questions = [
  {
    question: `Pour qui est ${SITE_NAME} ?`,
    answer: `Pour tous ceux qui débutent en technologie : IA, robotique, maison connectée, programmation, appareils du quotidien, sécurité. Chaque article part de zéro, explique les mots techniques au passage et donne un exemple concret. Aucune question n'est bête.`,
  },
  {
    question: "Je n'y connais rien : par où commencer ?",
    answer:
      "Choisis le thème qui te parle dans le menu (par exemple Intelligence artificielle ou Appareils & Internet), puis ouvre un article. Chaque article commence par un encadré « L'essentiel en 30 secondes » : si ça te suffit, tu peux t'arrêter là ; sinon, la suite explique tout pas à pas.",
  },
  {
    question: `Qui écrit les articles de ${SITE_NAME} ?`,
    answer: `Chaque article est signé par le spécialiste du sujet — IA et sécurité, maison connectée, programmation et design, appareils et Internet, WordPress et création de sites web, beauté et mode connectée — et publié sous la responsabilité d'Andrianina RABARIVELO, rédacteur en chef de ${SITE_NAME}, qui fixe la ligne éditoriale et relit chaque article avant publication. Toute l'équipe est présentée dans la section « La rédaction » de la page À propos.`,
  },
  {
    question: `Qui est derrière ${SITE_NAME} ?`,
    answer: `${SITE_NAME} est édité par ${COMPANY.nom}, une entreprise basée à ${COMPANY.adresse.ville}, à ${COMPANY.adresse.pays}. Les coordonnées complètes et le directeur de la publication figurent dans les mentions légales.`,
  },
  {
    question: "À quelle fréquence publiez-vous ?",
    answer:
      "Ça dépend de l'actu et du temps qu'il faut pour vérifier chaque article. Une règle : on préfère publier juste que publier vite.",
  },
  {
    question: `${SITE_NAME} est-il indépendant ?`,
    answer:
      "Oui. Aucun annonceur ni partenaire commercial ne dicte ce qu'on écrit. Si un contenu sponsorisé devait un jour être publié, il serait clairement signalé comme tel — pas déguisé en article.",
  },
  {
    question: "Les guides d'achat contiennent-ils des liens affiliés ?",
    answer:
      "Certains guides d'achat peuvent contenir des liens d'affiliation : si tu achètes un produit via l'un de ces liens, le site peut toucher une commission, sans surcoût pour toi. Ces liens sont signalés comme tels et n'influencent ni le choix des produits ni leur classement — un produit décevant reste décevant, commission ou pas.",
  },
  {
    question: "Comment signaler une erreur ?",
    answer: `Écris-nous via le formulaire de la page Contact, ou appelle-nous aux horaires indiqués. Chaque signalement est lu, et l'article est corrigé si besoin.`,
  },
];

export default function FaqPage() {
  return (
    <div className="page">
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
    </div>
  );
}
