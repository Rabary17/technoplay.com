// Client minimal pour l'API Google Sheets (lecture + écriture du statut),
// authentifié par son propre compte de service dédié (doit être partagé en
// Éditeur sur le Sheet, et l'API Google Sheets doit être activée sur son projet GCP) —
// distinct du compte de service GSC.
const fs = require("fs");
const path = require("path");
const dns = require("dns");
const { JWT } = require("google-auth-library");

dns.setDefaultResultOrder("ipv4first");

const KEY_PATH =
  process.env.SHEETS_SERVICE_ACCOUNT_PATH ||
  path.join(__dirname, "..", "..", ".secrets", "sheets-service-account.json");

const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];

function getClient() {
  const key = JSON.parse(fs.readFileSync(KEY_PATH, "utf8"));
  return new JWT({ email: key.client_email, key: key.private_key, scopes: SCOPES });
}

async function getValues(spreadsheetId, range) {
  const client = getClient();
  const res = await client.request({
    url: `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent(range)}`,
  });
  return res.data.values || [];
}

async function updateValues(spreadsheetId, range, values) {
  const client = getClient();
  const res = await client.request({
    url: `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent(
      range
    )}?valueInputOption=RAW`,
    method: "PUT",
    data: { range, values, majorDimension: "ROWS" },
  });
  return res.data;
}

module.exports = { getValues, updateValues };

if (require.main === module) {
  const spreadsheetId = process.argv[2] || "1EBgO2wj8Tw2e9ZGkjRc3stOIEKhkjwVlwl0p6ckUf8g";
  getValues(spreadsheetId, "IA!A1:F3")
    .then((values) => {
      console.log("Lecture OK :");
      console.log(JSON.stringify(values, null, 2));
    })
    .catch((err) => {
      console.error("Erreur Sheets :", err.response?.data || err.message);
      process.exit(1);
    });
}
