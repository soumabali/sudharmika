"use client";

import { useMemo, useState } from "react";

type Lang = "id" | "en";

const techStack = [
  "Laravel",
  "Node.js",
  "TypeScript",
  "PostgreSQL",
  "Redis",
  "Docker",
  "Cloudflare",
  "n8n",
];

const content = {
  id: {
    badge: "Personal Brand Site · Backend Programmer",
    title2: "Building Reliable Digital Products",
    intro:
      "Saya membantu bisnis mengubah ide menjadi sistem backend yang stabil, aman, dan scalable. Fokus saya: API architecture, data design, dan automation workflow agar produk bisa tumbuh tanpa chaos.",
    explore: "Lihat Layanan",
    start: "Mulai Project",
    wins: [
      { label: "API-first Delivery", value: "Lebih Cepat" },
      { label: "Deployment Confidence", value: "Tinggi" },
      { label: "Maintenance Cost", value: "Lebih Rendah" },
    ],
    trusted: "Trusted workflow: Discovery → Architecture → Build → Stabilize",
    pillars: [
      {
        title: "System Architecture",
        desc: "Menyusun backend dari business flow, domain model, sampai API contract yang siap scale.",
      },
      {
        title: "Performance Engineering",
        desc: "Optimasi query, cache design, dan observability supaya latency tetap rendah saat load naik.",
      },
      {
        title: "Automation & Reliability",
        desc: "Build deployment pipeline dan workflow automation yang repeatable, aman, dan mudah di-maintain.",
      },
    ],
    what: "Layanan",
    whatDesc:
      "Dari pondasi backend sampai automation layer, saya bantu tim bergerak cepat tanpa mengorbankan kualitas.",
    services: [
      "Backend API Development",
      "System Integration & Automation",
      "SaaS MVP Architecture",
      "Performance & Reliability Tuning",
    ],
    caseTitle: "Studi Kasus Pilihan",
    cases: [
      {
        title: "Internal Ops Platform",
        result: "Automasi workflow approval dan notifikasi, mempercepat proses operasional harian.",
      },
      {
        title: "SaaS MVP Backend",
        result: "Rancang pondasi API + auth + billing-ready architecture untuk tim kecil yang butuh launch cepat.",
      },
      {
        title: "Notifier Automation",
        result: "Sistem notifier one-way dengan guardrail (allowlist, rate limit, audit log) untuk reliability produksi.",
      },
    ],
    how: "Cara Kerja",
    process: [
      "Discovery: pahami goal bisnis dan constraint teknis",
      "Blueprint: mapping flow, schema, contract API",
      "Build: implementasi modular + testing",
      "Stabilize: observability, hardening, dan handover",
    ],
    voice: "Client Voice",
    testimonials: [
      {
        quote: "Eksekusinya cepat, tapi tetap rapi. Enak buat di-maintain jangka panjang.",
        role: "Founder, SaaS Project",
      },
      {
        quote: "Yang paling kerasa: sistem jadi stabil, tim frontend juga lebih mudah jalan karena API jelas.",
        role: "Product Lead",
      },
    ],
    stack: "Core Stack",
    stackDesc:
      "Pendekatan kerja saya: pragmatic, measurable, dan bisa dioperasikan jangka panjang. Tujuannya bukan sekadar launch, tapi sistem yang benar-benar bisa dipakai dan bertumbuh.",
    ctaTitle: "Let’s build something remarkable.",
    ctaDesc: "Kamu bawa visi produk, saya bantu bangun fondasi teknis yang cepat, stabil, dan siap scale.",
    email: "Email Saya",
    wa: "WhatsApp",
    footer: "Built with precision and care.",
  },
  en: {
    badge: "Personal Brand Site · Backend Programmer",
    title2: "Building Reliable Digital Products",
    intro:
      "I help businesses turn ideas into stable, secure, and scalable backend systems. My focus is API architecture, data design, and automation workflows that support sustainable growth.",
    explore: "Explore Services",
    start: "Start a Project",
    wins: [
      { label: "API-first Delivery", value: "Faster" },
      { label: "Deployment Confidence", value: "High" },
      { label: "Maintenance Cost", value: "Lower" },
    ],
    trusted: "Trusted workflow: Discovery → Architecture → Build → Stabilize",
    pillars: [
      {
        title: "System Architecture",
        desc: "Designing backend systems from business flow and domain model to scalable API contracts.",
      },
      {
        title: "Performance Engineering",
        desc: "Optimizing queries, cache strategy, and observability to keep latency low under higher load.",
      },
      {
        title: "Automation & Reliability",
        desc: "Building repeatable deployment pipelines and automation workflows that are secure and maintainable.",
      },
    ],
    what: "What I Do",
    whatDesc:
      "From backend foundations to automation layers, I help teams move fast without sacrificing quality.",
    services: [
      "Backend API Development",
      "System Integration & Automation",
      "SaaS MVP Architecture",
      "Performance & Reliability Tuning",
    ],
    caseTitle: "Selected Case Studies",
    cases: [
      {
        title: "Internal Ops Platform",
        result: "Automated approval and notification workflows to speed up daily operations.",
      },
      {
        title: "SaaS MVP Backend",
        result: "Built API, auth, and billing-ready architecture for small teams needing fast launch.",
      },
      {
        title: "Notifier Automation",
        result: "Implemented one-way notifier system with guardrails (allowlist, rate limit, audit log).",
      },
    ],
    how: "How I Work",
    process: [
      "Discovery: understand business goals and technical constraints",
      "Blueprint: map flow, schema, and API contracts",
      "Build: modular implementation with testing",
      "Stabilize: observability, hardening, and handover",
    ],
    voice: "Client Voice",
    testimonials: [
      {
        quote: "Execution was fast but still clean. Very maintainable in the long run.",
        role: "Founder, SaaS Project",
      },
      {
        quote: "The biggest impact: a more stable system and smoother frontend delivery thanks to clear APIs.",
        role: "Product Lead",
      },
    ],
    stack: "Core Stack",
    stackDesc:
      "My approach is pragmatic, measurable, and built for long-term operation. The goal is not just launch, but systems that keep working as you grow.",
    ctaTitle: "Let’s build something remarkable.",
    ctaDesc: "Bring your product vision, and I will help build the technical foundation to scale with confidence.",
    email: "Email Me",
    wa: "WhatsApp",
    footer: "Built with precision and care.",
  },
};

export default function Home() {
  const [lang, setLang] = useState<Lang>("id");
  const t = useMemo(() => content[lang], [lang]);
  const waText = encodeURIComponent(
    "halo saya ingin tahu tentang service dan jasa web yang kakak tawarkan",
  );
  const waUrl = `https://wa.me/628992927276?text=${waText}`;

  return (
    <main className="relative overflow-hidden bg-[#060b16] text-white">
      <div className="pointer-events-none absolute inset-0 hero-aurora" />
      <div className="pointer-events-none absolute inset-0 hero-grid opacity-25" />

      <header className="relative mx-auto flex max-w-6xl items-center justify-between px-6 pt-8 text-sm text-slate-300 animate-fade-up">
        <div className="flex items-center gap-3">
          <img src="/brand-mark.svg" alt="Sudharmika" className="h-8 w-8" />
          <span className="font-semibold tracking-wide">SUDHARMIKA</span>
        </div>
        <div className="flex items-center gap-2">
          <button className={`btn btn-xs rounded-lg ${lang === "id" ? "btn-primary" : "btn-ghost"}`} onClick={() => setLang("id")}>ID</button>
          <button className={`btn btn-xs rounded-lg ${lang === "en" ? "btn-primary" : "btn-ghost"}`} onClick={() => setLang("en")}>EN</button>
        </div>
      </header>

      <section className="relative mx-auto max-w-6xl px-6 pb-16 pt-16 md:pb-20 md:pt-24 animate-fade-up animation-delay-1">
        <p className="inline-flex items-center rounded-full border border-emerald-300/30 bg-emerald-300/10 px-4 py-1 text-xs font-medium uppercase tracking-[0.18em] text-emerald-200">
          {t.badge}
        </p>

        <h1 className="mt-7 text-4xl font-black leading-tight md:text-6xl lg:text-7xl">
          I Wayan Sudharmika
          <span className="mt-2 block bg-gradient-to-r from-emerald-300 via-cyan-300 to-blue-300 bg-clip-text text-transparent">
            {t.title2}
          </span>
        </h1>

        <p className="mt-7 max-w-3xl text-base leading-relaxed text-slate-300 md:text-lg">{t.intro}</p>

        <div className="mt-9 flex flex-wrap items-center gap-3">
          <a href="#services" className="btn rounded-xl border-0 bg-emerald-300 px-7 text-[#06230f] hover:bg-emerald-200">{t.explore}</a>
          <a href="mailto:sudhar.denpasar@gmail.com" className="btn btn-outline rounded-xl border-white/30 px-7 text-white hover:bg-white/10">{t.start}</a>
        </div>

        <div className="mt-12 grid gap-3 sm:grid-cols-3">
          {t.wins.map((item) => (
            <article key={item.label} className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur card-lift">
              <p className="text-xs uppercase tracking-widest text-slate-400">{item.label}</p>
              <p className="mt-2 text-2xl font-bold text-emerald-200">{item.value}</p>
            </article>
          ))}
        </div>

        <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-xs uppercase tracking-[0.14em] text-slate-300 md:text-sm">{t.trusted}</div>
      </section>

      <section className="relative mx-auto grid max-w-6xl gap-4 px-6 pb-8 md:grid-cols-3">
        {t.pillars.map((item) => (
          <article key={item.title} className="rounded-2xl border border-white/10 bg-[#0d1527]/90 p-6 shadow-[0_10px_30px_rgba(4,10,20,0.45)]">
            <h2 className="text-lg font-semibold text-cyan-200">{item.title}</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-300">{item.desc}</p>
          </article>
        ))}
      </section>

      <section id="services" className="relative mx-auto max-w-6xl px-6 py-14 md:py-16">
        <div className="rounded-3xl border border-cyan-300/30 bg-cyan-400/10 p-8 md:p-10">
          <h3 className="text-2xl font-bold md:text-3xl">{t.what}</h3>
          <p className="mt-3 max-w-3xl text-slate-200">{t.whatDesc}</p>
          <div className="mt-6 grid gap-3 md:grid-cols-2">
            {t.services.map((service) => (
              <div key={service} className="rounded-xl border border-cyan-100/20 bg-cyan-100/10 px-4 py-3 text-sm text-cyan-50">{service}</div>
            ))}
          </div>
        </div>
      </section>

      <section id="case-studies" className="relative mx-auto max-w-6xl px-6 pb-16">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 md:p-10">
          <h4 className="text-2xl font-bold md:text-3xl">{t.caseTitle}</h4>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {t.cases.map((item) => (
              <article key={item.title} className="rounded-2xl border border-white/10 bg-[#0b1222] p-5 card-lift">
                <p className="text-lg font-semibold text-emerald-200">{item.title}</p>
                <p className="mt-2 text-sm text-slate-300">{item.result}</p>
              </article>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href="https://sudharmika.com" className="btn btn-outline rounded-xl border-white/30 text-white hover:bg-white/10">Live Website</a>
            <a href="https://github.com/soumabali/sudharmika" className="btn btn-outline rounded-xl border-white/30 text-white hover:bg-white/10">GitHub Repo</a>
          </div>
        </div>
      </section>

      <section className="relative mx-auto max-w-6xl px-6 pb-16">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 md:p-10">
          <h4 className="text-2xl font-bold md:text-3xl">{t.how}</h4>
          <div className="mt-6 grid gap-3 md:grid-cols-2">
            {t.process.map((step, idx) => (
              <div key={step} className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200"><span className="mr-2 font-bold text-cyan-200">0{idx + 1}.</span>{step}</div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative mx-auto max-w-6xl px-6 pb-16">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 md:p-10">
          <h4 className="text-2xl font-bold md:text-3xl">{t.voice}</h4>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {t.testimonials.map((item) => (
              <blockquote key={item.role} className="rounded-2xl border border-white/10 bg-[#0b1222] p-5">
                <p className="text-slate-200">“{item.quote}”</p>
                <footer className="mt-3 text-sm text-cyan-200">{item.role}</footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      <section className="relative mx-auto max-w-6xl px-6 pb-16">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 md:p-10">
          <h4 className="text-2xl font-bold md:text-3xl">{t.stack}</h4>
          <div className="mt-5 flex flex-wrap gap-2">
            {techStack.map((tech) => (
              <span key={tech} className="rounded-full border border-white/20 bg-white/10 px-4 py-1 text-sm text-slate-100">{tech}</span>
            ))}
          </div>
          <p className="mt-6 max-w-3xl text-slate-300">{t.stackDesc}</p>
        </div>
      </section>

      <section id="contact" className="relative mx-auto max-w-6xl px-6 pb-24">
        <div className="rounded-3xl border border-emerald-300/30 bg-gradient-to-r from-emerald-400/20 to-cyan-400/20 p-8 text-center md:p-12">
          <h5 className="text-2xl font-bold md:text-4xl">{t.ctaTitle}</h5>
          <p className="mx-auto mt-3 max-w-2xl text-slate-200">{t.ctaDesc}</p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <a href="mailto:sudhar.denpasar@gmail.com" className="btn rounded-xl border-0 bg-emerald-300 px-8 text-[#072612] hover:bg-emerald-200">{t.email}</a>
            <a href={waUrl} target="_blank" rel="noreferrer" className="btn btn-outline rounded-xl border-white/30 px-8 text-white hover:bg-white/10">{t.wa}</a>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 py-8 text-center text-xs text-slate-400">© {new Date().getFullYear()} I Wayan Sudharmika · {t.footer}</footer>
    </main>
  );
}
