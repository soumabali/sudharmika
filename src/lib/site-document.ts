import fs from "node:fs";
import path from "node:path";

export type SiteDocument = {
  title: string;
  description: string;
  fontHref: string;
  css: string;
  jsonLd: string;
  body: string;
  script: string;
};

let cached: SiteDocument | null = null;

function between(html: string, start: string, end: string): string {
  const from = html.indexOf(start);
  if (from < 0) throw new Error(`site document missing marker: ${start}`);
  const to = html.indexOf(end, from + start.length);
  if (to < 0) throw new Error(`site document missing closing marker after: ${start}`);
  return html.slice(from + start.length, to);
}

export function getSiteDocument(): SiteDocument {
  if (process.env.NODE_ENV === "production" && cached) return cached;

  const html = fs.readFileSync(path.join(process.cwd(), "src/site/index.html"), "utf8");
  const title = between(html, "<title>", "</title>").trim();
  const descMatch = html.match(/<meta name="description" id="metaDesc" content="([^"]*)"/);
  if (!descMatch) throw new Error("site document missing meta description");
  const fontMatch = html.match(
    /<link href="(https:\/\/fonts\.googleapis\.com\/[^"]+)" rel="stylesheet">/,
  );
  if (!fontMatch) throw new Error("site document missing Google Fonts stylesheet");

  const scriptMarker = "<script>\n// ============ i18n ============";
  const scriptAt = html.indexOf(scriptMarker);
  const bodyAt = html.indexOf("<body>");
  if (bodyAt < 0 || scriptAt < 0 || scriptAt < bodyAt) {
    throw new Error("site document body/script markers missing");
  }
  const scriptEnd = html.indexOf("</script>", scriptAt);
  if (scriptEnd < 0) throw new Error("site document i18n script is unclosed");

  const jsonLd = between(html, '<script type="application/ld+json">', "</script>").trim();
  JSON.parse(jsonLd);

  const doc: SiteDocument = {
    title,
    description: descMatch[1],
    fontHref: fontMatch[1],
    css: between(html, "<style>", "</style>").trim(),
    jsonLd,
    body: html.slice(bodyAt + "<body>".length, scriptAt).trim(),
    script: html.slice(scriptAt + "<script>".length, scriptEnd).trim(),
  };

  if (!doc.script.includes("function setLang") || !doc.script.includes("function bootSudharmika")) {
    throw new Error("site i18n script is missing setLang/bootSudharmika");
  }
  if (!doc.body.includes('class="console"') || !doc.body.includes('id="leadForm"')) {
    throw new Error("site body is missing the API console or lead form");
  }

  if (process.env.NODE_ENV === "production") cached = doc;
  return doc;
}
