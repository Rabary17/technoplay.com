import { getAllPosts } from "@/lib/posts";
import { SITE_DESCRIPTION } from "@/lib/site";

// Accueil = listing du blog. Pas de pagination pour l'instant (volume
// visé trop faible pour en avoir besoin) — à ajouter le jour où la liste
// dépasse une trentaine d'articles, sur le même principe que
// app/categorie/[slug]/page.tsx sur monauto/Techcars.
export default function HomePage() {
  const posts = getAllPosts();

  return (
    <>
      <h1>Techno Play</h1>
      <p>{SITE_DESCRIPTION}</p>

      {posts.length === 0 ? (
        <p className="empty-state">Aucun article publié pour l&apos;instant.</p>
      ) : (
        <ul className="post-list">
          {posts.map((post) => (
            <li key={post.slug}>
              <a href={`/${post.slug}/`}>
                <h2>{post.title}</h2>
              </a>
              <p className="post-meta">
                <time dateTime={post.date}>{post.date}</time>
                {post.author ? ` · ${post.author}` : ""}
              </p>
              <p className="post-description">{post.description}</p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
