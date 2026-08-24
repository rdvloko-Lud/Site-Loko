// Gabarits d'emails — thème « Encre & Sable » du site (crème / encre / bleu).

const CREAM = "#FBF8F3";
const INK = "#1C2433";
const BLUE = "#2563EB";

export function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function layout(inner) {
  return `<!doctype html><html lang="fr"><body style="margin:0;padding:24px;background:${CREAM};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:${INK}">
  <div style="max-width:560px;margin:0 auto;background:#fff;border:1px solid rgba(28,36,51,0.10);border-radius:16px;padding:28px">
    <div style="font-size:13px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:${BLUE};margin-bottom:14px">Loko</div>
    ${inner}
    <hr style="border:none;border-top:1px solid rgba(28,36,51,0.10);margin:24px 0" />
    <p style="font-size:13px;color:rgba(28,36,51,0.6);margin:0">
      Loko — assistance numérique à domicile aux Sables d’Olonne<br />
      07 63 13 15 15 · <a href="https://www.lokofr.com" style="color:${BLUE}">www.lokofr.com</a>
    </p>
  </div></body></html>`;
}

function rows(pairs) {
  return `<table style="width:100%;border-collapse:collapse;font-size:15px">${pairs
    .filter(([, v]) => v)
    .map(
      ([k, v]) =>
        `<tr><td style="padding:6px 0;color:rgba(28,36,51,0.6);width:130px;vertical-align:top">${escapeHtml(
          k
        )}</td><td style="padding:6px 0;font-weight:600">${escapeHtml(v)}</td></tr>`
    )
    .join("")}</table>`;
}

export function contactAdminHtml({ nom, email, telephone, ville, message }) {
  return layout(`
    <h1 style="font-size:21px;margin:0 0 16px">Nouveau message du site</h1>
    ${rows([
      ["Nom", nom],
      ["Email", email],
      ["Téléphone", telephone],
      ["Ville", ville],
    ])}
    <p style="margin:18px 0 6px;color:rgba(28,36,51,0.6);font-size:14px">Message</p>
    <div style="background:${CREAM};border-radius:12px;padding:14px;font-size:15px;white-space:pre-wrap">${escapeHtml(
      message
    )}</div>`);
}

export function contactClientHtml({ nom }) {
  return layout(`
    <h1 style="font-size:21px;margin:0 0 12px">Merci ${escapeHtml(nom)}, votre message est bien arrivé</h1>
    <p style="font-size:15px;line-height:1.6;margin:0">
      Je reviens vers vous très rapidement pour organiser l’intervention.
      Pour une urgence, appelez directement le <strong>07 63 13 15 15</strong>.
    </p>`);
}

export function bookingClientHtml({ nom, dateFormatted, timeFormatted, lieu, adresse, service, message }) {
  return layout(`
    <h1 style="font-size:21px;margin:0 0 12px">Rendez-vous confirmé</h1>
    <p style="font-size:15px;line-height:1.6;margin:0 0 18px">
      Bonjour ${escapeHtml(nom)}, votre rendez-vous est enregistré.
    </p>
    ${rows([
      ["Date", `${dateFormatted}`],
      ["Heure", timeFormatted],
      ["Type", lieu === "distance" ? "Assistance à distance" : "Intervention à domicile"],
      ["Adresse", adresse],
      ["Besoin", service],
      ["Précisions", message],
    ])}
    <p style="font-size:14px;line-height:1.6;color:rgba(28,36,51,0.7);margin:18px 0 0">
      Un empêchement ? Prévenez-moi au 07 63 13 15 15, je décale sans problème.
    </p>`);
}

export function bookingAdminHtml({ nom, email, telephone, dateFormatted, timeFormatted, lieu, adresse, ville, service, message }) {
  return layout(`
    <h1 style="font-size:21px;margin:0 0 16px">Nouveau rendez-vous</h1>
    ${rows([
      ["Date", `${dateFormatted} à ${timeFormatted}`],
      ["Type", lieu === "distance" ? "À distance" : "À domicile"],
      ["Nom", nom],
      ["Téléphone", telephone],
      ["Email", email],
      ["Adresse", adresse],
      ["Ville", ville],
      ["Besoin", service],
    ])}
    ${
      message
        ? `<p style="margin:18px 0 6px;color:rgba(28,36,51,0.6);font-size:14px">Précisions</p>
    <div style="background:${CREAM};border-radius:12px;padding:14px;font-size:15px;white-space:pre-wrap">${escapeHtml(
      message
    )}</div>`
        : ""
    }`);
}

export function bookingCancelledHtml({ nom, dateFormatted, timeFormatted }) {
  return layout(`
    <h1 style="font-size:21px;margin:0 0 12px">Rendez-vous annulé</h1>
    <p style="font-size:15px;line-height:1.6;margin:0">
      Bonjour ${escapeHtml(nom)}, le rendez-vous du <strong>${escapeHtml(
        dateFormatted
      )} à ${escapeHtml(timeFormatted)}</strong> a été annulé.
      Appelez-moi au <strong>07 63 13 15 15</strong> pour en fixer un autre, ou reprenez un créneau sur
      <a href="https://www.lokofr.com/rendez-vous" style="color:${BLUE}">lokofr.com</a>.
    </p>`);
}
