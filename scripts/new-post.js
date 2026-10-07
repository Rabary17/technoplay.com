#!/usr/bin/env node
// Usage : npm run new-post -- --categorie appareils-internet "Titre de l'article"
// Crée content/posts/<slug>.md avec le frontmatter déjà rempli (date du
// jour, slug dérivé du titre) — évite les fautes de frappe dans les clés
// YAML attendues par lib/posts.ts, et le squelette d'article pour débutants
// (L'essentiel, c'est quoi, exemple, pas à pas, mots à connaître, FAQ — voir
// README.md, « Structure d'un article »). L'auteur est choisi selon sa
// spécialité (titre + thème, voir scripts/generation/choisir-auteur.js).
const fs = require("fs");
const path = require("path");
const { choisirAuteur, REGLES } = require("./generation/choisir-auteur");

const args = process.argv.slice(2);
const iCat = args.indexOf("--categorie");
const categorie = iCat >= 0 ? args[iCat + 1] : "";
const title = args.filter((_, i) => iCat < 0 || (i !== iCat && i !== iCat + 1)).join(" ").trim();
if (!title) {
  console.error('Usage : npm run new-post -- --categorie <slug> "Titre de l\'article"');
  process.exit(1);
}
if (categorie && !REGLES.categories[categorie]) {
  console.error(`Thème inconnu : ${categorie} (voir lib/categories.ts)`);
  process.exit(1);
}
const choix = choisirAuteur({ titre: title, categorie });

function slugify(s) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

const slug = slugify(title);
const dir = path.join(__dirname, "..", "content", "posts");
const file = path.join(dir, `${slug}.md`);

if (fs.existsSync(file)) {
  console.error(`Existe déjà : content/posts/${slug}.md`);
  process.exit(1);
}

const today = new Date().toISOString().slice(0, 10);
const frontmatter = `---
title: "${title.replace(/"/g, '\\"')}"
description: "TODO — une phrase simple, affichée dans le listing et les meta/OG."
date: "${today}"
# Auteur : slug de lib/authors.ts, choisi selon sa spécialité
# (${choix.raison}). Modifiable à la main.
author: "${choix.auteur}"
# Thème : un des slugs de lib/categories.ts —
#   intelligence-artificielle, robotique-drones, maison-connectee,
#   programmation, appareils-internet, securite-vie-privee
# Détermine le fil d'Ariane, l'étiquette des cartes et l'image à la une de secours.
category: "${categorie || "TODO"}"
# Date de mise à jour (optionnelle) : "AAAA-MM-JJ"
# updated: "${today}"
# Image à la une (optionnelle) : chemin sous public/ ou URL absolue. Sans
# elle, la couverture du thème ci-dessus est utilisée automatiquement
# (voir lib/posts.ts, resolveCoverImage).
# image: "/uploads/mon-image.jpg"
# imageAlt: "TODO — description de l'image pour l'accessibilité et le SEO"
---

<!--
  Squelette d'article pour DÉBUTANTS. Règles : tutoiement, phrases courtes
  (≤ 20 mots), un mot technique = une explication au moment où il apparaît,
  un exemple de la vie de tous les jours par idée, rien d'inventé (chiffres,
  dates, prix : sourcés ou absents). Supprime les commentaires et les
  blocs qui ne servent pas. Détail : README.md, « Structure d'un article ».
-->

<div class="essentiel">

**L'essentiel en 30 secondes**

TODO — la réponse à la question du titre en 2 phrases maximum, avec des mots simples.

</div>

TODO — introduction : la situation que le lecteur reconnaît (« Tu veux… », « Ton … ne … plus »), 2 à 3 phrases.

## C'est quoi, concrètement ?

TODO — une définition en une phrase, puis une comparaison avec la vie de tous les jours (« C'est un peu comme… »).

<div class="exemple">

**Un exemple concret**

TODO — une petite scène réaliste, avec un prénom ou un « tu », du début à la fin.

</div>

## Comment faire, pas à pas

<!-- Pour un comparatif : remplacer par « Lequel choisir selon ton cas ? » (un cas = un conseil). -->

1. TODO — une action par étape, avec le nom exact du menu ou du bouton.
2. TODO

<div class="attention">

**Attention**

TODO — à garder seulement si une étape est risquée ou irréversible, ou si mieux vaut appeler un professionnel.

</div>

## Les erreurs de débutant à éviter

- TODO — une erreur courante, et comment l'éviter.

## Les mots à connaître

<div class="lexique">

- **TODO** : définition en une phrase, sans autre mot technique.

</div>

## Questions fréquentes

### TODO — une question que se pose un débutant ?

TODO — réponse directe en 50 mots maximum.

## Et maintenant ?

TODO — la prochaine étape logique, avec un lien vers un autre article du site.
`;

fs.mkdirSync(dir, { recursive: true });
fs.writeFileSync(file, frontmatter, "utf8");
console.log(`Créé : content/posts/${slug}.md — auteur : ${choix.auteur} (${choix.raison})`);
