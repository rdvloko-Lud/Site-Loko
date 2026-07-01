// Génère un flux RSS 2.0 du blog à partir de content/blog/*.md.
// Sortie : public/rss.xml (référencé via <link rel="alternate"> dans index.html).
// Sans dépendance externe (réutilise le même parseur de frontmatter minimal).

const fs = require("fs");
const path = require("path");

const { SITE_URL } = require("./routes");

const BLOG_DIR = path.join(__dirname, "..", "content", "blog");
const OUT = path.join(__dirname, "..", "public", "rss.xml");

function parseFrontmatter(raw) {
  const m = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!m) return {};
  const data = {};
  m[1].split("\n").forEach((line) => {
    const idx = line.indexOf(":");
    if (idx === -1) return;
    const key = line.slice(0, idx).trim();
    let val = line.slice(idx + 1).trim().replace(/^["']|["']$/g, "");
    data[key] = val;
  });
  return data;
}

function xmlEscape(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
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
      return {
        slug,
        title: data.title || slug,
        description: data.description || "",
        date: data.date || "",
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

function rfc822(dateStr) {
  const d = dateStr ? new Date(dateStr) : new Date();
  return (isNaN(d.getTime()) ? new Date() : d).toUTCString();
}

const posts = readPosts();
const buildDate = rfc822(posts[0] && posts[0].date);

const items = posts
  .map((p) => {
    const url = `${SITE_URL}/blog/${p.slug}`;
    return `    <item>
      <title>${xmlEscape(p.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${rfc822(p.date)}</pubDate>
      <description>${xmlEscape(p.description)}</description>
    </item>`;
  })
  .join("\n");

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Blog Loko — conseils numériques à domicile aux Sables d’Olonne</title>
    <link>${SITE_URL}/blog</link>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />
    <description>Astuces et conseils simples pour mieux vivre avec vos appareils : Wi-Fi, ordinateur, smartphone, TV et sécurité. Le blog Loko, écrit à partir de cas réels aux Sables d’Olonne.</description>
    <language>fr-FR</language>
    <lastBuildDate>${buildDate}</lastBuildDate>
${items}
  </channel>
</rss>
`;

fs.writeFileSync(OUT, xml, "utf8");
console.log(`✅ rss.xml généré (${posts.length} article(s)).`);
