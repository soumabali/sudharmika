const techStack = ["Laravel", "Node.js", "PostgreSQL", "Redis", "Docker", "Cloudflare"];

const highlights = [
  {
    title: "Architecture-first",
    desc: "Rancang sistem dari flow bisnis → schema data → API contract, jadi tim frontend dan backend jalan sinkron.",
  },
  {
    title: "Performance mindset",
    desc: "Fokus pada latency, query efficiency, caching strategy, dan reliability supaya produk tetap cepat saat traffic naik.",
  },
  {
    title: "Automation-ready",
    desc: "Build pipeline yang repeatable: test gate, deploy otomatis, observability, dan guardrail keamanan dari awal.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-neutral-950 via-slate-900 to-neutral-950 text-white">
      <section className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <p className="inline-flex items-center rounded-full border border-emerald-400/40 bg-emerald-400/10 px-4 py-1 text-sm text-emerald-300">
          Backend Programmer • Indonesia
        </p>

        <h1 className="mt-6 text-4xl font-black leading-tight md:text-6xl">
          I Wayan Sudharmika
          <span className="block bg-gradient-to-r from-emerald-300 via-cyan-300 to-blue-300 bg-clip-text text-transparent">
            Building Reliable Digital Products
          </span>
        </h1>

        <p className="mt-6 max-w-3xl text-lg text-slate-300">
          Saya membantu bisnis mengubah ide menjadi sistem backend yang stabil, aman, dan scalable.
          Fokus saya: API architecture, data design, dan automation workflow yang bikin produk siap tumbuh.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <a href="#projects" className="btn btn-primary rounded-xl px-6">Lihat Project</a>
          <a href="mailto:hello@sudharmika.com" className="btn btn-outline rounded-xl px-6 text-white">Hubungi Saya</a>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-4 px-6 pb-12 md:grid-cols-3">
        {highlights.map((item) => (
          <article key={item.title} className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
            <h2 className="text-xl font-semibold text-emerald-300">{item.title}</h2>
            <p className="mt-3 text-slate-300">{item.desc}</p>
          </article>
        ))}
      </section>

      <section className="mx-auto max-w-6xl px-6 py-14" id="projects">
        <div className="rounded-3xl border border-cyan-400/30 bg-cyan-500/10 p-8">
          <h3 className="text-2xl font-bold md:text-3xl">Core Stack</h3>
          <div className="mt-5 flex flex-wrap gap-2">
            {techStack.map((tech) => (
              <span key={tech} className="rounded-full border border-cyan-200/30 bg-cyan-100/10 px-4 py-1 text-sm">
                {tech}
              </span>
            ))}
          </div>
          <p className="mt-6 max-w-3xl text-slate-200">
            Saya biasa menangani sistem internal tool, SaaS MVP, hingga automation layer (notifier, workflow engine, integration).
            Gaya kerja: pragmatic, measurable, dan cepat di-maintain tim kecil.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="rounded-3xl border border-emerald-300/30 bg-emerald-500/10 p-8 text-center">
          <h4 className="text-2xl font-bold md:text-3xl">Let’s build something memorable.</h4>
          <p className="mt-3 text-slate-200">Website ini dibangun untuk menampilkan identitas profesional yang tegas, modern, dan high-trust.</p>
          <a href="mailto:hello@sudharmika.com" className="btn mt-6 rounded-xl bg-emerald-400 text-neutral-900 hover:bg-emerald-300">
            Start a Project
          </a>
        </div>
      </section>
    </main>
  );
}
