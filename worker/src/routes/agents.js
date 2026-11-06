import { json, bearer } from "../http.js";
import { slotsForDay, isWorkDay, slotToDate } from "../services/slots.js";
import { slotBounds } from "./bookings.js";

// Blocage de créneaux par un agent (routine de planification), avec un jeton DÉDIÉ.
// Le jeton ne sert qu'à bloquer / débloquer : il n'ouvre ni les réservations, ni les
// messages, ni l'annulation, et il se renouvelle sans toucher au mot de passe admin.

const MAX_RANGES = 100;
const MAX_SPAN_DAYS = 45;
const DEFAULT_MARGIN_MIN = 60;
const KEY_TTL_SECONDS = 90 * 24 * 3600; // les blocages s'effacent d'eux-mêmes

const parisDay = new Intl.DateTimeFormat("en-CA", {
  timeZone: "Europe/Paris",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

/** Comparaison à durée constante : le jeton ne doit pas fuiter par le temps de réponse. */
function tokenOk(request, env) {
  const given = bearer(request);
  const expected = env.BLOCK_TOKEN;
  if (!expected || given.length !== expected.length) return false;
  let diff = 0;
  for (let i = 0; i < expected.length; i++) diff |= given.charCodeAt(i) ^ expected.charCodeAt(i);
  return diff === 0;
}

/** « AAAA-MM-JJ » (journée entière) ou instant ISO → bornes absolues en ms ; null si invalide. */
function rangeMs(r) {
  if (!r || typeof r.start !== "string" || typeof r.end !== "string") return null;
  const dateOnly = /^\d{4}-\d{2}-\d{2}$/;
  let s, e;
  try {
    s = dateOnly.test(r.start) ? slotToDate(`${r.start}:00:00`).getTime() : Date.parse(r.start);
    e = dateOnly.test(r.end) ? slotToDate(`${r.end}:00:00`).getTime() : Date.parse(r.end);
  } catch {
    return null;
  }
  return Number.isFinite(s) && Number.isFinite(e) && e > s ? [s, e] : null;
}

/** POST /api/agents/block { action: "block"|"unblock", ranges: [{start,end}], marginMinutes? } */
export async function handlePostAgentsBlock(request, env) {
  if (!tokenOk(request, env)) return json(request, { error: "Non autorisé" }, 401);

  const body = (await request.json().catch(() => null)) || {};
  const action = body.action === "unblock" ? "unblock" : body.action === "block" ? "block" : null;
  if (!action) return json(request, { error: "action requise : block ou unblock" }, 400);
  if (!Array.isArray(body.ranges) || !body.ranges.length || body.ranges.length > MAX_RANGES) {
    return json(request, { error: `ranges requis (1 à ${MAX_RANGES})` }, 400);
  }
  const margin = Number.isFinite(body.marginMinutes)
    ? Math.min(Math.max(body.marginMinutes, 0), 240)
    : DEFAULT_MARGIN_MIN;

  const slots = new Set();
  for (const r of body.ranges) {
    const ms = rangeMs(r);
    if (!ms) return json(request, { error: "plage invalide (start/end ISO ou AAAA-MM-JJ, fin après début)" }, 400);
    const lo = ms[0] - margin * 60000;
    const hi = ms[1] + margin * 60000;
    if (hi - lo > MAX_SPAN_DAYS * 86400000) return json(request, { error: "plage trop longue" }, 400);

    for (let t = lo - 86400000; t <= hi + 86400000; t += 86400000) {
      const day = parisDay.format(new Date(t));
      if (!isWorkDay(day)) continue;
      for (const slot of slotsForDay(day)) {
        const { startMs, endMs } = slotBounds(slot);
        if (startMs < hi && endMs > lo) slots.add(slot);
      }
    }
  }

  const list = [...slots].sort();
  await Promise.all(
    list.map((slot) =>
      action === "block"
        ? env.RESA_KV.put(`blocked:${slot}`, "1", { expirationTtl: KEY_TTL_SECONDS })
        : env.RESA_KV.delete(`blocked:${slot}`)
    )
  );
  return json(request, { ok: true, action, count: list.length, slots: list });
}
