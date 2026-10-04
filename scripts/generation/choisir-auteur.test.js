"use strict";
const test = require("node:test");
const assert = require("node:assert");
const fs = require("fs");
const path = require("path");
const { choisirAuteur, correspondances, ecrireAuteur, REGLES } = require("./choisir-auteur");

const racine = path.join(__dirname, "..", "..");
const slugsAuteurs = [...fs.readFileSync(path.join(racine, "lib/authors.ts"), "utf8").matchAll(/^\s{4}slug: "([^"]+)"/gm)].map((m) => m[1]);
const slugsCategories = [...fs.readFileSync(path.join(racine, "lib/categories.ts"), "utf8").matchAll(/slug: "([^"]+)"/g)].map((m) => m[1]);

test("chaque sous-catégorie a un titulaire, et chaque auteur cité existe", () => {
  const sousCategories = slugsCategories.filter((s) => !["guides-tutos", "comparatifs-achats", "decryptage-concepts", "actu-tech"].includes(s));
  for (const s of sousCategories) assert.ok(REGLES.categories[s], `sous-catégorie sans titulaire : ${s}`);
  for (const [cat, a] of Object.entries(REGLES.categories)) {
    assert.ok(sousCategories.includes(cat), `catégorie inconnue : ${cat}`);
    assert.ok(slugsAuteurs.includes(a), `auteur inconnu : ${a}`);
  }
  for (const a of Object.keys(REGLES.motsCles)) assert.ok(slugsAuteurs.includes(a), `auteur inconnu : ${a}`);
  assert.ok(slugsAuteurs.includes(REGLES.defaut));
});

test("mots-clés : mot entier, sans accents, pluriel toléré", () => {
  assert.deepStrictEqual(Object.keys(correspondances("Les meilleures manettes pour PC")), ["andee-rakotovao"]);
  assert.deepStrictEqual(Object.keys(correspondances("Contrôle parental : protéger ses enfants")), ["mialy-andriaharisoa"]);
  assert.deepStrictEqual(correspondances("Mode avion, mode sombre : les réglages"), {});
  assert.deepStrictEqual(correspondances("Le code PIN de la carte SIM"), {});
});

test("la spécialité l'emporte sur la sous-catégorie", () => {
  assert.strictEqual(choisirAuteur({ titre: "Meilleur sèche-cheveux connecté", categorie: "domotique-maison-connectee" }).auteur, "felana-rabarivelo");
  assert.strictEqual(choisirAuteur({ titre: "PS5 ou Xbox : quelle console choisir ?", categorie: "annonces-produits" }).auteur, "andee-rakotovao");
});

test("égalité ou aucun mot-clé : titulaire de la sous-catégorie, puis rédacteur en chef", () => {
  assert.strictEqual(choisirAuteur({ titre: "Changer le mot de passe Wi-Fi de ta box", categorie: "reseau-stockage" }).auteur, "nekena-judicael");
  assert.strictEqual(choisirAuteur({ titre: "OLED ou QLED : quelle dalle choisir ?", categorie: "hardware-innovation" }).auteur, "andee-rakotovao");
  assert.strictEqual(choisirAuteur({ titre: "Un titre neutre" }).auteur, REGLES.defaut);
});

test("ecrireAuteur remplace ou insère la ligne author sans toucher au reste", () => {
  const avec = '---\ntitle: "X"\ndate: "2026-10-03"\nauthor: "andrianina-rabarivelo"\n---\n\nCorps';
  assert.match(ecrireAuteur(avec, "andee-rakotovao"), /author: "andee-rakotovao"\n---\n\nCorps$/);
  const sans = '---\ntitle: "X"\ndate: "2026-10-03"\n---\nCorps';
  assert.match(ecrireAuteur(sans, "mialy-andriaharisoa"), /date: "2026-10-03"\nauthor: "mialy-andriaharisoa"\n---/);
});
