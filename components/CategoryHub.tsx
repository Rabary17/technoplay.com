import Icon from "@/components/Icon";
import ArticleCard from "@/components/ArticleCard";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { getAllSlugs, getPostsByCategory } from "@/lib/posts";
import { categoryUrl, type Category } from "@/lib/categories";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import { nbsp } from "@/lib/format";

// Page d'un thème (/<theme>/) : présentation en une phrase simple, les
// questions de débutant auxquelles le thème répond (liées à l'article dès
// qu'il est publié), puis tous les articles du thème. Page de navigation :
// en `noindex, follow` (voir app/[slug]/page.tsx).
export default function CategoryHub({ category }: { category: Category }) {
  const posts = getPostsByCategory(category.slug);
  const publies = new Set(getAllSlugs());
  return (
    <div className="container hub">
      <Breadcrumbs
        items={[
          { name: "Accueil", href: "/" },
          { name: category.title, href: categoryUrl(category) },
        ]}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: category.title,
          description: category.description,
          url: `${SITE_URL}${categoryUrl(category)}`,
          isPartOf: { "@type": "WebSite", name: SITE_NAME, url: SITE_URL },
        }}
      />
      <header className="hub-header">
        <span className="icon-tile">
          <Icon name={category.icon} size={26} />
        </span>
        <h1>{category.title}</h1>
        <p className="lead">{category.body}</p>
      </header>

      <section className="hub-section">
        <h2>Les questions qu&apos;on t&apos;explique ici</h2>
        <ul className="question-list">
          {category.questions.map((q) => (
            <li key={q.question}>
              <Icon name="arrow-right" size={16} />
              {q.slug && publies.has(q.slug) ? (
                <a href={`/${q.slug}/`}>{nbsp(q.question)}</a>
              ) : (
                <span>{nbsp(q.question)}</span>
              )}
            </li>
          ))}
        </ul>
      </section>

      <section className="hub-section">
        <h2>Les articles</h2>
        {posts.length === 0 ? (
          <p className="empty-state">
            Les premiers articles de ce thème arrivent très vite. Repasse bientôt !
          </p>
        ) : (
          <div className="article-grid">
            {posts.map((post) => (
              <ArticleCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
