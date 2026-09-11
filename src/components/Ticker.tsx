import { Diamond } from "./ui";
import { useAnime } from "../context/AnimeContext";

export default function Ticker({ reverse = false }: { reverse?: boolean }) {
  const { record } = useAnime();
  const items = [
    record.jaTitle,
    record.mainTitle.toUpperCase(),
    record.enTitle.toUpperCase(),
    "HUMANKIND EMPIRE ABH",
    "FRYBAREC GLOER GOR BARI",
    `${record.year} · ${record.episodeCount} EPISODES`,
    `STUDIO ${record.studio.toUpperCase()}`,
    "SPACE OPERA",
  ];
  const row = [...items, ...items];
  return (
    <div className="relative overflow-hidden border-y border-line-soft bg-void/60 py-4 backdrop-blur-sm">
      <div
        className="animate-marquee flex w-max items-center gap-10 whitespace-nowrap pr-10"
        style={reverse ? { animationDirection: "reverse" } : undefined}
      >
        {[0, 1].map((half) => (
          <div key={half} className="flex items-center gap-10" aria-hidden={half === 1}>
            {row.map((item, i) => (
              <span key={`${half}-${i}`} className="flex items-center gap-10">
                <span className={i % 2 === 0 ? "font-jp text-sm font-light tracking-[0.3em] text-mist" : "font-mono text-[10px] tracking-[0.4em] text-mist"}>
                  {item}
                </span>
                <Diamond className="h-2 w-2 text-gold/70" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
