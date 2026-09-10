import { useRef, useState, type CSSProperties } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";
import { FadeIn } from "../components/FadeIn";
import { LiveProjectButton } from "../components/LiveProjectButton";
import { ProjectVideo } from "../components/ProjectVideo";
import { useProjects } from "../lib/projects";
import type { Project } from "../data/projects";

const INITIAL_PROJECT_COUNT = 3;

function ProjectCard({ project, index, total, onOpen }: {
  project: Project;
  index: number;
  total: number;
  onOpen: (project: Project) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "start start"],
  });

  const targetScale = 1 - (total - 1 - index) * 0.025;
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);
  const stackStyle = { "--stack-offset": `${index * 24}px` } as CSSProperties;
  const gallery = project.gallery?.length ? project.gallery : [project.cover_image];

  // Branding projects contain both identity pages and real-world mockups.
  // Show a representative mix on the card so the mockups are visible,
  // while the modal still contains the complete gallery.
  const isBranding = project.category.toLowerCase().includes("branding");
  const previewGallery = isBranding && gallery.length > 4
    ? [gallery[0], gallery[1], gallery[gallery.length - 2], gallery[gallery.length - 1]]
    : gallery;

  return (
    <div
      ref={containerRef}
      style={stackStyle}
      className="sticky top-[calc(4.5rem_+_var(--stack-offset))] mb-6 h-[72vh] min-h-[520px] sm:top-[calc(5.5rem_+_var(--stack-offset))] sm:mb-8 sm:h-[76vh] sm:min-h-[560px] md:top-[calc(7rem_+_var(--stack-offset))]"
    >
      <motion.div
        style={{ scale: reduce ? 1 : scale }}
        className="flex h-full flex-col overflow-hidden rounded-[28px] border border-[#D7E2EA]/20 bg-[#0A0A0A] p-4 shadow-[0_20px_80px_rgba(0,0,0,0.35)] transition-colors duration-300 hover:border-[#D7E2EA]/35 sm:rounded-[44px] sm:p-7 md:rounded-[52px] md:p-8"
      >
        <div className="flex flex-wrap items-start justify-between gap-3 pb-4 sm:items-center sm:gap-5 sm:pb-6 md:pb-8">
          <div className="flex min-w-0 flex-1 items-center gap-3 sm:gap-5 md:gap-7">
            <span className="shrink-0 font-black leading-[0.8] text-[#E8E8E8]" style={{ fontSize: "clamp(3.25rem, 9vw, 130px)" }}>
              {project.number}
            </span>
            <div className="min-w-0">
              <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#D7E2EA]/45 sm:text-xs">
                {project.category}
              </p>
              <h3 className="max-w-[46vw] truncate text-lg font-semibold uppercase tracking-tight text-[#D7E2EA] sm:max-w-[55vw] sm:text-3xl md:text-4xl">
                {project.name}
              </h3>
            </div>
          </div>

          <div className="flex w-full gap-2 sm:w-auto">
            {project.live_url ? <LiveProjectButton href={project.live_url} /> : null}
            <button
              type="button"
              onClick={() => onOpen(project)}
              className="relative z-[100] inline-flex shrink-0 items-center justify-center whitespace-nowrap rounded-full border-2 border-[#D7E2EA] bg-[#D7E2EA] px-8 py-3.5 text-xs font-black uppercase tracking-[0.2em] text-[#08090A] opacity-100 shadow-[0_8px_30px_rgba(0,0,0,0.35)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:border-white hover:shadow-[0_12px_36px_rgba(215,226,234,0.18)] sm:px-10 sm:py-4 sm:text-sm"
            >
              View Project
            </button>
          </div>
        </div>

        <button type="button" onClick={() => onOpen(project)} className="group min-h-0 flex-1 text-left" aria-label={`Open ${project.name}`}>
          {previewGallery.length >= 4 ? (
            <div className="grid h-full min-h-0 grid-cols-2 gap-2 sm:gap-3 md:gap-4">
              {previewGallery.slice(0, 4).map((image, previewIndex) => (
                <GalleryImage
                  key={`${project.id}-preview-${previewIndex}`}
                  src={image}
                  alt={`${project.name} preview ${previewIndex + 1}`}
                  contain={isBranding}
                />
              ))}
            </div>
          ) : previewGallery.length >= 3 ? (
            <div className="grid h-full min-h-0 grid-cols-[40%_60%] gap-2 sm:gap-3 md:gap-4">
              <div className="grid min-h-0 grid-rows-[38%_62%] gap-2 sm:gap-3 md:gap-4">
                <GalleryImage src={previewGallery[0]} alt={`${project.name} preview 1`} />
                <GalleryImage src={previewGallery[1]} alt={`${project.name} preview 2`} />
              </div>
              <GalleryImage src={previewGallery[2]} alt={`${project.name} preview 3`} large />
            </div>
          ) : previewGallery.length === 2 ? (
            <div className="grid h-full min-h-0 grid-cols-2 gap-2 sm:gap-3 md:gap-4">
              <GalleryImage src={previewGallery[0]} alt={`${project.name} preview 1`} />
              <GalleryImage src={previewGallery[1]} alt={`${project.name} preview 2`} />
            </div>
          ) : (
            <GalleryImage src={previewGallery[0]} alt={`${project.name} preview`} large contain />
          )}
        </button>
      </motion.div>
    </div>
  );
}

function GalleryImage({ src, alt, large = false, contain = false }: {
  src: string;
  alt: string;
  large?: boolean;
  contain?: boolean;
}) {
  return (
    <div className="relative min-h-0 overflow-hidden rounded-[18px] bg-[#111214] sm:rounded-[34px] md:rounded-[42px]">
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className={`h-full w-full transition duration-700 ease-out group-hover:scale-[1.025] ${contain ? "object-contain bg-white" : "object-cover"}`}
      />
      {large ? <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent" /> : null}
    </div>
  );
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto bg-[#0C0C0C]/95 p-3 backdrop-blur-md sm:p-8" role="dialog" aria-modal="true">
      <div className="mx-auto max-w-6xl rounded-[28px] border border-[#D7E2EA]/20 bg-[#101012] p-4 sm:rounded-[50px] sm:p-8">
        <div className="mb-6 flex items-start justify-between gap-6">
          <div>
            <p className="mb-2 text-xs uppercase tracking-[0.3em] text-[#D7E2EA]/50">{project.category}</p>
            <h3 className="max-w-[75vw] text-2xl font-black uppercase leading-tight text-[#D7E2EA] sm:text-5xl">{project.name}</h3>
          </div>
          <button type="button" onClick={onClose} aria-label="Close project" className="rounded-full border border-[#D7E2EA]/30 p-3 text-[#D7E2EA] transition hover:bg-white/10">
            <X size={20} />
          </button>
        </div>

        {project.description ? (
          <p className="mb-8 max-w-3xl text-base leading-relaxed text-[#D7E2EA]/65 sm:text-lg">{project.description}</p>
        ) : null}

        <div className="grid gap-4 md:grid-cols-2">
          {(project.gallery?.length ? project.gallery : [project.cover_image]).map((image, index) => (
            <img key={`${project.id}-gallery-${index}`} src={image} alt={`${project.name} ${index + 1}`} className="w-full rounded-[30px] bg-white object-contain" />
          ))}
          {project.hero_image ? <img src={project.hero_image} alt="" className="w-full rounded-[30px] object-cover md:col-span-2" /> : null}
          {project.video_url ? (
            <ProjectVideo videoUrl={project.video_url} posterUrl={project.video_poster} title={project.name} className="aspect-video w-full rounded-[30px] md:col-span-2" />
          ) : null}
        </div>
      </div>
    </div>
  );
}

function EmptyState({ loading, error }: { loading: boolean; error: string }) {
  return (
    <FadeIn>
      <div className="mx-auto max-w-lg rounded-[40px] border border-dashed border-[#D7E2EA]/25 px-8 py-16 text-center sm:rounded-[50px]">
        <p className="text-[#D7E2EA]/80">
          {loading ? "Loading your work…" : error ? "Projects could not be loaded." : "Your projects will show up here once you publish them."}
        </p>
        <p className="mt-3 text-xs uppercase tracking-widest text-[#D7E2EA]/40">{error || "Add project assets to src/assets/projects/."}</p>
      </div>
    </FadeIn>
  );
}

export function ProjectsSection() {
  const { projects, loading, error } = useProjects();
  const [selected, setSelected] = useState<Project | null>(null);

  const graphicProjects = projects.filter((project) => {
    const category = project.category.toLowerCase();
    return (
      category.includes("graphic design") ||
      (!category.includes("ui/ux") &&
        !category.includes("ui ux") &&
        !category.includes("branding"))
    );
  });

  const brandingProjects = projects.filter((project) => {
    const category = project.category.toLowerCase();
    return category.includes("branding");
  });

  const uiuxProjects = projects.filter((project) => {
    const category = project.category.toLowerCase();
    return category.includes("ui/ux") || category.includes("ui ux");
  });

  return (
    <>
      <section
        id="work"
        className="relative z-10 -mt-10 rounded-t-[40px] bg-[#0C0C0C] px-5 pb-24 pt-20 sm:-mt-12 sm:rounded-t-[50px] sm:px-8 md:-mt-14 md:rounded-t-[60px] md:px-10"
      >
        <FadeIn>
          <div className="mb-14 text-center sm:mb-20 md:mb-24">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-[#D7E2EA]/40 sm:text-sm">
              Selected Work
            </p>
            <h2
              className="hero-heading font-black uppercase leading-none tracking-tight"
              style={{ fontSize: "clamp(3rem, 8vw, 105px)" }}
            >
              Projects
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-[#D7E2EA]/45 sm:text-base">
              A selection of work across graphic design, UI/UX and creative production.
            </p>
          </div>
        </FadeIn>

        <div className="mx-auto max-w-6xl">
          {loading || error ? (
            <EmptyState loading={loading} error={error} />
          ) : (
            <>
              <ProjectCategoryBlock
                projects={graphicProjects}
                title="Graphic Design"
                subtitle="POSTERS · CAMPAIGNS · VISUAL DESIGN"
                onOpen={setSelected}
                largeTitle
              />

              {brandingProjects.length > 0 ? (
                <div className="mt-24 sm:mt-32">
                  <ProjectCategoryBlock
                    projects={brandingProjects}
                    title="Branding"
                    subtitle="IDENTITY · VISUAL SYSTEMS · BRAND APPLICATIONS"
                    onOpen={setSelected}
                    largeTitle
                  />
                </div>
              ) : null}
            </>
          )}
        </div>
      </section>

      {/* UI/UX projects */}
      {!loading && !error && uiuxProjects.length > 0 ? (
        <section
          id="uiux-projects"
          className="relative z-10 bg-[#0C0C0C] px-5 pb-28 pt-8 sm:px-8 md:px-10 md:pt-12"
        >
          <div className="mx-auto max-w-6xl">
            <FadeIn>
              <div className="mb-12 border-t border-[#D7E2EA]/10 pt-12 sm:mb-16 sm:pt-16">
                <p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-[#D7E2EA]/40 sm:text-sm">
                  Interface & Experience
                </p>
                <h2
                  className="hero-heading font-black uppercase leading-none tracking-tight"
                  style={{ fontSize: "clamp(2.75rem, 6.5vw, 82px)" }}
                >
                  UI/UX
                </h2>
                <p className="mt-5 max-w-xl text-sm leading-relaxed text-[#D7E2EA]/45 sm:text-base">
                  Product interfaces, app concepts and user-focused digital experiences.
                </p>
              </div>
            </FadeIn>

            <ProjectCategoryBlock
              projects={uiuxProjects}
              title="UI/UX"
              subtitle="PRODUCT · APP · INTERFACE DESIGN"
              onOpen={setSelected}
              hideHeader
            />
          </div>
        </section>
      ) : null}

      {selected ? <ProjectModal project={selected} onClose={() => setSelected(null)} /> : null}
    </>
  );
}

function ProjectCategoryBlock({
  projects,
  title,
  subtitle,
  onOpen,
  largeTitle = false,
  hideHeader = false,
}: {
  projects: Project[];
  title: string;
  subtitle: string;
  onOpen: (project: Project) => void;
  largeTitle?: boolean;
  hideHeader?: boolean;
}) {
  const [showAll, setShowAll] = useState(false);
  const visibleProjects = showAll ? projects : projects.slice(0, INITIAL_PROJECT_COUNT);
  const hasMoreProjects = projects.length > INITIAL_PROJECT_COUNT;

  if (projects.length === 0) {
    return null;
  }

  return (
    <div>
      {!hideHeader ? (
      <FadeIn>
        <div className="mb-8 flex items-end justify-between gap-6 border-b border-[#D7E2EA]/10 pb-5 sm:mb-10">
          <div>
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#D7E2EA]/35 sm:text-xs">
              {subtitle}
            </p>
            {largeTitle ? (
              <h3
                className="hero-heading font-black uppercase leading-none tracking-tight"
                style={{ fontSize: "clamp(2.75rem, 6.5vw, 82px)" }}
              >
                {title}
              </h3>
            ) : (
              <h3 className="text-2xl font-black uppercase tracking-tight text-[#D7E2EA] sm:text-4xl">
                {title}
              </h3>
            )}
          </div>
          <span className="hidden text-xs uppercase tracking-[0.2em] text-[#D7E2EA]/30 sm:block">
            {projects.length} {projects.length === 1 ? "Project" : "Projects"}
          </span>
        </div>
      </FadeIn>
      ) : null}

      <div className="relative z-0 pb-10">
        {visibleProjects.map((project, i) => (
          <ProjectCard
            key={project.id}
            project={{
              ...project,
              // Numbering restarts from 01 for every category.
              number: String(i + 1).padStart(2, "0"),
            }}
            index={i}
            total={visibleProjects.length}
            onOpen={onOpen}
          />
        ))}
      </div>

      {hasMoreProjects ? (
        <div className="relative z-[100] flex justify-center pt-2 sm:pt-4">
          <button
  type="button"
  onClick={() => setShowAll((current) => !current)}
  className="relative z-[101] inline-flex items-center gap-4 rounded-full border-2 border-[#D7E2EA] bg-[#D7E2EA] px-8 py-4 text-xs font-bold uppercase tracking-[0.25em] text-[#08090A] shadow-[0_15px_50px_rgba(0,0,0,0.25)] transition-all duration-300 hover:-translate-y-1 hover:border-white hover:bg-white sm:px-10 sm:py-5 sm:text-sm"
>
  {showAll ? "Show Less" : `Show More — ${projects.length - INITIAL_PROJECT_COUNT} More`}
  <span className="text-lg transition-transform duration-300">
    {showAll ? "↑" : "↓"}
  </span>
</button>
        </div>
      ) : null}
    </div>
  );
}
