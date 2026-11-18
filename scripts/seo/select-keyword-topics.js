// Sélectionne des sujets d'article SEO (hors actu) à partir de volumes de recherche réels
// DataForSEO, en excluant ce qui est déjà couvert par un article publié.
// Usage : node scripts/seo/select-keyword-topics.js [--n 3]
const fs = require("fs");
const path = require("path");
const { keywordsForKeywords } = require("./dataforseo-client");

const POSTS_DIR = path.join(__dirname, "..", "..", "content", "posts");

// Mots-clés "graines" par thème — point de départ pour que DataForSEO suggère les
// variantes réelles. À enrichir avec le temps selon ce qui marche.
const GRAINES_PAR_THEME = {
  "intelligence-artificielle": ["intelligence artificielle", "chatgpt", "agent ia"],
  "robotique-drones": ["robot aspirateur", "drone", "robot maison"],
  "maison-connectee": ["maison connectée", "domotique", "assistant vocal maison"],
  programmation: ["apprendre à coder", "langage de programmation", "créer un site web"],
  "appareils-internet": ["smartphone", "wifi maison", "écran pc"],
  cybersecurite: ["mot de passe sécurisé", "arnaque internet", "vpn"],
};

function motsClesExistants() {
  if (!fs.existsSync(POSTS_DIR)) return new Set();
  const textes = fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => fs.readFileSync(path.join(POSTS_DIR, f), "utf8").slice(0, 400).toLowerCase());
  return textes;
}

function dejaCouvert(motCle, textesExistants) {
  const mc = motCle.toLowerCase();
  return textesExistants.some((t) => t.includes(mc));
}

// Têtes de gondole très fortement recherchées (chatgpt, intelligence artificielle...) :
// jamais de vraies cibles d'article pour un petit site, et souvent polluées par des
// fautes de frappe auxquelles l'API colle à tort le même volume que le terme principal.
const VOLUME_MAX = 20000;

function estLongueTraine(motCle) {
  return motCle.trim().split(/\s+/).length >= 3;
}

async function selectionnerSujetsSeo({ n = 3, volumeMin = 150, volumeMax = VOLUME_MAX } = {}) {
  const textesExistants = motsClesExistants();
  const sujets = [];
  for (const [theme, graines] of Object.entries(GRAINES_PAR_THEME)) {
    if (sujets.length >= n * 3) break; // marge pour filtrer ensuite
    try {
      const resultats = await keywordsForKeywords(graines, { limit: 50 });
      for (const r of resultats) {
        if (!r.search_volume || r.search_volume < volumeMin || r.search_volume > volumeMax) continue;
        if (!estLongueTraine(r.keyword)) continue;
        if (dejaCouvert(r.keyword, textesExistants)) continue;
        sujets.push({ theme, keyword: r.keyword, volume: r.search_volume, cpc: r.cpc, competition: r.competition });
      }
    } catch (err) {
      console.error(`Erreur DataForSEO pour le thème ${theme} : ${err.message}`);
    }
  }
  // Un meilleur mot-clé par thème d'abord (diversité), puis complète par volume décroissant.
  sujets.sort((a, b) => b.volume - a.volume);
  const parTheme = new Map();
  const selection = [];
  for (const s of sujets) {
    if (selection.length >= n) break;
    if (!parTheme.has(s.theme)) {
      parTheme.set(s.theme, true);
      selection.push(s);
    }
  }
  for (const s of sujets) {
    if (selection.length >= n) break;
    if (!selection.includes(s)) selection.push(s);
  }
  return selection;
}

module.exports = { selectionnerSujetsSeo };

if (require.main === module) {
  const args = process.argv.slice(2);
  const n = args.includes("--n") ? Number(args[args.indexOf("--n") + 1]) : 3;
  selectionnerSujetsSeo({ n })
    .then((sujets) => {
      console.log(`${sujets.length} sujet(s) SEO retenu(s) :`);
      for (const s of sujets) {
        console.log(`- [${s.theme}] "${s.keyword}" — volume ${s.volume}/mois, cpc ${s.cpc}€, concurrence ${s.competition}`);
      }
    })
    .catch((err) => {
      console.error("Erreur sélection SEO :", err.message);
      process.exit(1);
    });
}
