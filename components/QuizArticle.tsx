"use client";

import { useEffect, useState } from "react";
import type { QuestionQuiz } from "@/lib/quiz-articles";

// Quiz intégré à un article : tirage aléatoire de questions, ordre des
// réponses mélangé, compte à rebours par question (désactivable), points
// (plus de points si on répond vite) et écran de résultat avec une blague
// selon le score. Le tirage se fait après le chargement, côté navigateur,
// pour éviter tout écart entre le HTML rendu et l'affichage.

const TEMPS_MS = 20000;
const PAS_MS = 100;
const POINTS_BONNE = 100;
const BONUS_MAX = 100;

interface ChoixTire {
  texte: string;
  estBonne: boolean;
}

interface QuestionTiree {
  question: string;
  explication: string;
  choix: ChoixTire[];
}

interface Resultat {
  bonne: boolean;
  temps: boolean;
  points: number;
}

const PALIERS = [
  {
    min: 100,
    titre: "Légende vivante",
    blagues: [
      "Score parfait ! Ton cerveau tourne plus vite que le modem de 1998, et lui, c'était déjà un exploit.",
      "Sans faute, comme un drone bien stabilisé. Il ne manque plus que la cape.",
      "Même l'IA te demanderait conseil maintenant. On te réserve déjà une place au panthéon des geeks.",
    ],
  },
  {
    min: 80,
    titre: "Pro du bon sens",
    blagues: [
      "Tu tiens la route, comme une voiture bien réglée. Encore un petit tour de piste et ce sera parfait.",
      "Presque sans faute : il reste juste assez de place pour une petite erreur, et c'est très humain.",
      "Tu réponds mieux que pas mal de tutoriels qui promettent la lune. Bravo !",
    ],
  },
  {
    min: 50,
    titre: "Explorateur confirmé",
    blagues: [
      "Tu avances à ton rythme, comme une tondeuse robot : lentement, mais en gardant le cap.",
      "À mi-chemin, c'est déjà une belle expédition. Le prochain quiz sera encore meilleur, promis.",
      "Pas mal du tout. Tu as trouvé la bonne réponse plus souvent que le hasard, et ça compte.",
    ],
  },
  {
    min: 0,
    titre: "Apprenti curieux",
    blagues: [
      "Pas de panique : même un aspirateur robot se coince sous le canapé. Relis l'article et reviens te venger.",
      "Ton score fait moins de bruit qu'un drone en panne. Pas grave : c'est justement pour ça qu'on relit.",
      "Une IA aussi aurait besoin de réviser après un tel score. Relis, puis reprends le quiz : la revanche est possible.",
    ],
  },
];

function melanger<T>(items: T[]): T[] {
  const a = [...items];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function tirer(banque: QuestionQuiz[], n: number): QuestionTiree[] {
  return melanger(banque)
    .slice(0, Math.min(n, banque.length))
    .map((q) => ({
      question: q.question,
      explication: q.explication,
      choix: melanger(q.choix.map((texte, i) => ({ texte, estBonne: i === q.bonne }))),
    }));
}

export default function QuizArticle({
  questions,
  titre = "Teste-toi",
  tirage = 5,
}: {
  questions: QuestionQuiz[];
  titre?: string;
  tirage?: number;
}) {
  const [phase, setPhase] = useState<"intro" | "jeu" | "fin">("intro");
  const [tranquille, setTranquille] = useState(false);
  const [partie, setPartie] = useState<QuestionTiree[]>([]);
  const [index, setIndex] = useState(0);
  const [choisi, setChoisi] = useState<number | null>(null);
  const [restant, setRestant] = useState(TEMPS_MS);
  const [resultats, setResultats] = useState<Resultat[]>([]);
  const [blague, setBlague] = useState("");

  const n = Math.min(tirage, questions.length);

  function demarrer() {
    setPartie(tirer(questions, tirage));
    setIndex(0);
    setChoisi(null);
    setRestant(TEMPS_MS);
    setResultats([]);
    setPhase("jeu");
  }

  // i = position du choix dans la question, -1 = temps écoulé
  function repondre(i: number) {
    if (choisi !== null) return;
    const q = partie[index];
    const bonne = i >= 0 && q.choix[i].estBonne;
    const bonus = bonne && !tranquille ? Math.round((restant / TEMPS_MS) * BONUS_MAX) : 0;
    setChoisi(i);
    setResultats((r) => [...r, { bonne, temps: i === -1, points: bonne ? POINTS_BONNE + bonus : 0 }]);
  }

  function suivant() {
    if (index + 1 < partie.length) {
      setIndex(index + 1);
      setChoisi(null);
      setRestant(TEMPS_MS);
    } else {
      const bonnes = resultats.filter((r) => r.bonne).length;
      const pct = (bonnes / partie.length) * 100;
      const palier = PALIERS.find((p) => pct >= p.min) ?? PALIERS[PALIERS.length - 1];
      setBlague(palier.blagues[Math.floor(Math.random() * palier.blagues.length)]);
      setPhase("fin");
    }
  }

  // Compte à rebours : décroît par pas, puis déclenche le temps écoulé
  useEffect(() => {
    if (phase !== "jeu" || choisi !== null || tranquille) return;
    if (restant <= 0) {
      repondre(-1);
      return;
    }
    const id = window.setTimeout(() => setRestant((r) => Math.max(0, r - PAS_MS)), PAS_MS);
    return () => window.clearTimeout(id);
  }, [phase, choisi, restant, tranquille]);

  const total = resultats.reduce((s, r) => s + r.points, 0);
  const bonnes = resultats.filter((r) => r.bonne).length;
  const pctBonnes = partie.length ? (bonnes / partie.length) * 100 : 0;
  const palier = PALIERS.find((p) => pctBonnes >= p.min) ?? PALIERS[PALIERS.length - 1];
  const etoiles = Math.round((bonnes / Math.max(1, partie.length)) * 5);
  const q = partie[index];
  const pointsCumules = resultats.reduce((s, r) => s + r.points, 0);

  return (
    <section className="quiz-article" aria-labelledby="quiz-article-titre">
      <h2 id="quiz-article-titre">{titre}</h2>

      {phase === "intro" ? (
        <div className="quiz-article__intro">
          <p>
            {n} questions tirées au hasard parmi {questions.length}. Chaque bonne réponse rapporte des points,
            et plus tu réponds vite, plus tu en gagnes.
          </p>
          <label className="quiz-article__tranquille">
            <input type="checkbox" checked={tranquille} onChange={(e) => setTranquille(e.target.checked)} />
            Mode tranquille (sans chrono)
          </label>
          <div>
            <button type="button" className="btn btn--primary" onClick={demarrer}>
              Lancer le quiz
            </button>
          </div>
        </div>
      ) : null}

      {phase === "jeu" && q ? (
        <div key={index} className="quiz-article__jeu">
          <div className="quiz-article__entete">
            <span>Question {index + 1} sur {partie.length}</span>
            <span className="quiz-article__points">{pointsCumules} pts</span>
          </div>

          {!tranquille ? (
            <div className="quiz-article__chrono" aria-hidden="true">
              <span
                className={restant <= 5000 ? "is-danger" : ""}
                style={{ width: `${(restant / TEMPS_MS) * 100}%` }}
              />
            </div>
          ) : null}
          {!tranquille ? (
            <p className="quiz-article__secondes" aria-live="off">
              {choisi === null ? `${Math.ceil(restant / 1000)} s` : ""}
            </p>
          ) : null}

          <p className="quiz-article__question">{q.question}</p>

          <div className="quiz-article__choix">
            {q.choix.map((c, i) => {
              let etat = "";
              if (choisi !== null) {
                if (c.estBonne) etat = " is-bonne";
                else if (i === choisi) etat = " is-mauvaise";
              }
              return (
                <button
                  key={c.texte}
                  type="button"
                  className={`quiz-article__option${etat}`}
                  onClick={() => repondre(i)}
                  disabled={choisi !== null}
                >
                  {c.texte}
                </button>
              );
            })}
          </div>

          {choisi !== null ? (
            <div className={`quiz-article__retour ${resultats[resultats.length - 1]?.bonne ? "is-ok" : "is-ko"}`}>
              <p>
                <strong>
                  {resultats[resultats.length - 1]?.bonne
                    ? `Bravo ! +${resultats[resultats.length - 1].points} pts`
                    : choisi === -1
                      ? "Temps écoulé !"
                      : "Pas tout à fait."}
                </strong>{" "}
                {q.explication}
              </p>
              <button type="button" className="btn btn--primary" onClick={suivant}>
                {index + 1 < partie.length ? "Question suivante" : "Voir mon score"}
              </button>
            </div>
          ) : null}
        </div>
      ) : null}

      {phase === "fin" ? (
        <div className="quiz-article__fin">
          <p className="quiz-article__score" aria-label={`${total} points sur ${partie.length * (POINTS_BONNE + BONUS_MAX)}`}>
            {total}
            <span> pts</span>
          </p>
          <p className="quiz-article__sur">
            {bonnes} bonne{bonnes > 1 ? "s" : ""} réponse{bonnes > 1 ? "s" : ""} sur {partie.length}
          </p>
          <p className="quiz-article__etoiles" aria-label={`${etoiles} étoiles sur 5`}>
            {[0, 1, 2, 3, 4].map((k) => (
              <span key={k} className={k < etoiles ? "is-on" : ""} style={{ animationDelay: `${k * 0.1}s` }} aria-hidden="true">
                ★
              </span>
            ))}
          </p>
          <p className="quiz-article__palier">{palier.titre}</p>
          <p className="quiz-article__blague">{blague}</p>
          <div className="quiz-article__actions">
            <button type="button" className="btn btn--primary" onClick={demarrer}>
              Rejouer
            </button>
          </div>
        </div>
      ) : null}
    </section>
  );
}
