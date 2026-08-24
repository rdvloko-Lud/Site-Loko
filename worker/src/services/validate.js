// Validation sans dépendance externe.

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;

function str(value, { min = 0, max = 5000 } = {}) {
  const v = typeof value === "string" ? value.trim() : "";
  if (v.length < min || v.length > max) return null;
  return v;
}

export function validateContact(body) {
  const errors = [];
  const nom = str(body?.nom, { min: 2, max: 100 });
  const email = str(body?.email, { min: 5, max: 255 });
  const telephone = str(body?.telephone, { max: 30 });
  const ville = str(body?.ville, { max: 120 });
  const message = str(body?.message, { min: 2, max: 5000 });

  if (!nom) errors.push("nom");
  if (!email || !EMAIL_RE.test(email)) errors.push("email");
  if (!message) errors.push("message");
  if (body?.consent === false) errors.push("consent");

  if (errors.length) return { valid: false, errors };
  return { valid: true, data: { nom, email, telephone: telephone || "", ville: ville || "", message } };
}

export function validateBooking(body) {
  const errors = [];
  const slot = str(body?.slot, { max: 20 });
  const nom = str(body?.nom, { min: 2, max: 100 });
  const email = str(body?.email, { min: 5, max: 255 });
  const telephone = str(body?.telephone, { min: 6, max: 30 });
  const ville = str(body?.ville, { max: 120 });
  const adresse = str(body?.adresse, { max: 250 });
  const service = str(body?.service, { max: 120 });
  const message = str(body?.message, { max: 5000 });
  const lieu = body?.lieu === "distance" ? "distance" : "domicile";

  if (!slot || !/^\d{4}-\d{2}-\d{2}:\d{2}:\d{2}$/.test(slot)) errors.push("slot");
  if (!nom) errors.push("nom");
  if (!email || !EMAIL_RE.test(email)) errors.push("email");
  if (!telephone) errors.push("telephone");
  if (lieu === "domicile" && !adresse) errors.push("adresse");
  if (body?.consent === false) errors.push("consent");

  if (errors.length) return { valid: false, errors };
  return {
    valid: true,
    data: {
      slot,
      nom,
      email,
      telephone,
      ville: ville || "",
      adresse: adresse || "",
      service: service || "",
      message: message || "",
      lieu,
    },
  };
}
