"use strict";
const test = require("node:test");
const assert = require("node:assert");
const fs = require("fs");
const path = require("path");
const { choisirAuteur, correspondances, ecrireAuteur, REGLES } = require("./choisir-auteur");

const racine = path.join(__dirname, "..", "..");
const slugsAuteurs = [...fs.readFileSync(path.join(racine, "lib/authors.ts"), "utf8").matchAll(/^\s{4}slug: "([^"]+)"/gm)].map((m) => m[1]);
// Thèmes : `slug: "…"` en tête de définition (4 espaces) — pas ceux des questions (`slug` d'article, 6 espaces et plus).
const slugsCategories = [...fs.readFileSync(path.join(racine, "lib/categories.ts"), "utf8").matchAll(/^ {4}slug: "([^"]+)",$/gm)].map((m) => m[1]);

test("chaque thème a un titulaire, et chaque auteur cité existe", () => {
  const themes = slugsCategories;
  assert.strictEqual(themes.length, 6, "6 thèmes à plat attendus (lib/categories.ts)");
  for (const s of themes) assert.ok(REGLES.categories[s], `thème sans titulaire : ${s}`);
  for (const [cat, a] of Object.entries(REGLES.categories)) {
    assert.ok(themes.includes(cat), `thème inconnu : ${cat}`);
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

test("la spécialité l'emporte sur le thème", () => {
  assert.strictEqual(choisirAuteur({ titre: "Meilleur sèche-cheveux connecté", categorie: "maison-connectee" }).auteur, "felana-rabarivelo");
  assert.strictEqual(choisirAuteur({ titre: "PS5 ou Xbox : quelle console choisir ?", categorie: "appareils-internet" }).auteur, "andee-rakotovao");
});

test("WordPress et intégration HTML/CSS : Dina, quel que soit le thème", () => {
  assert.strictEqual(choisirAuteur({ titre: "Installer un thème WordPress et le personnaliser avec Elementor", categorie: "programmation" }).auteur, "dina-rakotoarivelo");
  assert.strictEqual(choisirAuteur({ titre: "Centrer un élément en CSS : la méthode simple", categorie: "appareils-internet" }).auteur, "dina-rakotoarivelo");
  assert.strictEqual(choisirAuteur({ titre: "Créer un site vitrine responsive en HTML", categorie: "appareils-internet" }).auteur, "dina-rakotoarivelo");
  assert.deepStrictEqual(correspondances("Activer le mode sombre et changer de thème sur Windows"), {});
});

test("égalité ou aucun mot-clé : titulaire du thème, puis rédacteur en chef", () => {
  assert.strictEqual(choisirAuteur({ titre: "Changer le mot de passe Wi-Fi de ta box", categorie: "appareils-internet" }).auteur, "nekena-judicael");
  assert.strictEqual(choisirAuteur({ titre: "Premiers pas : par où commencer ?", categorie: "programmation" }).auteur, "andee-rakotovao");
  assert.strictEqual(choisirAuteur({ titre: "Un titre neutre" }).auteur, REGLES.defaut);
});

test("ecrireAuteur remplace ou insère la ligne author sans toucher au reste", () => {
  const avec = '---\ntitle: "X"\ndate: "2026-10-03"\nauthor: "andrianina-rabarivelo"\n---\n\nCorps';
  assert.match(ecrireAuteur(avec, "andee-rakotovao"), /author: "andee-rakotovao"\n---\n\nCorps$/);
  const sans = '---\ntitle: "X"\ndate: "2026-10-03"\n---\nCorps';
  assert.match(ecrireAuteur(sans, "mialy-andriaharisoa"), /date: "2026-10-03"\nauthor: "mialy-andriaharisoa"\n---/);
});
