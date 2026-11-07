#!/usr/bin/env node
// Usage : npm run generate-covers
//
// Génère aussi une vignette par article dans
// public/covers/articles/<slug>.webp pour chaque article sans champ
// `image` (articles programmés compris) : même fond, icône et nom du thème
// en haut, titre de l'article en grand. lib/posts.ts (resolveCoverImage)
// l'utilise si le fichier existe. À relancer après l'ajout ou le
// changement de titre d'un article — en local, et pas au build : le rendu
// du texte dépend des polices installées (Arial ici), absentes sur Vercel.
//
// Génère une image de couverture de secours par thème dans
// public/covers/<slug>.png (1200×630, ratio Open Graph standard) :
// fond couleur de marque + icône Lucide du thème + titre. Utilisée
// par lib/posts.ts comme image à la une quand un article n'a pas de champ
// `image` en frontmatter, et comme image Open Graph/Twitter par défaut
// (voir app/[slug]/page.tsx et app/layout.tsx).
//
// Les couleurs ci-dessous DOIVENT rester synchronisées avec les tokens
// --brand/--brand-hover/--signal de app/globals.css (identité livrée le
// 2026-09-30). Si la charte change, relancer ce script pour régénérer les
// visuels — rien d'autre à toucher.
//
// Icônes Lucide : copies locales de lucide-static@0.460.0 dans
// scripts/lucide-icons/ (même version que la note de version dans
// app/globals.css, pour que les noms d'icônes utilisés partout restent
// cohérents). Copies locales plutôt qu'un fetch réseau à chaque
// génération : plus fiable, et reproductible même hors ligne. Pour
// ajouter un thème, télécharger sa nouvelle icône depuis
// https://unpkg.com/lucide-static@0.460.0/icons/<nom>.svg (vérifier
// d'abord qu'elle existe à cette version sur https://lucide.dev/icons) et
// la déposer dans ce même dossier.
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");
const matter = require("gray-matter");

const ICONS_DIR = path.join(__dirname, "lucide-icons");
const BRAND = "#2F45D6";
const BRAND_HOVER = "#2334B0";
const SIGNAL = "#F2B33D";
const WHITE = "#FFFFFF";

// Une couverture par thème (structure du 2026-10-07, 6 thèmes à plat) —
// garder synchronisé avec lib/categories.ts (slug, titre, icône).
const CATEGORIES = [
  { slug: "intelligence-artificielle", title: "Intelligence artificielle", icon: "brain-circuit" },
  { slug: "robotique-drones", title: "Robotique & drones", icon: "bot" },
  { slug: "maison-connectee", title: "Maison connectée", icon: "house" },
  { slug: "programmation", title: "Programmation", icon: "code" },
  { slug: "appareils-internet", title: "Appareils & Internet", icon: "smartphone" },
  { slug: "cybersecurite", title: "Cybersécurité", icon: "shield-check" },
];

function readIconInner(name) {
  const file = path.join(ICONS_DIR, `${name}.svg`);
  const data = fs.readFileSync(file, "utf8");
  const match = data.match(/<svg[^>]*>([\s\S]*)<\/svg>/);
  if (!match) {
    throw new Error(`SVG inattendu pour ${name} (${file})`);
  }
  return match[1].trim();
}

// Découpe grossière du titre en 1-2 lignes pour qu'il tienne dans la
// largeur du visuel à cette taille de police (pas besoin de plus robuste :
// les titres sont connus et fixes).
function wrapTitle(title, maxCharsPerLine = 21) {
  const words = title.split(" ");
  const lines = [];
  let current = "";
  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (candidate.length > maxCharsPerLine && current) {
      lines.push(current);
      current = word;
    } else {
      current = candidate;
    }
  }
  if (current) lines.push(current);
  return lines;
}

function escapeXml(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

async function buildSvg(category) {
  const iconInner = readIconInner(category.icon);
  const lines = wrapTitle(category.title);
  const lineHeight = 66;
  const titleStartY = 400;
  const titleTspans = lines
    .map(
      (line, i) =>
        `<tspan x="80" y="${titleStartY + i * lineHeight}">${escapeXml(line)}</tspan>`
    )
    .join("");

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="${BRAND}"/>
  <circle cx="1010" cy="110" r="230" fill="${BRAND_HOVER}" opacity="0.55"/>
  <g transform="translate(80,100) scale(8)" fill="none" stroke="${WHITE}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    ${iconInner}
  </g>
  <circle cx="252" cy="272" r="20" fill="${SIGNAL}"/>
  <text font-family="Arial, Helvetica, sans-serif" font-weight="700" font-size="58" fill="${WHITE}">${titleTspans}</text>
  <text x="80" y="560" font-family="Arial, Helvetica, sans-serif" font-weight="700" font-size="28" letter-spacing="2" fill="${WHITE}" opacity="0.85">TECHNO PLAY</text>
</svg>`;
}

// Visuel par défaut du site (pages sans thème : accueil, à propos,
// contact...) — même traitement que les thèmes, mais avec le vrai
// logo (pastille + triangle + point) au lieu d'une icône Lucide, et le
// nom du site + sa tagline au lieu d'un titre de thème.
function buildDefaultSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="${BRAND}"/>
  <circle cx="1010" cy="110" r="230" fill="${BRAND_HOVER}" opacity="0.55"/>
  <rect x="80" y="100" width="192" height="192" rx="48" fill="${WHITE}"/>
  <g transform="translate(80,100) scale(3)">
    <polygon points="15,17 15,47 37,32" fill="${BRAND}" stroke="${BRAND}" stroke-width="5" stroke-linejoin="round"/>
    <circle cx="48" cy="44" r="5.5" fill="${SIGNAL}"/>
  </g>
  <text x="80" y="400" font-family="Arial, Helvetica, sans-serif" font-weight="700" font-size="64" fill="${WHITE}">Techno Play</text>
  <text font-family="Arial, Helvetica, sans-serif" font-weight="400" font-size="30" fill="${WHITE}" opacity="0.9">
    <tspan x="80" y="452">La tech du quotidien</tspan>
    <tspan x="80" y="490">expliquée clairement</tspan>
  </text>
</svg>`;
}

// Vignette d'un article : icône + nom du thème en haut, titre en grand.
// La taille du titre baisse d'un cran tant qu'il dépasse 4 lignes.
function buildArticleSvg(post, category) {
  const iconInner = readIconInner(category.icon);
  let fontSize = 64;
  let lines = wrapTitle(post.title, 27);
  while (lines.length > 4 && fontSize > 44) {
    fontSize -= 6;
    lines = wrapTitle(post.title, Math.floor((27 * 64) / fontSize));
  }
  const lineHeight = Math.round(fontSize * 1.18);
  // Bloc de titre centré verticalement entre le bandeau (y 170) et le pied (y 520).
  const firstY = Math.round(345 - ((lines.length - 1) * lineHeight) / 2 + fontSize * 0.35);
  const titleTspans = lines
    .map((line, i) => `<tspan x="80" y="${firstY + i * lineHeight}">${escapeXml(line)}</tspan>`)
    .join("");

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="${BRAND}"/>
  <circle cx="1060" cy="80" r="260" fill="${BRAND_HOVER}" opacity="0.55"/>
  <g transform="translate(80,64) scale(3.2)" fill="none" stroke="${WHITE}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    ${iconInner}
  </g>
  <circle cx="148" cy="132" r="9" fill="${SIGNAL}"/>
  <text x="176" y="117" font-family="Arial, Helvetica, sans-serif" font-weight="700" font-size="28" letter-spacing="2" fill="${WHITE}" opacity="0.9">${escapeXml(category.title.toUpperCase())}</text>
  <text font-family="Arial, Helvetica, sans-serif" font-weight="700" font-size="${fontSize}" fill="${WHITE}">${titleTspans}</text>
  <text x="80" y="570" font-family="Arial, Helvetica, sans-serif" font-weight="700" font-size="26" letter-spacing="2" fill="${WHITE}" opacity="0.75">TECHNO PLAY</text>
</svg>`;
}

async function generateArticleCovers() {
  const postsDir = path.join(__dirname, "..", "content", "posts");
  const outDir = path.join(__dirname, "..", "public", "covers", "articles");
  fs.mkdirSync(outDir, { recursive: true });
  let count = 0;
  for (const file of fs.readdirSync(postsDir).filter((f) => f.endsWith(".md"))) {
    const { data } = matter(fs.readFileSync(path.join(postsDir, file), "utf8"));
    if (data.image) continue;
    const category = CATEGORIES.find((c) => c.slug === data.category);
    if (!category || !data.title) continue;
    const slug = data.slug || file.replace(/.md$/, "");
    const svg = buildArticleSvg({ title: data.title }, category);
    await sharp(Buffer.from(svg)).webp({ quality: 82 }).toFile(path.join(outDir, `${slug}.webp`));
    count++;
  }
  console.log(`Généré : ${count} vignettes d'articles dans public/covers/articles/`);
}

async function main() {
  const outDir = path.join(__dirname, "..", "public", "covers");
  fs.mkdirSync(outDir, { recursive: true });

  for (const category of CATEGORIES) {
    const svg = await buildSvg(category);
    const outFile = path.join(outDir, `${category.slug}.png`);
    await sharp(Buffer.from(svg)).png().toFile(outFile);
    console.log(`Généré : public/covers/${category.slug}.png`);
  }

  const defaultSvg = buildDefaultSvg();
  await sharp(Buffer.from(defaultSvg)).png().toFile(path.join(outDir, "default.png"));
  console.log("Généré : public/covers/default.png");

  await generateArticleCovers();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
