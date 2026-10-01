import { getAllPosts, resolveCoverImage } from "@/lib/posts";
import { CATEGORIES, getCategory } from "@/lib/categories";
import Icon from "@/components/Icon";

// Accueil = hero + promesse éditoriale + grille des 8 rubriques + listing
// du blog, repris de la maquette livrée le 2026-09-30 (Techno Play
// Accueil.dc.html). Le texte (rédigé le 2026-09-30, ~1200 mots) sert aussi
// de brief de contenu pour la maquette — voir lib/categories.ts pour le
// détail par rubrique. Pas de pagination sur le listing pour l'instant
// (volume visé trop faible pour en avoir besoin) — à ajouter le jour où la
// liste dépasse une trentaine d'articles, sur le même principe que
// app/categorie/[slug]/page.tsx sur monauto/Techcars.
export default function HomePage() {
  const posts = getAllPosts();

  return (
    <>
      <section className="container hero">
        <div className="hero-eyebrow">
          <span className="dot" aria-hidden="true" />
          <span>Média tech indépendant</span>
        </div>
        <h1>
          <span className="brand">Techno Play</span> — la tech, les jeux,
          l&apos;IA et la crypto expliqués simplement
        </h1>
        <p className="lead">
          Techno Play est un média indépendant qui décrypte la technologie
          sous toutes ses formes : gadgets, jeux vidéo, réalité virtuelle,
          intelligence artificielle, robotique, drones et crypto-monnaies.
          Notre objectif est simple : vous aider à comprendre ce qui compte
          vraiment, sans jargon inutile et sans emballement artificiel
          autour de la moindre annonce. Que vous soyez simplement curieux,
          joueur passionné, développeur, investisseur ou juste
          quelqu&apos;un qui essaie de suivre le rythme d&apos;un secteur
          qui change chaque semaine, vous trouverez ici des articles pensés
          pour être utiles en premier lieu — pas pour remplir une grille de
          mots-clés ni gonfler artificiellement une audience. Chaque
          semaine apporte son lot d&apos;annonces, de lancements et de
          promesses ; notre travail consiste à trier ce qui mérite votre
          attention de ce qui n&apos;est que du bruit.
        </p>
        <div className="hero-chips">
          {CATEGORIES.map((cat) => (
            <a key={cat.slug} href="#rubriques">
              <Icon name={cat.icon} size={16} />
              <span>{cat.short}</span>
            </a>
          ))}
        </div>
      </section>

      <section className="promise-section">
        <div className="container">
          <div className="promise-heading">
            <svg
              className="icon-tile"
              viewBox="0 0 64 64"
              width="40"
              height="40"
              aria-hidden="true"
            >
              <rect width="64" height="64" rx="16" fill="var(--brand-soft)" />
              <polygon
                points="15,17 15,47 37,32"
                fill="var(--brand)"
                stroke="var(--brand)"
                strokeWidth="5"
                strokeLinejoin="round"
              />
              <circle cx="48" cy="44" r="5.5" fill="var(--signal)" />
            </svg>
            <h2>Notre promesse éditoriale</h2>
          </div>
          <div className="promise-body">
            <p>
              Chaque sujet traité sur Techno Play suit la même règle :
              vérifier avant de publier. Quand un chiffre, un test ou une
              affirmation technique est cité, il est vérifié — jamais
              inventé, jamais repris tel quel d&apos;un communiqué de
              presse sans recul critique. Quand nous testons un produit,
              nous listons aussi bien ce qui fonctionne que ce qui déçoit,
              plutôt que de nous limiter aux points positifs. La ligne
              éditoriale n&apos;est influencée par aucun annonceur, et tout
              contenu sponsorisé serait clairement identifié comme tel
              s&apos;il existait. Une erreur signalée est corrigée
              ouvertement, plutôt que laissée silencieusement en ligne.
            </p>
            <p>
              Retrouvez le détail sur la page à propos, ou écrivez-nous
              directement pour signaler une erreur, proposer un sujet ou
              simplement dire bonjour.
            </p>
            <div className="promise-actions">
              <a className="btn btn--primary" href="/a-propos/">
                À propos
              </a>
              <a className="btn btn--secondary" href="/contact/">
                Contact
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="rubriques" className="home-section">
        <div className="container">
          <h2>Nos rubriques</h2>
          <p className="section-intro">
            Le site est organisé autour de huit grands thèmes qui se
            recoupent souvent — l&apos;intelligence artificielle infuse
            aujourd&apos;hui les jeux vidéo autant que la robotique, et la
            frontière entre tech et crypto n&apos;a jamais été aussi fine.
          </p>
          <div className="category-grid">
            {CATEGORIES.map((cat, i) => (
              <article className="card category-card" key={cat.slug}>
                <div className="category-card__head">
                  <span className="icon-tile">
                    <Icon name={cat.icon} size={24} />
                  </span>
                  <span className="category-card__num">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3>{cat.title}</h3>
                <p>{cat.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="home-section">
        <div className="container">
          <h2>Derniers articles</h2>
          {posts.length === 0 ? (
            <p className="empty-state">Aucun article publié pour l&apos;instant.</p>
          ) : (
            <div className="article-grid">
              {posts.map((post) => {
                const cover = resolveCoverImage(post);
                const category = getCategory(post.category);
                return (
                  <article className="card article-card" key={post.slug}>
                    {/* eslint-disable-next-line @next/next/no-img-element --
                        export statique (images.unoptimized dans
                        next.config.ts), un <img> simple évite le poids du
                        loader next/image pour rien ici. */}
                    <img
                      className="article-card__image"
                      src={cover.src}
                      alt={cover.alt}
                      width={1200}
                      height={630}
                      loading="lazy"
                    />
                    <div className="article-card__body">
                      {category ? <span className="tag">{category.short}</span> : null}
                      <h3>
                        <a href={`/${post.slug}/`}>{post.title}</a>
                      </h3>
                      <p className="article-card__excerpt">{post.description}</p>
                      <div className="article-card__meta">
                        <span>Par {post.author ?? "Techno Play"}</span>
                        <span aria-hidden="true">·</span>
                        <time dateTime={post.date}>{post.date}</time>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
