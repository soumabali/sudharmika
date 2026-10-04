import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { JSDOM } from "jsdom";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const html = fs.readFileSync(path.join(root, "src/site/index.html"), "utf8");

function dictionary() {
  const start = html.indexOf("var T = ");
  const end = html.indexOf("\nvar currentLang");
  let literal = html.slice(start + "var T = ".length, end).trim();
  if (literal.endsWith(";")) literal = literal.slice(0, -1);
  return Function(`"use strict"; return (${literal});`)();
}

function blockKeys(source) {
  const withoutStrings = source.replace(/'(?:\\.|[^'\\])*'/g, "''");
  return [...withoutStrings.matchAll(/(\w+):\s*'/g)].map((match) => match[1]);
}

const T = dictionary();

function load(url) {
  const dom = new JSDOM(html, {
    url,
    runScripts: "dangerously",
  });
  return dom;
}

test("i18n dictionaries have the same keys", () => {
  const idBlock = html.slice(html.indexOf("id: {"), html.indexOf("en: {"));
  const enBlock = html.slice(html.indexOf("en: {"), html.indexOf("var currentLang"));
  const idKeys = blockKeys(idBlock);
  const enKeys = blockKeys(enBlock);
  assert.deepEqual(idKeys, enKeys);
  assert.deepEqual(Object.keys(T.id).sort(), Object.keys(T.en).sort());
});

test("titles and descriptions stay within the search snippet budget", () => {
  const chars = (value) => [...value].length;
  for (const lang of ["id", "en"]) {
    assert.ok(chars(T[lang]._title) >= 50 && chars(T[lang]._title) <= 60, T[lang]._title);
    assert.ok(chars(T[lang]._desc) >= 140 && chars(T[lang]._desc) <= 160, T[lang]._desc);
  }
});

test("placeholder prices, metrics, and testimonial claims are unchanged", () => {
  assert.equal(T.id.quote1, "Eksekusinya cepat, tapi tetap rapi. Enak buat di-maintain jangka panjang.");
  assert.equal(T.id.quote2, "Yang paling kerasa: sistem jadi stabil, tim frontend juga lebih mudah jalan karena API-nya jelas.");
  assert.equal(T.en.quote1, "Fast execution, but still clean. Easy to maintain long-term.");
  assert.equal(
    T.en.quote2,
    "The biggest difference: the system became stable, and the frontend team moved faster because the API was clear.",
  );
  assert.equal(T.id.quote1_c, "— Founder, SaaS Project");
  assert.equal(T.id.quote2_c, "— Product Lead, Internal Platform");
  assert.match(T.id.faq1_a, /Rp 15 juta/);
  assert.match(T.id.faq1_a, /Rp 7 juta/);
  assert.match(T.id.faq1_a, /Rp 35 juta/);
  assert.match(T.en.faq1_a, /~USD 900/);
  assert.match(T.id.faq2_a, /2–4 minggu/);
  assert.match(T.id.faq2_a, /1–2 minggu/);
  assert.match(T.id.faq2_a, /4–8 minggu/);
  assert.match(T.id.faq5_a, /30 hari/);
  assert.match(html, /7\+/);
  assert.match(html, /30\+/);
  assert.match(html, /−70%/);
});

test("visible copy, dictionary, and FAQPage schema stay in sync", () => {
  const staticDom = new JSDOM(html, { url: "https://sudharmika.com/" });
  const { document } = staticDom.window;

  for (const el of document.querySelectorAll("[data-i18n]")) {
    const key = el.getAttribute("data-i18n");
    assert.equal(el.textContent, T.id[key], `data-i18n ${key}`);
    assert.equal(el.children.length, 0, `${key} must stay a text leaf`);
  }
  for (const el of document.querySelectorAll("[data-i18n-html]")) {
    const key = el.getAttribute("data-i18n-html");
    const probe = staticDom.window.document.createElement("div");
    probe.innerHTML = T.id[key];
    assert.equal(el.textContent, probe.textContent, `data-i18n-html ${key}`);
  }
  for (const el of document.querySelectorAll("[data-i18n-ph]")) {
    const key = el.getAttribute("data-i18n-ph");
    assert.equal(el.getAttribute("placeholder"), T.id[key], `placeholder ${key}`);
  }
  for (const attr of ["data-i18n", "data-i18n-html", "data-i18n-ph", "data-wa"]) {
    for (const el of document.querySelectorAll(`[${attr}]`)) {
      const key = el.getAttribute(attr);
      assert.ok(key in T.id && key in T.en, `${attr}=${key} missing from a dictionary`);
    }
  }

  const jsonText = html.slice(
    html.indexOf('<script type="application/ld+json">') + '<script type="application/ld+json">'.length,
    html.indexOf("</script>"),
  );
  const graph = JSON.parse(jsonText)["@graph"];
  const faq = graph.find((node) => node["@type"] === "FAQPage");
  assert.equal(faq.mainEntity.length, 6);
  faq.mainEntity.forEach((entity, index) => {
    const n = index + 1;
    assert.equal(entity.name, T.id[`faq${n}_q`]);
    assert.equal(entity.acceptedAnswer.text, T.id[`faq${n}_a`]);
    const summary = document.querySelectorAll(".faq summary")[index];
    const answer = document.querySelectorAll(".faq details p")[index];
    assert.equal(summary.textContent, entity.name);
    assert.equal(answer.textContent, entity.acceptedAnswer.text);
  });
});

test("English toggle and WhatsApp links use the encoded wa.me deep link", () => {
  const dom = load("https://sudharmika.com/?lang=en");
  const { document } = dom.window;
  assert.equal(document.documentElement.lang, "en");
  assert.equal(document.title, T.en._title);
  assert.equal(document.getElementById("metaDesc").getAttribute("content"), T.en._desc);
  assert.match(document.querySelector("h1").textContent, /stable/);
  assert.doesNotMatch(document.querySelector(".lead").textContent, /Saya I Wayan/);
  assert.equal(document.getElementById("langEN").classList.contains("active"), true);
  assert.equal(document.getElementById("langEN").getAttribute("aria-pressed"), "true");
  assert.match(document.getElementById("consolePre").innerHTML, /201 Created/);
  assert.match(document.getElementById("consolePre").innerHTML, /POST/);

  for (const el of document.querySelectorAll("[data-wa]")) {
    const key = el.getAttribute("data-wa");
    assert.equal(
      el.getAttribute("href"),
      `https://wa.me/628992927276?text=${encodeURIComponent(T.en[key])}`,
    );
  }

  dom.window.setLang("id");
  assert.equal(document.documentElement.lang, "id");
  assert.equal(document.title, T.id._title);
  assert.match(document.querySelector(".lead").textContent, /Saya I Wayan Sudharmika/);
  for (const el of document.querySelectorAll("[data-wa]")) {
    const key = el.getAttribute("data-wa");
    assert.equal(
      el.getAttribute("href"),
      `https://wa.me/628992927276?text=${encodeURIComponent(T.id[key])}`,
    );
  }

  const plain = [...document.querySelectorAll('a[href^="https://wa.me/"]')].filter(
    (el) => !el.hasAttribute("data-wa"),
  );
  assert.ok(plain.length >= 2);
  for (const el of plain) {
    assert.equal(el.getAttribute("href"), "https://wa.me/628992927276");
  }
});

test("#en opens English and the lead form builds a structured WhatsApp message", () => {
  const dom = load("https://sudharmika.com/#en");
  const { document, window } = dom.window;
  assert.equal(document.documentElement.lang, "en");

  document.getElementById("f-nama").value = "Ayu";
  document.getElementById("f-bisnis").value = "Toko";
  document.getElementById("f-kebutuhan").selectedIndex = 4;
  document.getElementById("f-pesan").value = "Need a payment workflow";
  let opened = "";
  window.open = (url) => {
    opened = url;
    return null;
  };
  document.getElementById("leadForm").dispatchEvent(
    new window.Event("submit", { bubbles: true, cancelable: true }),
  );

  assert.ok(opened.startsWith("https://wa.me/628992927276?text="));
  const text = decodeURIComponent(opened.slice(opened.indexOf("?text=") + 6));
  assert.equal(
    text,
    [
      "Hi Wayan, I'm Ayu from Toko.",
      "",
      "Need: Not sure yet — I need advice",
      "Details: Need a payment workflow",
      "",
      "I got this contact from sudharmika.com. Could you send an estimate?",
    ].join("\n"),
  );
  assert.equal(encodeURIComponent(text), opened.slice(opened.indexOf("?text=") + 6));
});

test("Indonesian lead form omits an empty business name", () => {
  const dom = load("https://sudharmika.com/");
  const { document, window } = dom.window;
  assert.equal(document.documentElement.lang, "id");
  document.getElementById("f-nama").value = "Ayu";
  document.getElementById("f-bisnis").value = "  ";
  document.getElementById("f-kebutuhan").selectedIndex = 1;
  document.getElementById("f-pesan").value = "";
  let opened = "";
  window.open = (url) => {
    opened = url;
    return null;
  };
  document.getElementById("leadForm").dispatchEvent(
    new window.Event("submit", { bubbles: true, cancelable: true }),
  );
  const text = decodeURIComponent(opened.slice("https://wa.me/628992927276?text=".length));
  assert.equal(
    text,
    [
      "Halo Wayan, saya Ayu.",
      "",
      "Kebutuhan: Integrasi & Automasi Sistem",
      "Detail: -",
      "",
      "Kontak ini saya dapat dari sudharmika.com. Boleh minta estimasi?",
    ].join("\n"),
  );
});

test("the public site does not mention Go or Golang", () => {
  const files = [
    "src/site/index.html",
    "src/app/layout.tsx",
    "src/app/page.tsx",
    "src/components/site-boot.tsx",
    "public/llms.txt",
    "public/robots.txt",
    "public/sitemap.xml",
  ];
  const combined = files.map((file) => fs.readFileSync(path.join(root, file), "utf8")).join("\n");
  assert.doesNotMatch(combined, /golang/i);
  assert.doesNotMatch(combined, /\bGo\b/);
});

test("robots, sitemap, llms, and headers are ready for the export root", () => {
  const robots = fs.readFileSync(path.join(root, "public/robots.txt"), "utf8");
  for (const bot of [
    "GPTBot",
    "OAI-SearchBot",
    "ChatGPT-User",
    "ClaudeBot",
    "Claude-SearchBot",
    "PerplexityBot",
    "Google-Extended",
    "Bingbot",
  ]) {
    assert.match(robots, new RegExp(`User-agent: ${bot}\\s+Allow: /`));
  }
  assert.match(robots, /User-agent: \*\s+Allow: \//);
  assert.match(robots, /Sitemap: https:\/\/sudharmika\.com\/sitemap\.xml/);

  const sitemap = fs.readFileSync(path.join(root, "public/sitemap.xml"), "utf8");
  assert.match(sitemap, /<loc>https:\/\/sudharmika\.com\/<\/loc>/);
  assert.match(sitemap, /hreflang="id"/);
  assert.match(sitemap, /hreflang="en"[^>]+https:\/\/sudharmika\.com\/en\//);
  assert.match(sitemap, /hreflang="x-default"/);
  assert.match(sitemap, /<lastmod>2026-10-04<\/lastmod>/);

  const llms = fs.readFileSync(path.join(root, "public/llms.txt"), "utf8");
  assert.match(llms, /I Wayan Sudharmika/);
  assert.match(llms, /628992927276|62 899-2927-276/);
  assert.match(llms, /sudhar\.denpasar@gmail\.com/);
  assert.doesNotMatch(llms, /golang/i);

  const headers = fs.readFileSync(path.join(root, "public/_headers"), "utf8");
  const csp = headers.split("\n").find((line) => line.trim().startsWith("Content-Security-Policy:"));
  assert.ok(csp);
  assert.match(csp, /script-src[^;]*'self'/);
  assert.match(csp, /script-src[^;]*'unsafe-inline'/);
  assert.match(csp, /style-src[^;]*'unsafe-inline'/);
  assert.match(csp, /style-src[^;]*fonts\.googleapis\.com/);
  assert.match(csp, /font-src[^;]*fonts\.gstatic\.com/);
  assert.match(csp, /img-src[^;]*'self'/);

  for (const asset of ["favicon.svg", "favicon.ico", "apple-touch-icon.png", "og-image.png"]) {
    assert.ok(fs.existsSync(path.join(root, "public", asset)), asset);
  }
});

test("verified contact details are unchanged", () => {
  assert.match(html, /628992927276/);
  assert.match(html, /sudhar\.denpasar@gmail\.com/);
  assert.match(html, /https:\/\/www\.linkedin\.com\/in\/wayan-sudharmika-72820b109\//);
  assert.match(html, /https:\/\/github\.com\/soumabali/);
  assert.match(html, /Bali, Indonesia/);
});
