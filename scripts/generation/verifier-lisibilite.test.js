"use strict";
const test = require("node:test");
const assert = require("node:assert");
const { verifier, phrases, nbMots } = require("./verifier-lisibilite");

const ENCADRES = '<div class="essentiel">\n\n**L\'essentiel en 30 secondes**\n\nUn VPN cache ta connexion.\n\n</div>\n\n<div class="exemple">\n\n**Un exemple concret**\n\nTu es au café.\n\n</div>\n\n';

test("un article simple avec ses deux encadrés : rien à signaler", () => {
  const md = ENCADRES + "## C'est quoi ?\n\nUn VPN est un tunnel privé. Il cache ce que tu fais. C'est utile en voyage.\n";
  assert.deepStrictEqual(verifier(md), []);
});

test("encadrés manquants", () => {
  const a = verifier("Une phrase simple ici.\n");
  assert.ok(a.some((m) => m.includes("essentiel")));
  assert.ok(a.some((m) => m.includes("exemple")));
});

test("phrase de plus de 25 mots signalée, titres et tableaux ignorés", () => {
  const longue = Array(30).fill("mot").join(" ") + ".";
  const a = verifier(ENCADRES + `## ${longue}\n\n| ${longue} |\n|---|\n\n${longue}\n`);
  assert.strictEqual(a.filter((m) => m.includes("phrase")).length >= 1, true);
  assert.deepStrictEqual(phrases(`## ${longue}\n\n| ${longue} |\n`), []);
});

test("formules qui infantilisent, accents tolérés", () => {
  const a = verifier(ENCADRES + "Il suffit de cliquer. Évidemment, c'est simple.\n");
  assert.ok(a.some((m) => m.includes("il suffit de") && m.includes("evidemment")));
});

test("nbMots et nettoyage du Markdown (liens, gras, listes)", () => {
  assert.strictEqual(nbMots("un deux trois"), 3);
  assert.deepStrictEqual(phrases("- **Un VPN** cache [ta connexion](https://x.fr) en ligne."), ["Un VPN cache ta connexion en ligne."]);
});
