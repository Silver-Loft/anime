import { useState, useTransition } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Copy, Check, Terminal, ExternalLink, RefreshCw } from "lucide-react";
import { useAnime } from "../context/AnimeContext";

export default function XmlViewerModal() {
  const { showXmlModal, setShowXmlModal, rawXml, currentAid, isLive, source, loading, fetchAnime } = useAnime();
  const [copied, setCopied] = useState(false);
  const [, startTransition] = useTransition();

  if (!showXmlModal) return null;

  const copyToClipboard = () => {
    if (!rawXml) return;
    navigator.clipboard.writeText(rawXml).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const directApiUrl = `http://api.anidb.net:9001/httpapi?request=anime&client=silverloft&clientver=1&protover=1&aid=${currentAid}`;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
        {/* backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setShowXmlModal(false)}
          className="absolute inset-0 bg-abyss/85 backdrop-blur-md"
        />

        {/* modal container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 16 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex max-h-[90vh] w-full max-w-5xl flex-col overflow-hidden border border-line-soft bg-void shadow-[0_0_80px_rgba(0,0,0,0.8)]"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-line-soft bg-hull/60 px-6 py-4">
            <div className="flex items-center gap-3">
              <Terminal className="h-4 w-4 text-gold" />
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs tracking-[0.25em] text-ice">
                    ANIDB HTTP API TRANSMISSION
                  </span>
                  <span
                    className={`px-2 py-0.5 font-mono text-[9px] tracking-wider uppercase ${
                      isLive
                        ? "border border-gold/40 bg-gold/10 text-gold"
                        : "border border-line-soft text-smoke"
                    }`}
                  >
                    {isLive ? `LIVE (${source})` : "FALLBACK"}
                  </span>
                </div>
                <div className="mt-0.5 font-mono text-[10px] text-smoke truncate max-w-lg">
                  {directApiUrl}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  startTransition(() => {
                    fetchAnime(currentAid, true);
                  });
                }}
                disabled={loading}
                className="flex items-center gap-2 border border-line-soft px-3 py-1.5 font-mono text-[10px] tracking-wider text-mist transition-colors hover:border-gold hover:text-gold disabled:opacity-50"
              >
                <RefreshCw className={`h-3 w-3 ${loading ? "animate-spin" : ""}`} />
                <span>REFRESH</span>
              </button>

              <button
                type="button"
                onClick={copyToClipboard}
                disabled={!rawXml}
                className="flex items-center gap-2 border border-line-soft px-3 py-1.5 font-mono text-[10px] tracking-wider text-mist transition-colors hover:border-gold hover:text-gold"
              >
                {copied ? <Check className="h-3 w-3 text-gold" /> : <Copy className="h-3 w-3" />}
                <span>{copied ? "COPIED" : "COPY XML"}</span>
              </button>

              <a
                href={directApiUrl}
                target="_blank"
                rel="noreferrer"
                className="hidden items-center gap-1 border border-line-soft px-3 py-1.5 font-mono text-[10px] tracking-wider text-smoke transition-colors hover:text-ice sm:flex"
              >
                <span>DIRECT</span>
                <ExternalLink className="h-3 w-3" />
              </a>

              <button
                type="button"
                onClick={() => setShowXmlModal(false)}
                className="p-1.5 text-smoke transition-colors hover:text-ice"
                aria-label="Close modal"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Body */}
          <div className="relative flex-1 overflow-auto p-6 font-mono text-[11px] leading-relaxed text-mist select-text">
            {rawXml ? (
              <pre className="whitespace-pre-wrap break-all font-mono text-xs text-ice/90">
                {rawXml}
              </pre>
            ) : (
              <div className="py-20 text-center text-smoke">
                {loading ? "Fetching real data from AniDB..." : "No XML transmission recorded yet."}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between border-t border-line-soft bg-hull/40 px-6 py-3 font-mono text-[10px] text-smoke">
            <span>CLIENT: silverloft · CLIENTVER: 1 · PROTOVER: 1 · AID: {currentAid}</span>
            <span>{rawXml ? `${(rawXml.length / 1024).toFixed(1)} KB TRANSMITTED` : "0 KB"}</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
