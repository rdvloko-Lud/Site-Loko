// Créneaux de rendez-vous Loko.
// Une clé de créneau a la forme "YYYY-MM-DD:HH:MM" et représente une HEURE LOCALE
// française (Europe/Paris) : c'est ce que voit le client comme l'artisan.

export const WORK_DAYS = [1, 2, 3, 4, 5, 6]; // lundi → samedi
export const MORNING = { start: 9, end: 12 }; // 9h, 10h, 11h
export const AFTERNOON = { start: 14, end: 18 }; // 14h → 17h
export const SLOT_MINUTES = 60;
export const MIN_ADVANCE_HOURS = 4;
export const MAX_DAYS_AHEAD = 30;

/** Décalage Europe/Paris (en minutes) pour un instant donné. */
function parisOffsetMinutes(utcDate) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Europe/Paris",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).formatToParts(utcDate);
  const get = (t) => Number(parts.find((p) => p.type === t).value);
  const asUtc = Date.UTC(
    get("year"),
    get("month") - 1,
    get("day"),
    get("hour") % 24,
    get("minute"),
    get("second")
  );
  return (asUtc - utcDate.getTime()) / 60000;
}

/** Convertit une clé de créneau (heure de Paris) en instant absolu. */
export function slotToDate(slotKey) {
  const parts = String(slotKey || "").split(":");
  if (parts.length !== 3) throw new Error(`Créneau invalide : "${slotKey}"`);
  const [dateStr, hh, mm] = parts;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) throw new Error(`Date invalide : "${dateStr}"`);
  if (!/^\d{2}$/.test(hh) || !/^\d{2}$/.test(mm)) throw new Error(`Heure invalide : "${slotKey}"`);

  const naive = Date.UTC(
    Number(dateStr.slice(0, 4)),
    Number(dateStr.slice(5, 7)) - 1,
    Number(dateStr.slice(8, 10)),
    Number(hh),
    Number(mm)
  );
  // Le décalage se calcule sur l'instant approché puis se corrige une fois
  // (suffisant hors des 2 heures de bascule d'heure d'été).
  const approx = new Date(naive - parisOffsetMinutes(new Date(naive)) * 60000);
  return new Date(naive - parisOffsetMinutes(approx) * 60000);
}

export function slotsForDay(dateStr) {
  const slots = [];
  const push = (h) =>
    slots.push(`${dateStr}:${String(h).padStart(2, "0")}:00`);
  for (let h = MORNING.start; h < MORNING.end; h += SLOT_MINUTES / 60) push(h);
  for (let h = AFTERNOON.start; h < AFTERNOON.end; h += SLOT_MINUTES / 60) push(h);
  return slots;
}

export function isWorkDay(dateStr) {
  const d = new Date(dateStr + "T12:00:00Z");
  return WORK_DAYS.includes(d.getUTCDay());
}

/** Le créneau est-il assez loin dans le futur pour être réservable ? */
export function isBookable(slotKey) {
  const t = slotToDate(slotKey).getTime();
  const now = Date.now();
  return (
    t > now + MIN_ADVANCE_HOURS * 3600 * 1000 &&
    t < now + MAX_DAYS_AHEAD * 24 * 3600 * 1000
  );
}

export function formatSlot(slotKey) {
  const [dateStr, hh, mm] = slotKey.split(":");
  const dateFormatted = new Date(dateStr + "T12:00:00Z").toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  return { dateFormatted, timeFormatted: `${hh}h${mm}` };
}
