// Prérendu (SSG) des routes du site.
//
// Après `react-scripts build`, ce script :
//   1. sert le dossier build/ en local (fallback SPA vers index.html) ;
//   2. ouvre chaque route dans Chromium (Puppeteer) ;
//   3. attend que React ait rendu + que les balises SEO (title, canonical,
//      meta, JSON-LD) soient posées par applySeoMeta ;
//   4. fige le DOM complet dans build/<route>/index.html.
//
// Résultat : chaque page a un HTML statique indexable, avec son propre
// canonical / title / meta / contenu — sans rien changer à l'app React.

const fs = require("fs");
const path = require("path");
const http = require("http");

const { SITE_URL, allRoutes } = require("./routes");

const BUILD_DIR = path.join(__dirname, "../build");
const PORT = 4178;

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".map": "application/json; charset=utf-8",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
};

function startServer(indexHtml) {
  return new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      const urlPath = decodeURIComponent((req.url || "/").split("?")[0]);
      const ext = path.extname(urlPath);

      // Fichier statique réel (bundles, images, etc.)
      if (ext) {
        const filePath = path.join(BUILD_DIR, urlPath);
        if (filePath.startsWith(BUILD_DIR) && fs.existsSync(filePath)) {
          res.writeHead(200, { "Content-Type": MIME[ext] || "application/octet-stream" });
          fs.createReadStream(filePath).pipe(res);
          return;
        }
      }

      // Toute route applicative -> on sert l'index.html d'origine (boot SPA)
      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      res.end(indexHtml);
    });
    server.listen(PORT, () => resolve(server));
  });
}

function outFileForRoute(route) {
  if (route === "/") return path.join(BUILD_DIR, "index.html");
  return path.join(BUILD_DIR, route.replace(/^\//, ""), "index.html");
}

async function run() {
  const indexPath = path.join(BUILD_DIR, "index.html");
  if (!fs.existsSync(indexPath)) {
    console.error("❌ build/index.html introuvable — lance `react-scripts build` d'abord.");
    process.exit(1);
  }
  const indexHtml = fs.readFileSync(indexPath, "utf8");

  let puppeteer;
  try {
    puppeteer = require("puppeteer");
  } catch (e) {
    console.error("❌ puppeteer n'est pas installé. `npm i -D puppeteer`.");
    process.exit(1);
  }

  const server = await startServer(indexHtml);

  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
    executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || undefined,
  });

  let ok = 0;
  let failed = 0;

  for (const route of allRoutes) {
    const page = await browser.newPage();
    try {
      await page.goto(`http://127.0.0.1:${PORT}${route}`, {
        waitUntil: "domcontentloaded",
        timeout: 30000,
      });

      // Attendre que React ait rendu ET que le canonical pointe vers la route.
      await page.waitForFunction(
        (expected) => {
          const root = document.getElementById("root");
          const rendered = root && root.children.length > 0;
          const link = document.querySelector('link[rel="canonical"]');
          const href = link ? link.getAttribute("href") || "" : "";
          const canonicalOk =
            expected === "/" ? href.endsWith("/") : href.endsWith(expected);
          return rendered && canonicalOk;
        },
        { timeout: 30000 },
        route
      );

      const html = await page.evaluate(
        () => "<!doctype html>\n" + document.documentElement.outerHTML
      );

      const outFile = outFileForRoute(route);
      fs.mkdirSync(path.dirname(outFile), { recursive: true });
      fs.writeFileSync(outFile, html, "utf8");
      ok++;
      console.log(`  ✓ ${route}`);
    } catch (err) {
      failed++;
      console.error(`  ✗ ${route} — ${err.message}`);
    } finally {
      await page.close();
    }
  }

  await browser.close();
  server.close();

  console.log(`\n✅ Prérendu terminé : ${ok} pages OK, ${failed} échec(s) sur ${allRoutes.length} routes.`);
  if (failed > 0) process.exit(1);
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
