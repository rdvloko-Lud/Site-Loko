// Capture des frames PNG de la vidéo de démonstration (/demo-video).
//
// Prérequis : le serveur de dev tourne (`npm start`, port 3000 par défaut).
// Usage :
//   node scripts/capture-demo-frames.js [port] [format]
//   node scripts/capture-demo-frames.js 3000 vertical
//   node scripts/capture-demo-frames.js 3000 horizontal
//
// Écrit une frame par étape dans public/demo-video/frames/.
// Vertical : viewport 540×960 ×2 → PNG 1080×1920.
// Horizontal : viewport 1280×720 ×1.5 → PNG 1920×1080.

const fs = require("fs");
const path = require("path");

const PORT = process.argv[2] || "3000";
const FORMAT = process.argv[3] === "horizontal" ? "horizontal" : "vertical";

// Doit rester aligné sur STAGE dans src/demo-video/demoData.js.
const FRAMES = [
  "01-intro",
  "02-hero",
  "03-services",
  "04-tarifs",
  "05-about",
  "06-contact",
  "07-ensemble",
  "08-signature",
];

const OUT_DIR = path.join(__dirname, "../public/demo-video/frames");

async function run() {
  let puppeteer;
  try {
    puppeteer = require("puppeteer");
  } catch (e) {
    console.error("❌ puppeteer n'est pas installé. `npm i -D puppeteer`.");
    process.exit(1);
  }

  fs.mkdirSync(OUT_DIR, { recursive: true });

  const viewport =
    FORMAT === "horizontal"
      ? { width: 1280, height: 720, deviceScaleFactor: 1.5 }
      : { width: 540, height: 960, deviceScaleFactor: 2 };

  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
    executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || undefined,
  });

  const page = await browser.newPage();
  await page.setViewport(viewport);

  let ok = 0;
  for (let stage = 0; stage < FRAMES.length; stage++) {
    const url = `http://127.0.0.1:${PORT}/demo-video?stage=${stage}&format=${FORMAT}`;
    try {
      await page.goto(url, { waitUntil: "networkidle0", timeout: 30000 });
      // Laisser l'iframe du vrai site se charger ET le défilement se faire.
      await new Promise((r) => setTimeout(r, 4000));
      const file = path.join(OUT_DIR, `frame-${FRAMES[stage]}.png`);
      await page.screenshot({ path: file });
      ok++;
      console.log(`  ✓ frame-${FRAMES[stage]}.png`);
    } catch (err) {
      console.error(`  ✗ stage ${stage} — ${err.message}`);
    }
  }

  await browser.close();
  console.log(`\n✅ ${ok}/${FRAMES.length} frames écrites dans public/demo-video/frames/ (${FORMAT}).`);
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
