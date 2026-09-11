import { useEffect } from "react";
import Lenis from "lenis";
import Starfield from "./components/Starfield";
import Cursor from "./components/Cursor";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Ticker from "./components/Ticker";
import Transmission from "./components/Transmission";
import Verdict from "./components/Verdict";
import Personnel from "./components/Personnel";
import MissionLog from "./components/MissionLog";
import Spectrum from "./components/Spectrum";
import Allied from "./components/Allied";
import Voices from "./components/Voices";
import Lineage from "./components/Lineage";
import XmlViewerModal from "./components/XmlViewerModal";
import { AnimeProvider } from "./context/AnimeContext";

export default function App() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const lenis = new Lenis({
      duration: 1.15,
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.4,
    });
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;

    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      delete (window as unknown as { __lenis?: Lenis }).__lenis;
    };
  }, []);

  return (
    <AnimeProvider>
      <div className="grain relative min-h-svh bg-abyss text-ice">
        <Starfield />
        <Cursor />
        <Nav />

        <main className="relative z-10">
          <Hero />
          <Ticker />
          <Transmission />
          <Verdict />
          <div className="mx-auto max-w-[1600px] px-5 md:px-10">
            <div className="h-px w-full bg-gradient-to-r from-transparent via-gold/25 to-transparent" />
          </div>
          <Personnel />
          <MissionLog />
          <Ticker reverse />
          <Spectrum />
          <Allied />
          <Voices />
          <Lineage />
        </main>

        <XmlViewerModal />
      </div>
    </AnimeProvider>
  );
}
