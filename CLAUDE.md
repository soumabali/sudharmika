# CLAUDE.md — sudharmika.com Redesign

> Dokumen handoff lengkap untuk melanjutkan development di Claude Code.
> Baca file ini sepenuhnya sebelum mengubah kode apa pun.

---

## 1. Ringkasan Project

**Situs:** https://sudharmika.com — personal site + landing page jasa milik **I Wayan Sudharmika**, backend engineer & automation specialist di Bali, Indonesia (bagian dari tim engineering Timedoor).

**Tujuan bisnis (urutan prioritas):**
1. **Lead generation** — konversi pengunjung menjadi chat WhatsApp (channel utama di Indonesia).
2. **Menjual service** — 3 paket terproduktisasi dengan harga anchor.
3. **Visibility** — ranking organik (Google/Bing) DAN visibility di AI search (ChatGPT, Claude, Perplexity, Google AI Overviews).
4. Personal branding yang kredibel dan tidak terlihat "AI-generated template".

**Status saat ini:** Redesign v1 selesai sebagai single-file HTML statis, siap deploy ke Cloudflare Pages. Fase berikutnya: migrasi ke framework + halaman `/en/` statis + blog.

---

## 2. File yang Sudah Ada (deliverables v1)

```
/
├── index.html      # Landing page lengkap (ID default, EN via JS toggle)
├── robots.txt      # Mengizinkan semua AI crawler secara eksplisit
├── sitemap.xml     # Single URL + hreflang
├── llms.txt        # Ringkasan situs untuk AI crawler (markdown)
└── _headers        # Cloudflare Pages: security + caching headers
```

**Masih harus dibuat (assets):**
- [ ] `og-image.png` — 1200×630 PNG (BUKAN SVG — WhatsApp/LinkedIn tidak render SVG preview)
- [ ] `favicon.svg` + `favicon.ico` + `apple-touch-icon.png` (180×180)

---

## 3. Design System (JANGAN diubah tanpa alasan kuat)

Konsep: **"engineering spec sheet"** — kertas terang + monospace + cobalt.
Sengaja MENGHINDARI klise: dark theme + acid green, cream + terracotta serif, broadsheet hairline.

### Tokens

```css
--paper:   #F4F3EC;  /* background utama */
--paper-2: #ECEBE1;  /* background section alternating */
--ink:     #141812;  /* teks & section kontak */
--muted:   #5F6357;  /* teks sekunder */
--line:    #D8D6C8;  /* border/hairline */
--cobalt:  #2038C7;  /* aksen utama, link, CTA sekunder */
--status:  #0E8A4D;  /* indikator "live/available" */
--wa:      #128C4B;  /* CTA WhatsApp (primary conversion) */
--card:    #FFFFFF;
--radius:  12px;
--maxw:    1120px;
```

### Typography
| Peran | Font | Catatan |
|---|---|---|
| Display (h1–h3) | **Archivo** (variable, wght 400–900, wdth 75–100) | weight 800–850, letter-spacing -0.02em |
| Body | **Instrument Sans** | 400/500/600 |
| Utility/label/data | **IBM Plex Mono** | eyebrow, harga, durasi, console |

### Signature element
Hero kanan = **API console interaktif**: `POST /v1/projects` → `201 Created`, dengan tombol "Kirim request ini" yang membuka WhatsApp. Ini identitas visual utama situs — pertahankan di semua iterasi.

### Aturan desain
- CTA konversi primer selalu **hijau WhatsApp**; cobalt untuk CTA sekunder.
- Section berselang-seling `--paper` / `--paper-2` dengan border `--line`.
- Grid-paper background hanya di hero dan kartu kontak (via CSS mask radial).
- `prefers-reduced-motion` wajib dihormati.
- Fokus keyboard: outline cobalt 2.5px — jangan dihapus.

---

## 4. Struktur Halaman (urutan section, JANGAN diacak)

1. **Header sticky** — brand mono `SUDHARMIKA_`, nav, toggle bahasa ID|EN, CTA "Konsultasi Gratis"
2. **Hero** — headline + lead + dual CTA (WA primary, "Lihat Paket" ghost) + status "available" pulse + API console
3. **Proof strip** — 4 stat: `7+ tahun`, `30+ sistem`, `<24 jam respon`, `30 hari garansi`
4. **Tentang (`#tentang`)** — bio + link LinkedIn/GitHub + kartu **R&D** (Claude & Claude Code, n8n, Hermes, OpenClaw)
5. **Layanan (`#layanan`)** — 3 paket + catatan retainer
6. **Hasil Kerja (`#hasil`)** — 3 studi kasus dengan metrik
7. **Proses (`#proses`)** — 4 tahap: Discovery → Blueprint → Build → Stabilize
8. **Testimonial** — dihapus sampai ada klien nyata. Jangan tampilkan quote palsu.
9. **Stack** — chips; AI tools diberi class `.ai` (border cobalt)
10. **FAQ (`#faq`)** — 6 pertanyaan, `<details>/<summary>`, sinkron dengan FAQPage schema
11. **Kontak (`#kontak`)** — kartu gelap: info + lead form → WhatsApp deep link
12. **Footer** — links + "Terakhir diperbarui: <time>"
13. **Floating WhatsApp button** — fixed kanan bawah

### Paket layanan & harga (anchor saat ini — PLACEHOLDER, konfirmasi ke Wayan)
| Paket | Harga mulai | Timeline |
|---|---|---|
| Backend API Development | Rp 15 jt | 2–4 minggu |
| Integrasi & Automasi Sistem ⭐ (Paling Diminati) | Rp 7 jt / workflow | 1–2 minggu/workflow |
| SaaS MVP Backend | Rp 35 jt | 4–8 minggu |

Semua paket: dokumentasi + testing + **garansi bug-fix 30 hari**. Retainer bulanan: Performance & Reliability.

---

## 5. Sistem i18n (ID default, EN toggle)

- Dictionary `T = { id: {...}, en: {...} }` di `<script>` bawah `index.html`.
- Atribut: `data-i18n` (textContent), `data-i18n-html` (innerHTML, untuk teks ber-markup), `data-i18n-ph` (placeholder).
- **Pesan prefill WhatsApp juga per-bahasa** via `data-wa="<key>"` — JS membangun `https://wa.me/628992927276?text=<encoded>`.
- `?lang=en` atau `#en` di URL → buka langsung versi EN. `document.title`, meta description, dan `html[lang]` ikut berganti.
- **Aturan keras:** setiap key baru WAJIB ada di kedua dictionary. Ada validasi sederhana: bandingkan key regex `(\w+):\s*'` antara blok id dan en.

### ⚠️ Batasan SEO toggle JS
Crawler mengindeks HTML awal (Bahasa Indonesia). Untuk SEO EN maksimal, **fase berikutnya harus render `/en/` sebagai halaman statis terpisah** (hreflang di head sudah menunjuk ke `https://sudharmika.com/en/`). Dictionary yang ada bisa langsung dipakai sebagai sumber terjemahan.

---

## 6. SEO & GEO Requirements (sudah terpasang — pertahankan saat migrasi)

### On-page
- Title & meta description per bahasa; canonical; `robots: index, follow, max-image-preview:large, max-snippet:-1`
- hreflang `id` / `en` / `x-default`
- Open Graph + Twitter card (og:image = PNG 1200×630)
- Semantic HTML: satu `<h1>`, hierarki h2/h3 rapi, `<details>` FAQ, `<time datetime>`
- Skip-to-content link; aria-label pada nav, console, form

### Structured data (JSON-LD `@graph`) — WAJIB valid di validator.schema.org
- `WebSite` (inLanguage id+en)
- `WebPage` (datePublished, **dateModified — update setiap revisi konten**, speakable)
- `Person` (worksFor Timedoor, sameAs → LinkedIn + GitHub, knowsAbout lengkap termasuk AI tooling)
- `ProfessionalService` + `OfferCatalog` — **setiap Offer punya `price`, `priceCurrency: IDR`, `minPrice`** supaya harga bisa dikutip AI
- `FAQPage` — 6 Q&A, harus SINKRON kata-per-kata dengan FAQ visible di halaman

### GEO (AI search)
- `robots.txt` mengizinkan eksplisit: GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-SearchBot, PerplexityBot, Google-Extended, Bingbot
- `llms.txt` di root — ringkasan entitas + layanan + harga + kontak; update bila layanan/harga berubah
- Konten answer-first: FAQ menjawab langsung di kalimat pertama; entitas dinyatakan eksplisit ("I Wayan Sudharmika adalah backend engineer di Bali...")
- Freshness: `dateModified` di schema + "Terakhir diperbarui" visible di footer — keduanya diupdate bersamaan
- **PENTING (di luar kode):** cek Cloudflare dashboard → AI Crawl Metrics; default Cloudflare bisa memblokir AI bot. Pastikan tidak terblokir.

### Page experience
- `_headers`: HSTS, CSP, X-Frame-Options DENY, nosniff, Referrer-Policy, Permissions-Policy + cache immutable untuk assets
- Tanpa framework JS berat; font via Google Fonts `display=swap`; nol gambar blocking
- Target: Lighthouse ≥ 95 semua kategori, CWV hijau

---

## 7. Konten & Data

### Kontak (VERIFIED — jangan diubah)
- WhatsApp: `628992927276` → format tampil `+62 899-2927-276`
- Email: `sudhar.denpasar@gmail.com`
- LinkedIn: `https://www.linkedin.com/in/wayan-sudharmika-72820b109/`
- GitHub: `https://github.com/soumabali`
- Lokasi: Bali, Indonesia (GMT+8)

### PLACEHOLDER — wajib dikonfirmasi/diganti oleh Wayan sebelum production
- [ ] Angka proof strip: `7+ tahun`, `30+ sistem` → ganti angka real
- [ ] Harga 3 paket (Rp 15jt / 7jt / 35jt) → konfirmasi
- [ ] Metrik studi kasus (−70%, 6 minggu, 0 insiden) → ganti data real; studi kasus #1 & #3 ditulis generik dari project automasi internal
- [ ] Testimonial dihapus sampai ada klien nyata. Kembalikan hanya dengan quote asli plus nama dan izin.
- [ ] Konversi USD di FAQ EN (~USD 900) → sesuaikan kurs

### Brand voice
- ID: profesional tapi hangat, boleh sedikit playful (console: "backend yang nggak bikin pusing"), sapaan "Anda"
- EN: confident, plain, tanpa jargon marketing kosong
- Prinsip copy: outcome untuk klien, bukan fitur teknis. "Sistem yang baik adalah sistem yang membosankan."

---

## 8. Constraints (JANGAN dilanggar)

- ❌ **JANGAN menampilkan Go/Golang di mana pun** (stack, schema, copy) — Wayan tidak memakai Go. Stack yang benar: Laravel, Node.js, Nest.js, TypeScript, PostgreSQL, Redis, Docker, Cloudflare, GitHub Actions + AI tools (Claude/Claude Code, n8n, Hermes, OpenClaw).
- ❌ Jangan hapus/mengubah signature API console.
- ❌ Jangan menambah library JS/CSS eksternal tanpa kebutuhan jelas — situs ini menang karena ringan.
- ❌ Jangan pakai localStorage untuk preferensi bahasa di artifact/preview; untuk production boleh, tapi `/en/` statis lebih baik daripada persist toggle.
- ❌ Jangan membuat konten FAQ visible dan FAQPage schema tidak sinkron.
- ❌ Jangan mengarang testimoni/metrik baru — tandai `TODO(wayan)` bila butuh data.
- ✅ Framing AI selalu: "AI-assisted, keputusan arsitektur tetap manusia" — jangan diubah jadi "fully AI".

---

## 9. Roadmap Fase Berikutnya (urutan pengerjaan di Claude Code)

### Fase 2 — Framework & /en/ statis (prioritas)
- [ ] Migrasi ke **Astro** (rekomendasi: output statis murni, i18n bawaan, zero-JS default — cocok untuk Cloudflare Pages) ATAU Next.js static export bila ingin konsisten dengan stack Hermes. Keputusan di Wayan.
- [ ] Render `/` (ID) dan `/en/` (EN) sebagai HTML statis dari dictionary yang sama; hapus toggle JS atau jadikan link antar halaman.
- [ ] Per-halaman: title, meta, JSON-LD `inLanguage` sesuai bahasa; FAQPage EN di `/en/`.
- [ ] Update sitemap.xml jadi 2 URL + hreflang.

### Fase 3 — Assets & analytics
- [ ] Generate `og-image.png` (1200×630) sesuai design system (paper + Archivo + console motif); favicon set.
- [ ] Pasang analytics ringan (Cloudflare Web Analytics — tanpa cookie banner) + event tracking klik WhatsApp per lokasi CTA (hero/svc1/svc2/svc3/console/float/form) untuk mengukur konversi.

### Fase 4 — Blog / konten non-komoditas (pendorong ranking terbesar)
- [ ] Rute `/blog/` dengan Article schema, author → `#person`, dateModified, TOC.
- [ ] 3 artikel pertama (draft outline):
  1. "Transisi Timedoor ke AI-driven development: apa yang berhasil & gagal" (pengalaman nyata = non-commodity)
  2. "Hermes: satu interface `make dev|build|test|lint` untuk monorepo polyglot" (technical deep-dive + repo)
  3. "Automasi bisnis dengan n8n + AI agent: 3 pola yang aman untuk produksi"
- [ ] Setiap artikel: answer-first intro, data/angka asli, "Terakhir diperbarui".

### Fase 5 — Lead handling upgrade (opsional)
- [ ] Cloudflare Pages Function `/api/lead`: simpan lead ke KV/D1 + kirim notifikasi (email/n8n webhook) SEBELUM redirect WhatsApp — supaya lead tidak hilang bila user batal kirim WA.
- [ ] Honeypot + rate limit sederhana.

---

## 10. Testing & Acceptance Criteria

Sebelum dianggap selesai, setiap perubahan harus lolos:

- [ ] `validator.schema.org` & Google Rich Results Test: 0 error untuk semua tipe schema
- [ ] Lighthouse (mobile): Performance/Accessibility/Best Practices/SEO ≥ 95
- [ ] Toggle/halaman EN: tidak ada string ID tersisa (dan sebaliknya); pesan prefill WA sesuai bahasa
- [ ] Semua link WA menghasilkan URL `wa.me/628992927276?text=` ter-encode benar
- [ ] Form kirim → WhatsApp terbuka dengan pesan terstruktur (nama, bisnis, kebutuhan, detail)
- [ ] Responsive: 360px, 768px, 1120px+ — tidak ada overflow horizontal
- [ ] Keyboard-only: semua interaksi bisa diakses, fokus terlihat
- [ ] `curl -A "GPTBot" https://sudharmika.com/` (setelah deploy) mengembalikan 200 + HTML penuh
- [ ] securityheaders.com: grade A

## 11. Deploy (Cloudflare Pages)

1. Push semua file ke repo → connect ke Cloudflare Pages (atau `wrangler pages deploy`).
2. Pastikan `_headers`, `robots.txt`, `sitemap.xml`, `llms.txt` ada di output root.
3. Cloudflare dashboard → **AI Crawl Metrics / Bot settings**: pastikan AI crawler TIDAK diblokir.
4. Submit sitemap: Google Search Console + Bing Webmaster Tools.
5. Setelah live: cek preview link di WhatsApp & LinkedIn (og-image PNG harus muncul).
6. Setiap update konten: naikkan `dateModified` (schema) + tanggal footer + `lastmod` sitemap.
