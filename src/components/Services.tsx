import Reveal from "@/components/Reveal";
import { content } from "@/data/content";

/** Services — "ways in" numbered rows, each with a WhatsApp CTA. */
export default function Services() {
  return (
    <section id="services" className="relative px-5 py-28 sm:px-8 md:px-12 md:py-40 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <span className="eyebrow">Services — for clients</span>
        </Reveal>

        <div className="mt-10 flex flex-col">
          {content.services.map((service, i) => (
            <div key={service.title}>
              {i > 0 && <div className="hairline" aria-hidden="true" />}
              <Reveal y={36} delay={i * 0.05}>
                <a
                  href={content.socials.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group grid gap-4 py-8 sm:grid-cols-[3rem_1fr_auto] sm:items-center sm:gap-8 md:py-10"
                  data-cursor
                >
                  <span className="font-mono text-sm text-muted">
                    0{i + 1}
                  </span>
                  <div>
                    <h3 className="font-serif text-[clamp(1.5rem,3.2vw,2.4rem)] font-semibold tracking-tight text-ivory transition-colors duration-300 group-hover:text-amber">
                      {service.title}
                    </h3>
                    <p className="mt-2 max-w-2xl text-ivory/70">
                      {service.description}
                    </p>
                  </div>
                  <span className="justify-self-start font-mono text-[0.65rem] uppercase tracking-[0.22em] text-muted transition-colors group-hover:text-amber-glow sm:justify-self-end">
                    Start a build ↗
                  </span>
                </a>
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}