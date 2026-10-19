// Fonction serverless (Vercel) : reçoit les formulaires du site (contact et
// newsletter) et crée un prospect dans Zoho CRM via son API (OAuth, refresh
// token). Les identifiants ne sont jamais dans le dépôt : ils viennent des
// variables d'environnement du projet Vercel (voir .env.example).
// Aucune donnée personnelle n'est écrite dans les journaux.

// Le site répond sur le domaine nu et sur www : les deux sont autorisés par défaut.
const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS || "https://techno-play.com,https://www.techno-play.com")
  .split(",")
  .map((o) => o.trim())
  .filter(Boolean);

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX = { name: 80, email: 100, message: 2000 };

let tokenCache = { value: null, expiresAt: 0 };

async function getAccessToken() {
  if (tokenCache.value && Date.now() < tokenCache.expiresAt - 60_000) {
    return tokenCache.value;
  }
  const params = new URLSearchParams({
    refresh_token: process.env.ZOHO_REFRESH_TOKEN,
    client_id: process.env.ZOHO_CLIENT_ID,
    client_secret: process.env.ZOHO_CLIENT_SECRET,
    grant_type: "refresh_token",
  });
  const res = await fetch(`${process.env.ZOHO_ACCOUNTS_DOMAIN}/oauth/v2/token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params,
  });
  const json = await res.json();
  if (!res.ok || !json.access_token) throw new Error("zoho_token_failed");
  tokenCache = {
    value: json.access_token,
    expiresAt: Date.now() + (json.expires_in || 3600) * 1000,
  };
  return tokenCache.value;
}

function buildLead(kind, body) {
  const lead = {
    Last_Name: body.lastName,
    Email: body.email,
    Company: "Particulier", // champ obligatoire par défaut dans Zoho CRM
    Lead_Source: kind === "newsletter" ? "Newsletter Techno Play" : "Formulaire contact Techno Play",
  };
  if (kind === "contact") {
    lead.Description = body.message;
  } else {
    lead.Description = "Abonnement à la newsletter. Consentement donné via le formulaire.";
  }
  return lead;
}

function validate(body) {
  const kind = body.kind;
  if (kind !== "contact" && kind !== "newsletter") return "kind";
  const lastName = String(body.lastName || "").trim();
  const email = String(body.email || "").trim();
  if (!lastName || lastName.length > MAX.name) return "name";
  if (!EMAIL_RE.test(email) || email.length > MAX.email) return "email";
  if (kind === "contact") {
    const message = String(body.message || "").trim();
    if (!message || message.length > MAX.message) return "message";
  } else if (body.consent !== true) {
    return "consent";
  }
  return null;
}

module.exports = async function handler(req, res) {
  const origin = req.headers.origin || "";
  const allowed = ALLOWED_ORIGINS.includes(origin);
  if (allowed) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Vary", "Origin");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  }
  if (req.method === "OPTIONS") return res.status(allowed ? 204 : 403).end();
  if (req.method !== "POST") return res.status(405).json({ ok: false });
  if (!allowed) return res.status(403).json({ ok: false });

  let body = req.body;
  if (typeof body === "string") {
    try {
      body = JSON.parse(body);
    } catch {
      return res.status(400).json({ ok: false });
    }
  }
  body = body || {};

  // Champ-piège anti-spam : un robot le remplit, on fait semblant de réussir.
  if (body.website) return res.status(200).json({ ok: true });

  const problem = validate(body);
  if (problem) return res.status(400).json({ ok: false, field: problem });

  try {
    const token = await getAccessToken();
    const apiRes = await fetch(`${process.env.ZOHO_API_DOMAIN}/crm/v8/Leads`, {
      method: "POST",
      headers: {
        Authorization: `Zoho-oauthtoken ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: [buildLead(body.kind, body)], trigger: ["workflow"] }),
    });
    const json = await apiRes.json().catch(() => ({}));
    const status = json?.data?.[0]?.status;
    if (!apiRes.ok || status !== "success") {
      console.error("zoho_lead_failed", json?.data?.[0]?.code || apiRes.status);
      return res.status(502).json({ ok: false });
    }
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("zoho_lead_error", err && err.message);
    return res.status(502).json({ ok: false });
  }
};
