import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Play, Film, ExternalLink, Tv } from "lucide-react";
import { useAnime } from "../context/AnimeContext";

interface VideoPlayerModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialEpisodeNo?: number;
}

const CRUNCHYROLL_SERIES_URL = "https://www.crunchyroll.com/series/GVDHX8QXW/crest-of-the-stars";

// Official/community trailer and prologue embeds for Crest of the Stars
const VIDEO_STREAMS: Record<number, { title: string; embedUrl: string; note: string }> = {
  0: {
    title: "Crest of the Stars — Official Trailer & Prologue",
    embedUrl: "https://www.youtube-nocookie.com/embed/gU9yN5iJ0xU?autoplay=1",
    note: "Promotional trailer and opening sequence by Studio Sunrise (1999).",
  },
  1: {
    title: "Sortie 01 — Invasion (侵略)",
    embedUrl: "https://www.youtube-nocookie.com/embed/gU9yN5iJ0xU?autoplay=1",
    note: "The Abh fleet arrives at planet Martine without firing a single shot.",
  },
};

export default function VideoPlayerModal({ isOpen, onClose, initialEpisodeNo = 0 }: VideoPlayerModalProps) {
  const { episodes, record } = useAnime();
  const [selectedEp, setSelectedEp] = useState<number>(initialEpisodeNo);

  useEffect(() => {
    if (isOpen) {
      setSelectedEp(initialEpisodeNo);
    }
  }, [initialEpisodeNo, isOpen]);

  if (!isOpen) return null;

  const currentVideo = VIDEO_STREAMS[selectedEp] || {
    title: `Sortie ${String(selectedEp).padStart(2, "0")} — ${episodes.find((e) => e.no === selectedEp)?.en || "Episode"}`,
    embedUrl: `https://www.youtube-nocookie.com/embed/gU9yN5iJ0xU?autoplay=1`,
    note: "Official preview stream. Full episodes stream licensed on Crunchyroll & RetroCrush.",
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 md:p-8">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-abyss/90 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden border border-line-soft bg-void shadow-[0_0_100px_rgba(200,162,75,0.15)]"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-line-soft bg-hull/80 px-6 py-4">
            <div className="flex items-center gap-3">
              <Film className="h-4 w-4 text-gold" />
              <div>
                <span className="font-mono text-xs tracking-[0.25em] text-ice uppercase">
                  ABH HOLOGRAM THEATRE · {record.mainTitle.toUpperCase()}
                </span>
                <div className="font-mono text-[10px] text-smoke">
                  {currentVideo.title}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <a
                href={CRUNCHYROLL_SERIES_URL}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 border border-gold/40 bg-gold/10 px-3 py-1.5 font-mono text-[10px] tracking-wider text-gold transition-colors hover:bg-gold hover:text-abyss"
              >
                <Tv className="h-3 w-3" />
                <span>STREAM FULL ANIME</span>
                <ExternalLink className="h-3 w-3" />
              </a>

              <button
                type="button"
                onClick={onClose}
                className="p-1.5 text-smoke transition-colors hover:text-ice"
                aria-label="Close video player"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Video Container */}
          <div className="relative aspect-video w-full bg-black">
            <iframe
              src={currentVideo.embedUrl}
              title={currentVideo.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="h-full w-full border-0"
            />
          </div>

          {/* Bottom Info & Episode Selector Strip */}
          <div className="flex flex-col gap-4 border-t border-line-soft bg-hull/60 p-6 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="font-display text-xl font-medium text-ice">
                {currentVideo.title}
              </div>
              <p className="mt-1 font-mono text-[11px] text-mist max-w-xl">
                {currentVideo.note}
              </p>
              <p className="mt-2 font-mono text-[9px] tracking-wider text-smoke">
                * Note: AniDB API provides metadata, ratings &amp; schedules. Actual video streaming requires licensed providers (Crunchyroll / RetroCrush).
              </p>
            </div>

            {/* Quick episode selectors */}
            <div className="flex flex-wrap items-center gap-1.5 font-mono text-[9px]">
              <button
                type="button"
                onClick={() => setSelectedEp(0)}
                className={`flex items-center gap-1 border px-2.5 py-1.5 transition-colors ${
                  selectedEp === 0
                    ? "border-gold bg-gold text-abyss"
                    : "border-line-soft text-smoke hover:border-gold hover:text-ice"
                }`}
              >
                <Play className="h-2.5 w-2.5" />
                TRAILER
              </button>
              {episodes.map((ep) => (
                <button
                  key={ep.no}
                  type="button"
                  onClick={() => setSelectedEp(ep.no)}
                  className={`border px-2 py-1.5 transition-colors ${
                    selectedEp === ep.no
                      ? "border-gold bg-gold text-abyss font-bold"
                      : "border-line-soft text-smoke hover:border-gold hover:text-ice"
                  }`}
                >
                  E{String(ep.no).padStart(2, "0")}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
