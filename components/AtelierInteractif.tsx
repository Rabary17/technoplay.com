"use client";

import { useState } from "react";

// Éléments interactifs de la page atelier : modules cliquables qui s'ouvrent
// avec une animation, et mini-quiz avec retour immédiat. Pensés pour les
// lycéens, lisibles aussi par les parents. Les animations sont désactivées
// si l'utilisateur demande moins de mouvement (voir globals.css).

export interface ModuleAtelier {
  titre: string;
  texte: string;
}

export function ModulesCliquables({ modules }: { modules: ModuleAtelier[] }) {
  const [ouvert, setOuvert] = useState<number | null>(0);
  return (
    <ol className="atelier-cartes">
      {modules.map((m, i) => {
        const estOuvert = ouvert === i;
        return (
          <li key={m.titre} className={`atelier-carte-module${estOuvert ? " is-open" : ""}`}>
            <button
              type="button"
              className="atelier-carte-module__bouton"
              aria-expanded={estOuvert}
              onClick={() => setOuvert(estOuvert ? null : i)}
            >
              <span className="atelier-carte-module__num" aria-hidden="true">{i + 1}</span>
              <span className="atelier-carte-module__titre">{m.titre}</span>
              <span className="atelier-carte-module__fleche" aria-hidden="true">›</span>
            </button>
            <div className="atelier-carte-module__corps">
              <div>
                <p>{m.texte}</p>
              </div>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

export interface QuestionQuiz {
  question: string;
  choix: string[];
  bonne: number;
  explication: string;
}

export function MiniQuiz({ questions }: { questions: QuestionQuiz[] }) {
  const [index, setIndex] = useState(0);
  const [choisi, setChoisi] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const fini = index >= questions.length;
  const q = questions[index];

  function repondre(i: number) {
    if (choisi !== null) return;
    setChoisi(i);
    if (i === q.bonne) setScore((s) => s + 1);
  }

  function suivant() {
    setChoisi(null);
    setIndex((n) => n + 1);
  }

  function recommencer() {
    setIndex(0);
    setChoisi(null);
    setScore(0);
  }

  const progression = Math.round((index / questions.length) * 100);

  return (
    <div className="atelier-quiz" aria-live="polite">
      <div className="atelier-quiz__barre" aria-hidden="true">
        <span style={{ width: `${fini ? 100 : progression}%` }} />
      </div>

      {fini ? (
        <div className="atelier-quiz__fin">
          <p className="atelier-quiz__score">
            {score} / {questions.length} bonne{score > 1 ? "s" : ""} réponse{score > 1 ? "s" : ""}
          </p>
          <button type="button" className="btn btn--secondary" onClick={recommencer}>
            Recommencer
          </button>
        </div>
      ) : (
        <div key={index} className="atelier-quiz__carte">
          <p className="atelier-quiz__compteur">Question {index + 1} sur {questions.length}</p>
          <p className="atelier-quiz__question">{q.question}</p>
          <div className="atelier-quiz__choix">
            {q.choix.map((c, i) => {
              let etat = "";
              if (choisi !== null) {
                if (i === q.bonne) etat = " is-bonne";
                else if (i === choisi) etat = " is-mauvaise";
              }
              return (
                <button
                  key={c}
                  type="button"
                  className={`atelier-quiz__option${etat}`}
                  onClick={() => repondre(i)}
                  disabled={choisi !== null}
                >
                  {c}
                </button>
              );
            })}
          </div>
          {choisi !== null ? (
            <div className={`atelier-quiz__retour ${choisi === q.bonne ? "is-ok" : "is-ko"}`}>
              <p>
                <strong>{choisi === q.bonne ? "Bravo !" : "Pas tout à fait."}</strong> {q.explication}
              </p>
              <button type="button" className="btn btn--primary" onClick={suivant}>
                {index + 1 < questions.length ? "Question suivante" : "Voir mon score"}
              </button>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}
