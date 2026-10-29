// Anti-spam : Turnstile côté serveur + limitation par IP + honeypot
// + contrôle d'origine + filtre de contenu (liens, domaines jetables).

import { ALLOWED_ORIGINS } from "../http.js";

export async function verifyTurnstile(env, token, ip) {
  if (!env.TURNSTILE_SECRET) return true; // non configuré : on laisse passer
  if (!token) return false;
  const form = new FormData();
  form.append("secret", env.TURNSTILE_SECRET);
  form.append("response", token);
  if (ip) form.append("remoteip", ip);
  const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    body: form,
  });
  const data = await res.json().catch(() => ({ success: false }));
  return data.success === true;
}

/** true si la limite est dépassée. */
export async function isRateLimited(env, key, limit = 3, windowHours = 1) {
  const kvKey = `ratelimit:${key}:${Math.floor(Date.now() / (windowHours * 3600000))}`;
  const current = await env.RESA_KV.get(kvKey);
  const count = (current ? parseInt(current, 10) : 0) + 1;
  if (count > limit) return true;
  await env.RESA_KV.put(kvKey, String(count), { expirationTtl: windowHours * 3600 });
  return false;
}

export function clientIp(request) {
  return request.headers.get("CF-Connecting-IP") || "unknown";
}

/**
 * Les formulaires sont envoyés par le navigateur depuis lokofr.com : un POST
 * sans en-tête Origin (script, curl) ou depuis un autre site est refusé.
 */
export function originOk(request) {
  const origin = request.headers.get("Origin") || "";
  return ALLOWED_ORIGINS.includes(origin);
}

// Liens sous toutes leurs formes : http://, www., ou « domaine.tld/chemin ».
const URL_RE = /(https?:\/\/|www\.)\S+|\b[a-z0-9-]+(\.[a-z0-9-]+)*\.(com|net|org|info|online|site|xyz|top|club|link|ru|cn|fr|io|co|me|biz|shop|store|live|pro|app|cc|tk|ml|ga|cf|gq)\/\S*/i;

// Domaines d'e-mail jetables ou typiques des campagnes de hameçonnage.
const DISPOSABLE_DOMAINS = [
  "prodmail.online",
  "mailinator.com",
  "guerrillamail.com",
  "10minutemail.com",
  "tempmail.com",
  "temp-mail.org",
  "yopmail.com",
  "sharklasers.com",
  "trashmail.com",
  "dispostable.com",
  "getnada.com",
  "maildrop.cc",
];

const DISPOSABLE_TLDS = [".online", ".xyz", ".top", ".club", ".site", ".tk", ".ml", ".ga", ".cf", ".gq", ".ru"];

/**
 * Renvoie la raison pour laquelle le message ressemble à du spam, ou "" sinon.
 * Un message légitime pour un dépannage à domicile ne contient pas de lien.
 */
export function spamReason({ nom = "", email = "", ville = "", message = "", service = "", adresse = "" }) {
  const texte = [nom, ville, message, service, adresse].join("\n");
  if (URL_RE.test(texte)) return "lien";

  const domain = String(email).toLowerCase().split("@")[1] || "";
  if (DISPOSABLE_DOMAINS.includes(domain)) return "email-jetable";
  if (DISPOSABLE_TLDS.some((tld) => domain.endsWith(tld))) return "email-tld-suspect";

  // Nom composé uniquement de chiffres / symboles, ou contenant un e-mail.
  if (!/[a-zÀ-ÿ]/i.test(nom) || /@/.test(nom)) return "nom-suspect";

  return "";
}

/** Journalise un envoi rejeté (visible dans l'observabilité du Worker). */
export function logSpam(route, reason, ip, data) {
  console.log(
    JSON.stringify({
      level: "warn",
      message: "spam-rejete",
      route,
      reason,
      ip,
      email: data?.email || "",
      extrait: String(data?.message || "").slice(0, 120),
    })
  );
}
