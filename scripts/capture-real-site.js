// Capture pleine page du VRAI site, en vue mobile, pour la vidéo de démo.
//
// Le site désactive ses animations d'entrée quand navigator.webdriver est vrai
// (Puppeteer) → on obtient l'état final, propre. Le bandeau cookies est masqué
// en pré-réglant le consentement dans localStorage (choix « refused », sans
// charger d'outil tiers).
//
// Prérequis : serveur de dev lancé (`npm start`, port 3000 par défaut).
// Usage : node scripts/capture-real-site.js [port]
// Sortie : public/demo-video/real-site-mobile.png (+ dimensions dans le nom log).

const fs = require("fs");
const path = require("path");

const PORT = process.argv[2] || "3000";
const OUT_DIR = path.join(__dirname, "../public/demo-video");
const OUT_FILE = path.join(OUT_DIR, "real-site-mobile.png");
const META_FILE = path.join(OUT_DIR, "real-site-mobile.json");

async function run() {
  let puppeteer;
  try {
    puppeteer = require("puppeteer");
  } catch (e) {
    console.error("❌ puppeteer n'est pas installé. `npm i -D puppeteer`.");
    process.exit(1);
  }

  fs.mkdirSync(OUT_DIR, { recursive: true });

  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
    executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || undefined,
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 430, height: 932, deviceScaleFactor: 2 });

  // Pré-régler le consentement cookies pour masquer le bandeau (choix privé).
  await page.evaluateOnNewDocument(() => {
    try {
      localStorage.setItem("loko-cookie-consent", "refused");
    } catch (e) {}
  });

  await page.goto(`http://127.0.0.1:${PORT}/`, {
    waitUntil: "networkidle0",
    timeout: 45000,
  });

  // Laisser les polices / images se poser.
  await new Promise((r) => setTimeout(r, 1200));

  // Hauteur réelle du document + position des sections (en px CSS), pour que la
  // vidéo défile pile sur chaque section.
  const dims = await page.evaluate(() => {
    const offsetOf = (sel) => {
      const el = document.querySelector(sel);
      if (!el) return null;
      const r = el.getBoundingClientRect();
      return Math.round(r.top + window.scrollY);
    };
    return {
      width: document.documentElement.clientWidth,
      height: document.documentElement.scrollHeight,
      sections: {
        services: offsetOf("#services"),
        tarifs: offsetOf("#tarifs"),
        about: offsetOf("#qui-suis-je"),
        contact: offsetOf("#contact"),
      },
    };
  });

  await page.screenshot({ path: OUT_FILE, fullPage: true });
  fs.writeFileSync(META_FILE, JSON.stringify(dims), "utf8");

  await browser.close();
  console.log(
    `✅ Capture écrite : public/demo-video/real-site-mobile.png (${dims.width}×${dims.height} px CSS).`
  );
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
