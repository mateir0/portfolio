import ProjectRow from "@/components/ProjectRow";
import Reveal from "@/components/Reveal";
import { content } from "@/data/content";

/** Selected-work index — large numbered rows whose cover plates develop their
 *  project colour out of grain at the cursor. */
export default function WorkIndex() {
  return (
    <section id="work" className="relative px-5 py-10 sm:px-8 md:px-12 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="flex items-baseline justify-between gap-6">
            <span className="eyebrow">Selected work</span>
            <span className="font-mono text-[0.65rem] uppercase tracking-[0.24em] text-muted">
              2026 — {content.projects.length} builds
            </span>
          </div>
        </Reveal>

        <div className="mt-8 flex flex-col">
          {content.projects.map((project, i) => (
            <div key={project.index}>
              {i > 0 && <div className="hairline" aria-hidden="true" />}
              <Reveal y={44} delay={i * 0.04}>
                <ProjectRow project={project} />
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}