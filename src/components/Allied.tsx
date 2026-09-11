import { useRef } from "react";
import { useInView } from "framer-motion";
import { Reveal, SectionHead } from "./ui";
import { useAnime } from "../context/AnimeContext";

function SimilarCard({
  id,
  title,
  alias,
  approval,
  total,
  rank,
}: {
  id: number;
  title: string;
  alias: string | null;
  approval: number;
  total: number;
  rank: number;
}) {
  const pct = Math.round((approval / total) * 100);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <Reveal delay={rank * 0.07}>
      <div
        ref={ref}
        data-hover
        className="group relative flex h-full flex-col justify-between overflow-hidden border border-line-soft bg-void/60 p-7 transition-all duration-500 hover:border-gold/35 hover:bg-hull"
      >
        <div className="pointer-events-none absolute -right-8 -top-10 font-display text-[7rem] font-light leading-none text-ice/[0.04] transition-colors duration-700 group-hover:text-gold/[0.08]">
          {String(rank + 1).padStart(2, "0")}
        </div>

        <div>
          <div className="font-mono text-[9px] tracking-[0.3em] text-smoke">
            ANIDB AID {id}
          </div>
          <h4 className="mt-4 font-display text-2xl font-medium leading-tight text-ice">
            {title}
          </h4>
          {alias && (
            <div className="mt-1.5 font-display text-base font-light italic text-lapis-soft/80">
              {alias}
            </div>
          )}
        </div>

        <div className="mt-10">
          <div className="flex items-end justify-between">
            <span className="font-display text-5xl font-light text-gold-bright tabular">
              {pct}
              <span className="text-xl text-gold-dim">%</span>
            </span>
            <span className="font-mono text-[9px] tracking-[0.2em] text-smoke tabular">
              {approval}/{total} APPROVE
            </span>
          </div>
          <div className="mt-3 h-px w-full bg-line">
            <div
              className="h-px bg-gold transition-all duration-[1600ms] ease-out"
              style={{ width: inView ? `${pct}%` : "0%" }}
            />
          </div>
        </div>
      </div>
    </Reveal>
  );
}

export default function Allied() {
  const { similar } = useAnime();

  return (
    <section id="allied" className="relative mx-auto max-w-[1600px] px-5 py-28 md:px-10 md:py-40">
      <SectionHead
        index="06"
        code="ALLIED RECORDS"
        accent="MUTUAL APPROVAL"
        title={
          <>
            Vessels sailing <em className="font-light italic text-lapis-soft">the same sea of stars</em>
          </>
        }
      />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {similar.slice(0, 4).map((s, i) => (
          <SimilarCard key={s.id} {...s} rank={i} />
        ))}
      </div>
      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {similar.slice(4).map((s, i) => (
          <SimilarCard key={s.id} {...s} rank={i + 4} />
        ))}
      </div>

      <Reveal delay={0.15}>
        <p className="mt-12 max-w-2xl font-mono text-[9px] leading-relaxed tracking-[0.25em] text-smoke">
          APPROVAL — SHARE OF OBSERVERS WHO ENDORSE THE PAIRING. GINGA EIYUU DENSETSU
          (84%) STANDS AS THE RECORD'S CLOSEST KIN: ANOTHER GRAND CHRONICLE OF EMPIRE,
          FLEETS, AND THE PRICE OF AMBITION.
        </p>
      </Reveal>
    </section>
  );
}
