import DevelopPlate from "@/components/DevelopPlate";
import Reveal from "@/components/Reveal";
import SpecSheet from "@/components/SpecSheet";
import { content } from "@/data/content";

/**
 * Hero — full-viewport section matching the reference flow:
 *  1. The grain field develops a colour plate (built in code) out of the grain.
 *  2. Headline block + location.
 *  3. Decoding spec sheet at the base.
 */
export default function Hero() {
  const p = content.person;

  return (
    <section
      id="top"
      className="relative flex min-h-screen flex-col justify-between overflow-hidden px-5 pt-28 pb-10 sm:px-8 md:px-12 lg:px-16"
    >
      <div className="grid flex-1 items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-6">
        {/* Left: headline */}
        <div className="max-w-[760px]">
          <Reveal>
            <p className="eyebrow mb-6">Portfolio — {p.location}</p>
          </Reveal>
          <Reveal y={40}>
            <h1 className="font-serif text-[clamp(2.9rem,8vw,6.6rem)] font-semibold leading-[0.95] tracking-tight text-ivory">
              {p.headline.name}
            </h1>
          </Reveal>
          <Reveal y={30} delay={0.12}>
            <p className="mt-7 max-w-[520px] font-serif text-[clamp(1.15rem,2.3vw,1.6rem)] leading-snug text-ivory/90">
              {p.headline.tagline.map((seg, i) =>
                seg.accent ? (
                  <span key={i} className="font-medium italic text-amber">
                    {seg.text}
                  </span>
                ) : (
                  <span key={i}>{seg.text}</span>
                )
              )}
            </p>
          </Reveal>
          <Reveal delay={0.18}>
            <p className="mt-6 flex items-center gap-3 font-mono text-[0.7rem] uppercase tracking-[0.24em] text-muted">
              <span
                className="inline-block h-1.5 w-1.5 rounded-full bg-[#22c55e]"
                aria-hidden="true"
              />
              {content.availability.label}
            </p>
          </Reveal>
        </div>

        {/* Right: plate that develops out of grain */}
        <Reveal y={50} delay={0.05}>
          <div className="flex justify-center lg:justify-end">
            <DevelopPlate
              color="#b45309"
              glow="#0f766e"
              label="HASHIR"
              sublabel="Muscat · Oman"
              className="aspect-[4/5] w-full max-w-[420px]"
              scale={2}
            />
          </div>
        </Reveal>
      </div>

      {/* Base: decoding spec sheet */}
      <Reveal y={24} delay={0.05}>
        <div className="mt-10 max-w-[960px]">
          <SpecSheet />
        </div>
      </Reveal>

      <a
        href="#work"
        data-cursor
        className="mt-8 hidden items-center gap-2 self-start font-mono text-[0.65rem] uppercase tracking-[0.24em] text-muted transition-colors hover:text-amber-glow lg:flex"
      >
        Scroll to work
        <span aria-hidden="true" className="text-amber-glow">↓</span>
      </a>
    </section>
  );
}