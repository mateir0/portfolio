import Reveal from "@/components/Reveal";
import { content } from "@/data/content";

/** Lab — horizontal film-strip of smaller builds with mono captions. Items
 *  without a URL render a caption, never a link. */
export default function Lab() {
  return (
    <section id="lab" className="relative px-5 py-28 sm:px-8 md:px-12 md:py-40 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="flex items-baseline justify-between gap-6">
            <span className="eyebrow">Lab</span>
            <span className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-muted">
              Smaller builds
            </span>
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 [-webkit-overflow-scrolling:touch]">
            {content.lab.map((item, i) => (
              <article
                key={item.title}
                className="relative min-w-[250px] max-w-[290px] flex-1 snap-start overflow-hidden rounded-md border border-ivory/10"
                data-cursor
              >
                <div
                  className="aspect-[4/3] w-full"
                  style={{
                    background:
                      i % 2 === 0
                        ? "radial-gradient(90% 90% at 80% 20%, rgba(217,119,6,0.35), transparent 60%), linear-gradient(150deg, rgba(120,90,40,0.5), #060605 70%)"
                        : "radial-gradient(90% 90% at 20% 80%, rgba(15,118,110,0.35), transparent 60%), linear-gradient(150deg, rgba(40,90,90,0.5), #060605 70%)",
                  }}
                />
                <div className="p-5">
                  <span className="font-mono text-[0.6rem] text-muted">
                    0{i + 1} · lab
                  </span>
                  <h3 className="mt-2 font-serif text-lg font-semibold tracking-tight text-ivory">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-[0.8rem] text-ivory/65">{item.caption}</p>
                  {item.href ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-block font-mono text-[0.62rem] uppercase tracking-[0.2em] text-amber transition-colors hover:text-amber-glow"
                    >
                      Open ↗
                    </a>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}