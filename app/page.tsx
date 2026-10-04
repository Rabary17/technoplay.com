import { getAllPosts } from "@/lib/posts";
import { getSection, getSubcategory, sectionUrl, subcategoryUrl, type Section } from "@/lib/categories";
import { AUTHORS, DEFAULT_AUTHOR_SLUG, authorUrl } from "@/lib/authors";
import { faqSchema } from "@/lib/schema";
import { PHOTOS_ACCUEIL as P, PHOTOS_TENDANCES as T, UNSPLASH_URL, imgProps, type PhotoAccueil } from "@/lib/photos-accueil";
import Icon from "@/components/Icon";
import ArticleCard from "@/components/ArticleCard";
import JsonLd from "@/components/JsonLd";
import { AuthorAvatar } from "@/components/AuthorBox";

// Accueil (refonte du 2026-10-03) — sur la charte existante (tokens de
// app/globals.css, Bricolage Grotesque + Inter, bleu #2F45D6 et point
// jaune #F2B33D du logo). Déroulé :
//   1. hero : promesse + photo + preuves
//   1 bis. « La tech qui fait l'actu » : bento de 8 tendances (IA, drones,
//      réalité virtuelle, robots…) reliées aux sous-rubriques
//   2. derniers articles (6 max)
//   3. « Par où commencer ? » : les 4 rubriques présentées par situation,
//      avec des exemples de questions — liés automatiquement à l'article
//      dès qu'il est publié (slug présent dans content/posts)
//   4. le nom de marque : pourquoi « Techno Play »
//   5. la méthode (comment on travaille) + indépendance
//   6. la rédaction (un spécialiste par sujet)
//   7. FAQ (JSON-LD FAQPage) + appel à proposer un sujet
//   8. crédits photos (Unsplash)
// Ton : charte de ton du projet (tutoiement, direct, sans jargon). Aucun
// chiffre d'audience ou de volume inventé (garde-fou du site).

interface Exemple {
  question: string;
  /** Slug de l'article qui répond à la question, s'il existe ou existera. */
  slug?: string;
}

interface Situation {
  section: string;
  titre: string;
  texte: string;
  photo: PhotoAccueil;
  exemples: Exemple[];
  cta: string;
}

const SITUATIONS: Situation[] = [
  {
    section: "guides-tutos",
    titre: "Tu as un problème à régler",
    texte:
      "Un bug qui revient, un réglage introuvable, une sauvegarde à faire ? Nos tutos vont droit au but : étapes numérotées, menus nommés comme sur ton écran, et un plan B si la première méthode coince.",
    photo: P.guides,
    exemples: [
      { question: "Mon iPhone ne charge plus : que faire ?", slug: "iphone-ne-charge-plus" },
      { question: "Comment changer le mot de passe Wi-Fi de ma box ?", slug: "changer-mot-de-passe-wifi" },
      { question: "Comment faire une capture d'écran sur PC ?", slug: "capture-ecran-pc" },
    ],
    cta: "Voir les guides & tutos",
  },
  {
    section: "comparatifs-achats",
    titre: "Tu veux acheter sans te tromper",
    texte:
      "La bonne question n'est pas « quel est le meilleur ? », mais « quel est le bon pour moi ? ». On compare selon ton usage et ton budget, et on te dit quand un produit ne vaut pas son prix.",
    photo: P.comparatifs,
    exemples: [
      { question: "Quel casque Bluetooth pour le sport ?", slug: "casque-bluetooth-sport" },
      { question: "Quel casque sans fil pour regarder la TV ?", slug: "casque-sans-fil-tv" },
      { question: "Quel thermostat connecté pour un radiateur électrique ?", slug: "thermostat-connecte-radiateur-electrique" },
    ],
    cta: "Voir les comparatifs",
  },
  {
    section: "decryptage-concepts",
    titre: "Tu veux comprendre comment ça marche",
    texte:
      "IA, puces, écrans, Internet : on ouvre le capot avec des analogies simples et des schémas. Objectif : te faire ton propre avis, au lieu de répéter des slogans.",
    photo: P.decryptage,
    exemples: [
      { question: "C'est quoi un agent IA, au juste ?", slug: "agent-ia" },
      { question: "OLED ou QLED : quelle différence, concrètement ?", slug: "oled-ou-qled" },
      { question: "Comment écrire un bon prompt pour ChatGPT ?", slug: "prompt-chatgpt" },
    ],
    cta: "Voir les décryptages",
  },
  {
    section: "actu-tech",
    titre: "Tu veux savoir ce qui change pour toi",
    texte:
      "Toutes les annonces ne se valent pas. On trie l'actu avec un seul filtre : qu'est-ce que ça change concrètement pour toi ? Lancements, failles à corriger d'urgence, mises à jour qui bousculent tes habitudes.",
    photo: P.actu,
    exemples: [
      { question: "Une faille fait la une : faut-il mettre à jour tout de suite ?" },
      { question: "Ce nouveau smartphone mérite-t-il vraiment le buzz ?" },
      { question: "Cette mise à jour va-t-elle changer tes habitudes ?" },
    ],
    cta: "Voir l'actu tech",
  },
];

interface Tendance {
  titre: string;
  texte: string;
  /** Slug de la sous-rubrique vers laquelle pointe la tuile. */
  rubrique: string;
  photo: PhotoAccueil;
  /** Emplacement dans la grille (voir .trend-tile--* dans app/globals.css). */
  taille?: "grande" | "haute";
}

const TENDANCES: Tendance[] = [
  {
    titre: "IA générative",
    texte: "ChatGPT, Gemini, Claude, agents IA : ce qu'ils savent vraiment faire, et là où ils se plantent.",
    rubrique: "intelligence-artificielle",
    photo: T.ia,
    taille: "grande",
  },
  {
    titre: "Drones",
    texte: "Prises de vue, modèles grand public, règles de vol : on fait le point.",
    rubrique: "hardware-innovation",
    photo: T.drone,
    taille: "haute",
  },
  {
    titre: "Réalité virtuelle",
    texte: "Casques VR et mixtes : au-delà de l'effet waouh.",
    rubrique: "hardware-innovation",
    photo: T.vr,
  },
  {
    titre: "Robots",
    texte: "Humanoïdes, robots-chiens, aspirateurs : la robotique sort des labos.",
    rubrique: "hardware-innovation",
    photo: T.robot,
  },
  {
    titre: "Montres connectées",
    texte: "Ce qu'elles mesurent vraiment, et ce qu'elles valent.",
    rubrique: "audio-mobilite",
    photo: T.montre,
  },
  {
    titre: "Maison connectée",
    texte: "Automatiser sans te compliquer la vie.",
    rubrique: "domotique-maison-connectee",
    photo: T.maison,
  },
  {
    titre: "Cybersécurité",
    texte: "Failles, arnaques, piratages : les bons réflexes.",
    rubrique: "cyberattaques-failles",
    photo: T.cyber,
  },
  {
    titre: "Gaming",
    texte: "Consoles, manettes, écrans : le bon matos sans te ruiner.",
    rubrique: "peripheriques-ecrans",
    photo: T.gaming,
  },
];

const METHODE = [
  {
    titre: "On part de ta question",
    texte:
      "Chaque article répond à une question que des gens se posent vraiment, formulée avec leurs mots. Pas à un sujet choisi pour remplir une grille.",
  },
  {
    titre: "On vérifie à la source",
    texte:
      "Documentation officielle, pages d'assistance des constructeurs, textes de loi : chaque fait est contrôlé. Les sources s'affichent sous l'article, avec leur date de consultation.",
  },
  {
    titre: "On va droit au but",
    texte:
      "La réponse arrive dès les premières lignes, puis le détail : étapes numérotées, tableaux de synthèse, FAQ. Tu prends ce dont tu as besoin, et tu repars.",
  },
  {
    titre: "On dit ce qu'on pense",
    texte:
      "Un prix abusé, une fonction gadget, une promesse marketing creuse ? On te le dit, même quand la fiche technique brille.",
  },
  {
    titre: "On garde l'article à jour",
    texte:
      "Une interface change, une erreur nous est signalée ? On corrige ouvertement, et la date de mise à jour s'affiche en tête d'article.",
  },
];

const FAQ = [
  {
    question: "C'est quoi, Techno Play ?",
    answer:
      "Un média tech indépendant, en français, qui explique la technologie sans jargon : tutos de dépannage, comparatifs pour bien acheter, décryptages de l'IA et du hardware, et l'actu tech qui te concerne vraiment.",
  },
  {
    question: "Faut-il être calé en informatique pour suivre les tutos ?",
    answer:
      "Non. Chaque tuto part du principe que tu n'es pas expert : étapes numérotées, menus nommés comme sur ton écran, vocabulaire expliqué au passage. Si une manipulation est risquée, on te prévient avant.",
  },
  {
    question: "D'où viennent vos informations ?",
    answer:
      "De sources vérifiables : documentation officielle, pages d'assistance des constructeurs et des éditeurs, textes de référence. Elles sont listées en bas de chaque article, avec leur date de consultation.",
  },
  {
    question: "Comment choisissez-vous les produits de vos comparatifs ?",
    answer:
      "En partant de ton usage et de ton budget, sur des critères vérifiables : caractéristiques officielles, compatibilité, prix constatés. Les éventuels liens d'affiliation sont signalés et ne changent jamais un classement.",
  },
  {
    question: "Les articles sont-ils gratuits ?",
    answer: "Oui. Tout le site est en accès libre, sans inscription ni abonnement.",
  },
  {
    question: "Je ne trouve pas la réponse à ma question. Que faire ?",
    answer:
      "Écris-nous via la page Contact. Si ta question intéresse d'autres lecteurs, elle a de bonnes chances d'inspirer un prochain article.",
  },
];

function SituationCard({ situation, publies }: { situation: Situation; publies: Set<string> }) {
  const section = getSection(situation.section) as Section;
  return (
    <article className="card situation-card">
      {/* eslint-disable-next-line @next/next/no-img-element -- export statique */}
      <img
        className="situation-card__image"
        {...imgProps(situation.photo, "(min-width: 960px) 600px, 100vw")}
        loading="lazy"
        decoding="async"
      />
      <div className="situation-card__body">
        <div className="situation-card__kicker">
          <span className="icon-tile icon-tile--sm" aria-hidden="true">
            <Icon name={section.icon} size={18} />
          </span>
          <span>{section.title}</span>
        </div>
        <h3>
          <a href={sectionUrl(section)}>{situation.titre}</a>
        </h3>
        <p>{situation.texte}</p>
        <p className="situation-card__label">Par exemple :</p>
        <ul className="situation-card__examples">
          {situation.exemples.map((ex) => (
            <li key={ex.question}>
              <Icon name="arrow-right" size={16} />
              {ex.slug && publies.has(ex.slug) ? (
                <a href={`/${ex.slug}/`}>{ex.question}</a>
              ) : (
                <span>{ex.question}</span>
              )}
            </li>
          ))}
        </ul>
        <ul className="situation-card__subs" aria-label={`Sous-rubriques de ${section.title}`}>
          {section.subcategories.map((sub) => (
            <li key={sub.slug}>
              <a href={subcategoryUrl(section, sub)}>{sub.title}</a>
            </li>
          ))}
        </ul>
        <a className="situation-card__cta" href={sectionUrl(section)}>
          {situation.cta}
          <Icon name="arrow-right" size={16} />
        </a>
      </div>
    </article>
  );
}

export default function HomePage() {
  const posts = getAllPosts();
  const publies = new Set(posts.map((p) => p.slug));
  const editor = AUTHORS.find((a) => a.slug === DEFAULT_AUTHOR_SLUG);
  const equipe = [editor, ...AUTHORS.filter((a) => a.slug !== DEFAULT_AUTHOR_SLUG)].filter(
    (a): a is NonNullable<typeof a> => Boolean(a)
  );
  const photos = [...Object.values(P), ...Object.values(T)];

  return (
    <>
      <JsonLd data={faqSchema(FAQ)} />

      {/* 1. Hero */}
      <section className="container hero hero--split">
        <div className="hero__text">
          <div className="hero-eyebrow">
            <span className="dot" aria-hidden="true" />
            <span>Média tech indépendant</span>
          </div>
          <h1>
            <span className="brand">Techno Play</span> — la tech décortiquée,
            sans jargon ni langue de bois
          </h1>
          <p className="lead">
            Ton PC rame, ton Wi-Fi fait des siennes, tu hésites entre deux
            casques ou tu veux enfin comprendre comment marche ChatGPT ? Tu
            es au bon endroit. Ici, la tech s&apos;explique avec des mots
            simples, des étapes claires et des avis francs. Un seul
            objectif : qu&apos;à la fin de l&apos;article, ton problème soit
            réglé.
          </p>
          <div className="hero-actions">
            <a className="btn btn--primary" href="#par-ou-commencer">
              Trouver une solution
            </a>
            <a className="btn btn--secondary" href="#derniers-articles">
              Lire les derniers articles
            </a>
          </div>
          <ul className="hero-proof">
            <li>
              <Icon name="check" size={18} />
              Sources officielles citées sous chaque article
            </li>
            <li>
              <Icon name="check" size={18} />
              Zéro jargon, zéro langue de bois
            </li>
            <li>
              <Icon name="check" size={18} />
              Gratuit, sans inscription
            </li>
          </ul>
        </div>
        <figure className="hero__visual">
          {/* eslint-disable-next-line @next/next/no-img-element -- export statique */}
          <img
            {...imgProps(P.hero, "(min-width: 960px) 520px, 100vw")}
            fetchPriority="high"
            decoding="async"
          />
          <svg className="hero__mark" viewBox="0 0 64 64" width="72" height="72" aria-hidden="true">
            <rect width="64" height="64" rx="16" fill="#2F45D6" />
            <polygon points="15,17 15,47 37,32" fill="#FFFFFF" stroke="#FFFFFF" strokeWidth="5" strokeLinejoin="round" />
            <circle cx="48" cy="44" r="5.5" fill="#F2B33D" />
          </svg>
        </figure>
      </section>

      {/* 1 bis. Tendances */}
      <section className="home-section trends-section" aria-labelledby="tendances-titre">
        <div className="container">
          <p className="kicker">Tendances</p>
          <h2 id="tendances-titre">La tech qui fait l&apos;actu, décortiquée</h2>
          <p className="section-intro">
            IA, drones, réalité virtuelle, robots… Les technologies dont tout
            le monde parle, expliquées sans jargon : ce qu&apos;elles font
            vraiment, ce qu&apos;elles changent pour toi, et ce qui relève du
            simple buzz.
          </p>
          <ul className="trend-grid">
            {TENDANCES.map((t) => {
              const cible = getSubcategory(t.rubrique);
              const href = cible ? subcategoryUrl(cible.section, cible.sub) : "/";
              const grande = t.taille === "grande";
              return (
                <li key={t.titre} className={`trend-tile${t.taille ? ` trend-tile--${t.taille}` : ""}`}>
                  {/* eslint-disable-next-line @next/next/no-img-element -- export statique */}
                  <img
                    {...imgProps(t.photo, grande ? "(min-width: 960px) 600px, 100vw" : "(min-width: 960px) 300px, (min-width: 600px) 50vw, 100vw")}
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="trend-tile__body">
                    {cible ? <span className="trend-tile__tag">{cible.sub.title}</span> : null}
                    <h3>
                      <a href={href}>{t.titre}</a>
                    </h3>
                    <p>{t.texte}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* 2. Derniers articles */}
      <section id="derniers-articles" className="home-section">
        <div className="container">
          <h2>Les derniers articles</h2>
          <p className="section-intro">
            Fraîchement publiés, vérifiés et datés. Les sources de chaque
            article sont listées tout en bas : tu peux contrôler par
            toi-même.
          </p>
          {posts.length === 0 ? (
            <p className="empty-state">Les premiers articles arrivent très vite. Repasse bientôt !</p>
          ) : (
            <div className="article-grid">
              {posts.slice(0, 6).map((post) => (
                <ArticleCard key={post.slug} post={post} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 3. Par où commencer ? */}
      <section id="par-ou-commencer" className="home-section">
        <div className="container">
          <h2>Par où commencer ? Dis-nous ce qui t&apos;amène</h2>
          <p className="section-intro">
            Quatre rubriques, quatre situations. Choisis la tienne : chaque
            carte te mène aux guides qui répondent à ce genre de question.
          </p>
          <div className="situation-grid">
            {SITUATIONS.map((situation) => (
              <SituationCard key={situation.section} situation={situation} publies={publies} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. Le nom de marque */}
      <section className="home-section">
        <div className="container brand-story">
          <figure className="brand-story__visual">
            {/* eslint-disable-next-line @next/next/no-img-element -- export statique */}
            <img
              {...imgProps(P.marque, "(min-width: 960px) 460px, 100vw")}
              loading="lazy"
              decoding="async"
            />
          </figure>
          <div className="brand-story__text">
            <p className="kicker">Le nom</p>
            <h2>Pourquoi « Techno Play » ?</h2>
            <p>
              <strong>Techno</strong>, pour la technologie sous toutes ses
              formes : ton smartphone, ton PC, ta box, ta TV, l&apos;IA qui
              s&apos;invite partout. Bref, tout ce qui se branche, se met à
              jour… ou plante au pire moment.
            </p>
            <p>
              <strong>Play</strong>, parce qu&apos;on apprivoise mieux ce
              avec quoi on ose jouer. La tech n&apos;a pas à
              t&apos;intimider : tu manipules, tu essaies, tu te trompes, tu
              recommences. Comme sur une console, la meilleure façon
              d&apos;apprendre, c&apos;est d&apos;avoir la manette en main.
            </p>
            <div className="brand-story__logo">
              <svg viewBox="0 0 64 64" width="56" height="56" aria-hidden="true">
                <rect width="64" height="64" rx="16" fill="var(--brand)" />
                <polygon points="15,17 15,47 37,32" fill="var(--on-brand)" stroke="var(--on-brand)" strokeWidth="5" strokeLinejoin="round" />
                <circle cx="48" cy="44" r="5.5" fill="#F2B33D" />
              </svg>
              <p>
                Et le logo ? Le triangle, c&apos;est le bouton{" "}
                <strong>Play</strong> : celui qui lance la suite. Le petit
                point jaune, c&apos;est le déclic, ce moment où tout
                s&apos;éclaire enfin. C&apos;est exactement ce qu&apos;on
                cherche à provoquer dans chaque article.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. La méthode */}
      <section className="promise-section method-section">
        <div className="container method">
          <figure className="method__visual">
            {/* eslint-disable-next-line @next/next/no-img-element -- export statique */}
            <img
              {...imgProps(P.methode, "(min-width: 960px) 420px, 100vw")}
              loading="lazy"
              decoding="async"
            />
          </figure>
          <div className="method__content">
            <p className="kicker">Notre méthode</p>
            <h2>Comment on travaille (et pourquoi tu peux nous faire confiance)</h2>
            <p className="method__intro">
              Un article Techno Play suit toujours le même chemin, de ta
              question jusqu&apos;à sa mise à jour.
            </p>
            <ol className="method__steps">
              {METHODE.map((etape, i) => (
                <li key={etape.titre}>
                  <span className="method__num" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3>{etape.titre}</h3>
                    <p>{etape.texte}</p>
                  </div>
                </li>
              ))}
            </ol>
            <p className="method__note">
              <strong>Indépendance.</strong> Aucun annonceur ne dicte la ligne
              éditoriale. Certains guides d&apos;achat peuvent contenir des
              liens d&apos;affiliation : ils sont signalés, et ne changent
              jamais un classement.
            </p>
            <div className="promise-actions">
              <a className="btn btn--primary" href="/a-propos/">
                Notre ligne éditoriale
              </a>
              <a className="btn btn--secondary" href="/contact/">
                Signaler une erreur
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 6. La rédaction */}
      <section className="home-section">
        <div className="container">
          <h2>Une rédaction, un spécialiste pour chaque sujet</h2>
          <p className="section-intro">
            Chaque article est confié à la personne dont c&apos;est le
            domaine, puis relu par le rédacteur en chef avant publication.
          </p>
          <ul className="team-grid">
            {equipe.map((author) => (
              <li key={author.slug} className="card team-card">
                <AuthorAvatar author={author} size={80} />
                <h3>
                  <a href={authorUrl(author)}>{author.name}</a>
                </h3>
                <p className="team-card__role">{author.role}</p>
                <p className="team-card__topics">
                  {author.expertise
                    .slice(0, 2)
                    .map((e) => e.replace(/\s*\(.*\)$/, ""))
                    .join(" · ")}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 7. FAQ + appel à proposer un sujet */}
      <section className="home-section">
        <div className="container home-faq">
          <div className="home-faq__head">
            <h2>Questions fréquentes</h2>
            <p>
              Tout ce que tu veux savoir sur Techno Play, en bref. Les autres
              réponses sont sur la <a href="/faq/">page FAQ</a>.
            </p>
          </div>
          <div className="home-faq__list">
            {FAQ.map((item) => (
              <details key={item.question}>
                <summary>{item.question}</summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="home-section">
        <div className="container">
          <div className="cta-band">
            {/* eslint-disable-next-line @next/next/no-img-element -- décoratif */}
            <img
              className="cta-band__bg"
              {...imgProps(P.cta, "100vw")}
              loading="lazy"
              decoding="async"
            />
            <div className="cta-band__content">
              <h2>Une question tech qui te prend la tête ?</h2>
              <p>
                Dis-nous laquelle. Si elle intéresse d&apos;autres lecteurs,
                on en fera peut-être notre prochain article.
              </p>
              <a className="btn btn--light" href="/contact/">
                Proposer un sujet
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Crédits photos */}
      <p className="container photo-credits">
        Photos :{" "}
        {photos.map((photo, i) => (
          <span key={photo.base}>
            <a href={photo.profil} rel="noopener noreferrer" target="_blank">
              {photo.auteur}
            </a>
            {i < photos.length - 2 ? ", " : i === photos.length - 2 ? " et " : ""}
          </span>
        ))}{" "}
        sur{" "}
        <a href={UNSPLASH_URL} rel="noopener noreferrer" target="_blank">
          Unsplash
        </a>
        .
      </p>
    </>
  );
}
