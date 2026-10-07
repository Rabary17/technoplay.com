import { getAllPosts } from "@/lib/posts";
import { CATEGORIES, categoryUrl, type CategorySlug } from "@/lib/categories";
import { AUTHORS, DEFAULT_AUTHOR_SLUG, authorUrl } from "@/lib/authors";
import { faqSchema } from "@/lib/schema";
import { PHOTOS_ACCUEIL as P, PHOTOS_TENDANCES as T, UNSPLASH_URL, imgProps, type PhotoAccueil } from "@/lib/photos-accueil";
import Icon, { type IconName } from "@/components/Icon";
import ArticleCard from "@/components/ArticleCard";
import JsonLd from "@/components/JsonLd";
import { AuthorAvatar } from "@/components/AuthorBox";
import { nbsp } from "@/lib/format";

// Accueil — repositionnement du 2026-10-07 : « le QG des débutants en
// tech ». Tous les visiteurs sont pris pour des novices, donc une page
// courte et simple, sur la charte existante (tokens de app/globals.css,
// Bricolage Grotesque + Inter, bleu #2F45D6 et point jaune #F2B33D du
// logo). Déroulé :
//   1. hero : la promesse (QG des débutants) + photo + 3 preuves
//   2. « Choisis ton sujet » : les 6 thèmes (lib/categories.ts), chacun
//      avec une question de débutant en exemple
//   3. derniers articles (6 max)
//   4. comment on explique les choses (4 engagements pour les novices)
//   5. le nom de marque : pourquoi « Techno Play »
//   6. la rédaction (un spécialiste par sujet)
//   7. FAQ (JSON-LD FAQPage) + appel à poser sa question
//   8. crédits photos (Unsplash) — uniquement les photos affichées ici
// Ton : charte de ton du projet (tutoiement, mots simples, aucun terme
// technique sans explication). Aucun chiffre d'audience ou de volume inventé
// (garde-fou du site).

/** Photo de la tuile de chaque thème (banque Unsplash de lib/photos-accueil.ts). */
const PHOTO_THEME: Record<CategorySlug, PhotoAccueil> = {
  "intelligence-artificielle": T.ia,
  "robotique-drones": T.robot,
  "maison-connectee": T.maison,
  programmation: P.methode,
  "appareils-internet": P.guides,
  "securite-vie-privee": T.cyber,
};

const ENGAGEMENTS: { icon: IconName; titre: string; texte: string }[] = [
  {
    icon: "lightbulb",
    titre: "On part de zéro",
    texte:
      "Aucune connaissance n'est supposée. Chaque mot technique est expliqué dès qu'il apparaît, avec des mots du quotidien.",
  },
  {
    icon: "rocket",
    titre: "L'essentiel en 30 secondes",
    texte:
      "Chaque article commence par un encadré qui donne la réponse. Pressé ? Tu peux t'arrêter là. Curieux ? La suite explique tout.",
  },
  {
    icon: "house",
    titre: "Des exemples de la vraie vie",
    texte:
      "Pas de théorie qui flotte : une situation que tu reconnais, des étapes numérotées et, quand c'est risqué, un avertissement clair.",
  },
  {
    icon: "shield-check",
    titre: "Des infos vérifiées, des avis honnêtes",
    texte:
      "Les faits sont contrôlés et les sources citées sous l'article. Un produit qui ne vaut pas son prix ? On te le dit.",
  },
];

const FAQ = [
  {
    question: "C'est quoi, Techno Play ?",
    answer:
      "Le QG des débutants en technologie : un site gratuit, en français, qui explique l'IA, la robotique, la maison connectée, la programmation, tes appareils et la sécurité avec des mots simples et des exemples concrets.",
  },
  {
    question: "Faut-il s'y connaître pour comprendre les articles ?",
    answer:
      "Non, c'est fait pour ça. Chaque article part de zéro, explique chaque mot technique au passage et commence par un résumé « L'essentiel en 30 secondes ».",
  },
  {
    question: "Par où commencer ?",
    answer:
      "Choisis le thème qui t'intéresse dans le menu ou sur cette page, puis ouvre un article. Le résumé en haut te donne l'essentiel, la suite te guide pas à pas.",
  },
  {
    question: "D'où viennent vos informations ?",
    answer:
      "De sources vérifiables : documentation officielle, pages d'assistance des constructeurs et des éditeurs, textes de référence. Elles sont listées en bas de chaque article, avec leur date de consultation.",
  },
  {
    question: "Les articles sont-ils gratuits ?",
    answer: "Oui. Tout le site est en accès libre, sans inscription ni abonnement.",
  },
  {
    question: "Je ne trouve pas la réponse à ma question. Que faire ?",
    answer:
      "Écris-nous via la page Contact. Aucune question n'est trop basique : si elle intéresse d'autres lecteurs, elle deviendra peut-être un article.",
  },
];

export default function HomePage() {
  const posts = getAllPosts();
  const editor = AUTHORS.find((a) => a.slug === DEFAULT_AUTHOR_SLUG);
  const equipe = [editor, ...AUTHORS.filter((a) => a.slug !== DEFAULT_AUTHOR_SLUG)].filter(
    (a): a is NonNullable<typeof a> => Boolean(a)
  );
  // Crédits : uniquement les photos réellement affichées sur cette page.
  const photos = [
    ...new Set([P.hero, P.marque, P.cta, ...Object.values(PHOTO_THEME)]),
  ];

  return (
    <>
      <JsonLd data={faqSchema(FAQ)} />

      {/* 1. Hero */}
      <section className="container hero hero--split">
        <div className="hero__text">
          <div className="hero-eyebrow">
            <span className="dot" aria-hidden="true" />
            <span>Le QG des débutants en tech</span>
          </div>
          <h1>
            <span className="brand">Techno Play</span> — la tech expliquée
            simplement, pour les débutants
          </h1>
          <p className="lead">
            IA, robots, maison connectée, programmation… Tu débutes et tout
            te paraît un peu flou ? Tu es au bon endroit. Ici, chaque sujet
            part de zéro : des mots simples, un exemple concret, des étapes
            claires. Aucune question n&apos;est bête.
          </p>
          <div className="hero-actions">
            <a className="btn btn--primary" href="#sujets">
              Choisir mon sujet
            </a>
            <a className="btn btn--secondary" href="#derniers-articles">
              Lire les derniers articles
            </a>
          </div>
          <ul className="hero-proof">
            <li>
              <Icon name="check" size={18} />
              Zéro jargon : chaque mot technique est expliqué
            </li>
            <li>
              <Icon name="check" size={18} />
              Un exemple concret dans chaque article
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

      {/* 2. Choisis ton sujet */}
      <section id="sujets" className="home-section trends-section" aria-labelledby="sujets-titre">
        <div className="container">
          <p className="kicker">Six thèmes, pas un de plus</p>
          <h2 id="sujets-titre">Qu&apos;est-ce que tu aimerais comprendre ?</h2>
          <p className="section-intro">
            Choisis un thème. Chacun te mène à des articles qui partent de
            zéro, avec une question de débutant en exemple.
          </p>
          <ul className="trend-grid trend-grid--themes">
            {CATEGORIES.map((category) => (
              <li key={category.slug} className="trend-tile">
                {/* eslint-disable-next-line @next/next/no-img-element -- export statique */}
                <img
                  {...imgProps(PHOTO_THEME[category.slug], "(min-width: 1024px) 400px, (min-width: 600px) 50vw, 100vw")}
                  loading="lazy"
                  decoding="async"
                />
                <div className="trend-tile__body">
                  <span className="trend-tile__tag" aria-hidden="true">
                    <Icon name={category.icon} size={16} />
                  </span>
                  <h3>
                    <a href={categoryUrl(category)}>{category.title}</a>
                  </h3>
                  <p>{category.description}</p>
                  <p className="trend-tile__example">
                    Par exemple\u00a0: «\u00a0{nbsp(category.questions[0].question)}\u00a0»
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 3. Derniers articles */}
      <section id="derniers-articles" className="home-section">
        <div className="container">
          <h2>Les derniers articles</h2>
          <p className="section-intro">
            Chaque article commence par l&apos;essentiel en 30 secondes, puis
            explique tout pas à pas. Les sources sont listées tout en bas.
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

      {/* 4. Comment on explique les choses */}
      <section className="engagements-section">
        <div className="container">
          <p className="kicker">Notre façon d&apos;expliquer</p>
          <h2>Comment on rend la tech simple</h2>
          <p className="section-intro">
            Chaque article suit les mêmes quatre règles. Tu sais donc toujours
            à quoi t&apos;attendre.
          </p>
          <ul className="promise-grid">
            {ENGAGEMENTS.map((e) => (
              <li key={e.titre} className="card promise-card">
                <span className="icon-tile" aria-hidden="true">
                  <Icon name={e.icon} size={22} />
                </span>
                <h3>{e.titre}</h3>
                <p>{e.texte}</p>
              </li>
            ))}
          </ul>
          <p className="method__note">
            <strong>Indépendance.</strong> Aucun annonceur ne dicte la ligne
            éditoriale. Certains guides d&apos;achat peuvent contenir des
            liens d&apos;affiliation : ils sont signalés, et ne changent
            jamais un avis.
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
      </section>

      {/* 5. Le nom de marque */}
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

      {/* 7. FAQ + appel à poser sa question */}
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
              <h2>Une question de débutant ? Pose-la.</h2>
              <p>
                Dis-nous ce que tu aimerais comprendre. Il n&apos;y a pas de
                question bête : si elle intéresse d&apos;autres lecteurs, elle
                deviendra peut-être notre prochain article.
              </p>
              <a className="btn btn--light" href="/contact/">
                Poser ma question
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
