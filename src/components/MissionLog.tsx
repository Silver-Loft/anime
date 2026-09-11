import { motion } from "framer-motion";
import { Reveal, SectionHead } from "./ui";
import { useAnime } from "../context/AnimeContext";

export default function MissionLog() {
  const { episodes, record } = useAnime();
  const best = episodes.length
    ? episodes.reduce((a, b) => (b.rating > a.rating ? b : a))
    : { no: 1, rating: 0 };
  const avg = episodes.length
    ? episodes.reduce((s, e) => s + e.rating, 0) / episodes.length
    : 0;
  const totalRuntime = episodes.reduce((s, e) => s + (e.length || 25), 0);

  return (
    <section id="log" className="relative mx-auto max-w-[1600px] px-5 py-28 md:px-10 md:py-40">
      <SectionHead
        index="04"
        code="MISSION LOG"
        accent={`${episodes.length} SORTIES`}
        title={
          <>
            Thirteen weeks, <em className="font-light italic text-lapis-soft">one winter of {record.year}</em>
          </>
        }
      />

      {/* summary strip */}
      <Reveal>
        <div className="mb-14 grid grid-cols-2 gap-px border border-line-soft bg-line-soft md:grid-cols-4">
          {[
            { k: "EPISODES", v: String(episodes.length) },
            { k: "MEAN SCORE", v: avg.toFixed(2) },
            { k: "PEAK SORTIE", v: `E${String(best.no).padStart(2, "0")}` },
            { k: "RUNTIME", v: `${totalRuntime} MIN` },
          ].map((s) => (
            <div key={s.k} className="bg-void px-7 py-6">
              <div className="font-mono text-[9px] tracking-[0.3em] text-smoke">{s.k}</div>
              <div className="mt-2 font-display text-3xl font-light text-ice tabular">{s.v}</div>
            </div>
          ))}
        </div>
      </Reveal>

      <div className="border-t border-line-soft">
        {episodes.map((ep, i) => (
          <motion.div
            key={ep.no}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-4% 0px" }}
            transition={{ duration: 0.7, delay: Math.min(i * 0.04, 0.3), ease: [0.22, 1, 0.36, 1] }}
            className="group relative grid grid-cols-[auto_1fr_auto] items-center gap-4 border-b border-line-soft px-2 py-6 transition-colors duration-500 hover:bg-hull/70 md:grid-cols-[5rem_1fr_auto_auto] md:gap-8 md:px-6"
            data-hover
          >
            {/* number */}
            <div className="font-display text-3xl font-light text-lapis-soft/50 transition-colors duration-500 group-hover:text-gold md:text-4xl tabular">
              {String(ep.no).padStart(2, "0")}
            </div>

            {/* titles */}
            <div className="min-w-0">
              <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                <h4 className="truncate font-display text-xl font-medium text-ice transition-transform duration-500 group-hover:translate-x-1.5 md:text-2xl">
                  {ep.en}
                </h4>
                {ep.no === 13 && (
                  <span className="border border-gold/50 px-2 py-0.5 font-mono text-[8px] tracking-[0.3em] text-gold">
                    FINALE · 40 MIN
                  </span>
                )}
                {ep.no === best.no && (
                  <span className="border border-lapis/50 px-2 py-0.5 font-mono text-[8px] tracking-[0.3em] text-lapis-soft">
                    HIGHEST RATED
                  </span>
                )}
              </div>
              <div className="mt-1.5 flex flex-wrap items-center gap-x-3 font-mono text-[9px] tracking-[0.25em] text-smoke">
                <span className="font-jp text-[11px] tracking-[0.2em] text-mist">{ep.ja}</span>
                <span>{ep.romaji}</span>
              </div>
            </div>

            {/* airdate */}
            <div className="hidden text-right font-mono text-[10px] tracking-[0.25em] text-smoke md:block tabular">
              {ep.air.replace(/-/g, ".")}
            </div>

            {/* rating */}
            <div className="w-24 text-right md:w-40">
              <div className="font-mono text-xs text-ice tabular">{ep.rating.toFixed(2)}</div>
              <div className="mt-2 h-px w-full bg-line">
                <div
                  className="h-px origin-left bg-gradient-to-r from-gold-dim to-gold transition-transform duration-1000 ease-out group-hover:bg-gold-bright"
                  style={{ transform: `scaleX(${ep.rating / 10})` }}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <Reveal delay={0.15}>
        <div className="mt-10 flex flex-wrap gap-x-10 gap-y-3 font-mono text-[9px] tracking-[0.25em] text-smoke">
          <span>C1 — OPENING THEME</span>
          <span>C2/C3 — ENDING THEMES 1 &amp; 2</span>
          <span className="text-gold-dim">HOVER A SORTIE TO TRACE ITS SCORE</span>
        </div>
      </Reveal>
    </section>
  );
}
