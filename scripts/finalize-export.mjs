import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const outDir = path.join(root, "out");
const publicDir = path.join(root, "public");
const required = ["robots.txt", "sitemap.xml", "llms.txt", "_headers"];

if (!fs.existsSync(outDir)) {
  console.error("Missing out/ directory. next build did not produce a static export.");
  process.exit(1);
}

for (const file of fs.readdirSync(publicDir)) {
  const source = path.join(publicDir, file);
  if (!fs.statSync(source).isFile()) continue;
  fs.copyFileSync(source, path.join(outDir, file));
}

for (const file of required) {
  if (!fs.existsSync(path.join(outDir, file))) {
    console.error(`Export root is missing ${file}`);
    process.exit(1);
  }
}

const htmlPath = path.join(outDir, "index.html");
if (!fs.existsSync(htmlPath)) {
  console.error("Missing out/index.html");
  process.exit(1);
}

const html = fs.readFileSync(htmlPath, "utf8");
const needles = [
  'id="metaDesc"',
  "application/ld+json",
  "function bootSudharmika",
  "function setLang",
  "SUDHARMIKA",
  "/v1/projects",
  "201 Created",
  "FAQPage",
  "wa.me/628992927276",
  "https://sudharmika.com/",
  'hreflang="en"',
  "fonts.googleapis.com",
  "fonts.gstatic.com",
];

for (const needle of needles) {
  if (!html.includes(needle)) {
    console.error(`out/index.html is missing: ${needle}`);
    process.exit(1);
  }
}

if (/golang/i.test(html) || /\bGo\b/.test(html)) {
  console.error("out/index.html mentions Go/Golang");
  process.exit(1);
}

if (html.includes("hero-aurora") || html.includes("Building Reliable Digital Products")) {
  console.error("out/index.html still contains the previous landing page");
  process.exit(1);
}

const headers = fs.readFileSync(path.join(outDir, "_headers"), "utf8");
if (
  !headers.includes("Content-Security-Policy") ||
  !headers.includes("fonts.googleapis.com") ||
  !headers.includes("fonts.gstatic.com") ||
  !headers.includes("'unsafe-inline'")
) {
  console.error("out/_headers is missing the CSP sources this page needs");
  process.exit(1);
}

console.log(`Export root OK: index.html, ${required.join(", ")}`);
