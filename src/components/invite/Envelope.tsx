import { useState } from "react";
import { invitationData as d } from "@/data/invitation";
import { Decor, Sparkle, art } from "./Decor";

interface EnvelopeHeroProps {
  onOpened: () => void;
}

export function EnvelopeHero({ onOpened }: EnvelopeHeroProps) {
  const [opening, setOpening] = useState(false);
  const [done, setDone] = useState(false);

  const open = () => {
    if (opening) return;
    setOpening(true);
    window.setTimeout(() => {
      setDone(true);
      onOpened();
    }, 1500);
  };

  return (
    <section className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-6 pb-16 pt-20 text-center">
      {/* Botanicals framing the envelope */}
      <Decor src={art.eucalyptus} className="-left-24 -top-10 w-64 sm:w-80 md:-left-16 md:w-[26rem]" rotate={160} motion="sway" opacity={0.9} />
      <Decor src={art.eucalyptus} className="-bottom-16 -right-28 w-72 sm:w-96 md:-right-20 md:w-[30rem]" rotate={-12} motion="sway" delay={2} opacity={0.9} />
      <Decor src={art.wildflowers} className="-right-16 top-8 w-44 sm:w-56 md:right-[8%] md:w-72" rotate={12} motion="float-slow" opacity={0.95} />
      <Decor src={art.wildflowers} className="-left-14 bottom-24 w-40 sm:w-52 md:left-[6%] md:w-64" rotate={-18} motion="float-slow" delay={3} opacity={0.95} />
      <Decor src={art.butterfly} className="left-[12%] top-[16%] w-12 md:left-[24%] md:w-16" rotate={-14} motion="flutter" />
      <Decor src={art.butterfly} className="bottom-[22%] right-[10%] w-9 md:right-[26%] md:w-12" rotate={18} motion="flutter" delay={2.5} opacity={0.85} />
      <Sparkle className="left-[22%] top-[28%]" delay={0.4} />
      <Sparkle className="right-[20%] top-[22%]" delay={1.6} size={10} />
      <Sparkle className="left-[30%] bottom-[18%]" delay={2.4} size={10} />
      <Sparkle className="right-[30%] bottom-[30%]" delay={0.9} />

      <div className="relative z-10 flex w-full max-w-md flex-col items-center">
        <p className="eyebrow animate-fade-up">{d.messages.heroKicker}</p>
        <h1
          className="mt-4 animate-fade-up text-balance font-serif text-[2rem] font-light italic leading-[1.15] tracking-wide text-bark sm:text-[2.5rem]"
          style={{ animationDelay: "150ms" }}
        >
          {d.messages.heroTitle}
        </h1>
        <p className="font-script mt-3 animate-fade-up text-[2.6rem] leading-none text-sage-deep sm:text-5xl" style={{ animationDelay: "300ms" }}>
          {d.parents}
        </p>

        {/* Envelope */}
        <div
          className={`relative mt-10 w-[min(84vw,22rem)] transition-all duration-1000 ease-out ${done ? "scale-95 opacity-80" : ""}`}
          style={{ perspective: "1400px" }}
        >
          <div className="relative aspect-[3/2] w-full preserve-3d">
            {/* Back panel */}
            <div className="absolute inset-0 rounded-[6px] bg-envelope-inner shadow-paper" />

            {/* Letter rising out */}
            <div
              className={`absolute inset-x-[7%] top-[6%] flex h-[84%] flex-col items-center justify-center rounded-[4px] bg-paper px-5 text-center shadow-soft paper-grain transition-transform duration-[1300ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                opening ? "-translate-y-[62%]" : ""
              }`}
              style={{ transitionDelay: opening ? "550ms" : "0ms", zIndex: opening ? 20 : 5 }}
            >
              <span className="eyebrow !text-[0.58rem] !tracking-[0.4em]">Baby Shower</span>
              <span className="font-script mt-1 text-[2rem] leading-none text-blush-deep">{d.babyName}</span>
              <span className="mt-1 text-[0.7rem] uppercase tracking-[0.3em] text-muted-foreground">{d.date.full}</span>
            </div>

            {/* Front pockets: left, right, bottom */}
            <div
              className="absolute inset-0 rounded-[6px] bg-envelope"
              style={{ clipPath: "polygon(0 0, 50% 55%, 0 100%)", zIndex: 10 }}
            />
            <div
              className="absolute inset-0 rounded-[6px] bg-envelope"
              style={{ clipPath: "polygon(100% 0, 50% 55%, 100% 100%)", zIndex: 10 }}
            />
            <div
              className="absolute inset-0 rounded-[6px]"
              style={{
                clipPath: "polygon(0 100%, 50% 52%, 100% 100%)",
                zIndex: 11,
                background: "linear-gradient(180deg, var(--envelope-flap), var(--envelope))",
                boxShadow: "inset 0 1px 0 color-mix(in oklab, var(--paper) 60%, transparent)",
              }}
            />

            {/* Top flap */}
            <div
              className="absolute inset-x-0 top-0 h-[56%] origin-top transition-transform duration-[1200ms] ease-[cubic-bezier(0.4,0,0.2,1)]"
              style={{
                clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                background: "linear-gradient(180deg, var(--envelope-flap), color-mix(in oklab, var(--envelope-flap) 85%, var(--bark)))",
                transform: opening ? "rotateX(-178deg)" : "rotateX(0deg)",
                zIndex: opening ? 4 : 15,
                transitionProperty: "transform, z-index",
                transitionDelay: opening ? "0ms, 600ms" : "0ms, 0ms",
              }}
            />

            {/* Wax seal */}
            <button
              type="button"
              onClick={open}
              aria-label={d.messages.openButton}
              className={`absolute left-1/2 top-[52%] z-30 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full transition-all duration-700 ${
                opening ? "scale-50 opacity-0" : "hover:scale-105"
              }`}
              style={{
                background: "radial-gradient(circle at 35% 30%, color-mix(in oklab, var(--gold) 80%, white), var(--gold) 55%, color-mix(in oklab, var(--gold) 75%, var(--bark)))",
                boxShadow: "0 6px 16px -6px color-mix(in oklab, var(--bark) 60%, transparent)",
              }}
            >
              <span className="font-script text-2xl leading-none text-paper drop-shadow-sm">{d.babyName.split(" ").map((w) => w[0]).join("")}</span>
            </button>
          </div>
        </div>

        <button
          type="button"
          onClick={open}
          className={`btn-stationery mt-12 transition-opacity duration-700 ${opening ? "pointer-events-none opacity-0" : ""}`}
        >
          {d.messages.openButton}
        </button>
        <p
          className={`mt-6 text-sm italic text-muted-foreground transition-opacity duration-1000 ${done ? "opacity-100" : "opacity-0"}`}
        >
          Scroll to read on ↓
        </p>
      </div>
    </section>
  );
}
