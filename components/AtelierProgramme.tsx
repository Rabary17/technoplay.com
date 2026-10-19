import { getPostBySlug } from "@/lib/posts";
import { ModulesCliquables, MiniQuiz } from "@/components/AtelierInteractif";
import type { PROGRAMMES } from "@/lib/atelier-ia";

type Programme = (typeof PROGRAMMES)[number];

// Contenu complet d'un atelier (page dédiée parents ou lycéens).
export default function AtelierProgramme({ programme }: { programme: Programme }) {
  return (
    <>
      <p>
        <strong>Public :</strong> {programme.public}
      </p>
      <p>
        <strong>Objectif :</strong> {programme.objectif}
      </p>

      <h2>Programme</h2>
      <p className="atelier-indice">Clique sur une étape pour l’ouvrir.</p>
      <ModulesCliquables modules={programme.modules} />

      <h2>Teste-toi</h2>
      <MiniQuiz questions={programme.quiz} />

      <h2>Pour aller plus loin</h2>
      <ul>
        {programme.liens.map((slug) => {
          const post = getPostBySlug(slug);
          return post ? (
            <li key={slug}>
              <a href={`/${slug}/`}>{post.title}</a>
            </li>
          ) : null;
        })}
      </ul>
    </>
  );
}
