import { useRef } from "react";
import { useInView } from "framer-motion";
import { Reveal, SectionHead, useCountUp } from "./ui";
import { useAnime } from "../context/AnimeContext";

function RatingBlock({
  kind,
  value,
  count,
  note,
  delay,
}: {
  kind: string;
  value: number;
  count: number;
  note: string;
  delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const displayed = useCountUp(value, inView, 2.1);
  const votes = useCountUp(count, inView, 2.1);
  const pct = (value / 10) * 100;

  return (
    <Reveal delay={delay}>
      <div ref={ref} className="group relative border border-line-soft bg-void/50 p-8 transition-colors duration-500 hover:border-gold/30 md:p-10">
        <div className="flex items-baseline justify-between">
          <span className="font-mono text-[10px] tracking-[0.35em] text-smoke">{kind}</span>
          <span className="font-mono text-[10px] tracking-[0.2em] text-gold-dim tabular">
            {inView ? Math.round(votes).toLocaleString() : 0} VOTES
          </span>
        </div>

        <div className="mt-8 font-display text-[clamp(4rem,7vw,6.5rem)] font-light leading-none text-ice tabular">
          {displayed.toFixed(2)}
          <span className="ml-2 font-mono text-xs tracking-[0.3em] text-smoke">/ 10</span>
        </div>

        <div className="mt-8">
          <div className="h-px w-full bg-line">
            <div
              className="h-px bg-gradient-to-r from-gold-dim via-gold to-gold-bright shadow-[0_0_10px_rgba(200,162,75,0.6)] transition-all duration-[2200ms] ease-out"
              style={{ width: inView ? `${pct}%` : "0%" }}
            />
          </div>
          <div className="mt-3 flex justify-between font-mono text-[9px] tracking-[0.25em] text-smoke">
            <span>0</span>
            <span className="text-center">{note.toUpperCase()}</span>
            <span>10</span>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

export default function Verdict() {
  const { ratings } = useAnime();
  const totalVotes = (ratings[0]?.count || 5000).toLocaleString();

  return (
    <section id="verdict" className="relative mx-auto max-w-[1600px] px-5 py-28 md:px-10 md:py-40">
      <SectionHead
        index="02"
        code="THE VERDICT"
        accent={`${totalVotes} BALLOTS`}
        title={
          <>
            Judged across <em className="font-light italic text-gold-bright">a generation</em> of viewers
          </>
        }
      />

      <div className="grid gap-6 md:grid-cols-3">
        {ratings.map((r, i) => (
          <RatingBlock key={r.kind} {...r} delay={i * 0.12} />
        ))}
      </div>

      <Reveal delay={0.2}>
        <div className="mt-6 flex flex-col items-start justify-between gap-4 border border-line-soft bg-void/50 p-8 md:flex-row md:items-center md:p-10">
          <p className="max-w-2xl font-display text-xl font-light italic leading-relaxed text-mist md:text-2xl">
            "The second-best anime of all time — excellent plots, environment, characters,
            development, and re-watch value."
          </p>
          <div className="font-mono text-[10px] tracking-[0.3em] text-smoke">
            OBSERVER №125868 — <span className="text-gold">MUST SEE</span>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
