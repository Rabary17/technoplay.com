#!/usr/bin/env node
// Orchestrateur de l'autopilote SEO : sélectionne les sujets du jour (SEO +
// actu), génère les articles (garde-fou date de coupure inclus), illustre,
// vérifie, puis commit/push si tout est propre. Produit un rapport.
//
// Usage :
//   node scripts/seo/run-pipeline.js --seo 1 --actu 2 [--dry-run] [--push]
//
// --dry-run : génère les fichiers mais ne commit/push rien (par défaut : commit, pas de push)
// --push    : pousse aussi sur origin (nécessite que la boucle planifiée soit validée manuellement d'abord)
"use strict";
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");
require("dotenv").config({ path: path.join(__dirname, "..", "..", ".env.local") });

const { generer } = require("../generation/llm");
const { choisirAuteur } = require("../generation/choisir-auteur");
const { selectionnerSujetsSeo } = require("./select-keyword-topics");
const { selectionnerActusDuJour } = require("./select-news-topics");
const { findImage } = require("./image-client");

const ROOT = path.join(__dirname, "..", "..");
const POSTS_DIR = path.join(ROOT, "content", "posts");
const RAPPORTS_DIR = path.join(ROOT, "_strategie", "rapports-pipeline");

function slugify(s) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

const CONSIGNE_STRUCTURE = `Rédige un article complet au format Markdown, prêt à coller dans le corps d'un
fichier (sans frontmatter). Ta réponse doit commencer PAR LE TITRE, seul sur la première
ligne, sans dièse ni guillemets ni gras (ex. : Comment choisir un assistant IA pour discuter ?),
suivi d'une ligne vide, puis le corps de l'article. Le titre doit être la question du
lecteur (« Comment… ? », « C'est quoi… ? », « Lequel choisir… ? »), jamais le mot-clé brut.
Ne mets JAMAIS de bloc de code (\`\`\`) autour de ta réponse, et n'ajoute AUCUN commentaire,
note ou explication avant ou après l'article — seulement le titre puis le corps, rien d'autre.
Le corps suit EXACTEMENT ce fil, dans cet ordre (voir README du
projet « Structure d'un article ») :
1. Un encadré "essentiel" (<div class="essentiel">...texte markdown...</div>, avec une
   ligne vide après la balise ouvrante et avant la fermante) : la réponse en 2 phrases max.
2. Une introduction (2-3 phrases, la situation que le lecteur reconnaît).
3. "## C'est quoi, concrètement ?" : une définition en une phrase + comparaison avec la
   vie de tous les jours, puis un encadré <div class="exemple">...</div> (scène réaliste).
4. "## Comment faire, pas à pas" (liste numérotée) OU "## Lequel choisir selon ton cas ?"
   si le sujet est un comparatif.
5. Si une étape est risquée : <div class="attention">...</div>.
6. "## Les erreurs à éviter" (liste à puces).
7. "## Les mots à connaître" : <div class="lexique">...</div> (définitions d'une phrase).
8. "## Questions fréquentes" (3 questions en ### , réponses 50 mots max).
9. "## Et maintenant ?" (lien vers un autre article pertinent du site si pertinent).
Règles : tutoiement, phrases courtes (20 mots en moyenne, 25 max), un mot technique =
une explication au moment où il apparaît, un exemple concret par idée, aucune formule qui
infantilise ("il suffit de", "évidemment"...), jamais de tiret cadratin (—).`;

const CONSIGNE_RESTER_DANS_LA_SOURCE = `
Important : tu ne disposes que d'un résumé court de la source (pas l'article complet).
N'ajoute AUCUN chiffre, nom, date ou détail qui ne figure pas explicitement dans la source
fournie — ni financement, ni résultat, ni partenaire, ni contexte que tu devinerais.
Si un aspect du sujet manque dans la source, n'en parle simplement pas (raccourcis l'article
sur ce point) plutôt que d'écrire un marqueur [À VÉRIFIER] : préfère un article plus court
mais entièrement sourcé à un article plus complet mais à moitié incertain.
Ne mets JAMAIS de balise [S1], [S2]... dans le texte : ce site n'affiche pas ces
renvois, ils apparaîtraient tels quels, en texte brut visible, ce qui a l'air cassé.`;

async function genererArticle({ titre, theme, sources = [], brief = "" }) {
  const resultat = await generer({
    phase: "premier-jet",
    consigne: CONSIGNE_STRUCTURE + (sources.length > 0 ? CONSIGNE_RESTER_DANS_LA_SOURCE : ""),
    brief: `Titre de l'article : "${titre}"\nThème : ${theme}\n${brief}`,
    sources,
    max_tokens: 6000,
  });
  return resultat;
}

// Retire un éventuel bloc de code englobant toute la réponse (``` ou ```markdown ... ```),
// malgré la consigne — filet de sécurité, le modèle n'obéit pas toujours à 100 %.
function retirerBlocCode(texte) {
  const t = texte.trim();
  const m = t.match(/^```[a-z]*\n([\s\S]*?)\n```$/i);
  return m ? m[1].trim() : t;
}

// Filet de sécurité : le site n'affiche pas les renvois [S1]/[S2] du garde-fou —
// les retirer s'ils ont été écrits malgré la consigne (espace avant supprimé aussi).
function retirerBalisesSources(texte) {
  return texte.replace(/\s?\[S\d+\]/g, "");
}

// Nettoie le résumé brut du sheet (espaces d'extraction irréguliers, coupure
// à la phrase plutôt qu'au mot pour ne pas finir sur un fragment bizarre.
function descriptionDepuisResume(resume) {
  if (!resume) return null;
  const propre = resume.replace(/\s+/g, " ").replace(/\s([,.;:!?])/g, "$1").trim();
  if (propre.length <= 150) return propre;
  const coupe = propre.slice(0, 150);
  const dernierPoint = coupe.lastIndexOf(". ");
  if (dernierPoint > 60) return coupe.slice(0, dernierPoint + 1);
  const dernierEspace = coupe.lastIndexOf(" ");
  return coupe.slice(0, dernierEspace > 60 ? dernierEspace : 150) + "…";
}

// Sépare la première ligne (titre) du reste (corps) — voir consigne de génération.
function separerTitreEtCorps(texte, titreDeSecours) {
  const t = retirerBlocCode(texte);
  const lignes = t.split("\n");
  const premiere = lignes[0].trim();
  // Garde-fou : une « vraie » première ligne de titre est courte, sans balise/markdown.
  if (premiere && premiere.length < 120 && !/^[#<*\-]/.test(premiere)) {
    return { titre: premiere, corps: lignes.slice(1).join("\n").trim() };
  }
  return { titre: titreDeSecours, corps: t };
}

async function construireArticle(sujet) {
  const { theme } = sujet;

  const sources = sujet.sourceUrl
    ? [{ url: sujet.sourceUrl, date: sujet.date || "", texte: `${sujet.titre} — ${sujet.resume || ""}` }]
    : [];

  const resultat = await genererArticle({
    titre: sujet.titre,
    theme,
    sources,
    brief: sujet.keyword ? `Mot-clé cible (SEO) : ${sujet.keyword}, volume estimé ${sujet.volume}/mois.` : "",
  });

  const { titre, corps } = separerTitreEtCorps(resultat.texte, sujet.titre);
  resultat.texte = retirerBalisesSources(corps);
  const slug = slugify(titre);
  const fichier = path.join(POSTS_DIR, `${slug}.md`);
  if (fs.existsSync(fichier)) {
    return { ok: false, slug, raison: "fichier déjà existant" };
  }

  if (resultat.audit.bloquant) {
    return { ok: false, slug, raison: `garde-fou : ${resultat.audit.violations.length} violation(s)`, audit: resultat.audit };
  }
  if (resultat.texte.includes("[À VÉRIFIER")) {
    return { ok: false, slug, raison: "marqueur [À VÉRIFIER] non résolu (info non sourcée) — à corriger ou sourcer" };
  }

  const choix = choisirAuteur({ titre, categorie: theme });
  const today = new Date().toISOString().slice(0, 10);

  // Le titre complet (souvent avec une marque, ex. "DJI Romo P2") fait dériver la recherche
  // d'image vers un produit non lié au sujet réel (ex. un drone au lieu d'un aspirateur) —
  // on préfère un terme générique par thème pour les actus.
  const REQUETE_IMAGE_PAR_THEME = {
    "intelligence-artificielle": "intelligence artificielle ordinateur",
    "robotique-drones": "robot maison",
    "maison-connectee": "maison connectée",
    programmation: "code ordinateur écran",
    "appareils-internet": "smartphone ordinateur",
    cybersecurite: "sécurité informatique cadenas",
  };
  let image = null;
  try {
    const requeteImage = sujet.keyword || REQUETE_IMAGE_PAR_THEME[theme] || titre;
    const resultats = await findImage(requeteImage);
    image = resultats[0] || null;
  } catch (err) {
    console.error(`Image non trouvée pour "${titre}" : ${err.message}`);
  }

  const frontmatterLignes = [
    "---",
    `title: ${JSON.stringify(titre)}`,
    `description: ${JSON.stringify(descriptionDepuisResume(sujet.resume) || `Tout savoir sur ${titre.toLowerCase()}.`)}`,
    `date: "${today}"`,
    `author: "${choix.auteur}"`,
    `category: "${theme}"`,
  ];
  if (image) {
    frontmatterLignes.push(`image: "${image.url}"`);
    frontmatterLignes.push(`imageAlt: ${JSON.stringify(image.alt || titre)}`);
  }
  if (sources.length > 0) {
    frontmatterLignes.push("sources:");
    for (const s of sources) {
      frontmatterLignes.push(`  - titre: ${JSON.stringify(sujet.titre)}`);
      frontmatterLignes.push(`    url: "${s.url}"`);
    }
    frontmatterLignes.push(`sourcesConsultees: "${today}"`);
  }
  frontmatterLignes.push("---", "");

  const contenu = frontmatterLignes.join("\n") + resultat.texte.trim() + "\n";
  fs.writeFileSync(fichier, contenu, "utf8");

  return { ok: true, slug, fichier, theme, titre, auteur: choix.auteur, image: image?.url, type: sujet.type };
}

function verifierBuild() {
  try {
    execSync("node scripts/generation/verifier-contenu.js", { cwd: ROOT, stdio: "pipe" });
    execSync("node scripts/generation/verifier-lisibilite.js", { cwd: ROOT, stdio: "pipe" });
    return { ok: true };
  } catch (err) {
    return { ok: false, sortie: err.stdout?.toString() || err.message };
  }
}

async function main() {
  const args = process.argv.slice(2);
  const val = (nom, defaut) => (args.includes(nom) ? Number(args[args.indexOf(nom) + 1]) : defaut);
  const nSeo = val("--seo", 1);
  const nActu = val("--actu", 2);
  const dryRun = args.includes("--dry-run");
  const push = args.includes("--push");

  const rapport = { date: new Date().toISOString(), articles: [], echecs: [], erreurs: [] };

  console.log(`Sélection : ${nSeo} sujet(s) SEO, ${nActu} actu(s)...`);
  const [sujetsSeo, sujetsActu] = await Promise.all([
    selectionnerSujetsSeo({ n: nSeo }).catch((e) => {
      rapport.erreurs.push(`SEO : ${e.message}`);
      return [];
    }),
    selectionnerActusDuJour({ n: nActu, marquer: !dryRun }).catch((e) => {
      rapport.erreurs.push(`Actu : ${e.message}`);
      return [];
    }),
  ]);

  const tousLesSujets = [
    ...sujetsSeo.map((s) => ({ ...s, titre: s.keyword.charAt(0).toUpperCase() + s.keyword.slice(1), type: "seo" })),
    ...sujetsActu.map((s) => ({ ...s, type: "actu" })),
  ];

  for (const sujet of tousLesSujets) {
    console.log(`Génération : [${sujet.type}] ${sujet.titre}`);
    try {
      const res = await construireArticle(sujet);
      if (res.ok) rapport.articles.push(res);
      else rapport.echecs.push(res);
    } catch (err) {
      rapport.echecs.push({ titre: sujet.titre, raison: err.message });
    }
  }

  if (rapport.articles.length === 0) {
    console.log("Aucun article généré — rien à vérifier/publier.");
  } else if (dryRun) {
    console.log("--dry-run : articles générés mais non commités.");
  } else {
    const verif = verifierBuild();
    rapport.verification = verif;
    if (!verif.ok) {
      console.error("Vérification échouée, rien n'est commité :\n" + verif.sortie);
    } else {
      const fichiers = rapport.articles.map((a) => a.fichier);
      execSync(`git add ${fichiers.map((f) => `"${f}"`).join(" ")}`, { cwd: ROOT });
      const message = `feat(contenu): ${rapport.articles.length} article(s) autopilote (${rapport.articles.map((a) => a.type).join(", ")})\n\nCo-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>`;
      execSync(`git commit -m ${JSON.stringify(message)}`, { cwd: ROOT });
      rapport.commit = execSync("git rev-parse HEAD", { cwd: ROOT }).toString().trim();
      if (push) {
        execSync("git push", { cwd: ROOT });
        rapport.pushed = true;
      }
    }
  }

  fs.mkdirSync(RAPPORTS_DIR, { recursive: true });
  const nomRapport = `${new Date().toISOString().slice(0, 10)}.json`;
  fs.writeFileSync(path.join(RAPPORTS_DIR, nomRapport), JSON.stringify(rapport, null, 2), "utf8");

  console.log(`\n=== Rapport ===`);
  console.log(`Articles publiés : ${rapport.articles.length}`);
  for (const a of rapport.articles) console.log(`  - [${a.type}] ${a.titre} (${a.fichier})`);
  console.log(`Échecs : ${rapport.echecs.length}`);
  for (const e of rapport.echecs) console.log(`  - ${e.titre || e.slug} : ${e.raison}`);
  console.log(`Rapport détaillé : ${path.join(RAPPORTS_DIR, nomRapport)}`);
}

main().catch((err) => {
  console.error("Erreur pipeline :", err);
  process.exit(1);
});
