const fs = require("fs");
const path = require("path");

const { SITE_URL, indexableRoutes } = require("./routes");

let blogMeta = {};
try {
  blogMeta = require("./blog-routes.js").blogMeta || {};
} catch (e) {
  // blog pas encore généré
}

const buildDate = new Date().toISOString().split("T")[0];

function lastModForRoute(url) {
  return blogMeta[url] || buildDate;
}

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${indexableRoutes
  .map(
    (url) => `  <url>
    <loc>${SITE_URL}${url}</loc>
    <lastmod>${lastModForRoute(url)}</lastmod>
  </url>`
  )
  .join("\n")}
</urlset>
`;

fs.writeFileSync(path.join(__dirname, "../public/sitemap.xml"), xml, "utf8");

console.log(`✅ sitemap.xml généré (${indexableRoutes.length} URLs)`);
