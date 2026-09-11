import { ArrowUpRight, Globe } from "lucide-react";
import { Reveal, SectionHead, Diamond } from "./ui";
import { useAnime } from "../context/AnimeContext";

export default function Lineage() {
  const { lineage, creators, resources, record } = useAnime();
  return (
    <section id="lineage" className="relative overflow-hidden">
      {/* capital backdrop */}
      <div className="pointer-events-none absolute inset-0 -z-[1]">
        <img
          src="images/imperial-capital.jpg"
          alt=""
          className="h-full w-full object-cover opacity-25 mix-blend-screen"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-abyss via-abyss/60 to-abyss" />
      </div>

      <div className="mx-auto max-w-[1600px] px-5 py-28 md:px-10 md:py-40">
        <SectionHead
          index="08"
          code="LINEAGE"
          title={
            <>
              One throne, <em className="font-light italic text-lapis-soft">many banners</em>
            </>
          }
        />

        {/* franchise stepper */}
        <div className="relative grid gap-6 md:grid-cols-4">
          <div className="absolute left-0 right-0 top-[52px] hidden h-px bg-line md:block" />
          {lineage.map((l, i) => (
            <Reveal key={l.id} delay={i * 0.1}>
              <div
                data-hover
                className={`group relative border p-7 pt-14 transition-all duration-500 ${
                  l.current
                    ? "border-gold/50 bg-hull shadow-[0_0_60px_rgba(200,162,75,0.08)]"
                    : "border-line-soft bg-void/60 hover:border-line hover:bg-hull/70"
                }`}
              >
                <span
                  className={`absolute left-7 top-[45px] h-3.5 w-3.5 rotate-45 border transition-colors duration-500 md:left-1/2 md:-translate-x-1/2 ${
                    l.current
                      ? "border-gold bg-gold shadow-[0_0_16px_rgba(200,162,75,0.8)]"
                      : "border-smoke bg-abyss group-hover:border-gold"
                  }`}
                />
                <div className={`font-mono text-[9px] tracking-[0.35em] ${l.current ? "text-gold" : "text-smoke"}`}>
                  {l.relation}
                </div>
                <h4 className="mt-3 font-display text-2xl font-medium leading-tight text-ice">
                  {l.title}
                </h4>
                <p className="mt-2 text-[13px] font-light text-mist">{l.note}</p>
                <div className="mt-5 font-mono text-[9px] tracking-[0.25em] text-smoke">
                  AID {String(l.id).padStart(4, "0")}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* credits */}
        <div className="mt-32 grid gap-16 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <div className="flex items-center gap-4">
              <span className="h-px w-10 bg-gold/60" />
              <span className="font-mono text-[11px] tracking-[0.35em] text-gold">THE ARCHITECTS</span>
            </div>
            <h3 className="mt-6 font-display text-4xl font-medium leading-tight text-ice md:text-5xl">
              Hands that steered <em className="font-light italic text-lapis-soft">the vessel</em>
            </h3>
            <p className="mt-6 max-w-sm text-sm font-light leading-relaxed text-mist">
              Adapted from Morioka Hiroyuki's novels and animated by Sunrise, the series
              aired on WOWOW between January and March of 1999.
            </p>
          </Reveal>

          <div className="lg:col-span-8">
            <div className="divide-y divide-line-soft border-y border-line-soft">
              {creators.map((c, i) => (
                <Reveal key={`${c.role}-${c.id}`} delay={i * 0.06} y={16}>
                  <div className="group grid grid-cols-[1fr_auto] items-center gap-4 px-2 py-6 transition-colors duration-500 hover:bg-hull/60 md:grid-cols-[14rem_1fr_auto] md:px-6" data-hover>
                    <span className="font-mono text-[10px] tracking-[0.3em] text-smoke">
                      {c.role.toUpperCase()}
                    </span>
                    <span className="font-display text-2xl font-medium text-ice transition-transform duration-500 group-hover:translate-x-2 md:text-3xl">
                      {c.name}
                    </span>
                    <span className="col-span-2 font-mono text-[9px] tracking-[0.25em] text-smoke md:col-span-1">
                      CRE №{c.id}
                    </span>
                  </div>
                </Reveal>
              ))}
              <Reveal delay={0.3} y={16}>
                <div className="group grid grid-cols-[1fr_auto] items-center gap-4 px-2 py-6 transition-colors duration-500 hover:bg-hull/60 md:grid-cols-[14rem_1fr_auto] md:px-6" data-hover>
                  <span className="font-mono text-[10px] tracking-[0.3em] text-smoke">ANIMATION</span>
                  <span className="font-display text-2xl font-medium text-ice transition-transform duration-500 group-hover:translate-x-2 md:text-3xl">
                    {record.studio}
                  </span>
                  <span className="col-span-2 font-mono text-[9px] tracking-[0.25em] text-smoke md:col-span-1">
                    {record.year} · WOWOW
                  </span>
                </div>
              </Reveal>
            </div>

            {/* resources */}
            <Reveal delay={0.15}>
              <div className="mt-12 flex flex-wrap gap-4">
                {resources.map((r) => (
                  <a
                    key={r.label}
                    href={r.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center gap-4 border border-line-soft px-6 py-4 transition-all duration-500 hover:border-gold/50 hover:bg-hull"
                  >
                    <Globe className="h-4 w-4 text-gold-dim transition-colors group-hover:text-gold" strokeWidth={1.5} />
                    <span>
                      <span className="block font-mono text-[10px] tracking-[0.25em] text-ice">
                        {r.label.toUpperCase()}
                      </span>
                      <span className="mt-1 block font-mono text-[9px] tracking-[0.2em] text-smoke">
                        {r.meta}
                      </span>
                    </span>
                    <ArrowUpRight className="h-4 w-4 text-smoke transition-all duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-gold" strokeWidth={1.5} />
                  </a>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      {/* footer */}
      <footer className="relative border-t border-line-soft">
        <div className="pointer-events-none absolute inset-x-0 -top-2 select-none overflow-hidden text-center">
          <span className="text-outline-gold font-jp text-[22vw] font-semibold leading-[0.9] opacity-[0.07]">
            星界
          </span>
        </div>
        <div className="relative mx-auto max-w-[1600px] px-5 pb-14 pt-32 md:px-10 md:pt-44">
          <div className="flex flex-col items-center gap-6 text-center">
            <Diamond className="h-3 w-3 text-gold" />
            <p className="font-jp text-xl font-light tracking-[0.5em] text-ice">{record.jaTitle}</p>
            <p className="max-w-md font-display text-2xl font-light italic leading-snug text-mist">
              "The stars are the inheritance of those who reach for them."
            </p>
            <div className="mt-4 grid w-full gap-4 border-t border-line-soft pt-8 font-mono text-[9px] tracking-[0.25em] text-smoke md:grid-cols-3">
              <span className="md:text-left">ARCHIVE RECORD № {String(record.anidbId).padStart(3, "0")} — {record.mainTitle.toUpperCase()}</span>
              <span className="text-gold-dim">DATA COURTESY OF THE ANIDB HTTP API</span>
              <span className="md:text-right">AN UNOFFICIAL FAN DOSSIER · MMXXVI</span>
            </div>
          </div>
        </div>
      </footer>
    </section>
  );
}
