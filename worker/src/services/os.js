import { loadNexusRanges } from "./nexusBlocks.js";
// Pont vers OS-Loko (application interne) : agenda des interventions.
// Les routes /api/public/* de l'app sont protégées par le secret partagé
// SITE_SYNC_SECRET. Toutes les fonctions échouent « en douceur » : si l'app est
// injoignable, le site continue de fonctionner sur ses seules données KV.

function osUrl(env, path) {
  const base = (env.OS_BASE_URL || "").replace(/\/$/, "");
  return base ? `${base}${path}` : "";
}

function ready(env) {
  return Boolean(env.OS_BASE_URL && env.SITE_SYNC_SECRET);
}

/**
 * Un Worker ne peut pas joindre en HTTP un autre Worker de la même zone
 * workers.dev (erreur Cloudflare 1042) : on passe par la liaison de service
 * quand elle existe, et par fetch() sinon (développement local).
 */
function osFetch(env, url, init) {
  const request = new Request(url, init);
  return env.OS_APP ? env.OS_APP.fetch(request) : fetch(request);
}

function logError(action, error) {
  console.log(JSON.stringify({ level: "error", message: `OS-Loko: ${action}`, error: String(error) }));
}

/**
 * Plages déjà occupées dans l'agenda d'OS-Loko (interventions + perso).
 * Renvoie [] si la synchro n'est pas configurée ou si l'app est injoignable :
 * mieux vaut proposer un créneau de trop que casser la page de réservation.
 */
async function fetchOsRanges(env, fromISO, toISO) {
  if (!ready(env)) return [];
  try {
    // On élargit la fenêtre de la marge : une intervention juste avant ou juste après
    // la période demandée doit quand même bloquer ses créneaux voisins.
    const lo = new Date(Date.parse(fromISO) - BLOCK_MARGIN_MS).toISOString();
    const hi = new Date(Date.parse(toISO) + BLOCK_MARGIN_MS).toISOString();
    const res = await osFetch(
      env,
      `${osUrl(env, "/api/public/availability")}?from=${encodeURIComponent(lo)}&to=${encodeURIComponent(hi)}`,
      { headers: { "x-site-secret": env.SITE_SYNC_SECRET } }
    );
    if (!res.ok) {
      const body = await res.text().catch(() => "");
      throw new Error(`HTTP ${res.status} — ${body.slice(0, 200)}`);
    }
    const data = await res.json();
    if (!data.ok || !Array.isArray(data.busy)) throw new Error("réponse inattendue");
    return data.busy
      .map((r) => ({
        start: Date.parse(r.start),
        end: Date.parse(r.end),
        label: r.label || "Occupé",
        kind: r.kind || "intervention",
      }))
      .filter((r) => Number.isFinite(r.start) && Number.isFinite(r.end));
  } catch (err) {
    logError("lecture des disponibilités", err);
    return [];
  }
}

 /**
 * Plages occupées = agenda d'OS-Loko + planning Nexus (RDV Lockpit et interventions),
 * pour que tout ce qui bloque Luderic bloque aussi ce site.
 */
export async function fetchBusyRanges(env, fromISO, toISO) {
  const [os, nexus] = await Promise.all([
    fetchOsRanges(env, fromISO, toISO),
    loadNexusRanges(env),
  ]);
  return [...os, ...nexus];
}

/**
 * Marge de sécurité autour de chaque rendez-vous : une heure avant et une heure après
 * (le temps d'arriver et de souffler), comme sur lockpit.fr.
 */
export const BLOCK_MARGIN_MS = 60 * 60 * 1000;

/** Un créneau [start, end) chevauche-t-il une plage occupée, marge comprise ? */
export function overlapsBusy(busy, startMs, endMs) {
  return busy.some((r) => startMs < r.end + BLOCK_MARGIN_MS && endMs > r.start - BLOCK_MARGIN_MS);
}

/**
 * La plage occupée qui bloque ce créneau, s'il y en a une. `margin: true` quand le créneau
 * n'est bloqué que par la marge (le rendez-vous lui-même tombe sur un autre créneau).
 */
export function findBusy(busy, startMs, endMs) {
  const direct = busy.find((r) => startMs < r.end && endMs > r.start);
  if (direct) return { ...direct, margin: false };
  const near = busy.find((r) => startMs < r.end + BLOCK_MARGIN_MS && endMs > r.start - BLOCK_MARGIN_MS);
  return near ? { ...near, margin: true } : null;
}

/** Crée le client et l'intervention dans OS-Loko. Renvoie l'id ou null. */
export async function pushBooking(env, payload) {
  if (!ready(env)) return null;
  try {
    const res = await osFetch(env, osUrl(env, "/api/public/booking"), {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-site-secret": env.SITE_SYNC_SECRET },
      body: JSON.stringify(payload),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok || !data.ok) throw new Error(data.error || `HTTP ${res.status}`);
    return data.interventionId || null;
  } catch (err) {
    logError("création de l'intervention", err);
    return null;
  }
}

/** Passe l'intervention en « Annulée » dans OS-Loko. */
export async function cancelBooking(env, interventionId) {
  if (!ready(env) || !interventionId) return false;
  try {
    const res = await osFetch(env, osUrl(env, "/api/public/booking/cancel"), {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-site-secret": env.SITE_SYNC_SECRET },
      body: JSON.stringify({ interventionId }),
    });
    return res.ok;
  } catch (err) {
    logError("annulation de l'intervention", err);
    return false;
  }
}
