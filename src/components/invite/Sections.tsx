import { useEffect, useState, type FormEvent } from "react";
import { invitationData as d } from "@/data/invitation";
import { Decor, Sparkle, art } from "./Decor";
import { Reveal } from "./Reveal";
import rabbit from "@/assets/rabbit.png";
import deer from "@/assets/deer.png";
import fox from "@/assets/fox.png";

/* ───────────────────────── Shared ───────────────────────── */

function Heading({ eyebrow, title, subtitle, script }: { eyebrow?: string; title: string; subtitle?: string; script?: boolean }) {
  return (
    <div className="text-center">
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      {script ? (
        <h2 className="font-script mt-3 text-[3rem] leading-[1.05] text-sage-deep sm:text-6xl">{title}</h2>
      ) : (
        <h2 className="mt-3 font-serif text-[2.1rem] font-light italic leading-tight text-bark sm:text-5xl">{title}</h2>
      )}
      {subtitle && <p className="mt-3 text-base italic text-muted-foreground sm:text-lg">{subtitle}</p>}
      <div className="gold-rule mt-5 text-xs">✦</div>
    </div>
  );
}

const Section = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <section className={`relative px-6 py-24 sm:py-32 ${className}`}>
    <div className="relative z-10 mx-auto w-full max-w-lg md:max-w-2xl">{children}</div>
  </section>
);

/* ───────────────────────── Story ───────────────────────── */

export function StorySection() {
  const [l1a, l1b] = d.messages.storyLineOne.split("\n");
  return (
    <Section className="pt-16">
      <Decor src={art.wildflowers} className="-left-24 -top-24 w-56 sm:w-72 md:-left-12 md:w-96" rotate={-8} opacity={0.9} />
      <Decor src={art.bird} className="-right-4 -top-12 w-24 sm:w-28 md:right-[6%] md:w-36" rotate={0} motion="float" flip />
      <Decor src={art.butterfly} className="right-[14%] bottom-6 w-10 md:right-[20%]" rotate={-20} motion="flutter" delay={1} />
      <Sparkle className="left-[18%] top-[35%]" delay={1.2} size={10} />
      <Sparkle className="right-[22%] top-[26%]" delay={0.3} />

      <Reveal className="text-center">
        <p className="font-script text-[2.4rem] leading-[1.15] text-blush-deep sm:text-5xl">{l1a}</p>
        <p className="mt-2 font-serif text-2xl font-light italic text-bark sm:text-3xl">{l1b}</p>
      </Reveal>
      <Reveal delay={200} className="mx-auto mt-10 max-w-sm text-center">
        <p className="text-lg leading-[1.85] text-foreground/90 sm:text-xl">{d.messages.storyLineTwo}</p>
      </Reveal>
      <Reveal delay={350} className="relative mx-auto mt-10 h-32 w-40">
        <Decor src={art.mushrooms} className="left-1/2 top-0 w-28 -translate-x-1/2" opacity={0.95} />
      </Reveal>
    </Section>
  );
}

/* ───────────────────────── Details ───────────────────────── */

export function DetailsSection() {
  return (
    <Section>
      <Decor src={art.eucalyptus} className="-right-28 -top-24 w-64 sm:w-80 md:-right-16 md:w-[26rem]" rotate={-150} motion="sway" opacity={0.85} />
      <Decor src={art.eucalyptus} className="-left-32 bottom-0 w-64 sm:w-80 md:-left-16 md:w-[26rem]" rotate={30} motion="sway" delay={3} opacity={0.85} />
      <Decor src={rabbit} className="-left-6 -bottom-14 w-40 sm:w-48 md:left-[2%] md:w-60" opacity={0.98} />

      <Reveal className="text-center">
        <p className="eyebrow">Baby Shower</p>
        <p className="mt-6 text-base italic text-muted-foreground">Celebrating</p>
        <p className="font-script mt-1 text-[3.6rem] leading-none text-sage-deep sm:text-7xl">{d.babyName}</p>
      </Reveal>

      <Reveal delay={150} className="mt-12 text-center">
        <div className="gold-rule text-xs">✦</div>
        <p className="mt-7 font-serif text-lg uppercase tracking-[0.35em] text-bark">{d.date.weekday}</p>
        <p className="mt-2 font-serif text-[2.2rem] font-light italic leading-none text-bark sm:text-5xl">{d.date.full}</p>
        <p className="mt-4 font-serif text-xl tracking-[0.2em] text-muted-foreground">{d.time}</p>
      </Reveal>

      <Reveal delay={250} className="mt-12 text-center">
        <div className="gold-rule text-xs">✦</div>
        <p className="mt-7 font-serif text-2xl font-medium text-bark sm:text-3xl">{d.venue.name}</p>
        <p className="mt-2 text-lg text-foreground/85">{d.venue.address}</p>
        <p className="text-lg text-foreground/85">{d.venue.city}</p>
        <a href={d.venue.mapUrl} target="_blank" rel="noreferrer" className="btn-outline-gold mt-8">
          View Location
        </a>
      </Reveal>
    </Section>
  );
}

/* ───────────────────────── Countdown ───────────────────────── */

function useCountdown(target: string) {
  const calc = () => {
    const diff = Math.max(0, new Date(target).getTime() - Date.now());
    return {
      days: Math.floor(diff / 86_400_000),
      hours: Math.floor((diff / 3_600_000) % 24),
      minutes: Math.floor((diff / 60_000) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  };
  const [t, setT] = useState<ReturnType<typeof calc> | null>(null);
  useEffect(() => {
    setT(calc());
    const id = setInterval(() => setT(calc()), 1000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target]);
  return t;
}

export function CountdownSection() {
  const t = useCountdown(d.eventDateTime);
  const pad = (n?: number) => (n === undefined ? "--" : String(n).padStart(2, "0"));
  const items = [
    ["Days", pad(t?.days)],
    ["Hours", pad(t?.hours)],
    ["Minutes", pad(t?.minutes)],
    ["Seconds", pad(t?.seconds)],
  ];
  return (
    <Section className="py-20">
      <Decor src={art.wildflowers} className="-right-20 -top-10 w-48 sm:w-60 md:right-[2%] md:w-72" rotate={20} motion="float-slow" opacity={0.9} />
      <Decor src={art.butterfly} className="left-[8%] -top-4 w-11 md:left-[16%]" rotate={12} motion="flutter" delay={0.8} />
      <Sparkle className="left-[12%] bottom-[30%]" delay={0.6} size={10} />
      <Sparkle className="right-[14%] bottom-[20%]" delay={1.9} />

      <Reveal className="text-center">
        <p className="eyebrow">Until we celebrate</p>
        <p className="font-script mt-3 text-4xl text-blush-deep">Counting the days</p>
      </Reveal>
      <Reveal delay={150} className="mt-10 grid grid-cols-4 gap-2 text-center sm:gap-6">
        {items.map(([label, value], i) => (
          <div key={label} className="relative">
            <span className="digit block" style={{ minWidth: "2ch" }}>{value}</span>
            <span className="mt-2 block text-[0.62rem] uppercase tracking-[0.3em] text-muted-foreground sm:text-xs">{label}</span>
            {i < items.length - 1 && (
              <span aria-hidden className="absolute -right-1 top-3 text-gold sm:-right-3 sm:top-4">
                ·
              </span>
            )}
          </div>
        ))}
      </Reveal>
    </Section>
  );
}

/* ───────────────────────── Photo Story ───────────────────────── */

export function PhotoStorySection() {
  const [p1, p2, p3] = d.photos;
  return (
    <Section>
      <Decor src={art.eucalyptus} className="-left-28 top-[30%] w-64 sm:w-80 md:-left-20 md:w-[26rem]" rotate={120} motion="sway" opacity={0.85} />
      <Decor src={art.wildflowers} className="-right-20 bottom-[26%] w-52 sm:w-64 md:-right-8 md:w-80" rotate={-10} motion="float-slow" delay={1.5} opacity={0.9} />
      <Decor src={art.butterfly} className="right-[12%] top-[30%] w-10 md:w-12" rotate={-8} motion="flutter" delay={0.6} />
      <Decor src={art.bird} className="left-[4%] bottom-4 w-20 md:w-28" motion="float" delay={1} />

      <Reveal>
        <Heading title={d.messages.photoTitle} subtitle={d.messages.photoSubtitle} />
      </Reveal>

      <div className="relative mt-14 flex flex-col gap-14 md:gap-20">
        {/* 1 — tall, torn paper, left */}
        <Reveal className="relative mr-auto w-[78%] max-w-xs md:w-[60%] md:max-w-sm" style={{ transform: "rotate(-2deg)" }}>
          <div className="torn-edge bg-paper p-3 shadow-paper">
            <img src={p1.src} alt={p1.alt} width={p1.width} height={p1.height} loading="lazy" className="aspect-[3/4] w-full object-cover" />
          </div>
          <p className="font-script mt-4 pl-3 text-3xl text-blush-deep">{p1.caption}</p>
        </Reveal>

        {/* 2 — polaroid, right, overlapping */}
        <Reveal delay={120} className="relative -mt-24 ml-auto w-[68%] max-w-[16rem] md:-mt-40 md:w-[48%] md:max-w-xs" style={{ transform: "rotate(3deg)" }}>
          <div className="bg-paper p-3 pb-12 shadow-paper paper-grain">
            <img src={p2.src} alt={p2.alt} width={p2.width} height={p2.height} loading="lazy" className="aspect-square w-full object-cover" />
            <p className="font-script absolute inset-x-0 bottom-3 text-center text-2xl text-bark">{p2.caption}</p>
          </div>
          <Sparkle className="-left-3 -top-3" delay={0.7} />
        </Reveal>

        {/* 3 — wide, watercolor border, center */}
        <Reveal delay={100} className="relative mx-auto w-[88%] max-w-sm md:max-w-md" style={{ transform: "rotate(-1deg)" }}>
          <div
            className="rounded-[45%_55%_50%_50%/6%_6%_6%_6%] p-3 shadow-paper"
            style={{ background: "linear-gradient(135deg, color-mix(in oklab, var(--eucalyptus) 65%, var(--paper)), color-mix(in oklab, var(--blush) 55%, var(--paper)))" }}
          >
            <img src={p3.src} alt={p3.alt} width={p3.width} height={p3.height} loading="lazy" className="aspect-[4/3] w-full rounded-[inherit] object-cover" />
          </div>
          <p className="font-script mt-4 text-center text-3xl text-sage-deep">{p3.caption}</p>
        </Reveal>
      </div>
    </Section>
  );
}

/* ───────────────────────── Traditions ───────────────────────── */

function TraditionIcon({ kind }: { kind: "star" | "moon" | "feather" }) {
  const common = "h-9 w-9 text-gold";
  if (kind === "star")
    return (
      <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1">
        <path d="M12 2c.6 6.5 3.5 9.4 10 10-6.5.6-9.4 3.5-10 10-.6-6.5-3.5-9.4-10-10 6.5-.6 9.4-3.5 10-10z" />
      </svg>
    );
  if (kind === "moon")
    return (
      <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1">
        <path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5z" />
        <path d="M17 3v3M15.5 4.5h3" strokeLinecap="round" />
      </svg>
    );
  return (
    <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1">
      <path d="M20 4c-6 0-11 4-13 11l-3 5 5-3c7-2 11-7 11-13z" />
      <path d="M7 15l7-7" strokeLinecap="round" />
    </svg>
  );
}

export function TraditionsSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const [sent, setSent] = useState<Record<number, boolean>>({});

  return (
    <Section>
      <Decor src={art.mushrooms} className="-right-6 -top-10 w-28 md:right-[4%] md:w-36" opacity={0.95} />
      <Decor src={art.eucalyptus} className="-left-32 -bottom-24 w-64 sm:w-80 md:-left-16 md:w-[26rem]" rotate={20} motion="sway" opacity={0.85} />
      <Decor src={fox} className="-right-10 -bottom-10 w-40 sm:w-48 md:right-[2%] md:w-56" opacity={0.98} />

      <Reveal>
        <Heading title={d.messages.traditionsTitle} subtitle={d.messages.traditionsSubtitle} script />
      </Reveal>

      <div className="mt-12 flex flex-col">
        {d.traditions.map((t, i) => {
          const isOpen = openIdx === i;
          return (
            <Reveal key={t.title} delay={i * 120} className="relative">
              {i > 0 && <div className="gold-rule mb-8 text-[0.6rem]">✦</div>}
              <button
                type="button"
                onClick={() => setOpenIdx(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="group flex w-full items-start gap-5 text-left"
              >
                <span className="mt-1 shrink-0 transition-transform duration-500 group-hover:rotate-12">
                  <TraditionIcon kind={t.icon} />
                </span>
                <span className="flex-1">
                  <span className="block font-serif text-2xl font-medium text-bark sm:text-3xl">{t.title}</span>
                  <span className="mt-1 block text-base italic leading-relaxed text-muted-foreground sm:text-lg">{t.text}</span>
                  <span className="mt-2 inline-block text-[0.68rem] uppercase tracking-[0.3em] text-sage-deep">
                    {isOpen ? "Close" : "Write yours"}
                  </span>
                </span>
              </button>
              <div
                className="grid transition-[grid-template-rows,opacity] duration-700 ease-out"
                style={{ gridTemplateRows: isOpen ? "1fr" : "0fr", opacity: isOpen ? 1 : 0 }}
              >
                <div className="overflow-hidden">
                  <form
                    className="mb-2 mt-5 pl-14"
                    onSubmit={(e) => {
                      e.preventDefault();
                      setSent((s) => ({ ...s, [i]: true }));
                    }}
                  >
                    {sent[i] ? (
                      <p className="font-script text-3xl text-blush-deep">Thank you, it's tucked into the story ✦</p>
                    ) : (
                      <>
                        <input className="input-stationery" placeholder="Your name" required />
                        <textarea className="input-stationery mt-3 min-h-[5rem] resize-none" placeholder="Write a few words…" required />
                        <button type="submit" className="btn-outline-gold mt-5 !min-h-[2.6rem] !px-6 !text-[0.7rem]">
                          Add to the story
                        </button>
                      </>
                    )}
                  </form>
                </div>
              </div>
              <div className="h-8" />
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}

/* ───────────────────────── Registry ───────────────────────── */

export function RegistrySection() {
  const [a, b] = d.messages.registryText.split("\n\n");
  return (
    <Section className="py-20">
      <Decor src={art.wildflowers} className="-left-16 -top-16 w-44 sm:w-56 md:left-[4%] md:w-64" rotate={14} motion="float-slow" opacity={0.9} />
      <Decor src={art.butterfly} className="right-[10%] -bottom-2 w-10" rotate={10} motion="flutter" delay={1.4} />
      <Sparkle className="right-[18%] top-[18%]" delay={0.5} />

      <Reveal>
        <Heading title={d.messages.registryTitle} />
      </Reveal>
      <Reveal delay={150} className="mx-auto mt-8 max-w-sm text-center">
        <p className="font-serif text-2xl font-light italic text-bark">{a}</p>
        <p className="mt-5 text-base leading-relaxed text-foreground/85 sm:text-lg">{b}</p>
      </Reveal>
      <Reveal delay={250} className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
        {d.registryLinks.map((r) => (
          <a key={r.label} href={r.url} target="_blank" rel="noreferrer" className={r.primary ? "btn-stationery w-full sm:w-auto" : "btn-outline-gold w-full sm:w-auto"}>
            {r.label}
          </a>
        ))}
      </Reveal>
    </Section>
  );
}

/* ───────────────────────── RSVP ───────────────────────── */

export function RsvpSection() {
  const [attending, setAttending] = useState<"yes" | "no" | null>(null);
  const [sent, setSent] = useState(false);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <Section>
      <Decor src={art.eucalyptus} className="-right-28 -top-16 w-64 sm:w-80 md:-right-16 md:w-[26rem]" rotate={-160} motion="sway" opacity={0.85} />
      <Decor src={art.wildflowers} className="-left-24 bottom-10 w-56 sm:w-72 md:-left-10 md:w-80" rotate={-6} motion="float-slow" opacity={0.9} />
      <Decor src={art.bird} className="right-[6%] -bottom-6 w-20 md:w-28" flip motion="float" delay={2} />
      <Sparkle className="left-[16%] top-[14%]" delay={1.1} />
      <Sparkle className="right-[22%] bottom-[24%]" delay={0.2} size={10} />

      <Reveal>
        <Heading title={d.messages.rsvpTitle} subtitle={d.messages.rsvpText} />
      </Reveal>

      <Reveal delay={150} className="relative mx-auto mt-12 max-w-md">
        <div className="relative rounded-[2px] bg-paper/80 px-7 py-10 shadow-paper backdrop-blur-sm paper-grain sm:px-10">
          <div className="pointer-events-none absolute inset-2 border border-gold/40" />
          {sent ? (
            <div className="relative py-6 text-center">
              <p className="font-script text-5xl text-sage-deep">Thank you</p>
              <p className="mt-4 text-lg italic text-muted-foreground">Your reply has been tucked safely into our story.</p>
            </div>
          ) : (
            <form onSubmit={submit} className="relative flex flex-col gap-7">
              <label className="block">
                <span className="eyebrow !text-[0.62rem]">Your Name</span>
                <input className="input-stationery mt-1" placeholder="Write your name" required />
              </label>

              <fieldset>
                <legend className="eyebrow !text-[0.62rem]">Will you be joining us?</legend>
                <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:gap-6">
                  {[
                    ["yes", "Happily, yes!"],
                    ["no", "Sending love from afar"],
                  ].map(([val, label]) => (
                    <label key={val} className="flex cursor-pointer items-center gap-3 text-lg">
                      <input type="radio" name="attending" value={val} required className="peer sr-only" onChange={() => setAttending(val as "yes" | "no")} />
                      <span className="flex h-5 w-5 items-center justify-center rounded-full border border-gold transition-colors peer-checked:bg-gold">
                        <span className={`h-2 w-2 rounded-full bg-paper transition-opacity ${attending === val ? "opacity-100" : "opacity-0"}`} />
                      </span>
                      <span className={`italic transition-colors ${attending === val ? "text-bark" : "text-muted-foreground"}`}>{label}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <label className="block">
                <span className="eyebrow !text-[0.62rem]">Number of Guests</span>
                <select className="input-stationery mt-1 appearance-none bg-transparent" defaultValue="1">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block">
                <span className="eyebrow !text-[0.62rem]">Message for the Parents</span>
                <textarea className="input-stationery mt-1 min-h-[5.5rem] resize-none" placeholder="A few kind words…" />
              </label>

              <button type="submit" className="btn-stationery mt-2 w-full">
                Send RSVP
              </button>
            </form>
          )}
        </div>
        <Decor src={art.butterfly} className="-right-5 -top-6 w-14" rotate={22} motion="flutter" />
      </Reveal>
    </Section>
  );
}

/* ───────────────────────── Closing ───────────────────────── */

export function ClosingSection() {
  const lines = d.messages.closingQuote.split("\n");
  return (
    <Section className="pb-32 pt-28">
      <Decor src={art.eucalyptus} className="-left-28 -top-10 w-64 sm:w-80 md:-left-16 md:w-[26rem]" rotate={150} motion="sway" opacity={0.85} />
      <Decor src={art.wildflowers} className="-right-16 top-[38%] w-48 sm:w-60 md:right-[2%] md:w-72" rotate={16} motion="float-slow" opacity={0.9} />
      <Decor src={art.butterfly} className="left-[14%] top-[36%] w-10" rotate={-16} motion="flutter" delay={0.5} />
      <Sparkle className="right-[20%] top-[8%]" delay={0.8} />
      <Sparkle className="left-[24%] top-[14%]" delay={2} size={10} />

      <Reveal className="text-center">
        <p className="font-serif text-[1.9rem] font-light italic leading-[1.3] text-bark sm:text-4xl">
          {lines.map((l, i) => (
            <span key={i} className="block">
              {l}
            </span>
          ))}
        </p>
      </Reveal>

      <Reveal delay={150} className="relative mx-auto mt-12 w-[min(80vw,22rem)]">
        <img src={deer} alt="A watercolor baby deer resting among wildflowers" width={1200} height={1024} loading="lazy" className="relative z-10 w-full" />
        <Decor src={art.wildflowers} className="-left-10 bottom-0 w-32 sm:w-40" rotate={-10} opacity={0.95} />
        <Decor src={art.mushrooms} className="-right-4 bottom-2 w-20 sm:w-24" opacity={0.95} />
      </Reveal>

      <Reveal delay={250} className="mt-12 text-center">
        <p className="text-lg italic text-muted-foreground sm:text-xl">{d.messages.closingLine}</p>
        <p className="font-script mt-4 text-[3.2rem] leading-none text-sage-deep sm:text-6xl">{d.parents}</p>
        <div className="gold-rule mt-8 text-xs">✦</div>
      </Reveal>
    </Section>
  );
}
