const fs = require("fs");
const path = require("path");

const SITE_URL = "https://lokofr.com";

// ⚡ reprend EXACTEMENT ta logique actuelle
const staticPagesSeo = {
  "/": { indexable: true },
  "/rendez-vous": { indexable: true },
  "/plan-du-site": { indexable: true },
  "/credit-impot": { indexable: true },

  "/cgv": { indexable: false },
  "/politique-confidentialite": { indexable: false },
  "/mentions-legales": { indexable: false },
};

const problemPages = {
  "/probleme-wifi-internet-les-sables-dolonne": {},
  "/aide-smartphone-les-sables-dolonne": {},
  "/depannage-ordinateur-les-sables-dolonne": {},
  "/probleme-tv-box-les-sables-dolonne": {},
  "/transfert-de-donnees-les-sables-dolonne": {},
  "/apprendre-ia-les-sables-dolonne": {},
};

// 🔥 on génère uniquement les pages indexables
const staticUrls = Object.entries(staticPagesSeo)
  .filter(([, page]) => page.indexable !== false)
  .map(([url]) => url);

const problemUrls = Object.keys(problemPages);

const urls = [...staticUrls, ...problemUrls];

// ⚡ génération XML
const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `  <url>
    <loc>${SITE_URL}${url}</loc>
  </url>`
  )
  .join("\n")}
</urlset>
`;

// 📍 écrit dans /public
fs.writeFileSync(path.join(__dirname, "../public/sitemap.xml"), xml, "utf8");

console.log("✅ sitemap.xml généré");
