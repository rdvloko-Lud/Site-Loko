const fs = require("fs");
const path = require("path");

const SITE_URL = "https://lokofr.com";

const staticPagesSeo = {
  "/": { indexable: true },
  "/rendez-vous": { indexable: true },
  "/plan-du-site": { indexable: true },
  "/credit-impot": { indexable: true },
  "/tarifs": { indexable: true },
  "/zone-intervention": { indexable: true },

  "/cgv": { indexable: false },
  "/politique-confidentialite": { indexable: false },
  "/mentions-legales": { indexable: false },
};

// Aligné sur les routes indexables de src/App.js (problemPages)
const problemPages = {
  "/probleme-wifi-internet-les-sables-dolonne": {},
  "/probleme-tv-les-sables-dolonne": {},
  "/probleme-box-tv-les-sables-dolonne": {},
  "/netflix-ne-fonctionne-plus-les-sables-dolonne": {},
  "/ordinateur-lent-les-sables-dolonne": {},
  "/wifi-ne-fonctionne-plus-les-sables-dolonne": {},
  "/installation-box-internet-les-sables-dolonne": {},
  "/transfert-donnees-telephone-les-sables-dolonne": {},
  "/changement-telephone-les-sables-dolonne": {},
  "/wifi-lent-les-sables-dolonne": {},
  "/aide-smartphone-les-sables-dolonne": {},
  "/depannage-ordinateur-les-sables-dolonne": {},
  "/imprimante-ne-fonctionne-plus-les-sables-dolonne": {},
  "/probleme-tv-box-les-sables-dolonne": {},
  "/transfert-de-donnees-les-sables-dolonne": {},
  "/apprendre-le-numerique-les-sables-dolonne": {},
  "/apprendre-ia-les-sables-dolonne": {},
  "/formation-windows-les-sables-dolonne": {},
  "/formation-macbook-les-sables-dolonne": {},
  "/formation-smartphone-les-sables-dolonne": {},
  "/apprendre-internet-les-sables-dolonne": {},
  "/apprendre-mails-les-sables-dolonne": {},
  "/assistance-numerique-senior-les-sables-dolonne": {},
};

const staticUrls = Object.entries(staticPagesSeo)
  .filter(([, page]) => page.indexable !== false)
  .map(([url]) => url);

const problemUrls = Object.keys(problemPages);

const urls = [...staticUrls, ...problemUrls];

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

fs.writeFileSync(path.join(__dirname, "../public/sitemap.xml"), xml, "utf8");

console.log(`✅ sitemap.xml généré (${urls.length} URLs)`);
