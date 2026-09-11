import { useEffect, useState, type MouseEvent } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Terminal, RefreshCw } from "lucide-react";
import { Diamond } from "./ui";
import { useAnime } from "../context/AnimeContext";

const LINKS = [
  { href: "#transmission", label: "Transmission" },
  { href: "#verdict", label: "Verdict" },
  { href: "#personnel", label: "Personnel" },
  { href: "#log", label: "Mission Log" },
  { href: "#allied", label: "Allied" },
  { href: "#voices", label: "Voices" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const { isLive, loading, currentAid, fetchAnime, setShowXmlModal, source } = useAnime();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const el = document.querySelector(href);
    const lenis = (window as unknown as { __lenis?: { scrollTo: (t: Element, o?: object) => void } }).__lenis;
    if (el && lenis) lenis.scrollTo(el, { offset: -72, duration: 1.6 });
    else el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.div
        className="fixed inset-x-0 top-0 z-[70] h-[2px] origin-left bg-gold"
        style={{ scaleX: progress }}
      />
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed inset-x-0 top-0 z-[60] transition-all duration-500 ${
          scrolled
            ? "border-b border-line-soft bg-abyss/80 backdrop-blur-md"
            : "border-b border-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-5 py-4 md:px-10">
          <a
            href="#top"
            onClick={(e) => go(e, "#top")}
            className="group flex items-center gap-3"
            data-hover
          >
            <Diamond className="h-2.5 w-2.5 text-gold transition-transform duration-500 group-hover:rotate-90" />
            <span className="font-mono text-[11px] tracking-[0.3em] text-ice">
              SNM<span className="text-gold">·</span>000{currentAid}
            </span>
            <span className="hidden font-mono text-[11px] tracking-[0.3em] text-smoke sm:inline">
              ABH IMPERIAL ARCHIVE
            </span>
          </a>

          <nav className="hidden items-center gap-7 lg:flex">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={(e) => go(e, l.href)}
                className="group relative font-mono text-[10px] tracking-[0.28em] text-mist transition-colors hover:text-ice"
              >
                {l.label.toUpperCase()}
                <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-gold transition-all duration-400 group-hover:w-full" />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.2em] text-smoke">
            {/* Live API indicator */}
            <div
              className={`hidden sm:flex items-center gap-2 border px-2.5 py-1 ${
                isLive
                  ? "border-gold/40 bg-gold/10 text-gold"
                  : "border-line-soft bg-void/50 text-smoke"
              }`}
              title={`Source: ${source}`}
            >
              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  loading
                    ? "bg-amber-400 animate-ping"
                    : isLive
                    ? "bg-gold shadow-[0_0_8px_rgba(200,162,75,0.8)]"
                    : "bg-smoke"
                }`}
              />
              <span>{loading ? "FETCHING..." : isLive ? "LIVE DATA" : "STANDBY"}</span>
            </div>

            {/* View XML modal trigger */}
            <button
              type="button"
              onClick={() => setShowXmlModal(true)}
              className="flex items-center gap-1.5 border border-line-soft px-2.5 py-1 text-mist transition-colors hover:border-gold hover:text-gold"
              title="Inspect raw AniDB XML response"
            >
              <Terminal className="h-3 w-3 text-gold" />
              <span className="hidden md:inline">VIEW XML</span>
            </button>

            {/* Refresh button */}
            <button
              type="button"
              onClick={() => fetchAnime(currentAid, true)}
              disabled={loading}
              className="flex h-7 w-7 items-center justify-center border border-line-soft text-mist transition-colors hover:border-gold hover:text-gold disabled:opacity-50"
              title="Refetch from AniDB HTTP API"
            >
              <RefreshCw className={`h-3 w-3 ${loading ? "animate-spin text-gold" : ""}`} />
            </button>

            <div className="flex items-center gap-1.5">
              <span className="hidden lg:inline text-smoke">AID</span>
              <span className="flex h-7 px-2 items-center justify-center border border-gold/50 text-gold font-bold">
                {currentAid}
              </span>
            </div>
          </div>
        </div>
      </motion.header>
    </>
  );
}
