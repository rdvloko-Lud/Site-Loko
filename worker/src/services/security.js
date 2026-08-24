// Anti-spam : Turnstile côté serveur + limitation par IP + honeypot.

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
