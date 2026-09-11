import { Quote } from "lucide-react";
import type { Voice } from "../data/anime";
import { Reveal, SectionHead } from "./ui";
import { useAnime } from "../context/AnimeContext";

function VoiceCard({ v, delay, hero = false }: { v: Voice; delay: number; hero?: boolean }) {
  const mustSee = v.kind === "Must See";
  return (
    <Reveal delay={delay} className={hero ? "md:col-span-2" : ""}>
      <figure
        className={`group relative flex h-full flex-col border p-8 transition-colors duration-500 md:p-10 ${
          hero
            ? "border-gold/30 bg-gradient-to-br from-hull to-void"
            : "border-line-soft bg-void/60 hover:border-line hover:bg-hull/60"
        }`}
      >
        <Quote
          className={`h-6 w-6 ${hero ? "text-gold" : "text-gold-dim"} transition-transform duration-700 group-hover:-rotate-6 group-hover:scale-110`}
          strokeWidth={1.25}
        />
        <blockquote
          className={`mt-6 flex-1 font-display font-light leading-relaxed text-ice ${
            hero ? "text-[clamp(1.5rem,2.6vw,2.3rem)]" : "text-lg"
          }`}
        >
          {v.text}
        </blockquote>
        <figcaption className="mt-8 flex items-center justify-between border-t border-line-soft pt-5">
          <span className="font-mono text-[10px] tracking-[0.28em] text-smoke">
            OBSERVER №{v.uid}
          </span>
          <span
            className={`px-3 py-1 font-mono text-[9px] tracking-[0.3em] ${
              mustSee ? "bg-gold text-abyss" : "border border-line text-mist"
            }`}
          >
            {v.kind.toUpperCase()}
          </span>
        </figcaption>
      </figure>
    </Reveal>
  );
}

export default function Voices() {
  const { voices } = useAnime();
  const [hero, ...rest] = voices;
  return (
    <section id="voices" className="relative mx-auto max-w-[1600px] px-5 py-28 md:px-10 md:py-40">
      <SectionHead
        index="07"
        code="VOICES FROM THE FLEET"
        accent="20 TRANSCRIPTS"
        title={
          <>
            What the observers <em className="font-light italic text-gold-bright">still whisper</em>
          </>
        }
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <VoiceCard v={hero} delay={0} hero />
        <VoiceCard v={rest[0]} delay={0.08} />
        <VoiceCard v={rest[1]} delay={0.14} />
        <VoiceCard v={rest[2]} delay={0.2} />
        <VoiceCard v={rest[3]} delay={0.26} />
        <VoiceCard v={rest[4]} delay={0.32} />
        <VoiceCard v={rest[5]} delay={0.38} />
      </div>

      <Reveal delay={0.2}>
        <div className="mt-12 text-center font-mono text-[9px] tracking-[0.3em] text-smoke">
          OF {VOICES.length} DISPLAYED TRANSCRIPTS — THE ARCHIVE HOLDS 20 IN TOTAL
        </div>
      </Reveal>
    </section>
  );
}
