import { Reveal, SectionHead } from "./ui";
import { useAnime } from "../context/AnimeContext";

function WeightTicks({ weight }: { weight: number }) {
  const level = weight >= 500 ? 3 : weight >= 300 ? 2 : weight > 0 ? 1 : 0;
  return (
    <span className="ml-2 inline-flex items-center gap-[3px]">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className={`h-[3px] w-[3px] rounded-full transition-colors duration-500 ${
            i < level ? "bg-gold" : "bg-line"
          }`}
        />
      ))}
    </span>
  );
}

export default function Spectrum() {
  const { tagGroups } = useAnime();
  return (
    <section id="spectrum" className="relative mx-auto max-w-[1600px] px-5 py-28 md:px-10 md:py-40">
      <SectionHead
        index="05"
        code="SPECTRUM ANALYSIS"
        title={
          <>
            What the record is <em className="font-light italic text-gold-bright">made of</em>
          </>
        }
      />

      <div className="space-y-14">
        {tagGroups.map((g, gi) => (
          <div key={g.label} className="grid gap-6 md:grid-cols-12">
            <Reveal className="md:col-span-3">
              <div className="md:sticky md:top-28">
                <div className="font-mono text-[10px] tracking-[0.35em] text-gold">
                  {String(gi + 1).padStart(2, "0")} — {g.label}
                </div>
                <p className="mt-3 font-display text-lg font-light italic text-mist">{g.note}</p>
              </div>
            </Reveal>

            <div className="flex flex-wrap content-start items-start gap-3 md:col-span-9">
              {g.tags.map((t, i) => {
                const strong = t.weight >= 400;
                const mid = t.weight >= 200 && t.weight < 400;
                return (
                  <Reveal key={t.name} delay={Math.min(i * 0.045, 0.4)} y={14}>
                    <span
                      data-hover
                      className={`group inline-flex cursor-default items-center border px-5 py-2.5 font-grotesk transition-all duration-500 hover:-translate-y-0.5 ${
                        strong
                          ? "border-gold/45 bg-gold/[0.07] text-[17px] font-light text-ice hover:bg-gold hover:text-abyss"
                          : mid
                            ? "border-line bg-void/60 text-[14px] font-light text-ice/85 hover:border-gold/50 hover:text-gold-bright"
                            : "border-line-soft bg-transparent text-[13px] font-light text-mist hover:border-gold/40 hover:text-ice"
                      }`}
                    >
                      {t.name}
                      <WeightTicks weight={t.weight} />
                      {strong && (
                        <span className="ml-2 font-mono text-[8px] tracking-[0.2em] text-gold group-hover:text-abyss">
                          {t.weight}
                        </span>
                      )}
                    </span>
                  </Reveal>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <Reveal delay={0.2}>
        <p className="mt-16 max-w-xl font-mono text-[9px] leading-relaxed tracking-[0.25em] text-smoke">
          WEIGHT — COMMUNITY-VERIFIED SALIENCE ON THE ANIDB SCALE 0–600.
          THREE TICKS MARK THE CORE SIGNALS OF THIS RECORD.
        </p>
      </Reveal>
    </section>
  );
}
