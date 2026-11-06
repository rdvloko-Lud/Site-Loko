// Planning de Nexus : la liste COMPLÈTE des « RDV Lockpit » et interventions à venir,
// envoyée par Nexus à chaque changement. Elle remplace la précédente (déplacer ou
// supprimer un rendez-vous libère donc les créneaux). Elle s'ajoute aux plages occupées
// du site, qui applique la marge d'1 h comme pour l'agenda d'OS-Loko.
import { slotToDate } from "./slots.js";

const KV_KEY = "nexus:blocks";
const MAX_EVENTS = 1000;

/** « AAAA-MM-JJ » (journée entière) ou instant ISO → bornes en ms ; null si inexploitable. */
function rangeOf(b) {
  if (!b || typeof b.id !== "string" || typeof b.start !== "string" || typeof b.end !== "string") return null;
  try {
    const day = /^\d{4}-\d{2}-\d{2}/;
    const s = b.allDay ? slotToDate(`${b.start.slice(0, 10)}:00:00`).getTime() : Date.parse(b.start);
    const e = b.allDay ? slotToDate(`${b.end.slice(0, 10)}:00:00`).getTime() : Date.parse(b.end);
    if (b.allDay && !(day.test(b.start) && day.test(b.end))) return null;
    return Number.isFinite(s) && Number.isFinite(e) && e > s ? [s, e] : null;
  } catch {
    return null;
  }
}

export async function saveNexusBlocks(env, events) {
  const clean = (Array.isArray(events) ? events : [])
    .filter((b) => rangeOf(b))
    .slice(0, MAX_EVENTS)
    .map((b) => ({ id: b.id.slice(0, 200), start: b.start, end: b.end, ...(b.allDay ? { allDay: true } : {}) }));
  await env.RESA_KV.put(KV_KEY, JSON.stringify({ updatedAt: new Date().toISOString(), events: clean }));
  return clean.length;
}

/** Plages occupées au même format que celles d'OS-Loko. Une lecture ratée ne bloque rien. */
export async function loadNexusRanges(env) {
  try {
    const raw = await env.RESA_KV.get(KV_KEY);
    if (!raw) return [];
    return (JSON.parse(raw).events || [])
      .map((b) => ({ r: rangeOf(b) }))
      .filter((x) => x.r)
      .map(({ r }) => ({ start: r[0], end: r[1], label: "Planning Nexus", kind: "nexus" }));
  } catch {
    return [];
  }
}

/** Comparaison à durée constante : le secret ne doit pas fuiter par le temps de réponse. */
export function secretOk(given, expected) {
  if (!expected || given.length !== expected.length) return false;
  let diff = 0;
  for (let i = 0; i < expected.length; i++) diff |= given.charCodeAt(i) ^ expected.charCodeAt(i);
  return diff === 0;
}
