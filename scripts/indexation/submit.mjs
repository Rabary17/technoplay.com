// Après publication d'articles : envoie leurs URL à IndexNow (Bing) et demande à
// Google Search Console de relire le sitemap d'index (déclaré dans robots.txt).
// Appelé par le workflow autopilote-seo avec NOUVELLES_URLS (une URL par ligne).
// Sans URL, ne fait rien.
//
// Secrets utilisés pour Google (facultatifs : sans eux, seule IndexNow est faite) :
//   GSC_SERVICE_ACCOUNT_JSON  JSON complet du compte de service (propriétaire de la propriété GSC)
//   GSC_SITE_URL              propriété exacte, ex. "https://www.techno-play.com/" ou "sc-domain:techno-play.com"

import { createSign } from "node:crypto";
import { readdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const SITE = "https://techno-play.com";
const HOTE = "techno-play.com";
const TOKEN_URL = "https://oauth2.googleapis.com/token";

// La clé IndexNow est le seul fichier <clé>.txt du dossier public/ (à côté de ce script).
const racine = join(dirname(fileURLToPath(import.meta.url)), "..", "..", "public");
const CLE = readdirSync(racine).find((f) => /^[a-f0-9]{32}\.txt$/.test(f))?.replace(/\.txt$/, "");

const urls = (process.env.NOUVELLES_URLS || "").split("\n").map((u) => u.trim()).filter(Boolean);
if (urls.length === 0) {
  console.log("Aucune nouvelle URL à signaler.");
  process.exit(0);
}
if (!CLE) {
  console.warn("Clé IndexNow introuvable dans public/ : rien envoyé.");
  process.exit(0);
}

// Laisse à Vercel le temps de déployer avant de signaler les URL.
const attente = Number(process.env.ATTENTE_DEPLOIEMENT ?? 180);
await new Promise((r) => setTimeout(r, attente * 1000));

// ---- IndexNow (Bing et partenaires)
try {
  const res = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "content-type": "application/json; charset=utf-8" },
    body: JSON.stringify({ host: HOTE, key: CLE, keyLocation: `${SITE}/${CLE}.txt`, urlList: urls }),
  });
  console.log(`IndexNow : ${res.status} pour ${urls.length} URL`);
} catch (e) {
  console.warn(`IndexNow : échec (${e.message})`);
}

// ---- Google Search Console : re-soumission du sitemap d'index
function base64url(input) {
  return Buffer.from(input).toString("base64url");
}

async function jetonGoogle(compte) {
  const maintenant = Math.floor(Date.now() / 1000);
  const entete = base64url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const charge = base64url(
    JSON.stringify({
      iss: compte.client_email,
      scope: "https://www.googleapis.com/auth/webmasters",
      aud: TOKEN_URL,
      iat: maintenant,
      exp: maintenant + 3600,
    })
  );
  const signature = createSign("RSA-SHA256").update(`${entete}.${charge}`).sign(compte.private_key, "base64url");
  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: `${entete}.${charge}.${signature}`,
    }),
  });
  if (!res.ok) throw new Error(`jeton Google refusé (${res.status})`);
  return (await res.json()).access_token;
}

const brut = process.env.GSC_SERVICE_ACCOUNT_JSON;
const propriete = process.env.GSC_SITE_URL;
if (!brut || !propriete) {
  console.log("Google Search Console : secrets absents, sitemap non soumis.");
} else {
  try {
    const jeton = await jetonGoogle(JSON.parse(brut));
    const feedpath = `${SITE}/sitemap_index.xml`;
    const url = `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(propriete)}/sitemaps/${encodeURIComponent(feedpath)}`;
    const res = await fetch(url, { method: "PUT", headers: { Authorization: `Bearer ${jeton}` } });
    console.log(res.ok ? "Google Search Console : sitemap soumis." : `Google Search Console : refusé (${res.status}).`);
  } catch (e) {
    console.warn(`Google Search Console : échec (${e.message})`);
  }
}
