import { content } from "@/data/content";

/** Footer — giant HASHIR wordmark sinking into amber/teal grain. */
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden px-5 pt-24 pb-8 sm:px-8 md:px-12 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <span className="eyebrow">End of the log</span>
          <a
            href="#top"
            data-cursor
            className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-muted transition-colors hover:text-amber-glow"
          >
            Back to top ↑
          </a>
        </div>
      </div>

      <div
        className="relative mt-16 select-none overflow-hidden"
        aria-hidden="true"
        style={{
          background: [
            "radial-gradient(120% 140% at 15% 0%, rgba(217,119,6,0.5), transparent 55%)",
            "radial-gradient(120% 140% at 90% 100%, rgba(15,118,110,0.5), transparent 55%)",
            "#060605",
          ].join(", "),
        }}
      >
        <p className="bg-clip-text bg-gradient-to-b from-ivory/90 to-ivory/0 text-center font-serif text-[clamp(4.5rem,22vw,20rem)] font-semibold leading-none tracking-tight">
          HASHIR
        </p>
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, transparent 40%, rgba(6,6,5,0.7) 72%, #060605 96%)",
          }}
        />
      </div>

      <div className="relative">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 border-t border-ivory/10 pt-6 font-mono text-[0.65rem] text-muted sm:flex-row sm:items-center sm:justify-between">
          <span>
            Designed &amp; built by {content.person.name} · © {year}
          </span>
          <span className="uppercase tracking-[0.2em]">Muscat, Oman</span>
        </div>
      </div>
    </footer>
  );
}