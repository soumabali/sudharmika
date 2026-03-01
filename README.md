# sudharmika

Company profile website untuk **I Wayan Sudharmika** (Backend Programmer), dibangun dengan Next.js static export dan siap deploy ke Cloudflare Pages.

## Stack
- Next.js 14 (App Router)
- Tailwind + daisyUI
- Deployment: Cloudflare Pages

## Struktur Direktori
- `src/app/` → halaman + layout
- `public/` → aset statis
- `.github/workflows/` → CI/CD deploy ke Cloudflare Pages
- `out/` → hasil static export (generated)

## Run lokal
```bash
npm ci
npm run dev
```

## Build produksi (static)
```bash
npm run build
```
Output ada di folder `out/`.

## Standard Security (LOCK)
- Jangan hardcode credential/token di file.
- Wajib set di GitHub Secrets:
  - `CLOUDFLARE_API_TOKEN`
  - `CLOUDFLARE_ACCOUNT_ID`

## Deploy Flow
1. Push ke branch `main`
2. GitHub Action `deploy-cloudflare-pages` jalan otomatis
3. Cloudflare Pages deploy project `sudharmika` dari folder `out`
4. Bind custom domain `sudharmika.com`
