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
---

TODO — contenu de l'article en Markdown.
`;

fs.mkdirSync(dir, { recursive: true });
fs.writeFileSync(file, frontmatter, "utf8");
console.log(`Créé : content/posts/${slug}.md`);
