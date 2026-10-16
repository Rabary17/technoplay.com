import Icon from "@/components/Icon";
import ArticleCard from "@/components/ArticleCard";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { getAllSlugs, getPostsByCategory } from "@/lib/posts";
import { ARTICLE_SOUS_CATEGORIE, categoryUrl, type Category } from "@/lib/categories";
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

      {category.sousCategories.map((sous, i) => {
        const articles = posts.filter((p) => ARTICLE_SOUS_CATEGORIE[p.slug] === sous.slug);
        return (
          <section key={sous.slug} id={sous.slug} className="hub-section hub-sous">
            <h2>
              <span className="hub-sous__num">{i + 1}</span> {sous.titre}
            </h2>
            {sous.questions.length > 0 ? (
              <ul className="question-list">
                {sous.questions.map((q) => (
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
            ) : null}
            {articles.length > 0 ? (
              <div className="article-grid">
                {articles.map((post) => (
                  <ArticleCard key={post.slug} post={post} />
                ))}
              </div>
            ) : null}
          </section>
        );
      })}
    </div>
  );
}
