import type { Metadata } from "next";
import { SITE_NAME, COMPANY, COMPANY_PHONE_HREF, SOCIAL_LINKS } from "@/lib/site";
import CompanyDetails from "@/components/CompanyDetails";
import { CATEGORIES, categoryUrl } from "@/lib/categories";
import { AUTHORS, DEFAULT_AUTHOR_SLUG, getAuthor, authorUrl, type Author } from "@/lib/authors";
import AuthorBox from "@/components/AuthorBox";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "À propos",
  description: `${SITE_NAME}, la tech du quotidien expliquée clairement : pour qui, comment on écrit, qui est derrière le site et la rédaction.`,
  alternates: { canonical: "/a-propos/" },
};

// Page E-E-A-T centrale : Google (et un lecteur humain) veut savoir qui
// publie, pourquoi, et selon quels principes.
export default function AboutPage() {
  const editor = getAuthor(DEFAULT_AUTHOR_SLUG) as Author;
  const team = AUTHORS.filter((a) => a.slug !== DEFAULT_AUTHOR_SLUG);
  return (
    <div className="page">
      <Breadcrumbs items={[{ name: "Accueil", href: "/" }, { name: "À propos", href: "/a-propos/" }]} />
      <h1>À propos de {SITE_NAME}</h1>
      <p>
        {SITE_NAME} explique la technologie du quotidien : l&apos;IA, la
        robotique, la maison connectée, la programmation, tes appareils et
        la sécurité. Le site s&apos;adresse à tous ceux qui veulent
        comprendre ces outils et bien les utiliser, quel que soit leur
        niveau.
      </p>

      <h2>Comment on écrit</h2>
      <p>
        Chaque article part d&apos;une question précise et doit y répondre
        complètement. On s&apos;impose quelques règles :
      </p>
      <ul>
        <li>
          <strong>Des mots clairs.</strong> Chaque terme technique est
          expliqué dès qu&apos;il apparaît.
        </li>
        <li>
          <strong>L&apos;essentiel d&apos;abord.</strong> La réponse tient
          dans un encadré en haut de l&apos;article ; le reste est là pour
          comprendre.
        </li>
        <li>
          <strong>Toujours un exemple concret</strong>, tiré de la vie de
          tous les jours, et des étapes numérotées quand il faut agir.
        </li>
        <li>
          <strong>Rien d&apos;inventé.</strong> Un chiffre, une
          caractéristique technique, une affirmation ? C&apos;est vérifié, et
          les sources sont citées sous l&apos;article.
        </li>
        <li>
          <strong>On te prévient.</strong> Une manipulation risquée ou un
          produit qui ne vaut pas son prix ? On te le dit franchement. Et une
          erreur signalée est corrigée ouvertement.
        </li>
      </ul>
      <p>Le site est organisé en six thèmes, sans sous-menus :</p>
      <ul>
        {CATEGORIES.map((category) => (
          <li key={category.slug}>
            <a href={categoryUrl(category)}>{category.title}</a> —{" "}
            {category.description}
          </li>
        ))}
      </ul>

      <h2 id="la-redaction">La rédaction</h2>
      <p>
        Aux commandes de la ligne éditoriale : {editor.name},{" "}
        {editor.role.toLowerCase()} de {SITE_NAME}. Son parcours complet est
        sur <a href={authorUrl(editor)}>sa page auteur</a>.
      </p>
      <AuthorBox author={editor} heading="Rédacteur en chef" />
      <p>
        Autour de lui, chaque sujet est confié à la personne dont c&apos;est
        la spécialité — et chaque article est relu par le rédacteur en chef
        avant publication.
      </p>
      {team.map((author) => (
        <AuthorBox key={author.slug} author={author} heading="L'équipe" headingLevel={3} />
      ))}

      <h2 id="editeur">Qui édite {SITE_NAME} ?</h2>
      <p>
        {SITE_NAME} est un média édité par {COMPANY.nom}, une entreprise basée
        à {COMPANY.adresse.ville}, à {COMPANY.adresse.pays}. L&apos;identité
        complète de l&apos;éditeur, le directeur de la publication et
        l&apos;hébergeur figurent dans les{" "}
        <a href="/mentions-legales/">mentions légales</a>.
      </p>
      <CompanyDetails />

      <h2>Nous contacter</h2>
      <p>
        Une question, une coquille à signaler, un sujet à proposer ? Passe par
        la <a href="/contact/">page contact</a>, on lit tout. Tu peux aussi
        appeler {COMPANY.nom} au{" "}
        <a href={COMPANY_PHONE_HREF}>{COMPANY.telephone}</a>, aux horaires
        indiqués ci-dessus.
      </p>
      {SOCIAL_LINKS.length > 0 && (
        <p>
          Tu peux aussi suivre {SITE_NAME} sur{" "}
          {SOCIAL_LINKS.map((social, i) => (
            <span key={social.url}>
              {i > 0 && (i === SOCIAL_LINKS.length - 1 ? " et " : ", ")}
              <a href={social.url} target="_blank" rel="noreferrer me">
                {social.label}
              </a>
            </span>
          ))}
          .
        </p>
      )}
    </div>
  );
}
