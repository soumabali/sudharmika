# sudharmika.com

Personal site and service landing page for **I Wayan Sudharmika**, backend engineer and automation specialist in Bali. The page is Indonesian by default, with an English toggle (`?lang=en` or `#en`).

The visual source of truth is `src/site/index.html`. The Next.js app (static export) inlines that document so `npm run build` still emits the Cloudflare Pages `out/` directory.

## Stack
- Next.js 14 static export
- No client UI framework on the page itself: one inline i18n script plus a tiny hydration boot
- Deployment: Cloudflare Pages via `.github/workflows/deploy-cloudflare-pages.yml`

## Directory
- `src/site/index.html` — landing markup, design CSS, copy, JSON-LD, and i18n
- `src/app/` — static export shell that publishes that document
- `public/` — `robots.txt`, `sitemap.xml`, `llms.txt`, `_headers`, icons, og image
- `out/` — generated static export (not committed)

## Local
```bash
npm ci
npm run dev
```

## Production build
```bash
npm run build
```

`out/` must contain `index.html`, `robots.txt`, `sitemap.xml`, `llms.txt`, and `_headers`.

## Checks
```bash
npm run quality-gate
```

## Deploy
1. Merge to `main`
2. GitHub Action `deploy-cloudflare-pages` runs
3. Cloudflare Pages project `sudharmika` publishes `out/`
4. Custom domain: `sudharmika.com`

Secrets (never commit them):
- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

Handoff notes, design tokens, and content that still needs the owner's confirmation are in `CLAUDE.md`.
