import crypto from "crypto";

const TOKEN_URL = "https://oauth2.googleapis.com/token";
const SHEETS_SCOPE = "https://www.googleapis.com/auth/spreadsheets";

function base64Url(value: string) {
  return Buffer.from(value).toString("base64").replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
}

function getConfig() {
  const spreadsheetId = process.env.GOOGLE_SHEET_ID;
  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");
  const range = process.env.GOOGLE_SHEET_RANGE || "A:D";

  if (!spreadsheetId || !clientEmail || !privateKey) {
    throw new Error("Google Sheets environment variables are not configured.");
  }

  return { spreadsheetId, clientEmail, privateKey, range };
}

async function getAccessToken() {
  const { clientEmail, privateKey } = getConfig();
  const now = Math.floor(Date.now() / 1000);
  const header = base64Url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const claim = base64Url(JSON.stringify({
    iss: clientEmail,
    scope: SHEETS_SCOPE,
    aud: TOKEN_URL,
    iat: now,
    exp: now + 3600,
  }));
  const unsignedToken = `${header}.${claim}`;
  const signer = crypto.createSign("RSA-SHA256");
  signer.update(unsignedToken);
  signer.end();
  const signature = signer.sign(privateKey, "base64").replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");

  const response = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: `${unsignedToken}.${signature}`,
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Google authentication failed (${response.status}): ${detail}`);
  }

  const data = await response.json() as { access_token?: string };
  if (!data.access_token) throw new Error("Google did not return an access token.");
  return data.access_token;
}

async function sheetsRequest(path: string, init: RequestInit = {}) {
  const { spreadsheetId } = getConfig();
  const token = await getAccessToken();
  const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      ...(init.headers || {}),
    },
    cache: "no-store",
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Google Sheets request failed (${response.status}): ${detail}`);
  }
  return response.json();
}

export type RsvpRow = {
  rowNumber: number;
  name: string;
  phone: string;
  guests: number;
  submittedAt: string;
};

export async function getRsvps() {
  const { range } = getConfig();
  const encodedRange = encodeURIComponent(range);
  const data = await sheetsRequest(`/values/${encodedRange}`) as { values?: string[][] };
  const rows = data.values || [];

  return rows
    .map((row, index) => ({
      rowNumber: index + 1,
      name: String(row[0] || "").trim(),
      phone: String(row[1] || "").replace(/\D/g, ""),
      guests: Number(row[2]) || 0,
      submittedAt: String(row[3] || "").trim(),
    }))
    .filter((row) => row.rowNumber > 1 && row.phone);
}

export async function ensureHeader() {
  const { range } = getConfig();
  const encodedRange = encodeURIComponent(range);
  const data = await sheetsRequest(`/values/${encodedRange}`) as { values?: string[][] };
  const firstRow = data.values?.[0] || [];
  const expected = ["Name", "Phone Number", "Guest Count", "Submitted At"];

  if (firstRow.length === 0) {
    await sheetsRequest(`/values/A1:D1?valueInputOption=RAW`, {
      method: "PUT",
      body: JSON.stringify({ values: [expected] }),
    });
  }
}

export async function appendRsvp(name: string, phone: string, guests: number, submittedAt: string) {
  const { range } = getConfig();
  const encodedRange = encodeURIComponent(range);
  await sheetsRequest(`/values/${encodedRange}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`, {
    method: "POST",
    body: JSON.stringify({ values: [[name, phone, guests, submittedAt]] }),
  });
}

export async function updateRsvp(rowNumber: number, name: string, phone: string, guests: number, submittedAt: string) {
  await sheetsRequest(`/values/A${rowNumber}:D${rowNumber}?valueInputOption=USER_ENTERED`, {
    method: "PUT",
    body: JSON.stringify({ values: [[name, phone, guests, submittedAt]] }),
  });
}

export function totalGuests(rows: RsvpRow[]) {
  return rows.reduce((total, row) => total + Math.max(0, row.guests), 0);
}
