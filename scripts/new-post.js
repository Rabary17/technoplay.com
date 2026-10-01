#!/usr/bin/env node
// Usage : npm run new-post -- "Titre de l'article"
// Crée content/posts/<slug>.md avec le frontmatter déjà rempli (date du
// jour, slug dérivé du titre) — évite les fautes de frappe dans les clés
// YAML attendues par lib/posts.ts.
const fs = require("fs");
const path = require("path");

const title = process.argv.slice(2).join(" ").trim();
if (!title) {
  console.error('Usage : npm run new-post -- "Titre de l\'article"');
  process.exit(1);
}

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
description: "TODO — une phrase, affichée dans le listing et les meta/OG."
date: "${today}"
author: "Techno Play"
# Rubrique : un des slugs de lib/categories.ts (technologie, gaming, vr-ar,
# ia, llm, robotique, drones, crypto). Sert de repli pour l'image à la une
# si "image" est vide ci-dessous.
category: "TODO"
# Image à la une (optionnelle) : chemin sous public/ ou URL absolue. Sans
# elle, la couverture de la rubrique ci-dessus est utilisée automatiquement
# (voir lib/posts.ts, resolveCoverImage).
# image: "/uploads/mon-image.jpg"
# imageAlt: "TODO — description de l'image pour l'accessibilité et le SEO"
---

TODO — contenu de l'article en Markdown.
`;

fs.mkdirSync(dir, { recursive: true });
fs.writeFileSync(file, frontmatter, "utf8");
console.log(`Créé : content/posts/${slug}.md`);
