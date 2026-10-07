// Contrôle de lisibilité « débutants » — AVERTISSEMENTS, jamais bloquant
// (sauf avec --strict). Complète verifier-contenu.js (garde-fou « date de
// coupure », lui bloquant) : celui-ci vérifie que les faits sont sûrs, celui-là
// que le texte reste simple pour un novice. Règles (voir README.md,
// « Structure d'un article » et la charte de ton) :
//   1. un encadré « L'essentiel en 30 secondes » (<div class="essentiel">) ;
//   2. un encadré « Un exemple concret » (<div class="exemple">) ;
//   3. phrases courtes : aucune au-dessus de 25 mots, moyenne ≤ 20 ;
//   4. aucune formule qui infantilise (« il suffit de », « évidemment »…).
// Lancé par `npm run lisibilite` et par le `prebuild` (sans bloquer).
"use strict";
const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

const DIR = path.join(__dirname, "..", "..", "content", "posts");
const MAX_MOTS = 25;
const MOYENNE_MAX = 20;

// Formules à éviter : elles laissent entendre que c'est « évident » — exactement
// ce qu'un débutant ne doit jamais ressentir.
const FORMULES = [
  "il suffit de",
  "evidemment",
  "c'est evident",
  "comme chacun sait",
  "tout le monde sait",
  "trivial",
];

const sansAccents = (s) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

/** Markdown/HTML d'un article → phrases de texte courant (sans titres, tableaux, code, encadrés vides). */
function phrases(markdown) {
  const texte = markdown
    .replace(/<!--[\s\S]*?-->/g, " ")
    .replace(/```[\s\S]*?```/g, " ")
    .split("\n")
    .filter((l) => !/^\s*(#{1,6}\s|\|)/.test(l))
    .join("\n")
    .replace(/<[^>]+>/g, " ")
    .replace(/!?\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/^\s*>\s?/gm, "")
    .replace(/^\s*(?:[-*+]|\d+\.)\s+/gm, "")
    .replace(/[*_`]/g, "")
    .replace(/\s+/g, " ")
    .trim();
  return texte
    .split(/(?<=[.!?…])\s+/)
    .map((p) => p.trim())
    .filter((p) => p.split(/\s+/).filter(Boolean).length >= 3);
}

const nbMots = (phrase) => phrase.split(/\s+/).filter(Boolean).length;

/** @returns {string[]} avertissements (vide = rien à signaler) */
function verifier(markdown) {
  const avertissements = [];
  if (!/class=["']essentiel["']/.test(markdown)) {
    avertissements.push("pas d'encadré « L'essentiel en 30 secondes » (<div class=\"essentiel\">)");
  }
  if (!/class=["']exemple["']/.test(markdown)) {
    avertissements.push("pas d'encadré « Un exemple concret » (<div class=\"exemple\">)");
  }
  const liste = phrases(markdown);
  const longues = liste.filter((p) => nbMots(p) > MAX_MOTS);
  if (longues.length) {
    const extrait = longues[0].split(/\s+/).slice(0, 8).join(" ");
    avertissements.push(
      `${longues.length} phrase${longues.length > 1 ? "s" : ""} de plus de ${MAX_MOTS} mots (ex. « ${extrait}… »)`
    );
  }
  if (liste.length >= 5) {
    const moyenne = liste.reduce((somme, p) => somme + nbMots(p), 0) / liste.length;
    if (moyenne > MOYENNE_MAX) {
      avertissements.push(`phrases trop longues en moyenne (${moyenne.toFixed(1)} mots, visé : ${MOYENNE_MAX} ou moins)`);
    }
  }
  const brut = sansAccents(markdown.replace(/[’‘]/g, "'"));
  const trouvees = FORMULES.filter((f) => brut.includes(f));
  if (trouvees.length) {
    avertissements.push(`formule qui infantilise : ${trouvees.map((f) => `« ${f} »`).join(", ")}`);
  }
  return avertissements;
}

module.exports = { verifier, phrases, nbMots, FORMULES, MAX_MOTS, MOYENNE_MAX };

if (require.main === module) {
  const strict = process.argv.includes("--strict");
  const fichiers = fs.existsSync(DIR) ? fs.readdirSync(DIR).filter((f) => f.endsWith(".md")) : [];
  let total = 0;
  for (const f of fichiers) {
    const { content } = matter(fs.readFileSync(path.join(DIR, f), "utf8"));
    const a = verifier(content);
    total += a.length;
    for (const message of a) console.warn(`  ⚠ ${f} — ${message}`);
  }
  if (total === 0) {
    console.log("✓ Lisibilité débutants : rien à signaler.");
  } else {
    console.warn(`  → ${total} avertissement${total > 1 ? "s" : ""} de lisibilité (non bloquant). Règles : README.md, « Structure d'un article ».`);
    if (strict) process.exit(1);
  }
}
