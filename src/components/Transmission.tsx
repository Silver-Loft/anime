import { motion } from "framer-motion";
import { BookOpen, Building2, OctagonX, Flag } from "lucide-react";
import { Reveal, SectionHead, Diamond } from "./ui";
import { useAnime } from "../context/AnimeContext";

const FACTS = [
  { icon: BookOpen, k: "SOURCE", v: "Novel series by Morioka Hiroyuki" },
  { icon: Building2, k: "STUDIO", v: "Sunrise — seikai production" },
  { icon: OctagonX, k: "SHOTS FIRED", v: "Zero. The empire arrived by decree" },
  { icon: Flag, k: "ANNEXED WORLD", v: "Martine, Hyde stellar system" },
];

export default function Transmission() {
  const { record } = useAnime();
  return (
    <section id="transmission" className="relative mx-auto max-w-[1600px] px-5 py-28 md:px-10 md:py-40">
      <SectionHead
        index="01"
        code="INCOMING TRANSMISSION"
        title={
          <>
            A world surrendered. <br />
            <em className="font-light italic text-lapis-soft">A boy, conscripted into the sky.</em>
          </>
        }
      />

      <div className="grid gap-16 lg:grid-cols-12">
        {/* sticky rail */}
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <Reveal>
              <p className="font-jp text-lg font-light leading-loose tracking-[0.2em] text-mist">
                人類放送圏――
                <br />
                星を継ぐ者たちの記録。
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="mt-10 border-l border-gold/30 pl-6 font-mono text-[10px] leading-relaxed tracking-[0.25em] text-smoke">
                SUBJECT — THE HUMANKIND
                <br />
                EMPIRE OF ABH
                <br />
                <span className="text-gold-dim">FRYBAREC GLOER GOR BARI</span>
                <br />
                <br />
                CLEARANCE — OPEN
                <br />
                RESTRICTED — FALSE
              </div>
            </Reveal>

            <Reveal delay={0.16}>
              <div className="mt-12 grid grid-cols-1 gap-px border border-line-soft bg-line-soft sm:grid-cols-2 lg:grid-cols-1">
                {FACTS.map((f) => (
                  <div key={f.k} className="group flex items-start gap-4 bg-void p-5 transition-colors duration-500 hover:bg-hull">
                    <f.icon className="mt-0.5 h-4 w-4 shrink-0 text-gold" strokeWidth={1.5} />
                    <div>
                      <div className="font-mono text-[9px] tracking-[0.3em] text-smoke">{f.k}</div>
                      <div className="mt-1.5 text-[13px] leading-snug text-ice/90">{f.v}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>

        {/* body copy */}
        <div className="lg:col-span-8">
          <Reveal>
            <p className="max-w-3xl font-display text-[clamp(1.7rem,3.4vw,3rem)] font-light leading-[1.25] text-ice">
              {record.basedOn}. {record.description}
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-8 max-w-2xl text-lg font-light leading-relaxed text-mist">
              {record.description2}
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mt-12 flex flex-wrap items-center gap-6 font-mono text-[10px] tracking-[0.3em] text-smoke">
              <span className="flex items-center gap-2">
                <Diamond className="h-2 w-2 text-gold" /> {record.episodeCount} EPISODES × 25 MIN
              </span>
              <span className="flex items-center gap-2">
                <Diamond className="h-2 w-2 text-gold" /> FINALE — 40 MIN
              </span>
              <span className="flex items-center gap-2">
                <Diamond className="h-2 w-2 text-gold" /> WINTER {record.year} SEASON
              </span>
            </div>
          </Reveal>

          {/* theatre panels */}
          <div className="mt-20 grid gap-6 md:grid-cols-2">
            <Reveal className="group relative overflow-hidden border border-line-soft">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src="images/planet-martine.jpg"
                  alt="Planet Martine from orbit"
                  className="h-full w-full object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-abyss via-abyss/20 to-transparent" />
                <motion.div
                  initial={{ scaleX: 1 }}
                  whileInView={{ scaleX: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0 origin-right bg-abyss"
                />
              </div>
              <div className="absolute bottom-0 left-0 p-6">
                <div className="font-mono text-[9px] tracking-[0.35em] text-gold">THEATRE I — HYDE SYSTEM</div>
                <div className="mt-2 font-display text-3xl font-medium text-ice">Martine</div>
                <p className="mt-2 max-w-sm text-[13px] leading-relaxed text-mist">
                  Jinto's homeworld — annexed into the Empire without a single shot. A quiet planet that traded sovereignty for a title.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.12} className="group relative overflow-hidden border border-line-soft md:mt-16">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src="images/ship-gosroth.jpg"
                  alt="The patrol ship Gosroth in deep space"
                  className="h-full w-full object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-abyss via-abyss/20 to-transparent" />
                <motion.div
                  initial={{ scaleX: 1 }}
                  whileInView={{ scaleX: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0 origin-right bg-abyss"
                />
              </div>
              <div className="absolute bottom-0 left-0 p-6">
                <div className="font-mono text-[9px] tracking-[0.35em] text-gold">THEATRE II — PATROL SHIP</div>
                <div className="mt-2 font-display text-3xl font-medium text-ice">Gosroth</div>
                <p className="mt-2 max-w-sm text-[13px] leading-relaxed text-mist">
                  The Resii Gothroth. Princess Lafiel's first posting — and the first Abh ship lost to the coming war.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
