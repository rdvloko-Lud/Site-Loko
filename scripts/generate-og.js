// Génère une carte de partage social (Open Graph, 1200×630) par article de blog
// qui n'a pas d'image `cover:` explicite dans son frontmatter.
//
// Sorties :
//   - public/blog-og/<slug>.jpg   (image OG brandée, une par article sans cover)
//   - scripts/og-manifest.json    { "<slug>": "/blog-og/<slug>.jpg", ... }
//     (consommé par generate-blog.js pour renseigner post.ogImage)
//
// FAIL-SAFE : si Puppeteer/Chrome est indisponible ou qu'un rendu échoue, le
// script n'écrase PAS les sorties déjà présentes (images + manifeste commités)
// et sort en code 0. Le build continue ; au pire l'article retombe sur l'image
// OG par défaut. Aucun lien d'image cassé n'est jamais produit.

const fs = require("fs");
const path = require("path");

const BLOG_DIR = path.join(__dirname, "..", "content", "blog");
const OUT_DIR = path.join(__dirname, "..", "public", "blog-og");
const MANIFEST = path.join(__dirname, "og-manifest.json");

// Parseur de frontmatter minimal (aligné sur generate-blog.js).
function parseFrontmatter(raw) {
  const m = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!m) return {};
  const data = {};
  m[1].split("\n").forEach((line) => {
    const idx = line.indexOf(":");
    if (idx === -1) return;
    const key = line.slice(0, idx).trim();
    let val = line.slice(idx + 1).trim();
    if (/^\[.*\]$/.test(val)) {
      val = val
        .slice(1, -1)
        .split(",")
        .map((s) => s.trim().replace(/^["']|["']$/g, ""))
        .filter(Boolean);
    } else {
      val = val.replace(/^["']|["']$/g, "");
    }
    data[key] = val;
  });
  return data;
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

// Modèle HTML de la carte OG (thème « Encre & Sable » du site).
function cardHtml({ title, tag }) {
  const chip = tag
    ? `<div class="chip">${escapeHtml(tag)}</div>`
    : "";
  return `<!doctype html>
<html lang="fr"><head><meta charset="utf-8"><style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html, body { width: 1200px; height: 630px; }
  body {
    font-family: 'Helvetica Neue', Arial, 'DejaVu Sans', sans-serif;
    background: #FBF8F3;
    color: #1C2433;
    position: relative;
    overflow: hidden;
  }
  .accent {
    position: absolute; top: -160px; right: -120px;
    width: 520px; height: 520px; border-radius: 50%;
    background: radial-gradient(circle, rgba(37,99,235,0.16), transparent 68%);
  }
  .frame {
    position: absolute; inset: 0;
    padding: 84px 90px;
    display: flex; flex-direction: column; justify-content: space-between;
  }
  .eyebrow {
    font-size: 26px; font-weight: 700; letter-spacing: 4px;
    text-transform: uppercase; color: #2563EB;
  }
  .middle { display: flex; flex-direction: column; gap: 28px; }
  .chip {
    align-self: flex-start;
    font-size: 24px; font-weight: 600; color: #2563EB;
    background: rgba(37,99,235,0.10);
    border: 1px solid rgba(37,99,235,0.22);
    padding: 8px 20px; border-radius: 999px;
  }
  h1 {
    font-size: 68px; line-height: 1.12; font-weight: 800;
    letter-spacing: -1px; max-width: 960px;
  }
  .foot {
    display: flex; align-items: center; justify-content: space-between;
    border-top: 2px solid rgba(28,36,51,0.10); padding-top: 30px;
  }
  .foot .brand { font-size: 30px; font-weight: 800; }
  .foot .brand span { color: #2563EB; }
  .foot .sub { font-size: 24px; color: #55617A; text-align: right; }
</style></head><body>
  <div class="accent"></div>
  <div class="frame">
    <div class="eyebrow">Blog Loko</div>
    <div class="middle">
      ${chip}
      <h1>${escapeHtml(title)}</h1>
    </div>
    <div class="foot">
      <div class="brand">Lo<span>ko</span></div>
      <div class="sub">Assistance numérique à domicile<br>Les Sables d’Olonne — lokofr.com</div>
    </div>
  </div>
</body></html>`;
}

function readPosts() {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf8");
      const data = parseFrontmatter(raw);
      const slug = (data.slug || file.replace(/\.md$/, "")).trim();
      const tags = Array.isArray(data.tags)
        ? data.tags
        : data.tags
        ? [data.tags]
        : [];
      return { slug, title: data.title || slug, cover: data.cover || "", tag: tags[0] || "" };
    });
}

async function run() {
  const posts = readPosts();
  // On ne génère que pour les articles SANS cover explicite.
  const targets = posts.filter((p) => !p.cover);

  if (targets.length === 0) {
    console.log("generate-og : aucun article sans cover, rien à générer.");
    return;
  }

  let puppeteer;
  try {
    puppeteer = require("puppeteer");
  } catch (e) {
    console.warn("⚠️  generate-og ignoré : puppeteer indisponible. Sorties existantes conservées.");
    return;
  }

  let browser;
  try {
    browser = await puppeteer.launch({
      headless: "new",
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
      executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || undefined,
    });
  } catch (e) {
    console.warn(`⚠️  generate-og ignoré : lancement Chrome impossible (${e.message}). Sorties existantes conservées.`);
    return;
  }

  fs.mkdirSync(OUT_DIR, { recursive: true });

  // On repart du manifeste existant pour ne rien perdre en cas d'échec partiel.
  let manifest = {};
  try {
    manifest = JSON.parse(fs.readFileSync(MANIFEST, "utf8"));
  } catch (e) {
    manifest = {};
  }

  let ok = 0;
  for (const post of targets) {
    const page = await browser.newPage();
    try {
      await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1 });
      await page.setContent(cardHtml(post), { waitUntil: "networkidle0" });
      const outFile = path.join(OUT_DIR, `${post.slug}.jpg`);
      await page.screenshot({ path: outFile, type: "jpeg", quality: 86 });
      manifest[post.slug] = `/blog-og/${post.slug}.jpg`;
      ok++;
      console.log(`  ✓ OG ${post.slug}.jpg`);
    } catch (err) {
      console.warn(`  ⚠️  OG ${post.slug} échoué (${err.message}) — image existante conservée.`);
    } finally {
      await page.close();
    }
  }

  await browser.close();

  fs.writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2) + "\n", "utf8");
  console.log(`✅ generate-og : ${ok}/${targets.length} carte(s) OG générée(s).`);
}

run().catch((e) => {
  // Jamais bloquant pour le build.
  console.warn(`⚠️  generate-og : erreur non bloquante (${e.message}).`);
  process.exit(0);
});
