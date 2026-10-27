import Reveal from "@/components/Reveal";
import { content } from "@/data/content";

/** About — short positioning statement + location. */
export default function About() {
  return (
    <section id="about" className="relative px-5 py-28 sm:px-8 md:px-12 md:py-40 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <span className="eyebrow">About</span>
        <Reveal y={40}>
          <p className="mt-6 max-w-4xl font-mono text-[0.7rem] uppercase tracking-[0.22em] text-muted">
            {content.aboutLocation}
          </p>
        </Reveal>
        <Reveal y={40} delay={0.08}>
          <p className="mt-10 max-w-3xl font-serif text-[clamp(1.6rem,3.6vw,2.9rem)] font-medium leading-[1.2] tracking-tight text-ivory">
            {content.about}
          </p>
        </Reveal>
        <div className="hairline mt-16 max-w-4xl" />
      </div>
    </section>
  );
}