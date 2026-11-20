#!/usr/bin/env node
// Rattrapage ponctuel : assigne une image à la une aux articles existants qui
// n'en ont aucune (fallback générique par catégorie jusqu'ici), et corrige les
// doublons déjà en ligne (deux articles différents qui partagent la même
// photo). Mêmes règles anti-doublon que scripts/seo/run-pipeline.js — ce
// script existe séparément car run-pipeline.js lance son pipeline dès qu'il
// est chargé (pas de garde require.main), donc pas sûr à `require()` ici.
//
// Manipule le frontmatter en texte brut (pas gray-matter.stringify()) : ce
// dernier reformate TOUT le frontmatter au passage (guillemets retirés, YAML
// replié) et casse au passage la détection anti-doublon (qui attend
// `image: "..."` sur une seule ligne) — constaté et corrigé le 2026-11-20.
//
// Usage :
//   node scripts/seo/corriger-images.js            (liste ce qui serait fait, ne touche rien)
//   node scripts/seo/corriger-images.js --ecrire    (applique réellement)
"use strict";
const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");
const { findImage } = require("./image-client");

const POSTS_DIR = path.join(__dirname, "..", "..", "content", "posts");

// URLs connues pour être dupliquées en ligne (constatées manuellement le
// 2026-11-20) — traitées comme "sans image" pour forcer leur remplacement,
// même si le champ `image` est techniquement rempli.
const DOUBLONS_CONNUS = new Set([
  "https://images.unsplash.com/photo-1697577418970-95d99b5a55cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5NTE4NzJ8MHwxfHNlYXJjaHwxfHxpbnRlbGxpZ2VuY2UlMjBhcnRpZmljaWVsbGUlMjBvcmRpbmF0ZXVyfGVufDB8MHx8fDE3OTQ5ODY2NjF8MA&ixlib=rb-4.1.0&q=80&w=1080",
  "https://images.unsplash.com/photo-1697577418970-95d99b5a55cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5NTE4NzJ8MHwxfHNlYXJjaHwxfHxpbnRlbGxpZ2VuY2UlMjBhcnRpZmljaWVsbGUlMjBvcmRpbmF0ZXVyfGVufDB8MHx8fDE3OTUxMDIyMzV8MA&ixlib=rb-4.1.0&q=80&w=1080",
  "https://images.pexels.com/photos/6019019/pexels-photo-6019019.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
]);

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

function imagesDejaUtilisees() {
  const urls = new Set();
  for (const f of fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".md"))) {
    const { data } = matter(fs.readFileSync(path.join(POSTS_DIR, f), "utf8"));
    if (data.image && !DOUBLONS_CONNUS.has(data.image)) urls.add(data.image);
  }
  return urls;
}

async function choisirImage({ theme, titre }, dejaUtilisees) {
  const requetes = [...(SYNONYMES_IMAGE_PAR_THEME[theme] || []), titre].filter(Boolean);
  let premierResultatVu = null;
  for (const requete of requetes) {
    try {
      const resultats = await findImage(requete);
      if (!premierResultatVu && resultats.length > 0) premierResultatVu = resultats[0];
      const libre = resultats.find((r) => !dejaUtilisees.has(r.url));
      if (libre) return libre;
    } catch (err) {
      console.error(`Recherche image échouée pour "${requete}" : ${err.message}`);
    }
  }
  return premierResultatVu;
}

// Remplace/insère les lignes `image:`/`imageAlt:` dans le frontmatter brut,
// sans toucher à rien d'autre. `image:` existant (doublon) → ses lignes
// (image + imageAlt juste après, si présente) sont remplacées en place.
// `image:` absent → les deux lignes sont insérées juste après `category:`
// (même ordre que les frontmatters générés par run-pipeline.js).
function ecrireImageDansFrontmatter(brut, imageUrl, imageAlt) {
  const ligneImage = `image: "${imageUrl}"`;
  const ligneAlt = `imageAlt: ${JSON.stringify(imageAlt)}`;
  if (/^image:/m.test(brut)) {
    let sortie = brut.replace(/^image:.*$/m, ligneImage);
    if (/^imageAlt:/m.test(sortie)) {
      sortie = sortie.replace(/^imageAlt:.*$/m, ligneAlt);
    } else {
      sortie = sortie.replace(/^(image:.*)$/m, `$1\n${ligneAlt}`);
    }
    return sortie;
  }
  return brut.replace(/^(category:.*)$/m, `$1\n${ligneImage}\n${ligneAlt}`);
}

async function main() {
  const ecrire = process.argv.includes("--ecrire");
  const fichiers = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".md"));
  const dejaUtilisees = imagesDejaUtilisees();

  const aCorrige = [];
  for (const nom of fichiers) {
    const chemin = path.join(POSTS_DIR, nom);
    const brut = fs.readFileSync(chemin, "utf8");
    const { data } = matter(brut);
    const manque = !data.image || DOUBLONS_CONNUS.has(data.image);
    if (!manque) continue;

    console.log(`${ecrire ? "Correction" : "À corriger"} : ${nom} (catégorie : ${data.category || "?"})`);
    const image = await choisirImage({ theme: data.category, titre: data.title }, dejaUtilisees);
    if (!image) {
      console.error(`  → aucune image trouvée pour "${data.title}", laissé tel quel.`);
      continue;
    }
    dejaUtilisees.add(image.url);
    aCorrige.push({ nom, image });

    if (ecrire) {
      const nouveauContenu = ecrireImageDansFrontmatter(brut, image.url, image.alt || data.title);
      fs.writeFileSync(chemin, nouveauContenu, "utf8");
      console.log(`  → ${image.url}`);
    }
    // Pause légère entre deux appels — poli envers les API gratuites (Unsplash
    // limite les apps en mode démo à 50 requêtes/heure).
    await new Promise((r) => setTimeout(r, 300));
  }

  console.log(`\n${aCorrige.length} article(s) ${ecrire ? "corrigé(s)" : "à corriger"} sur ${fichiers.length}.`);
  if (!ecrire) console.log("(mode simulation — relancer avec --ecrire pour appliquer réellement)");
}

main().catch((err) => {
  console.error("Erreur :", err);
  process.exit(1);
});
