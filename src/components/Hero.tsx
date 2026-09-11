import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Play } from "lucide-react";
import { useAnime } from "../context/AnimeContext";

const EASE = [0.22, 1, 0.36, 1] as const;

function Line({ children, delay, className }: { children: React.ReactNode; delay: number; className?: string }) {
  return (
    <div className="overflow-hidden">
      <motion.div
        initial={{ y: "110%" }}
        animate={{ y: 0 }}
        transition={{ duration: 1.2, delay, ease: EASE }}
        className={className}
      >
        {children}
      </motion.div>
    </div>
  );
}

export default function Hero() {
  const { record, ratings, openVideoPlayer } = useAnime();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yTitle = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const yNebula = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section id="top" ref={ref} className="relative flex min-h-svh flex-col overflow-hidden">
      {/* nebula backdrop */}
      <motion.div style={{ y: yNebula }} className="absolute inset-0 -z-[1]">
        <motion.img
          src="images/hero-nebula.jpg"
          alt=""
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 0.55, scale: 1.02 }}
          transition={{ duration: 2.4, ease: EASE }}
          className="animate-drift h-full w-full object-cover mix-blend-screen"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-abyss/70 via-transparent to-abyss" />
        <div className="bg-radial-fade absolute inset-0" />
      </motion.div>

      {/* orbit rings */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-[1] -translate-x-1/2 -translate-y-1/2">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2, delay: 0.9, ease: EASE }}
          className="relative h-[78vmin] w-[78vmin]"
        >
          <div className="absolute inset-0 rounded-full border border-lapis-soft/10" />
          <div className="animate-spin-slower absolute inset-0 rounded-full">
            <span className="absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold shadow-[0_0_18px_4px_rgba(200,162,75,0.5)]" />
          </div>
          <div className="animate-spin-slowest absolute inset-[9%] rounded-full border border-gold/15">
            <span className="absolute right-0 top-1/2 h-1 w-1 -translate-y-1/2 translate-x-1/2 rounded-full bg-lapis-soft shadow-[0_0_12px_3px_rgba(143,168,240,0.45)]" />
          </div>
        </motion.div>
      </div>

      {/* vertical japanese title */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4, delay: 1.6 }}
        className="vertical-rl absolute right-6 top-1/2 hidden -translate-y-1/2 select-none font-jp text-2xl font-extralight tracking-[0.5em] text-lapis-soft/50 md:block lg:text-3xl"
      >
        {record.jaTitle}
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4, delay: 1.8 }}
        className="vertical-rl absolute left-6 top-1/2 hidden -translate-y-1/2 select-none font-jp text-sm font-extralight tracking-[0.6em] text-smoke md:block"
      >
        {record.year}年放送
      </motion.div>

      {/* core */}
      <motion.div
        style={{ y: yTitle, opacity: fade }}
        className="flex flex-1 flex-col items-center justify-center px-5 text-center"
      >
        <Line delay={0.35} className="mb-8 flex items-center gap-4 font-mono text-[10px] tracking-[0.4em] text-mist md:text-[11px]">
          <span className="h-px w-8 bg-gold/60" />
          ARCHIVE RECORD № {String(record.anidbId).padStart(3, "0")} — HUMANKIND EMPIRE ABH
          <span className="h-px w-8 bg-gold/60" />
        </Line>

        <h1 className="font-display leading-[0.82]">
          <Line delay={0.5} className="text-outline text-[clamp(4.2rem,14vw,12.5rem)] font-medium tracking-[0.02em]">
            CREST
          </Line>
          <Line delay={0.62} className="my-1 text-[clamp(1.3rem,3.4vw,2.9rem)] font-light italic tracking-[0.5em] text-gold-bright md:my-2">
            of the
          </Line>
          <Line delay={0.74} className="text-[clamp(4.2rem,14vw,12.5rem)] font-medium tracking-[0.02em] text-ice">
            STARS
          </Line>
        </h1>

        <Line delay={0.95} className="mt-9 font-mono text-[10px] tracking-[0.34em] text-smoke md:text-[11px]">
          {record.mainTitle.toUpperCase()} · {record.type.toUpperCase()} · {record.year} · {record.episodeCount} EPISODES · {record.studio.toUpperCase()}
        </Line>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.35, ease: EASE }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4 md:gap-8"
        >
          <a
            href="#transmission"
            className="group relative border border-gold/50 px-8 py-3.5 font-mono text-[10px] tracking-[0.35em] text-gold transition-colors duration-500 hover:bg-gold hover:text-abyss"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#transmission")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            OPEN THE RECORD
          </a>
          <button
            type="button"
            onClick={() => openVideoPlayer(0)}
            className="group flex items-center gap-2.5 border border-gold bg-gold/10 px-8 py-3.5 font-mono text-[10px] tracking-[0.35em] text-gold transition-colors duration-500 hover:bg-gold hover:text-abyss shadow-[0_0_20px_rgba(200,162,75,0.15)]"
          >
            <Play className="h-3 w-3 fill-current transition-transform group-hover:scale-110" />
            PLAY PROLOGUE
          </button>
          <div className="hidden items-center gap-3 font-mono text-[10px] tracking-[0.3em] text-smoke lg:flex">
            <span className="animate-pulse-glow h-1.5 w-1.5 rounded-full bg-gold" />
            PERMANENT RATING {ratings[0]?.value?.toFixed(2) || "8.16"}
          </div>
        </motion.div>
      </motion.div>

      {/* bottom meta bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 1.7 }}
        className="relative border-t border-line-soft"
      >
        <div className="mx-auto grid max-w-[1600px] grid-cols-2 gap-4 px-5 py-5 font-mono text-[9px] tracking-[0.3em] text-smoke md:grid-cols-4 md:px-10 md:text-[10px]">
          <span>MAIN — {record.mainTitle.toUpperCase()}</span>
          <span className="hidden md:inline">EN — {record.enTitle.toUpperCase()}</span>
          <span className="hidden md:inline">AIRED — {record.startDate.replace(/-/g, ".")} → {record.endDate.replace(/-/g, ".")}</span>
          <span className="flex items-center justify-end gap-3 text-right">
            DESCEND
            <span className="relative h-8 w-px overflow-hidden bg-line">
              <span className="animate-scroll-cue absolute inset-0 bg-gold" />
            </span>
          </span>
        </div>
      </motion.div>
    </section>
  );
}
