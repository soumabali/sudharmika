# Copy review — market lineup (4 Oktober 2026)

Owner approved the market-research recommendations. This revision stays on PR #3 (`cursor/rewrite-site-copy-8cb5`) and is not merged. Proof numbers (7+, 30+, &lt;24h, 30-day warranty), case metrics (−70%, 6 weeks, 0 wrong-send), and the two testimonial quotes are unchanged. No new client names.

## Headline

| | Before | After |
|---|---|---|
| ID | API yang jalan, bisnis Anda yang tenang. | Bisnis jalan otomatis — dari chat WhatsApp sampai sistem di belakangnya. |
| EN | A stable backend, so your team keeps selling. | AI automation that actually holds up in production. |

Subheadline follows the report’s Option A, with the owner’s name in the Indonesian lead and “Hermes Agent” (Nous Research) in the English lead. The API console stays: `POST /v1/projects` → `201 Created`. The request body now describes a WhatsApp AI assistant connected to n8n, payments, and a database.

## Quick paths (inside the hero)

| Need | Goes to |
|---|---|
| Saya mau balas chat otomatis / I want chats answered automatically | Asisten WhatsApp AI |
| Saya mau kurangi kerja manual / I want less manual work | Automasi operasional |
| Saya butuh website / I need a website | Website bisnis |
| Saya butuh sistem custom / I need a custom system | Sistem & backend custom |

Each offer has its own WhatsApp prefill (`wa_offer1` … `wa_offer6`) in both languages.

## Services

| ID | EN | IDR (mulai) | EN / USD | Timeline |
|---|---|---|---|---|
| Asisten WhatsApp AI 24 Jam — entry, paling sering diminta | WhatsApp AI Assistant, 24/7 | Starter Rp 3,5 jt; Bisnis Rp 8 jt; kelola Rp 500rb/bulan | Starter about US$600 | Starter 5–7 hari; Bisnis 2–3 minggu |
| Automasi Operasional Bisnis (n8n & integrasi) | Business Automation | Starter Rp 5 jt (1–2 workflow); Growth Rp 15 jt; payment gateway Rp 1,5 jt | about US$800; hourly about US$40–50 | 1–3 minggu |
| Asisten AI Self-Hosted & Aman (OpenClaw / Hermes Agent) | Secure Self-Hosted AI Assistant | Rp 6 jt; kelola Rp 1 jt/bulan | US$500 / US$1,500; care about US$150/month | 2–5 hari |
| Website Bisnis Penghasil Leads | Lead-Generating Business Website | Rp 4,5 jt; bundle + WhatsApp AI Starter Rp 7,5 jt | Quoted in rupiah | 1–3 minggu |
| Sistem & Backend Custom / SaaS MVP | Custom Backend & SaaS MVP | Rp 15 jt / Rp 35 jt | US$45–60/hour | 2–8 minggu |
| Rawat & Kembangkan | Care & Growth Retainer | Rp 2,5 jt/bulan | US$300+/month | monthly |

WhatsApp Meta conversation fees are billed separately, at cost (from 1 October 2026: 1,000 free service messages per number each month, then about Rp 356.65 per message in Indonesia, plus the AI model cost). Said on the chatbot card and in the FAQ.

## Other copy

- About names the owner as backend engineer in Bali and Backend Team Leader at Timedoor. AI-assisted development; architecture stays human.
- R&D card: the owner’s make-dev tool is labeled “Hermes (monorepo tooling internal)”, not Hermes Agent. Stack chip says “Hermes Agent”. WordPress is on the stack.
- FAQ is eight answer-first items: WhatsApp price and Meta fee, the other prices, subscription chatbots, OpenClaw security (single-operator, sandbox off, hardening is the work), how a project runs (30-min consult, written proposal, weekly updates, 30-day warranty), code ownership, remote work, and what n8n is. FAQPage schema matches the Indonesian FAQ word for word.
- OfferCatalog JSON-LD has 13 IDR offers, each with `price`, `priceCurrency`, and `priceSpecification.minPrice`.
- Meta title ID: `Jasa Chatbot WhatsApp AI & n8n | Backend Developer Bali`. EN: `WhatsApp AI Chatbot & n8n Automation | Backend Bali`.
- `dateModified`, footer, and sitemap `lastmod` stay `2026-10-04`.

## Still needs the owner

TODO(wayan): a WhatsApp chatbot case study, once there are real before-and-after numbers. The note is on the results section. Do not invent a metric or a client name.
