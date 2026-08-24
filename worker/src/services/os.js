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
export async function fetchBusyRanges(env, fromISO, toISO) {
  if (!ready(env)) return [];
  try {
    const res = await osFetch(
      env,
      `${osUrl(env, "/api/public/availability")}?from=${encodeURIComponent(fromISO)}&to=${encodeURIComponent(toISO)}`,
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

/** Un créneau [start, end) chevauche-t-il une plage occupée ? */
export function overlapsBusy(busy, startMs, endMs) {
  return busy.some((r) => startMs < r.end && endMs > r.start);
}

/** La plage occupée qui chevauche ce créneau, s'il y en a une. */
export function findBusy(busy, startMs, endMs) {
  return busy.find((r) => startMs < r.end && endMs > r.start) || null;
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
