import { json, adminOk } from "../http.js";
import { slotsForDay, isWorkDay, formatSlot } from "../services/slots.js";
import { sendEmail } from "../services/email.js";
import { bookingCancelledHtml } from "../services/emailTemplates.js";
import { cancelBooking, fetchBusyRanges, findBusy } from "../services/os.js";
import { slotBounds } from "./bookings.js";

/** GET /api/admin/bookings?from=&to= — RDV + créneaux bloqués. */
export async function handleGetAdminBookings(request, url, env) {
  if (!adminOk(request, env)) return json(request, { error: "Non autorisé" }, 401);

  const from = url.searchParams.get("from");
  const to = url.searchParams.get("to");
  if (!from || !to) return json(request, { error: "from & to requis" }, 400);

  const result = [];
  const cur = new Date(from + "T12:00:00Z");
  const end = new Date(to + "T12:00:00Z");

  // Agenda d'OS-Loko, pour afficher aussi ce qui n'a pas été pris sur le site.
  const busy = await fetchBusyRanges(
    env,
    new Date(from + "T00:00:00Z").toISOString(),
    new Date(new Date(to + "T00:00:00Z").getTime() + 24 * 3600 * 1000).toISOString()
  );

  while (cur <= end) {
    const dateStr = cur.toISOString().slice(0, 10);
    if (isWorkDay(dateStr)) {
      for (const slot of slotsForDay(dateStr)) {
        const [val, blk] = await Promise.all([
          env.RESA_KV.get(`booking:${slot}`),
          env.RESA_KV.get(`blocked:${slot}`),
        ]);
        const time = slot.slice(-5);
        if (val) {
          result.push({ slot, date: dateStr, time, type: "booked", ...JSON.parse(val) });
          continue;
        }
        if (blk) {
          result.push({ slot, date: dateStr, time, type: "blocked" });
          continue;
        }
        const { startMs, endMs } = slotBounds(slot);
        const os = findBusy(busy, startMs, endMs);
        if (os) result.push({ slot, date: dateStr, time, type: "os", label: os.label, kind: os.kind });
      }
    }
    cur.setUTCDate(cur.getUTCDate() + 1);
  }
  return json(request, result);
}

/** POST /api/admin/block { slot, action: "block" | "unblock" } */
export async function handlePostAdminBlock(request, env) {
  if (!adminOk(request, env)) return json(request, { error: "Non autorisé" }, 401);
  const { slot, action } = (await request.json().catch(() => ({}))) || {};
  if (!slot) return json(request, { error: "slot requis" }, 400);
  if (action === "block") await env.RESA_KV.put(`blocked:${slot}`, "1");
  else await env.RESA_KV.delete(`blocked:${slot}`);
  return json(request, { ok: true });
}

/** POST /api/admin/cancel { slot, notify?: boolean } */
export async function handlePostAdminCancel(request, env, ctx) {
  if (!adminOk(request, env)) return json(request, { error: "Non autorisé" }, 401);
  const { slot, notify = true } = (await request.json().catch(() => ({}))) || {};
  if (!slot) return json(request, { error: "slot requis" }, 400);

  const existing = await env.RESA_KV.get(`booking:${slot}`);
  await env.RESA_KV.delete(`booking:${slot}`);

  if (existing) {
    const booking = JSON.parse(existing);
    const { dateFormatted, timeFormatted } = formatSlot(slot);

    // L'intervention correspondante passe en « Annulée » dans OS-Loko.
    ctx.waitUntil(cancelBooking(env, booking.osInterventionId));

    if (notify) {
      ctx.waitUntil(
        sendEmail(env, {
          to: booking.email,
          subject: `Rendez-vous annulé — ${dateFormatted} à ${timeFormatted}`,
          html: bookingCancelledHtml({ nom: booking.nom, dateFormatted, timeFormatted }),
        })
      );
    }
  }
  return json(request, { ok: true });
}

/** POST /api/admin/login { password } — vérifie le mot de passe. */
export async function handlePostAdminLogin(request, env) {
  const { password } = (await request.json().catch(() => ({}))) || {};
  if (!env.ADMIN_PASSWORD || password !== env.ADMIN_PASSWORD) {
    return json(request, { error: "Mot de passe incorrect" }, 401);
  }
  return json(request, { ok: true });
}
