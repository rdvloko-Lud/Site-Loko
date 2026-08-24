// Envoi d'emails via le binding natif Cloudflare Email Sending (aucune clé API).
// Prérequis : `npx wrangler email sending enable lokofr.com`.

export async function sendEmail(env, { to, subject, html, text, replyTo }) {
  if (!env.EMAIL || !to) return false;
  try {
    await env.EMAIL.send({
      to,
      from: { email: env.FROM_EMAIL, name: env.FROM_NAME || "Loko" },
      ...(replyTo ? { replyTo } : {}),
      subject,
      html,
      text: text || htmlToText(html),
    });
    return true;
  } catch (err) {
    console.log(
      JSON.stringify({ level: "error", message: "sendEmail failed", to, subject, error: String(err) })
    );
    return false;
  }
}

function htmlToText(html) {
  return String(html)
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/(p|div|tr|h[1-6])>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}
