import { json, corsHeaders } from "../http.js";
import { slotsForDay, isWorkDay, isBookable, formatSlot, MAX_DAYS_AHEAD } from "../services/slots.js";
import { validateBooking } from "../services/validate.js";
import { sendEmail } from "../services/email.js";
import { bookingAdminHtml, bookingClientHtml } from "../services/emailTemplates.js";
import { verifyTurnstile, isRateLimited, clientIp } from "../services/security.js";

/** GET /api/slots?from=YYYY-MM-DD&to=YYYY-MM-DD → { "2026-08-25": ["09:00", ...] } */
export async function handleGetSlots(request, url, env) {
  const from = url.searchParams.get("from");
  const to = url.searchParams.get("to");
  if (!from || !to) return json(request, { error: "from & to requis" }, 400);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(from) || !/^\d{4}-\d{2}-\d{2}$/.test(to)) {
    return json(request, { error: "Dates invalides" }, 400);
  }

  const result = {};
  const cur = new Date(from + "T12:00:00Z");
  const end = new Date(to + "T12:00:00Z");
  const maxEnd = new Date(Date.now() + MAX_DAYS_AHEAD * 24 * 3600 * 1000);

  while (cur <= end && cur <= maxEnd) {
    const dateStr = cur.toISOString().slice(0, 10);
    if (isWorkDay(dateStr)) {
      const available = [];
      for (const slot of slotsForDay(dateStr)) {
        if (!isBookable(slot)) continue;
        const [booked, blocked] = await Promise.all([
          env.RESA_KV.get(`booking:${slot}`),
          env.RESA_KV.get(`blocked:${slot}`),
        ]);
        if (!booked && !blocked) available.push(slot.slice(-5));
      }
      if (available.length) result[dateStr] = available;
    }
    cur.setUTCDate(cur.getUTCDate() + 1);
  }

  return new Response(JSON.stringify(result), {
    headers: {
      ...corsHeaders(request),
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}

export async function handlePostBook(request, env, ctx) {
  const body = await request.json().catch(() => null);
  if (body?.website) return json(request, { ok: true }); // honeypot

  const check = validateBooking(body);
  if (!check.valid) return json(request, { error: "Données invalides", details: check.errors }, 400);

  const ip = clientIp(request);
  if (!(await verifyTurnstile(env, body?.turnstileToken, ip))) {
    return json(request, { error: "Vérification anti-robot échouée" }, 403);
  }
  if (await isRateLimited(env, `book:${ip}`, 2, 1)) {
    return json(request, { error: "Trop de réservations. Réessayez dans une heure." }, 429);
  }

  const data = check.data;
  const { slot } = data;
  if (!isWorkDay(slot.slice(0, 10)) || !isBookable(slot)) {
    return json(request, { error: "Créneau indisponible" }, 400);
  }

  const [booked, blocked] = await Promise.all([
    env.RESA_KV.get(`booking:${slot}`),
    env.RESA_KV.get(`blocked:${slot}`),
  ]);
  if (booked || blocked) return json(request, { error: "Créneau déjà réservé" }, 409);

  const booking = { ...data, ip, createdAt: new Date().toISOString() };
  await env.RESA_KV.put(`booking:${slot}`, JSON.stringify(booking));

  const { dateFormatted, timeFormatted } = formatSlot(slot);
  ctx.waitUntil(
    Promise.allSettled([
      sendEmail(env, {
        to: data.email,
        subject: `Rendez-vous Loko — ${dateFormatted} à ${timeFormatted}`,
        html: bookingClientHtml({ ...data, dateFormatted, timeFormatted }),
      }),
      sendEmail(env, {
        to: env.NOTIF_EMAIL,
        replyTo: data.email,
        subject: `Nouveau RDV — ${data.nom} · ${dateFormatted} à ${timeFormatted}`,
        html: bookingAdminHtml({ ...data, dateFormatted, timeFormatted }),
      }),
    ])
  );

  return json(request, { ok: true, slot, dateFormatted, timeFormatted });
}
