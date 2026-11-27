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

const { generer, appelBrut, MODELE_PAR_DEFAUT } = require("../generation/llm");
const { reinitialiser: reinitialiserUsage, resumer: resumerUsage, resumerHistorique } = require("../generation/usage-tracker");
const { ajouterLigneJournal } = require("./journal-sheet");
const { choisirAuteur } = require("../generation/choisir-auteur");
const { selectionnerSujetsSeo } = require("./select-keyword-topics");
const { selectionnerActusDuJour } = require("./select-news-topics");
const { findImage } = require("./image-client");
const unicite = require("../images/unicite");
const { voixPour } = require("../generation/voix-auteurs");
const { choisirParmi, entier } = require("../generation/variation");

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

// Variation structurelle : sans ça, tous les articles d'un même lot suivent le
// gabarit identique au mot près (même nombre de questions FAQ, même section
// finale systématique) — ça ressemble vite à du contenu produit en série,
// un signal que Google surveille (abus de contenu à grande échelle). Chaque
// appel tire sa propre combinaison ; la structure de fond (encadrés, ordre
// général) reste la même, seuls ces quelques réglages bougent.
function tirerVariation() {
  return {
    nbFaq: entier(2, 4),
    inclureEtMaintenant: Math.random() < 0.7,
    angleOuverture: choisirParmi([
      "une situation concrète que le lecteur vit en ce moment",
      "une question directe posée au lecteur",
      "un constat sur ce qui a changé récemment sur ce sujet",
    ]),
  };
}

function construireConsigneStructure(variation) {
  return `Rédige un article complet au format Markdown, prêt à coller dans le corps d'un
fichier (sans frontmatter). Ta réponse doit commencer PAR LE TITRE, seul sur la première
ligne, sans dièse ni guillemets ni gras (ex. : Comment choisir un assistant IA pour discuter ?),
suivi d'une ligne vide, puis le corps de l'article. Le titre doit être la question du
lecteur (« Comment… ? », « C'est quoi… ? », « Lequel choisir… ? »), jamais le mot-clé brut.
Ne mets JAMAIS de bloc de code (\`\`\`) autour de ta réponse, et n'ajoute AUCUN commentaire,
note ou explication avant ou après l'article — seulement le titre puis le corps, rien d'autre.
Le corps suit ce fil, dans cet ordre (voir README du projet « Structure d'un article ») :
1. Un encadré "essentiel" (<div class="essentiel">...texte markdown...</div>, avec une
   ligne vide après la balise ouvrante et avant la fermante) : la réponse en 2 phrases max.
2. Une introduction (2-3 phrases) qui part de ${variation.angleOuverture}.
3. "## C'est quoi, concrètement ?" : une définition en une phrase + comparaison avec la
   vie de tous les jours, puis un encadré <div class="exemple">...</div> (scène réaliste).
4. "## Comment faire, pas à pas" (liste numérotée) OU "## Lequel choisir selon ton cas ?"
   si le sujet est un comparatif.
5. Si une étape est risquée : <div class="attention">...</div>.
6. "## Les erreurs à éviter" (liste à puces).
7. "## Les mots à connaître" : <div class="lexique">...</div> (définitions d'une phrase).
8. "## Questions fréquentes" (${variation.nbFaq} questions en ### , réponses 50 mots max).
${variation.inclureEtMaintenant ? '9. "## Et maintenant ?" (lien vers un autre article pertinent du site si pertinent).' : ""}
Longue traîne : si le brief indique un mot-clé, le titre et la première phrase de l'introduction reprennent sa formulation de question la plus précise (ex. « Quel budget pour une pompe à chaleur air-eau en 2026 ? »), jamais un mot-clé générique.
Règles : tutoiement, phrases courtes (20 mots en moyenne, 25 max), un mot technique =
une explication au moment où il apparaît, un exemple concret par idée, aucune formule qui
infantilise ("il suffit de", "évidemment"...), jamais de tiret cadratin (—). Mets en **gras**
(Markdown, \`**...**\`) au minimum 2 passages en gras dans tout l'article (obligatoire), 2 à 4 par section ## si possible, des groupes de 1 à 4 mots liés au
mot-clé ou au vocabulaire technique du sujet (pas seulement des chiffres) : jamais une phrase
entière en gras, jamais le même terme mis en gras à deux endroits différents de l'article.
Dans "## C'est quoi, concrètement ?" et dans "## Comment faire, pas à pas" (ou "## Lequel
choisir selon ton cas ?"), qui sont déjà des formulations de question, la toute première
phrase qui suit le titre doit répondre directement à la question, en 1-2 phrases courtes,
avant toute mise en contexte ou tout développement. Si l'article compare des chiffres, des
prix ou des caractéristiques, présente-les dans un vrai tableau Markdown ou une liste :
jamais une donnée compréhensible seulement via l'image d'illustration choisie à côté. Si tu
recommandes un outil, une app ou un produit précis, explique en une phrase pourquoi ce choix
plutôt qu'un autre — jamais de recommandation sans justification.`;
}

const CONSIGNE_RESTER_DANS_LA_SOURCE = `
Important : tu ne disposes que d'un résumé court de la source (pas l'article complet).
N'ajoute AUCUN chiffre, nom, date ou détail qui ne figure pas explicitement dans la source
fournie — ni financement, ni résultat, ni partenaire, ni contexte que tu devinerais.
Si un aspect du sujet manque dans la source, n'en parle simplement pas (raccourcis l'article
sur ce point) plutôt que d'écrire un marqueur [À VÉRIFIER] : préfère un article plus court
mais entièrement sourcé à un article plus complet mais à moitié incertain.
Ne mets JAMAIS de balise [S1], [S2]... dans le texte : ce site n'affiche pas ces
renvois, ils apparaîtraient tels quels, en texte brut visible, ce qui a l'air cassé.`;

// Au-delà de ce volume de recherche mensuel, le sujet mérite un développement plus complet
// (plus d'exemples, une section en plus si pertinent) plutôt qu'un traitement minimal.
const SEUIL_VOLUME_DEVELOPPEMENT = 500;

// Article de fond sans source externe (SEO) : intemporel, sans aucun fait daté ou chiffré.
// Le garde-fou reste bloquant ; cette consigne évite qu'il ait quelque chose à marquer.
const CONSIGNE_EVERGREEN = `
Article de fond intemporel : tu n'as AUCUNE source externe.
N'écris AUCUN chiffre, prix, pourcentage, date, année, numéro de version de logiciel ou de produit,
nom de modèle, classement, statistique ou citation. Parle des méthodes, des critères de choix,
des erreurs fréquentes, des comparaisons qualitatives (selon le besoin, plus ou moins adapté) et
de questions pratiques.
Si un point dépendrait d'un chiffre ou d'une date, supprime ce point : ne le remplace pas par un
autre chiffre et n'écris jamais de marqueur [À VÉRIFIER] ni de balise [S1]...
Structure obligatoire : un titre principal (question précise, longue traîne), une introduction qui
répond directement en 2 à 3 phrases, puis des sections en titre ## (méthode, critères, erreurs,
comparaison), avec des sous-titres en ### si utile, et une section ## « Questions fréquentes » avec
3 à 4 questions en ###.
Mets en gras (**...**) les termes importants : au moins 2 passages en gras par section ##, jamais une
phrase entière.`;

async function genererArticle({ titre, theme, sources = [], brief = "", voix = "" }) {
  const variation = tirerVariation();
  const resultat = await generer({
    phase: "premier-jet",
    consigne: construireConsigneStructure(variation) + (sources.length > 0 ? CONSIGNE_RESTER_DANS_LA_SOURCE : CONSIGNE_EVERGREEN),
    instructions: voix,
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
// Nombre de segments en gras (**...**) dans le corps : minimum 2 par article (garde-fou).
function compterGras(texte) {
  return (texte.match(/\*\*[^*\n]+?\*\*/g) || []).length;
}

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

// Agent qualité : relit l'article APRÈS le garde-fou anti-hallucination (donc
// sur un texte déjà validé factuellement) et corrige UNIQUEMENT la forme —
// grammaire, orthographe, ton, structure. Interdiction explicite de toucher au
// fond (aucun chiffre/date/fait ajouté, retiré ou modifié). Appel direct à
// appelBrut (pas generer()) : la relecture n'a rien à voir avec le garde-fou
// date de coupure, et ce dernier risquerait de marquer [À VÉRIFIER] à
// l'intérieur du JSON de réponse attendu ici.
const CONSIGNE_RELECTURE = `Tu es relecteur qualité pour un site grand public francophone (techno-play.com).
Relis cet article et corrige UNIQUEMENT :
- les fautes de grammaire, d'orthographe et de syntaxe (accords, mots manquants comme "de"/"le"/"la"...)
- les répétitions ou phrases mal formées
- le respect du ton : tutoiement, phrases courtes (20 mots en moyenne, 25 max), jamais "il suffit de" /
  "évidemment", jamais de tiret cadratin (—)
- le respect de la structure Markdown déjà en place (encadrés <div>, titres ##, listes) — ne la change pas,
  corrige juste ce qui est mal écrit à l'intérieur
Vérifie aussi deux points de forme en plus des fautes :
- le gras sémantique (**...**) est bien présent (2 à 4 passages par section ##, jamais une
  phrase entière, jamais le même terme en gras à deux endroits) — ajoute-le ou retire l'excès
  si besoin, mais sans changer le fond ;
- qu'aucune réponse à une section-question ("## C'est quoi, concrètement ?", "## Comment
  faire, pas à pas", "## Lequel choisir selon ton cas ?") ne commence par une longue mise en
  contexte avant de répondre à la question.
Ne change RIEN au fond : n'ajoute, ne retire et ne modifie aucune affirmation, chiffre, date ou fait — UNIQUEMENT
la forme. Corrige aussi le titre s'il contient une faute (ex. mot manquant).
Ne lisse PAS le style propre de l'auteur (rythme de phrase, tournures récurrentes) vers un style
neutre générique — corrige seulement les vraies fautes, en gardant sa voix reconnaissable.
Réponds UNIQUEMENT par un JSON strict, sans texte avant ni après :
  {"ok": true} si rien à corriger
  {"ok": false, "titre": "...", "corps": "..."} avec la version corrigée complète sinon`;

async function relireQualite({ titre, corps }) {
  const user = `TITRE :\n${titre}\n\nCORPS (Markdown) :\n${corps}`;
  let texte;
  try {
    texte = await appelBrut({
      model: MODELE_PAR_DEFAUT,
      system: CONSIGNE_RELECTURE,
      messages: [{ role: "user", content: user }],
      max_tokens: 6000,
      phase: "relecture-qualite",
    });
  } catch (err) {
    console.error(`Relecture qualité indisponible (${err.message}) — article conservé tel quel.`);
    return { ok: true };
  }
  const match = texte.match(/\{[\s\S]*\}/);
  if (!match) return { ok: true }; // réponse illisible : on garde l'original plutôt que de tout casser
  try {
    const verdict = JSON.parse(match[0]);
    if (verdict.ok) return { ok: true };
    if (typeof verdict.titre === "string" && typeof verdict.corps === "string") {
      return { ok: false, titre: verdict.titre, corps: verdict.corps };
    }
  } catch (err) {
    console.error(`Relecture qualité : JSON invalide (${err.message}) — article conservé tel quel.`);
  }
  return { ok: true };
}

// Le titre complet (souvent avec une marque, ex. "DJI Romo P2") fait dériver la recherche
// d'image vers un produit non lié au sujet réel (ex. un drone au lieu d'un aspirateur) —
// on préfère un terme générique par thème pour les actus. Plusieurs synonymes par thème
// (pas un seul) : avec une seule requête fixe, deux articles du même thème sans mot-clé
// (cas fréquent des actus) retombent sur le même résultat #1 — exactement le bug observé
// (deux articles IA avec la même photo, deux articles robotique avec la même photo).
const SYNONYMES_IMAGE_PAR_THEME = {
  "intelligence-artificielle": [
    "intelligence artificielle ordinateur",
    "réseau de neurones technologie",
    "intelligence artificielle futuriste",
  ],
  "robotique-drones": ["robot maison", "drone vol extérieur", "robot automatisation industrie"],
  "maison-connectee": ["maison connectée", "objets connectés intérieur", "domotique smartphone"],
  programmation: ["code ordinateur écran", "développeur clavier", "lignes de code moniteur"],
  "appareils-internet": ["smartphone ordinateur", "wifi réseau technologie", "appareils électroniques bureau"],
  cybersecurite: ["sécurité informatique cadenas", "cybersécurité ordinateur", "protection données numériques"],
};

// Toutes les URLs d'image déjà utilisées dans les articles existants — relu à chaque
// appel (pas mis en cache) pour voir aussi les images choisies plus tôt dans CE run.
function imagesDejaUtilisees() {
  const urls = new Set();
  if (!fs.existsSync(POSTS_DIR)) return urls;
  for (const f of fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".md"))) {
    const m = fs.readFileSync(path.join(POSTS_DIR, f), "utf8").match(/^image:\s*"([^"]+)"/m);
    if (m) urls.add(m[1]);
  }
  return urls;
}

// Essaie plusieurs requêtes dans l'ordre (mot-clé SEO d'abord si connu, puis les synonymes
// du thème) et prend le premier résultat qui n'est PAS déjà utilisé par un autre article.
// Règle stricte : une photo n'est jamais réutilisée sur le site.
async function choisirImage({ keyword, theme, titre }) {
  return unicite.choisirImageUnique(
    unicite.requetesImage({ keyword, theme, titre, synonymes: SYNONYMES_IMAGE_PAR_THEME[theme] || [] }),
    findImage,
    unicite.idsUtilisees(POSTS_DIR)
  );
}

async function construireArticle(sujet) {
  const { theme } = sujet;

  const sources = sujet.sourceUrl
    ? [{ url: sujet.sourceUrl, date: sujet.date || "", texte: `${sujet.titre} — ${sujet.resume || ""}` }]
    : [];

  // Auteur choisi AVANT la génération (sur le sujet, pas le titre généré) pour
  // que son style soit injecté dans le prompt — voir voix-auteurs.js.
  const choixAuteur = choisirAuteur({ titre: sujet.titre, categorie: theme });

  const resultat = await genererArticle({
    titre: sujet.titre,
    theme,
    sources,
    brief: sujet.keyword
      ? `Mot-clé cible (SEO) : ${sujet.keyword}, volume estimé ${sujet.volume}/mois.` +
        (sujet.volume > SEUIL_VOLUME_DEVELOPPEMENT
          ? ` Ce volume est notable : développe davantage (plus d'exemples, une section
supplémentaire si pertinent) plutôt qu'un traitement minimal — sans gonfler artificiellement
un sujet simple.`
          : "")
      : "",
    voix: voixPour(choixAuteur.auteur),
  });

  const { titre: titreGenere, corps } = separerTitreEtCorps(resultat.texte, sujet.titre);
  resultat.texte = retirerBalisesSources(corps);

  if (resultat.audit.bloquant) {
    return { ok: false, slug: slugify(titreGenere), raison: `garde-fou : ${resultat.audit.violations.length} violation(s)`, audit: resultat.audit };
  }
  const nbGras = compterGras(resultat.texte);
  if (nbGras < 2) {
    return { ok: false, slug: slugify(titreGenere), raison: `garde-fou : gras insuffisant (${nbGras} segment(s), minimum 2)` };
  }
  if (resultat.texte.includes("[À VÉRIFIER")) {
    return { ok: false, slug: slugify(titreGenere), raison: "marqueur [À VÉRIFIER] non résolu (info non sourcée) — à corriger ou sourcer" };
  }

  // Relecture qualité (forme uniquement) — seulement sur un texte déjà validé
  // factuellement ci-dessus. Peut légèrement changer le titre (faute corrigée).
  const relecture = await relireQualite({ titre: titreGenere, corps: resultat.texte });
  const titre = relecture.ok ? titreGenere : relecture.titre;
  resultat.texte = relecture.ok ? resultat.texte : relecture.corps;
  if (!relecture.ok) console.log(`Relecture qualité : corrections appliquées pour "${titreGenere}"`);

  const slug = slugify(titre);
  const fichier = path.join(POSTS_DIR, `${slug}.md`);
  if (fs.existsSync(fichier)) {
    return { ok: false, slug, raison: "fichier déjà existant" };
  }

  const choix = choixAuteur;
  const today = new Date().toISOString().slice(0, 10);

  const image = await choisirImage({ keyword: sujet.keyword, theme, titre });

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

  reinitialiserUsage();
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

  rapport.usage = resumerUsage();
  rapport.usageDepuisLeDebut = resumerHistorique();

  // Journal lisible (Google Sheet) en plus du rapport JSON brut — seulement pour
  // un run réel, pas un --dry-run de test. Ne fait jamais échouer le pipeline :
  // le rapport JSON reste la source de vérité si le Sheet est indisponible.
  if (!dryRun) {
    try {
      for (const a of rapport.articles) {
        const relatif = path.relative(ROOT, a.fichier).replace(/\\/g, "/");
        const lienCode = rapport.commit
          ? `https://github.com/Rabary17/technoplay.com/blob/${rapport.commit}/${relatif}`
          : relatif;
        await ajouterLigneJournal({
          type: "contenu",
          action: `Article publié (${a.type})`,
          detail: a.titre,
          lienSite: `https://techno-play.com/${a.slug}/`,
          lienCode,
        });
      }
      if (rapport.articles.length === 0) {
        await ajouterLigneJournal({
          type: "contenu",
          action: "Aucun article publié",
          detail: rapport.echecs.map((e) => `${e.titre || e.slug} : ${e.raison}`).join(" | ") || "—",
        });
      }
      if (rapport.verification && !rapport.verification.ok) {
        await ajouterLigneJournal({
          type: "erreur",
          action: "Vérification build échouée — rien commité",
          detail: (rapport.verification.sortie || "").slice(0, 300),
        });
      }
      await ajouterLigneJournal({
        type: "résumé",
        action: `Run quotidien : ${rapport.articles.length} publié(s), ${rapport.echecs.length} échec(s)`,
        detail: rapport.erreurs.join(" | ") || "—",
        coutUsd: rapport.usage.coutUsd,
      });
    } catch (err) {
      console.error(`Journal Sheet indisponible (${err.message}) — le rapport JSON reste la source de vérité.`);
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
  console.log(`\n=== Usage Claude (ce run) ===`);
  console.log(`Appels : ${rapport.usage.appels} · input : ${rapport.usage.inputTokens} tokens · output : ${rapport.usage.outputTokens} tokens`);
  console.log(`Coût équivalent API${rapport.usage.coutConnu ? "" : " (non disponible)"} : $${rapport.usage.coutUsd.toFixed(4)}`);
  console.log(`Coût cumulé depuis le début : $${rapport.usageDepuisLeDebut.coutUsd.toFixed(4)} sur ${rapport.usageDepuisLeDebut.appels} appel(s)`);
  console.log(`Rapport détaillé : ${path.join(RAPPORTS_DIR, nomRapport)}`);
}

main().catch((err) => {
  console.error("Erreur pipeline :", err);
  process.exit(1);
});
