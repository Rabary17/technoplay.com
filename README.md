# Techno Play

Site vitrine + blog listing pour [techno-play.com](https://techno-play.com), en attendant
un vrai design/stratégie de contenu (décision du 2026-09-30).

## Pourquoi un export statique

Pas de trafic, pas de CMS, pas de stratégie de contenu définie pour l'instant — inutile de
partir sur l'architecture complète de Techcars (WordPress headless + Next.js/ISR + Render).
Ce projet est en **export statique Next.js** (`output: "export"` dans `next.config.ts`) :

- Les articles sont des fichiers Markdown dans `content/posts/` (pas de CMS, pas de base de
  données).
- `next build` produit un dossier `out/` de fichiers HTML/CSS/JS purs — zéro serveur, zéro
  fonction serverless, hébergeable sur Vercel gratuitement (ou n'importe quel hébergeur
  statique).
- Tout le socle SEO/GEO est en place dès le départ (voir plus bas) — l'export statique ne
  sacrifie rien sur ce plan, au contraire (pas d'hydratation JS, chargement instantané).

**Quand faire évoluer vers un vrai back-office** (une fois qu'il y a du trafic/une vraie
stratégie de contenu) : retirer `output: "export"`, brancher un CMS headless (WordPress ou
autre) et repasser en ISR — suivre le pattern déjà documenté et éprouvé sur le projet
Techcars/monauto (`docs/architecture-headless.md` de ce repo-là) plutôt que d'improviser une
architecture différente.

## SEO/GEO déjà en place

- Title/description uniques par page, URL canonique (`lib/site.ts`, `generateMetadata`).
- Open Graph + Twitter Card sur chaque page.
- JSON-LD (schema.org) : `WebSite`/`Organization` sur tout le site, `BlogPosting` +
  `BreadcrumbList` sur chaque article (`lib/schema.ts`, `components/JsonLd.tsx`) — c'est ce qui
  compte le plus pour le GEO (les moteurs génératifs s'appuient sur les données structurées).
- `sitemap.xml` et `robots.txt` générés automatiquement (`app/sitemap.ts`, `app/robots.ts`).
- HTML sémantique (un seul `h1` par page, hiérarchie de titres propre).

## Ajouter un article

```bash
npm run new-post -- "Titre du nouvel article"
```

Crée `content/posts/<slug-derive-du-titre>.md` avec le frontmatter pré-rempli. Éditer le
fichier (description, date si besoin, contenu Markdown), puis `npm run build` pour vérifier
que ça compile. L'article apparaît automatiquement sur la page d'accueil et dans le sitemap.

Format attendu (frontmatter YAML) :

```markdown
---
title: "Titre de l'article"
description: "Une phrase — utilisée dans le listing, les meta et l'Open Graph."
date: "2026-09-30"
author: "Nom (optionnel)"
---

Contenu en Markdown.
```

## Développement local

```bash
npm install
npm run dev       # http://localhost:3000
npm run build     # génère out/ (export statique)
npm run start     # sert out/ localement pour vérifier le build de prod
```

## Déploiement

### 1. Créer le repo GitHub

Depuis ce dossier :

```bash
git init
git add -A
git commit -m "Initial commit — techno-play, export statique Next.js"
```

Puis créer un repo vide sur GitHub (github.com/new, sans README/gitignore — ils existent déjà
ici) et le pousser :

```bash
git remote add origin git@github.com:<ton-compte-ou-org>/techno-play.git
git branch -M main
git push -u origin main
```

### 2. Importer sur Vercel

1. [vercel.com/new](https://vercel.com/new) → importer le repo `techno-play`.
2. Framework détecté automatiquement : Next.js. Aucune variable d'environnement requise pour
   l'instant (tout est en dur dans `lib/site.ts`).
3. Déployer.

### 3. Brancher le domaine techno-play.com

Dans le projet Vercel → Settings → Domains → ajouter `techno-play.com`, puis suivre les
instructions DNS affichées (en général un enregistrement `A`/`ALIAS` vers Vercel, ou un `CNAME`
si c'est un sous-domaine) chez le registrar où le domaine est géré.

## Structure

```
app/
├── layout.tsx          # Layout global — header/footer, meta par défaut, JSON-LD site
├── page.tsx             # Accueil = listing des articles
├── not-found.tsx         # 404
├── sitemap.ts / robots.ts
└── [slug]/page.tsx       # Page article (généré pour chaque fichier content/posts/*.md)
content/posts/*.md         # Les articles — un fichier = un article
lib/
├── site.ts               # SITE_URL / SITE_NAME / SITE_DESCRIPTION
├── posts.ts               # Lecture des fichiers Markdown (gray-matter + marked)
└── schema.ts               # JSON-LD (schema.org)
components/JsonLd.tsx
scripts/new-post.js         # npm run new-post -- "Titre"
```
