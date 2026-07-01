// Génère les données et les routes du blog à partir de content/blog/*.md
// Sans dépendance externe (parseur Markdown minimal maison).
// Sous-ensemble Markdown supporté :
//   ## titre, ### sous-titre, paragraphes, listes "- " et "1. ",
//   > citation, **gras**, _italique_, `code`, [texte](url).
// Sorties :
//   - src/blogData.js          (consommé par l'app React)
//   - scripts/blog-routes.js   (consommé par routes.js : sitemap + prérendu)

const fs = require("fs");
const path = require("path");

const BLOG_DIR = path.join(__dirname, "..", "content", "blog");
const OUT_DATA = path.join(__dirname, "..", "src", "blogData.js");
const OUT_ROUTES = path.join(__dirname, "blog-routes.js");

// Manifeste des cartes OG générées par scripts/generate-og.js (tolérant s'il
// n'existe pas encore : l'article retombera alors sur l'image OG par défaut).
let ogManifest = {};
try {
  ogManifest = JSON.parse(fs.readFileSync(path.join(__dirname, "og-manifest.json"), "utf8"));
} catch (e) {
  ogManifest = {};
}

const MONTHS = [
  "janvier", "février", "mars", "avril", "mai", "juin",
  "juillet", "août", "septembre", "octobre", "novembre", "décembre",
];

function escapeHtml(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function escapeAttr(s) {
  return s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
}

function safeUrl(url) {
  const trimmed = (url || "").trim();
  if (/^https?:\/\//i.test(trimmed) || trimmed.startsWith("/")) {
    return escapeAttr(trimmed);
  }
  return "#";
}

function inline(text) {
  let t = escapeHtml(text);
  t = t.replace(/`([^`]+)`/g, "<code>$1</code>");
  t = t.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  t = t.replace(/_([^_]+)_/g, "<em>$1</em>");
  // Images ![alt](url) — doit passer AVANT les liens.
  t = t.replace(/!\[([^\]]*)\]\(([^)\s]+)\)/g, (m, alt, url) => {
    const safe = safeUrl(url);
    return safe === "#"
      ? ""
      : `<img src="${safe}" alt="${escapeAttr(alt)}" loading="lazy" />`;
  });
  t = t.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (m, txt, url) => {
    const safe = safeUrl(url);
    const external =
      /^https?:\/\//i.test(url.trim()) && !url.includes("lokofr.com");
    const attrs = external ? ' target="_blank" rel="noopener noreferrer"' : "";
    return `<a href="${safe}"${attrs}>${txt}</a>`;
  });
  return t;
}

function mdToHtml(md) {
  const lines = md.replace(/\r\n/g, "\n").split("\n");
  const blocks = [];
  let buf = [];
  const flush = () => {
    if (buf.length) {
      blocks.push(buf.join("\n"));
      buf = [];
    }
  };
  for (const line of lines) {
    if (line.trim() === "") flush();
    else buf.push(line);
  }
  flush();

  return blocks
    .map((b) => {
      const t = b.trim();
      if (/^### /.test(t)) return `<h3>${inline(t.replace(/^###\s+/, ""))}</h3>`;
      if (/^## /.test(t)) return `<h2>${inline(t.replace(/^##\s+/, ""))}</h2>`;
      if (/^> /.test(t))
        return `<blockquote>${inline(t.replace(/^>\s?/gm, ""))}</blockquote>`;
      const ls = t.split("\n");
      if (ls.every((l) => /^[-*]\s+/.test(l)))
        return `<ul>${ls
          .map((l) => `<li>${inline(l.replace(/^[-*]\s+/, ""))}</li>`)
          .join("")}</ul>`;
      if (ls.every((l) => /^\d+\.\s+/.test(l)))
        return `<ol>${ls
          .map((l) => `<li>${inline(l.replace(/^\d+\.\s+/, ""))}</li>`)
          .join("")}</ol>`;
      return `<p>${inline(ls.join(" "))}</p>`;
    })
    .join("\n");
}

function parseFrontmatter(raw) {
  const m = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!m) return { data: {}, body: raw };
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
  return { data, body: m[2] };
}

let posts = [];
if (fs.existsSync(BLOG_DIR)) {
  posts = fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf8");
      const { data, body } = parseFrontmatter(raw);
      const slug = (data.slug || file.replace(/\.md$/, "")).trim();
      const text = body.trim();
      const words = text.split(/\s+/).filter(Boolean).length;
      const d = data.date ? new Date(data.date) : new Date();
      const dateLabel = `${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`;
      return {
        slug,
        title: data.title || slug,
        seoTitle: data.seoTitle || `${data.title || slug} | Blog Loko`,
        description: data.description || "",
        cover: data.cover || "",
        // Image de partage social : cover explicite si fourni, sinon la carte OG
        // générée automatiquement pour ce slug ("" => image OG par défaut du site).
        ogImage: (data.cover || "").trim() || ogManifest[slug] || "",
        date: (data.date || "").toString(),
        dateLabel,
        readingMinutes: Math.max(1, Math.round(words / 200)),
        tags: Array.isArray(data.tags) ? data.tags : data.tags ? [data.tags] : [],
        relatedHref: data.relatedHref || "",
        relatedLabel: data.relatedLabel || "",
        html: mdToHtml(text),
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

const header =
  "// AUTO-GÉNÉRÉ par scripts/generate-blog.js — ne pas éditer à la main.\n" +
  "// Source : content/blog/*.md\n";

fs.writeFileSync(
  OUT_DATA,
  `${header}export const BLOG_POSTS = ${JSON.stringify(posts, null, 2)};\n`,
  "utf8"
);

fs.writeFileSync(
  OUT_ROUTES,
  `${header}module.exports = {\n  blogIndex: "/blog",\n  blogPosts: ${JSON.stringify(
    posts.map((p) => `/blog/${p.slug}`)
  )},\n  blogMeta: ${JSON.stringify(
    Object.fromEntries(posts.map((p) => [`/blog/${p.slug}`, p.date || ""]))
  )},\n};\n`,
  "utf8"
);

console.log(`Blog généré : ${posts.length} article(s).`);
