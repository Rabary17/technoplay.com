# Techno Play

Techno Play, **le QG des débutants en tech** ([techno-play.com](https://techno-play.com)) :
IA, robotique, maison connectée, programmation, appareils, sécurité — expliqués simplement,
avec des exemples concrets. Tous les visiteurs sont pris pour des novices (repositionnement du
2026-10-07).

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
- Sitemaps découpés façon Yoast, générés au build : `sitemap_index.xml` (déclaré dans
  `robots.txt`) → `post-sitemap.xml`, `page-sitemap.xml`, `author-sitemap.xml`
  (`lib/sitemaps.ts` + les route handlers `app/*-sitemap.xml/`). L'index ne liste que les
  sitemaps non vides, `<lastmod>` = vraie date des articles, `/sitemap.xml` est un alias de
  l'index. Les pages en `noindex` n'y figurent jamais.
- **Indexation : seuls les articles, les auteurs et les pages sont indexés.** Les catégories
  (les 6 pages de thème `/<theme>/`) sont en
  `noindex, follow` (balise `<meta name="robots">`) et hors sitemap : elles servent à naviguer,
  Google suit leurs liens vers les articles sans les indexer. Il n'y a pas de pages de tags
  (les `tags` du frontmatter ne servent qu'au routage de l'auteur) ; si une page de tag est un
  jour ajoutée, elle doit être en `noindex` aussi. Ne pas bloquer ces URL dans `robots.txt` :
  Google doit pouvoir lire le `noindex`.
- **`sameAs` (liens d'entité)** : l'organisation Techno Play (`@id` = `/#organization`) porte
  en `sameAs` les profils du média déclarés dans `SOCIAL_LINKS` (`lib/site.ts`) — la page
  LinkedIn <https://www.linkedin.com/company/techno-play-com/> depuis le 2026-10-07, aussi
  affichée dans « Nous suivre » (pied de page) et sur `/a-propos/`. Chaque auteur est une
  `Person` avec **son propre** `sameAs` (ses profils, `lib/authors.ts`) et un `worksFor` qui
  pointe vers la même organisation (même `@id`, `sameAs` inclus), y compris dans le `publisher`
  des articles. Les profils des auteurs ne vont jamais dans le `sameAs` de l'organisation :
  `sameAs` désigne la même entité, pas ses membres. Pour ajouter un profil du média (Google
  Business, YouTube…) : une ligne dans `SOCIAL_LINKS`.
- HTML sémantique (un seul `h1` par page, hiérarchie de titres propre).

## Ajouter un article

```bash
npm run new-post -- --categorie programmation "Titre du nouvel article"
```

Crée `content/posts/<slug-derive-du-titre>.md` avec le frontmatter pré-rempli, l'auteur choisi
selon sa spécialité et le **squelette d'article pour débutants** (voir plus bas). Remplacer les
`TODO`, supprimer les blocs inutiles, puis `npm run build` : l'article apparaît automatiquement
sur l'accueil, dans sa page de thème et dans le sitemap.

Frontmatter YAML :

```markdown
---
title: "Titre de l'article"
description: "Une phrase — utilisée dans le listing, les meta et l'Open Graph."
date: "2026-09-30"               # toujours entre guillemets
updated: "2026-10-15"            # optionnel — date de mise à jour (dateModified)
author: "andrianina-rabarivelo"  # slug de lib/authors.ts — par défaut le rédacteur en chef
category: "intelligence-artificielle"   # slug d'un des 6 thèmes, voir lib/categories.ts
---
```

### Structure d'un article (débutants)

Chaque article suit le même fil, pour que le lecteur sache toujours où il en est :

1. **Titre = la question du débutant** (« Comment… ? », « C'est quoi… ? », « Lequel choisir… ? »).
2. **L'essentiel en 30 secondes** — la réponse en 2 phrases maximum, dans un encadré.
3. **Introduction** — la situation que le lecteur reconnaît, 2 à 3 phrases.
4. **C'est quoi, concrètement ?** — une définition en une phrase + une comparaison avec la vie
   de tous les jours, puis **Un exemple concret** (encadré).
5. **Comment faire, pas à pas** (liste numérotée, une action par étape) — ou, pour un
   comparatif, **Lequel choisir selon ton cas ?** (un cas = un conseil).
6. **Attention** (encadré, seulement si une étape est risquée ou irréversible).
7. **Les erreurs de débutant à éviter.**
8. **Les mots à connaître** (encadré lexique : une définition = une phrase).
9. **Questions fréquentes** (réponses de 50 mots maximum) et **Et maintenant ?** (la suite
   logique, avec un lien vers un autre article).

Les encadrés sont de simples `<div>` dans le Markdown, avec une ligne vide à l'intérieur pour
que le Markdown continue d'être interprété :

```html
<div class="essentiel">

**L'essentiel en 30 secondes**

Texte en Markdown.

</div>
```

Classes disponibles : `essentiel`, `exemple`, `attention`, `lexique` (styles dans
`app/globals.css`, clair et sombre).

Règles d'écriture : tutoiement, phrases courtes, un mot technique = une explication au moment
où il apparaît, un exemple concret par idée, rien d'inventé (voir « Charte de ton » dans les
docs du projet Claude et le garde-fou ci-dessous).

### Contrôle de lisibilité

```bash
npm run lisibilite          # avertissements, ne bloque jamais le build (--strict pour bloquer)
```

Vérifie, pour chaque article : présence des encadrés « essentiel » et « exemple », phrases de
25 mots maximum (20 en moyenne), absence des formules qui infantilisent (« il suffit de »,
« évidemment »…). Lancé automatiquement par `prebuild`, en complément du garde-fou « date de
coupure » (lui, bloquant).

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

## Arborescence éditoriale (2026-10-07)

6 thèmes **à plat** — un seul niveau d'URL (`/<theme>/`), pas de sous-catégories, pas de
rubriques de rubriques. Source de vérité : `lib/categories.ts`. Les articles restent à la racine
(`/<slug>/`) : changer un article de thème ne casse jamais son URL. Les pages de thème sont en
`noindex, follow` et absentes du sitemap.

- **Intelligence artificielle** (`intelligence-artificielle`)
- **Robotique & drones** (`robotique-drones`)
- **Maison connectée** (`maison-connectee`)
- **Programmation** (`programmation`)
- **Appareils & Internet** (`appareils-internet`) : smartphone, ordinateur, box, casque, TV
- **Sécurité & vie privée** (`securite-vie-privee`)

Le type d'article (« c'est quoi ? », « comment faire », « lequel choisir ? ») se voit dans le
titre et dans le gabarit, pas dans l'arborescence. Les anciennes URL de rubriques et de
sous-catégories (`/guides-tutos/`, `/guides-tutos/windows-mac/`…) n'existent plus et ne sont pas
redirigées (le site n'a pas encore de trafic à préserver).

Ajouter un thème : l'ajouter dans `lib/categories.ts` (+ son icône dans `components/Icon.tsx` si
elle est nouvelle), dans `lib/auteurs-specialites.json` (titulaire) **et** dans
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
(page mince), comme les thèmes vides.

### Choix de l'auteur à la publication (selon la spécialité)

Règles dans `lib/auteurs-specialites.json` (source unique, lue aussi par
la page auteur pour afficher les thèmes suivis) :

1. **Mots-clés** du titre (et des tags) : l'auteur qui cumule le plus de
   correspondances l'emporte (« sèche-cheveux » → Felana RABARIVELO, « PS5 » → Andee
   RAKOTOVAO, « contrôle parental » → Mialy ANDRIAHARISOA, « WordPress » ou
   « CSS » → Dina RAKOTOARIVELO…) ;
2. égalité ou aucun mot-clé : **titulaire du thème** (chaque thème a un
   titulaire ; Dina n'en a pas, aucun thème ne couvre la création de sites
   WordPress : elle est choisie par ses mots-clés) ;
3. sinon : rédacteur en chef.

```bash
npm run new-post -- --categorie appareils-internet "Quel casque pour le sport ?"   # crée l'article avec l'auteur choisi
npm run auteur -- --categorie appareils-internet "Contrôle parental sur iPhone"   # simple suggestion
npm run auteur -- --fichier content/posts/mon-article.md --ecrire                # écrit author: dans le frontmatter
```

Le champ `author:` se corrige à la main si besoin. Tests :
`npm run test:garde-fou` (inclut `choisir-auteur.test.js`, qui vérifie aussi
que chaque thème a un titulaire existant).

## Éditeur et mentions légales (Anmira Studio)

Techno Play est édité par **Anmira Studio** (Andranomanalina, Antananarivo
101, Madagascar). Tout vient de `COMPANY` et `LEGAL` dans `lib/site.ts` :
mentions légales, page contact, À propos (section « Qui édite Techno Play ? »),
politique de confidentialité (responsable du traitement), FAQ, pied de page
et JSON-LD (`parentOrganization` de l'organisation et du `publisher` des
articles). Directeur de la publication : Andrianina RABARIVELO.

- **NIF et STAT** : vides pour l'instant. Les renseigner dans `COMPANY.nif` et
  `COMPANY.stat` suffit : les lignes apparaissent alors dans les mentions
  légales (le NIF alimente aussi `taxID` en JSON-LD). Tant qu'ils sont vides,
  rien ne s'affiche.
- **Forme juridique** : non communiquée, donc pas de ligne « Statut ».
- **Horaires** : lun.-ven. 9h00 – 16h00, sam. 8h00 – 12h00, dimanche fermé
  (`COMPANY.horaires`, repris en `OpeningHoursSpecification`).
- **Hébergeur** : adresse de Vercel relevée le 2026-10-05 sur
  vercel.com/legal/privacy-policy.

## Accueil et photos

`app/page.tsx` (refonte du 2026-10-07, la plus simple possible) : hero (« Le QG des débutants
en tech »), « Qu'est-ce que tu aimerais comprendre ? » (les 6 thèmes avec un exemple de
question chacun), derniers articles, « Comment on rend la tech simple » (les engagements
envers le lecteur), « Pourquoi Techno Play ? » (le nom de marque), la rédaction, une FAQ
(JSON-LD `FAQPage`), un appel à poser une question et les crédits photos. Les exemples de
questions des thèmes (`lib/categories.ts`) se lient automatiquement à l'article dès qu'il est
publié (champ `slug`). Styles : bloc « Accueil » en fin de `app/globals.css`, sur les tokens de
la charte.

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
la « Charte de ton » dans les docs du projet Claude. Depuis le 2026-10-07, la cible est le
**débutant complet** : pédagogique sans jamais condescendre. Les textes du site (thèmes,
accueil, À propos, FAQ, bio) la suivent déjà ; les pages légales restent au vouvoiement.

## Structure

```
app/
├── layout.tsx          # Layout global — header (6 thèmes), footer, meta par défaut, JSON-LD site
├── page.tsx             # Accueil
├── not-found.tsx         # 404
├── sitemap_index.xml/, post-/page-/author-sitemap.xml/  # route handlers des sitemaps
├── sitemap.xml/, robots.ts
├── [slug]/page.tsx       # Article (content/posts/*.md) OU page de thème
├── a-propos/, faq/, contact/, mentions-legales/, confidentialite/
└── auteur/[author]/      # Page auteur
components/                # JsonLd, ArticleCard, AuthorBox, Breadcrumbs, CategoryHub, Icon…
content/posts/*.md         # Les articles — un fichier = un article
lib/
├── site.ts               # SITE_URL / SITE_NAME / SITE_DESCRIPTION
├── categories.ts          # Les 6 thèmes (à plat)
├── authors.ts             # Rédaction (bio, réseaux, JSON-LD Person)
├── posts.ts               # Lecture des fichiers Markdown (gray-matter + marked)
├── sitemaps.ts            # Contenu des sitemaps (index + articles/pages/auteurs)
└── schema.ts               # JSON-LD (schema.org)
scripts/
├── new-post.js            # npm run new-post -- --categorie <theme> "Titre"
├── generate-covers.js     # visuels de secours des 6 thèmes (public/covers/)
└── generation/            # garde-fou « date de coupure », lisibilité, choix de l'auteur
```
