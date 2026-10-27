import Reveal from "@/components/Reveal";
import { content } from "@/data/content";

/** Contact — email develops out of a grain block on hover; buttons for
 *  WhatsApp / GitHub / LinkedIn. No form (buttons only). */
export default function Contact() {
  const s = content.socials;

  const links = [
    { label: "WhatsApp", href: s.whatsapp, hrefLabel: "wa.me/96877361999" },
    { label: "GitHub", href: s.github, hrefLabel: "github.com/mateir0" },
    { label: "LinkedIn", href: s.linkedin, hrefLabel: "in/muhammad-hashir" },
  ];

  return (
    <section id="contact" className="relative px-5 py-28 sm:px-8 md:px-12 md:py-44 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <span className="eyebrow">Contact</span>
        </Reveal>

        <Reveal y={40}>
          <div className="mt-10 max-w-4xl">
            <p className="font-serif text-[clamp(1.4rem,3.4vw,2.8rem)] font-medium leading-tight tracking-tight text-ivory">
              Start a build, or bring a role. Replies within the day.
            </p>

            {/* Email develops out of grain on hover */}
            <a
              href={`mailto:${s.email}`}
              data-cursor
              className="group relative mt-10 block w-fit overflow-hidden"
            >
              <span className="relative z-10 block font-mono text-[clamp(0.9rem,2vw,1.25rem)] tracking-tight text-ivory">
                {s.email}
              </span>
              <span
                aria-hidden="true"
                className="absolute inset-0 z-20 translate-y-0 bg-void transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-[110%]"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 50% 120%, rgba(217,119,6,0.5), transparent 60%)",
                }}
              />
              <span
                aria-hidden="true"
                className="mt-2 block h-px w-full origin-left scale-x-100 bg-amber"
              />
            </a>
          </div>
        </Reveal>

        {/* CTA buttons */}
        <div className="mt-14 grid gap-4 sm:grid-cols-3">
          {links.map((link, i) => (
            <Reveal key={link.label} delay={i * 0.06}>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor
                className="group flex flex-col justify-between gap-6 border border-ivory/12 p-6 transition-colors duration-300 hover:border-amber/60"
              >
                <span className="font-mono text-[0.6rem] uppercase tracking-[0.22em] text-muted">
                  0{i + 1}
                </span>
                <span className="font-serif text-2xl font-semibold tracking-tight text-ivory transition-colors group-hover:text-amber">
                  {link.label}
                </span>
                <span className="font-mono text-[0.65rem] text-muted">
                  {link.hrefLabel}
                </span>
              </a>
            </Reveal>
          ))}
        </div>

        {/* Contact sheet strip (fidelity to the reference film strip) */}
        <Reveal delay={0.1}>
          <div className="mt-16 flex gap-10 overflow-x-auto pb-4 sm:gap-16">
            {content.contactSheet.map((frame) => (
              <div key={frame.frame} className="shrink-0">
                <span className="font-mono text-[0.6rem] text-muted">
                  {frame.frame} · {frame.code}
                </span>
                <p className="mt-2 font-serif text-xl font-semibold tracking-tight text-ivory/90">
                  {frame.title}
                </p>
                <span className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-amber">
                  {frame.note}
                </span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}