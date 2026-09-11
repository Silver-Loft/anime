import { Mic2, Venus, Mars, Cat } from "lucide-react";
import type { Character } from "../data/anime";
import { Reveal, SectionHead } from "./ui";
import { useAnime } from "../context/AnimeContext";

function Rating({ value, votes, large = false }: { value: number; votes: number; large?: boolean }) {
  return (
    <div className="tabular">
      <span className={`font-display font-light text-ice ${large ? "text-5xl" : "text-3xl"}`}>
        {value.toFixed(2)}
      </span>
      <span className="ml-2 font-mono text-[9px] tracking-[0.2em] text-smoke">
        / {votes.toLocaleString()} VOTES
      </span>
    </div>
  );
}

function GenderMark({ gender, type }: { gender: string; type: string }) {
  if (type !== "Character") return null;
  if (gender === "female") return <Venus className="h-3.5 w-3.5 text-lapis-soft" strokeWidth={1.5} />;
  if (gender === "male") return <Mars className="h-3.5 w-3.5 text-lapis-soft" strokeWidth={1.5} />;
  return null;
}

function FeaturedCard({ c, delay }: { c: Character; delay: number }) {
  return (
    <Reveal delay={delay} className="group relative overflow-hidden border border-line-soft bg-void">
      <div className="relative aspect-[4/5] overflow-hidden md:aspect-[3/4]">
        <img
          src={c.image}
          alt={c.name}
          className="h-full w-full object-cover object-top transition-transform duration-[1800ms] ease-out group-hover:scale-108"
          style={{ filter: "saturate(0.92)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-abyss via-abyss/25 to-transparent" />
        <div className="absolute left-0 top-0 m-5 flex items-center gap-2 border border-gold/40 bg-abyss/60 px-3 py-1.5 font-mono text-[9px] tracking-[0.3em] text-gold backdrop-blur-sm">
          <span className="h-1 w-1 rounded-full bg-gold" />
          MAIN CAST
        </div>
        {c.baronh && (
          <div className="vertical-rl absolute right-5 top-5 hidden h-56 items-start font-jp text-[10px] tracking-[0.3em] text-ice/50 lg:flex">
            {c.baronh}
          </div>
        )}
      </div>

      <div className="relative p-7 md:p-9">
        <div className="flex items-start justify-between gap-6">
          <div>
            <h3 className="font-display text-4xl font-medium leading-none text-ice md:text-5xl">{c.name}</h3>
            {c.baronh && (
              <div className="mt-3 font-mono text-[9px] leading-relaxed tracking-[0.22em] text-smoke">
                {c.baronh}
              </div>
            )}
          </div>
          <Rating value={c.rating} votes={c.votes} large />
        </div>

        <p className="mt-6 text-sm font-light leading-relaxed text-mist">{c.blurb}</p>

        {c.seiyuu && (
          <div className="mt-7 flex items-center gap-3 border-t border-line-soft pt-5 font-mono text-[10px] tracking-[0.25em] text-smoke">
            <Mic2 className="h-3.5 w-3.5 text-gold" strokeWidth={1.5} />
            VOICE — <span className="text-ice/80">{c.seiyuu.toUpperCase()}</span>
          </div>
        )}
      </div>
    </Reveal>
  );
}

function CastCard({ c, delay }: { c: Character; delay: number }) {
  const initials = c.name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("");
  return (
    <Reveal delay={delay} className="group relative flex flex-col border border-line-soft bg-void/60 transition-colors duration-500 hover:border-gold/30 hover:bg-hull">
      {c.image ? (
        <div className="relative aspect-[16/10] overflow-hidden">
          <img
            src={c.image}
            alt={c.name}
            className="h-full w-full object-cover object-top transition-transform duration-[1600ms] ease-out group-hover:scale-108"
            style={{ filter: "saturate(0.9)" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-void via-transparent to-transparent" />
        </div>
      ) : (
        <div className="relative flex aspect-[16/10] items-center justify-center overflow-hidden bg-gradient-to-br from-deck via-void to-abyss">
          <span className="font-display text-6xl font-light text-lapis-soft/25 transition-colors duration-700 group-hover:text-gold/40">
            {initials}
          </span>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(79,111,216,0.12),transparent_60%)]" />
        </div>
      )}

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center justify-between font-mono text-[9px] tracking-[0.3em]">
          <span className={c.role === "SECONDARY" ? "text-lapis-soft" : "text-smoke"}>{c.role}</span>
          <span className="flex items-center gap-1.5 text-smoke">
            {c.type === "Character" ? <GenderMark gender={c.gender} type={c.type} /> : <Cat className="h-3.5 w-3.5 text-gold" strokeWidth={1.5} />}
            ID {c.id}
          </span>
        </div>

        <h4 className="mt-3 font-display text-2xl font-medium leading-tight text-ice">{c.name}</h4>
        <p className="mt-3 flex-1 text-[13px] font-light leading-relaxed text-mist line-clamp-4">{c.blurb}</p>

        <div className="mt-5 border-t border-line-soft pt-4">
          <div className="flex items-end justify-between">
            <Rating value={c.rating} votes={c.votes} />
          </div>
          <div className="mt-3 h-px w-full bg-line">
            <div className="h-px bg-gold/70" style={{ width: `${(c.rating / 10) * 100}%` }} />
          </div>
          {c.seiyuu && (
            <div className="mt-4 flex items-center gap-2 font-mono text-[9px] tracking-[0.2em] text-smoke">
              <Mic2 className="h-3 w-3 text-gold/80" strokeWidth={1.5} />
              {c.seiyuu.toUpperCase()}
            </div>
          )}
        </div>
      </div>
    </Reveal>
  );
}

export default function Personnel() {
  const { characters, registry } = useAnime();
  const featured = characters.filter((c) => c.role === "MAIN");
  const cast = characters.filter((c) => c.role !== "MAIN");

  return (
    <section id="personnel" className="relative mx-auto max-w-[1600px] px-5 py-28 md:px-10 md:py-40">
      <SectionHead
        index="03"
        code="PERSONNEL DOSSIER"
        accent={`${characters.length} ENTRIES`}
        title={
          <>
            The princess <em className="font-light italic text-lapis-soft">&amp;</em> the nobleman
          </>
        }
      />

      <div className="grid gap-6 lg:grid-cols-2">
        {featured.map((c, i) => (
          <FeaturedCard key={c.id} c={c} delay={i * 0.12} />
        ))}
      </div>

      <Reveal delay={0.1}>
        <div className="mt-24 mb-10 flex items-center gap-4">
          <span className="font-mono text-[10px] tracking-[0.35em] text-gold">SUPPORTING CAST</span>
          <span className="h-px flex-1 bg-line" />
          <span className="font-mono text-[10px] tracking-[0.25em] text-smoke">RANKED BY OBSERVER SCORE</span>
        </div>
      </Reveal>

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {cast.map((c, i) => (
          <CastCard key={c.id} c={c} delay={(i % 4) * 0.08} />
        ))}
      </div>

      {/* fleet & holdings registry */}
      <Reveal delay={0.1}>
        <div className="mt-24 mb-10 flex items-center gap-4">
          <span className="font-mono text-[10px] tracking-[0.35em] text-gold">FLEET &amp; HOLDINGS REGISTRY</span>
          <span className="h-px flex-1 bg-line" />
        </div>
      </Reveal>

      <div className="grid gap-px border border-line-soft bg-line-soft md:grid-cols-2 xl:grid-cols-4">
        {registry.map((r, i) => (
          <Reveal key={r.name} delay={i * 0.06} className="group bg-void p-7 transition-colors duration-500 hover:bg-hull">
            <div className="flex items-center justify-between font-mono text-[9px] tracking-[0.3em] text-gold-dim">
              {r.kind}
              <span className="text-smoke tabular">{r.rating.toFixed(2)}</span>
            </div>
            <div className="mt-4 font-display text-2xl font-medium text-ice">{r.name}</div>
            <p className="mt-3 text-[13px] font-light leading-relaxed text-mist">{r.note}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
