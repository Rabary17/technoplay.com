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
  `BreadcrumbList` sur chaque article (`lib/schema.ts`, `components/               # JsonLd, ArticleCard, AuthorBox, Breadcrumbs, SectionHub, Icon`) — c'est ce qui
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
updated: "2026-10-15"            # optionnel — date de mise à jour (dateModified)
author: "andrianina-rabarivelo"  # slug de lib/authors.ts — par défaut le rédacteur en chef
category: "windows-mac"          # slug de SOUS-catégorie, voir lib/categories.ts
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

## Arborescence éditoriale (2026-10-02)

4 rubriques (pages hub `/<rubrique>/`) découpées en 14 sous-catégories
(`/<rubrique>/<sous-categorie>/`) — source de vérité : `lib/categories.ts`.
Les articles restent à la racine (`/<slug>/`) : changer un article de
rubrique ne casse jamais son URL. Une sous-catégorie sans article est en
`noindex` et absente du sitemap.

- **Guides & Tutos** : windows-mac, android-ios, reseau-stockage, securite-vpn
- **Comparatifs & Achats** : materiel-pc-composants, peripheriques-ecrans, audio-mobilite, domotique-maison-connectee
- **Décryptage & Concepts** : intelligence-artificielle, hardware-innovation, culture-tech
- **Actu Tech** : annonces-produits, cyberattaques-failles, logiciels-mises-a-jour

Ajouter une sous-catégorie : l'ajouter dans `lib/categories.ts` **et** dans
`scripts/generate-covers.js`, puis `npm run generate-covers`.

## Auteurs (E-E-A-T)

`lib/authors.ts` : la rédaction — rédacteur en chef (Andrianina
RABARIVELO, avec photo dans `public/authors/`) et cinq spécialistes :
Felana RABARIVELO (beauté, cosmétiques, mode), Andee RAKOTOVAO (design,
jeux vidéo, développement, graphisme, photo), Mialy ANDRIAHARISOA (maman &
enfant, couture, cuisine), Nekena JUDICAËL (tech & business) et Dina
RAKOTOARIVELO (WordPress, intégration HTML/CSS) — noms de famille repris de
leurs profils LinkedIn. Bio, expertise et profils sociaux — pas
d'email public, le contact passe par `/contact/`. Alimente l'encart auteur
sous chaque article, la page `/auteur/<slug>/` (JSON-LD `ProfilePage` +
`Person` avec `sameAs`), la section « La rédaction » de `/a-propos/` et
l'auteur du JSON-LD `BlogPosting`. Sans photo, l'avatar affiche l'initiale :
déposer un carré dans `public/authors/<slug>.jpg` et renseigner `image`.

Une page auteur sans article publié est en `noindex` et hors sitemap
(page mince), comme les sous-catégories vides.

### Choix de l'auteur à la publication (selon la spécialité)

Règles dans `lib/auteurs-specialites.json` (source unique, lue aussi par
la page auteur pour afficher les « Rubriques suivies ») :

1. **Mots-clés** du titre (et des tags) : l'auteur qui cumule le plus de
   correspondances l'emporte (« sèche-cheveux » → Felana RABARIVELO, « PS5 » → Andee
   RAKOTOVAO, « contrôle parental » → Mialy ANDRIAHARISOA, « WordPress » ou
   « CSS » → Dina RAKOTOARIVELO…) ;
2. égalité ou aucun mot-clé : **titulaire de la sous-catégorie** (chaque
   sous-catégorie a un titulaire ; Dina n'en a pas, aucune ne couvre la
   création de sites : elle est choisie par ses mots-clés) ;
3. sinon : rédacteur en chef.

```bash
npm run new-post -- --categorie audio-mobilite "Meilleur casque pour le sport"   # crée l'article avec l'auteur choisi
npm run auteur -- --categorie android-ios "Contrôle parental sur iPhone"         # simple suggestion
npm run auteur -- --fichier content/posts/mon-article.md --ecrire                # écrit author: dans le frontmatter
```

Le champ `author:` se corrige à la main si besoin. Tests :
`npm run test:garde-fou` (inclut `choisir-auteur.test.js`, qui vérifie aussi
que chaque sous-catégorie a un titulaire existant).

## Accueil et photos

`app/page.tsx` (refonte du 2026-10-03) : hero, « La tech qui fait l'actu »
(bento de 8 tendances — IA, drones, réalité virtuelle, robots, montres,
maison connectée, cybersécurité, gaming — reliées aux sous-rubriques),
derniers articles, « Par
où commencer ? » (les 4 rubriques par situation, avec des exemples de
questions liés automatiquement à l'article dès qu'il est publié),
« Pourquoi Techno Play ? » (le nom de marque), la méthode, la rédaction,
une FAQ (JSON-LD `FAQPage`), un appel à proposer un sujet et les crédits
photos. Styles : bloc « Accueil » en fin de `app/globals.css`, sur les
tokens de la charte.

Photos (24) : `public/images/accueil/*-1920.webp` (Full HD) et `*-960.webp`,
servies en `srcset`. Toutes viennent d'Unsplash (licence Unsplash : usage
gratuit, commercial compris, pas d'attribution obligatoire) — vérifiées le
2026-10-03 (aucune image Unsplash+). Photographe, page et texte
alternatif de chaque image : `lib/photos-accueil.ts`, qui alimente aussi
la ligne de crédits en bas de l'accueil. Pour changer une photo : la
convertir en WebP 1920 et 960 px, puis mettre à jour l'entrée
correspondante.

## Génération IA : garde-fou « date de coupure » (codé en dur)

Décision du 2026-10-03 : **toute** phase de génération (plan, premier jet,
FAQ, méta, titre, réécriture) passe par `scripts/generation/llm.js` →
`generer()`, qui applique sans option de désactivation :

1. **Date de coupure stricte** : le modèle est interrogé (« jusqu'à quelle
   date s'arrêtent tes connaissances ? »), sa réponse est comparée à la date
   officielle codée en dur dans `scripts/generation/garde-fou-cutoff.js`
   (`CUTOFFS_OFFICIELS`) — **la plus ancienne des deux est retenue**. Modèle
   absent de la table + réponse illisible → génération refusée. Ajouter tout
   nouveau modèle à la table avant de l'utiliser.
2. **Barème injecté en tête du prompt système** : interdiction de tout
   chiffre (prix, %, stats, specs), date, version ou nouveauté postérieure au
   début de la **zone grise** (6 mois avant la coupure), sauf si l'info est
   dans le brief ou les sources fournies ; sinon marqueur `[À VÉRIFIER]`.
3. **Audit de chaque sortie** : les passages hors barème reçoivent
   automatiquement `[À VÉRIFIER]`.
4. **Blocage au build** (`prebuild` → `verifier-contenu.js`, actif aussi sur
   Vercel) : impossible de publier un article contenant un `[À VÉRIFIER]`, ou
   citant une date postérieure à la coupure sans `sources:` en frontmatter.

```bash
npm run garde-fou:cutoff                       # date de coupure retenue (interroge le modèle, ANTHROPIC_API_KEY requise)
npm run garde-fou:audit -- content/posts/x.md  # audite un texte produit ailleurs (Cowork, TONTON AI…) ; --marquer pour annoter
npm run test:garde-fou                         # tests
```

Le module `garde-fou-cutoff.js` n'a aucune dépendance : il peut être copié
tel quel dans un autre pipeline de génération.

## Ton éditorial

Tutoiement, ton direct et légèrement décalé, honnête sur les défauts — voir
la « Charte de ton » dans les docs du projet Claude. Les textes du site
(rubriques, accueil, À propos, FAQ, bio) la suivent déjà ; les pages
légales restent au vouvoiement.

## Structure

```
app/
├── layout.tsx          # Layout global — header/footer, meta par défaut, JSON-LD site
├── page.tsx             # Accueil = hero + rubriques + derniers articles
├── not-found.tsx         # 404
├── sitemap.ts / robots.ts
├── [slug]/page.tsx       # Article (content/posts/*.md) OU hub de rubrique
├── [slug]/[sub]/page.tsx # Page de sous-catégorie
└── auteur/[author]/      # Page auteur
content/posts/*.md         # Les articles — un fichier = un article
lib/
├── site.ts               # SITE_URL / SITE_NAME / SITE_DESCRIPTION
├── categories.ts          # Rubriques + sous-catégories
├── authors.ts             # Rédaction (bio, réseaux, JSON-LD Person)
├── posts.ts               # Lecture des fichiers Markdown (gray-matter + marked)
└── schema.ts               # JSON-LD (schema.org)
components/JsonLd.tsx
scripts/new-post.js         # npm run new-post -- "Titre"
```
