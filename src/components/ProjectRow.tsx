import DevelopPlate from "@/components/DevelopPlate";
import type { CSSProperties } from "react";
import type { Project } from "@/data/content";

function statusColor(status: string): string {
  if (/LIVE/i.test(status)) return "#22c55e";
  if (/DEVELOPMENT|DEV/i.test(status)) return "#ef4444";
  if (/BUILDING/i.test(status)) return "#f5b942";
  return "#a8a29e";
}

/**
 * One project row. Its cover develops out of grain at the cursor (the plate
 * behind the text is a real canvas mask). Titles tint to the project colour.
 * Rows without a public URL render a disabled label, never a link.
 */
export default function ProjectRow({ project }: { project: Project }) {
  const isLink = Boolean(project.href);

  return (
    <div
      className="group relative overflow-hidden"
      data-cursor
      style={{ ["--rc"]: project.color } as CSSProperties}
    >
      {/* Cover that develops out of grain. */}
      <DevelopPlate
        color={project.color}
        glow={project.color}
        label={project.initial}
        sublabel={project.year}
        className="absolute inset-0"
      />

      <div className="relative z-10 px-4 py-12 sm:px-6 md:px-10 md:py-16">
        <div className="grid gap-5 md:grid-cols-[3rem_1fr_auto] md:gap-8">
          <span className="hidden font-mono text-sm text-muted md:block">
            {project.index}
          </span>

          <div>
            <div className="flex flex-wrap items-center gap-3">
              <span
                className="inline-flex items-center gap-2 rounded-full border border-ivory/15 px-3 py-1 font-mono text-[0.6rem] uppercase tracking-[0.2em]"
                style={{ color: statusColor(project.status) }}
              >
                <span
                  className="inline-block h-1.5 w-1.5 rounded-full"
                  style={{ backgroundColor: statusColor(project.status) }}
                  aria-hidden="true"
                />
                {project.status}
              </span>
              {isLink && project.href ? (
                <a
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted transition-colors hover:text-amber-glow"
                >
                  Open project ↗
                </a>
              ) : project.disabledLabel ? (
                <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted/70">
                  {project.disabledLabel}
                </span>
              ) : null}
            </div>

            <h3 className="mt-6 font-serif text-[clamp(1.9rem,5vw,3.6rem)] font-semibold leading-[1.02] tracking-tight text-ivory transition-colors duration-500 group-hover:text-[var(--rc)]">
              {project.title}
            </h3>

            <p className="mt-5 max-w-[560px] font-sans text-base leading-relaxed text-ivory/80">
              {project.description}
            </p>
          </div>

          <div className="flex items-end md:flex-col md:items-end md:justify-between">
            <span className="self-start font-mono text-[0.7rem] text-muted md:self-auto">
              {project.year}
            </span>
            <span className="hidden font-mono text-[0.7rem] text-muted md:block">
              {project.stack}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}