import { json, adminOk } from "../http.js";
import { sendEmail } from "../services/email.js";
import { contactAdminHtml, contactClientHtml } from "../services/emailTemplates.js";
import { validateContact } from "../services/validate.js";
import { verifyTurnstile, isRateLimited, clientIp } from "../services/security.js";

export async function handlePostContact(request, env, ctx) {
  const body = await request.json().catch(() => null);
  if (body?.website) return json(request, { ok: true }); // honeypot : on fait semblant

  const check = validateContact(body);
  if (!check.valid) return json(request, { error: "Données invalides", details: check.errors }, 400);

  const ip = clientIp(request);
  if (!(await verifyTurnstile(env, body?.turnstileToken, ip))) {
    return json(request, { error: "Vérification anti-robot échouée" }, 403);
  }
  if (await isRateLimited(env, `contact:${ip}`, 5, 1)) {
    return json(request, { error: "Trop de messages envoyés. Réessayez dans une heure." }, 429);
  }

  const data = check.data;
  const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  await env.RESA_KV.put(
    `contact:${id}`,
    JSON.stringify({ ...data, ip, createdAt: new Date().toISOString() }),
    { expirationTtl: 60 * 60 * 24 * 365 }
  );

  ctx.waitUntil(
    Promise.allSettled([
      sendEmail(env, {
        to: env.NOTIF_EMAIL,
        replyTo: data.email,
        subject: `Nouveau message — ${data.nom}`,
        html: contactAdminHtml(data),
      }),
      sendEmail(env, {
        to: data.email,
        subject: "Votre message a bien été reçu — Loko",
        html: contactClientHtml({ nom: data.nom }),
      }),
    ])
  );

  return json(request, { ok: true });
}

export async function handleGetAdminContacts(request, env) {
  if (!adminOk(request, env)) return json(request, { error: "Non autorisé" }, 401);

  const list = await env.RESA_KV.list({ prefix: "contact:" });
  const contacts = [];
  for (const key of list.keys) {
    const val = await env.RESA_KV.get(key.name);
    if (val) contacts.push({ id: key.name.slice("contact:".length), ...JSON.parse(val) });
  }
  contacts.sort((a, b) => String(b.createdAt).localeCompare(String(a.createdAt)));
  return json(request, contacts);
}

export async function handleDeleteAdminContact(request, env) {
  if (!adminOk(request, env)) return json(request, { error: "Non autorisé" }, 401);
  const { id } = (await request.json().catch(() => ({}))) || {};
  if (!id) return json(request, { error: "id requis" }, 400);
  await env.RESA_KV.delete(`contact:${id}`);
  return json(request, { ok: true });
}
