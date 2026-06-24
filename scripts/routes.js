// Source unique des routes du site.
// Utilisée à la fois par generate-sitemap.js et prerender.js
// pour éviter toute divergence entre le sitemap et les pages réellement prérendues.

const SITE_URL = "https://www.lokofr.com";

// Pages "fixes". indexable: false => prérendue (accès direct OK) mais hors sitemap + noindex côté app.
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

// Pages "piliers" (services forts) — voir SERVICE_PILLARS dans src/App.js
const servicePillars = [
  "/depannage-informatique-les-sables-dolonne",
  "/depannage-wifi-internet-les-sables-dolonne",
  "/depannage-smartphone-les-sables-dolonne",
  "/depannage-tv-box-les-sables-dolonne",
  "/transfert-donnees-sauvegarde-les-sables-dolonne",
  "/formation-informatique-seniors-les-sables-dolonne",
];

// Pages "villes" — voir NEARBY_CITIES dans src/App.js (slugs alignés)
const cityPages = [
  "/aide-informatique-olonne-sur-mer",
  "/aide-informatique-chateau-d-olonne",
  "/aide-informatique-l-ile-d-olonne",
  "/aide-informatique-vaire",
  "/aide-informatique-sainte-foy",
  "/aide-informatique-brem-sur-mer",
  "/aide-informatique-saint-mathurin",
  "/aide-informatique-talmont-saint-hilaire",
  "/aide-informatique-les-achards",
  "/aide-informatique-nieul-le-dolent",
  "/aide-informatique-jard-sur-mer",
];

// Pages "blog" — générées depuis content/blog/*.md par generate-blog.js
// (le fichier blog-routes.js est généré au build ; tolérant s'il n'existe pas encore).
let blog = { blogIndex: "/blog", blogPosts: [] };
try {
  blog = require("./blog-routes.js");
} catch (e) {
  // pas encore généré : on garde au moins l'index du blog
}
const blogPages = [blog.blogIndex, ...blog.blogPosts];

const dynamicPages = [...servicePillars, ...cityPages, ...blogPages];

// Toutes les routes connues (à prérendre, y compris les pages noindex).
const allRoutes = [...Object.keys(staticPagesSeo), ...dynamicPages];

// Routes indexables (pour le sitemap).
const indexableRoutes = [
  ...Object.entries(staticPagesSeo)
    .filter(([, page]) => page.indexable !== false)
    .map(([url]) => url),
  ...dynamicPages,
];

module.exports = {
  SITE_URL,
  staticPagesSeo,
  servicePillars,
  cityPages,
  blogPages,
  allRoutes,
  indexableRoutes,
};
