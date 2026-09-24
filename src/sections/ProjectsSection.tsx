import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Play, X } from "lucide-react";

import { FadeIn } from "../components/FadeIn";
import { LiveProjectButton } from "../components/LiveProjectButton";
import { ProjectVideo } from "../components/ProjectVideo";
import { useProjects } from "../lib/projects";
import type { Project } from "../data/projects";
import { CATEGORIES } from "../data/projects";

/* -------------------------------------------------------------------------- */
/* Video assets                                                               */
/* -------------------------------------------------------------------------- */

import reel1 from "../assets/videos/Instagram Reel 1.mp4";
import reel2 from "../assets/videos/Instagram Reel 2.mp4";
import reel3 from "../assets/videos/Instagram Reel 3.mp4";

import podcast1 from "../assets/videos/podcast 1.mp4";
import podcast2 from "../assets/videos/podcast 2.mp4";
import podcast3 from "../assets/videos/podcast 3.mp4";
import podcast4 from "../assets/videos/podcast 4.mp4";
import podcast5 from "../assets/videos/podcast 5.mp4";

/* -------------------------------------------------------------------------- */
/* Types                                                                     */
/* -------------------------------------------------------------------------- */

type VideoItem = {
  src: string;
  label: string;
  title: string;
  vertical?: boolean;
};

/* -------------------------------------------------------------------------- */
/* Video data                                                                 */
/* -------------------------------------------------------------------------- */

const VIDEOS: VideoItem[] = [
  {
    src: reel1,
    label: "Instagram Reel",
    title: "Reel 01",
    vertical: true,
  },
  {
    src: reel2,
    label: "Instagram Reel",
    title: "Reel 02",
    vertical: true,
  },
  {
    src: reel3,
    label: "Instagram Reel",
    title: "Reel 03",
    vertical: true,
  },
  {
    src: podcast1,
    label: "Podcast Edit",
    title: "Podcast 01",
  },
  {
    src: podcast2,
    label: "Podcast Edit",
    title: "Podcast 02",
  },
  {
    src: podcast3,
    label: "Podcast Edit",
    title: "Podcast 03",
  },
  {
    src: podcast4,
    label: "Podcast Edit",
    title: "Podcast 04",
  },
  {
    src: podcast5,
    label: "Podcast Edit",
    title: "Podcast 05",
  },
];

const VIDEO_COUNT = VIDEOS.length;

const INITIAL_PROJECT_COUNT = 6;

/* -------------------------------------------------------------------------- */
/* Project gallery card                                                       */
/* -------------------------------------------------------------------------- */

function ProjectGalleryCard({
  project,
  index,
  onOpen,
}: {
  project: Project;
  index: number;
  onOpen: (project: Project) => void;
}) {
  const gallery = project.gallery?.length
    ? project.gallery
    : [project.cover_image];

  const isBranding = project.category
    .toLowerCase()
    .includes("branding");

  const preview =
    isBranding && gallery.length > 1
      ? [gallery[0], gallery[gallery.length - 1]]
      : gallery.slice(0, 2);

  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{
        duration: 0.65,
        delay: Math.min(index * 0.06, 0.3),
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative overflow-hidden rounded-[26px] border border-[#D7E2EA]/12 bg-[#101012] shadow-[0_18px_60px_rgba(0,0,0,0.22)] transition-all duration-500 hover:-translate-y-1 hover:border-[#D7E2EA]/30 sm:rounded-[32px]"
    >
      <button
        type="button"
        onClick={() => onOpen(project)}
        className="block w-full text-left"
        aria-label={`Open ${project.name}`}
      >
        <div className="relative aspect-[4/3] overflow-hidden bg-[#151618]">
          {/* -------------------------------------------------------------- */}
          {/* Artwork                                                        */}
          {/* -------------------------------------------------------------- */}

          {preview.length > 1 ? (
            <div className="grid h-full grid-cols-2 gap-px">
              {preview.map((image, imageIndex) => (
                <div
                  key={`${project.id}-${imageIndex}`}
                  className="min-w-0 overflow-hidden bg-white"
                >
                  <img
                    src={image}
                    alt={`${project.name} preview ${imageIndex + 1}`}
                    loading="lazy"
                    className="h-full w-full object-contain transition duration-700 ease-out group-hover:scale-[1.025]"
                  />
                </div>
              ))}
            </div>
          ) : (
            <img
              src={preview[0]}
              alt={`${project.name} preview`}
              loading="lazy"
              className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.035]"
            />
          )}

          {/* -------------------------------------------------------------- */}
          {/* Subtle cinematic gradient                                      */}
          {/* -------------------------------------------------------------- */}

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/5 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-95" />

          {/* -------------------------------------------------------------- */}
          {/* Top project number                                             */}
          {/* -------------------------------------------------------------- */}

          <div className="pointer-events-none absolute left-4 top-4 sm:left-5 sm:top-5">
            <span className="rounded-full border border-white/15 bg-black/25 px-3 py-1.5 text-[8px] font-medium uppercase tracking-[0.25em] text-white/65 backdrop-blur-md sm:text-[9px]">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>

          {/* -------------------------------------------------------------- */}
          {/* Arrow                                                          */}
          {/* -------------------------------------------------------------- */}

          <span className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full border border-white/15 bg-black/25 text-white/70 opacity-0 backdrop-blur-md transition-all duration-300 group-hover:opacity-100 sm:right-5 sm:top-5 sm:h-10 sm:w-10">
            <ArrowUpRight size={16} strokeWidth={1.8} />
          </span>

          {/* -------------------------------------------------------------- */}
          {/* Premium information panel                                     */}
          {/* -------------------------------------------------------------- */}

          <div className="absolute inset-x-3 bottom-3 sm:inset-x-4 sm:bottom-4">
  <div className="flex items-center justify-between gap-3 rounded-full border border-white/10 bg-[#08090A]/55 px-4 py-2.5 shadow-[0_8px_30px_rgba(0,0,0,0.25)] backdrop-blur-md transition-all duration-500 group-hover:border-white/20 group-hover:bg-[#08090A]/70 sm:px-5 sm:py-3">
    
    <div className="min-w-0">
      <p className="mb-0.5 truncate text-[7px] font-medium uppercase tracking-[0.28em] text-[#D7E2EA]/45 sm:text-[8px]">
        {project.category}
      </p>

      <h4 className="truncate text-sm font-semibold uppercase tracking-[-0.01em] text-[#E2E8ED] transition-colors duration-300 group-hover:text-white sm:text-base">
        {project.name}
      </h4>
    </div>

    <span className="flex shrink-0 items-center gap-1.5 text-[7px] font-semibold uppercase tracking-[0.2em] text-[#D7E2EA]/40 transition-colors duration-300 group-hover:text-[#D7E2EA]/75 sm:text-[8px]">
      View
      <ArrowUpRight
        size={12}
        strokeWidth={1.7}
        className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      />
    </span>

  </div>
</div>
        </div>
      </button>

      {/* Live project link */}
      {project.live_url ? (
        <div className="absolute right-4 top-[4.25rem] z-20">
          <LiveProjectButton href={project.live_url} />
        </div>
      ) : null}
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/* Video card                                                                 */
/* -------------------------------------------------------------------------- */

function VideoGalleryCard({
  video,
  index,
  onOpen,
}: {
  video: VideoItem;
  index: number;
  onOpen: (video: VideoItem) => void;
}) {
  return (
    <motion.button
      type="button"
      onClick={() => onOpen(video)}
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.65,
        delay: Math.min(index * 0.05, 0.3),
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`group relative overflow-hidden rounded-[26px] border border-[#D7E2EA]/15 bg-[#111214] text-left shadow-[0_18px_60px_rgba(0,0,0,0.25)] transition-all duration-500 hover:-translate-y-1 hover:border-[#D7E2EA]/30 sm:rounded-[32px] ${
        video.vertical ? "aspect-[9/14]" : "aspect-video"
      }`}
      aria-label={`Open ${video.title}`}
    >
      {/* -------------------------------------------------------------- */}
      {/* Video                                                          */}
      {/* -------------------------------------------------------------- */}

      <video
        src={video.src}
        muted
        loop
        autoPlay
        playsInline
        preload="metadata"
        className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.035]"
      />

      {/* -------------------------------------------------------------- */}
      {/* Subtle cinematic gradient                                      */}
      {/* -------------------------------------------------------------- */}

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-90" />

      {/* -------------------------------------------------------------- */}
      {/* Play button                                                     */}
      {/* -------------------------------------------------------------- */}

      <span className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full border border-white/15 bg-black/25 text-white/75 backdrop-blur-md transition-all duration-300 group-hover:bg-[#D7E2EA] group-hover:text-[#08090A] sm:right-5 sm:top-5 sm:h-10 sm:w-10">
        <Play size={14} fill="currentColor" />
      </span>

      {/* -------------------------------------------------------------- */}
      {/* Small premium video caption                                    */}
      {/* -------------------------------------------------------------- */}

      <div className="absolute inset-x-3 bottom-3 sm:inset-x-4 sm:bottom-4">
        <div className="flex items-center justify-between gap-3 rounded-full border border-white/10 bg-[#08090A]/55 px-4 py-2.5 shadow-[0_8px_30px_rgba(0,0,0,0.25)] backdrop-blur-md transition-all duration-500 group-hover:border-white/20 group-hover:bg-[#08090A]/70 sm:px-5 sm:py-3">
          
          <div className="min-w-0">
            <p className="mb-0.5 truncate text-[7px] font-medium uppercase tracking-[0.28em] text-[#D7E2EA]/45 sm:text-[8px]">
              {video.label}
            </p>

            <h4 className="truncate text-sm font-semibold uppercase tracking-[-0.01em] text-[#E2E8ED] transition-colors duration-300 group-hover:text-white sm:text-base">
              {video.title}
            </h4>
          </div>

          <span className="flex shrink-0 items-center gap-1.5 text-[7px] font-semibold uppercase tracking-[0.2em] text-[#D7E2EA]/40 transition-colors duration-300 group-hover:text-[#D7E2EA]/75 sm:text-[8px]">
            View
            <ArrowUpRight
              size={12}
              strokeWidth={1.7}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </span>

        </div>
      </div>
    </motion.button>
  );
}

/* -------------------------------------------------------------------------- */
/* Video modal                                                                */
/* -------------------------------------------------------------------------- */

function VideoModal({
  video,
  onClose,
}: {
  video: VideoItem;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-[120] flex items-center justify-center bg-[#050505]/90 p-4 backdrop-blur-xl sm:p-8"
      role="dialog"
      aria-modal="true"
      aria-label={video.title}
      onClick={onClose}
    >
      <div
        className="relative max-h-[92vh] w-full max-w-6xl overflow-hidden rounded-[28px] border border-[#D7E2EA]/15 bg-[#101012] p-2 shadow-2xl sm:rounded-[40px] sm:p-3"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close video"
          className="absolute right-4 top-4 z-10 grid h-11 w-11 place-items-center rounded-full border border-white/20 bg-black/45 text-white backdrop-blur-md transition hover:bg-white hover:text-black"
        >
          <X size={20} />
        </button>

        <video
          src={video.src}
          controls
          autoPlay
          playsInline
          className={`mx-auto max-h-[88vh] w-full rounded-[22px] object-contain ${
            video.vertical ? "max-w-[520px]" : ""
          }`}
        />
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Project modal                                                              */
/* -------------------------------------------------------------------------- */

function ProjectModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-[100] overflow-y-auto bg-[#0C0C0C]/95 p-4 backdrop-blur-md sm:p-8"
      role="dialog"
      aria-modal="true"
    >
      <div className="mx-auto max-w-6xl rounded-[35px] border border-[#D7E2EA]/20 bg-[#101012] p-5 sm:rounded-[50px] sm:p-8">
        <div className="mb-6 flex items-start justify-between gap-6">
          <div>
            <p className="mb-2 text-xs uppercase tracking-[0.3em] text-[#D7E2EA]/50">
              {project.category}
            </p>

            <h3 className="text-3xl font-black uppercase text-[#D7E2EA] sm:text-5xl">
              {project.name}
            </h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close project"
            className="shrink-0 rounded-full border border-[#D7E2EA]/30 p-3 text-[#D7E2EA] transition hover:bg-white/10"
          >
            <X size={20} />
          </button>
        </div>

        {project.description ? (
          <p className="mb-8 max-w-3xl text-base leading-relaxed text-[#D7E2EA]/65 sm:text-lg">
            {project.description}
          </p>
        ) : null}

        {project.live_url ? (
          <div className="mb-8">
            <LiveProjectButton href={project.live_url} />
          </div>
        ) : null}

        <div className="grid gap-4 md:grid-cols-2">
          {(project.gallery?.length
            ? project.gallery
            : [project.cover_image]
          ).map((image, index) => (
            <img
              key={`${project.id}-gallery-${index}`}
              src={image}
              alt={`${project.name} ${index + 1}`}
              className="w-full rounded-[30px] bg-white object-contain"
            />
          ))}

          {project.hero_image ? (
            <img
              src={project.hero_image}
              alt=""
              className="w-full rounded-[30px] object-cover md:col-span-2"
            />
          ) : null}

          {project.video_url ? (
            <ProjectVideo
              videoUrl={project.video_url}
              posterUrl={project.video_poster}
              title={project.name}
              className="aspect-video w-full rounded-[30px] md:col-span-2"
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Empty state                                                                */
/* -------------------------------------------------------------------------- */

function EmptyState({
  loading,
  error,
}: {
  loading: boolean;
  error: string;
}) {
  return (
    <FadeIn>
      <div className="mx-auto max-w-lg rounded-[40px] border border-dashed border-[#D7E2EA]/25 px-8 py-16 text-center sm:rounded-[50px]">
        <p className="text-[#D7E2EA]/80">
          {loading
            ? "Loading your work…"
            : error
              ? "Projects could not be loaded."
              : "Your projects will show up here once you publish them."}
        </p>

        <p className="mt-3 text-xs uppercase tracking-widest text-[#D7E2EA]/40">
          {error || "Add project assets to src/assets/projects/."}
        </p>
      </div>
    </FadeIn>
  );
}

/* -------------------------------------------------------------------------- */
/* Category header                                                            */
/* -------------------------------------------------------------------------- */

function CategoryHeader({
  title,
  subtitle,
  count,
}: {
  title: string;
  subtitle: string;
  count: number;
}) {
  return (
    <FadeIn>
      <div className="mb-8 flex items-end justify-between gap-6 border-b border-[#D7E2EA]/10 pb-5 sm:mb-10">
        <div>
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#D7E2EA]/35 sm:text-xs">
            {subtitle}
          </p>

          <h3
            className="hero-heading font-black uppercase leading-none tracking-tight"
            style={{ fontSize: "clamp(2.6rem, 6vw, 76px)" }}
          >
            {title}
          </h3>
        </div>

        <span className="hidden text-xs uppercase tracking-[0.2em] text-[#D7E2EA]/30 sm:block">
          {count} {count === 1 ? "Project" : "Projects"}
        </span>
      </div>
    </FadeIn>
  );
}

/* -------------------------------------------------------------------------- */
/* Project category                                                           */
/* -------------------------------------------------------------------------- */

function ProjectCategoryBlock({
  projects,
  title,
  subtitle,
  onOpen,
}: {
  projects: Project[];
  title: string;
  subtitle: string;
  onOpen: (project: Project) => void;
}) {
  const [showAll, setShowAll] = useState(false);

  const visibleProjects = showAll
    ? projects
    : projects.slice(0, INITIAL_PROJECT_COUNT);

  if (!projects.length) {
    return null;
  }

  return (
    <section className="mb-24 last:mb-0 sm:mb-32">
      <CategoryHeader
        title={title}
        subtitle={subtitle}
        count={projects.length}
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 sm:gap-5">
        {visibleProjects.map((project, index) => (
          <ProjectGalleryCard
            key={project.id}
            project={project}
            index={index}
            onOpen={onOpen}
          />
        ))}
      </div>

      {projects.length > INITIAL_PROJECT_COUNT ? (
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={() => setShowAll((current) => !current)}
            className="inline-flex items-center gap-3 rounded-full border border-[#D7E2EA]/25 bg-[#101012] px-7 py-3.5 text-[10px] font-bold uppercase tracking-[0.24em] text-[#D7E2EA] shadow-[0_15px_50px_rgba(0,0,0,0.2)] transition-all duration-300 hover:-translate-y-1 hover:border-[#D7E2EA]/55 hover:bg-[#171719] sm:px-9 sm:py-4 sm:text-xs"
          >
            {showAll
              ? "Show Less"
              : `Show More — ${projects.length - INITIAL_PROJECT_COUNT} More`}

            <span className="text-base">
              {showAll ? "↑" : "↓"}
            </span>
          </button>
        </div>
      ) : null}
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Video category                                                             */
/* -------------------------------------------------------------------------- */

function VideoCategoryBlock({
  onOpen,
}: {
  onOpen: (video: VideoItem) => void;
}) {
  return (
    <section className="mb-24 last:mb-0 sm:mb-32">
      <CategoryHeader
        title="Video Editing"
        subtitle="REELS · SHORTS · PODCAST EDITS"
        count={VIDEO_COUNT}
      />

      <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
        {VIDEOS.map((video, index) => (
          <VideoGalleryCard
            key={video.title}
            video={video}
            index={index}
            onOpen={onOpen}
          />
        ))}
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Main section                                                               */
/* -------------------------------------------------------------------------- */

export function ProjectsSection() {
  const { projects, loading, error } = useProjects();

  const [selected, setSelected] = useState<Project | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);

  const [activeFilter, setActiveFilter] = useState("All");

  /* ------------------------------------------------------------------------ */
  /* Filter projects                                                          */
  /* ------------------------------------------------------------------------ */

  const filteredProjects =
    activeFilter === "All"
      ? projects
      : projects.filter(
          (project) =>
            project.category.toLowerCase() === activeFilter.toLowerCase(),
        );

  /* ------------------------------------------------------------------------ */
  /* Group categories                                                         */
  /* ------------------------------------------------------------------------ */

  const graphicProjects = filteredProjects.filter((project) => {
    const category = project.category.toLowerCase();

    return (
      category.includes("graphic design") ||
      (!category.includes("ui/ux") &&
        !category.includes("ui ux") &&
        !category.includes("branding") &&
        !category.includes("video editing"))
    );
  });

  const brandingProjects = filteredProjects.filter((project) =>
    project.category.toLowerCase().includes("branding"),
  );

  const uiuxProjects = filteredProjects.filter((project) => {
    const category = project.category.toLowerCase();

    return (
      category.includes("ui/ux") ||
      category.includes("ui ux")
    );
  });

  const otherProjects = filteredProjects.filter((project) => {
    const category = project.category.toLowerCase();

    return (
      !category.includes("graphic design") &&
      !category.includes("ui/ux") &&
      !category.includes("ui ux") &&
      !category.includes("branding") &&
      !category.includes("video editing")
    );
  });

  /* ------------------------------------------------------------------------ */
  /* Render                                                                   */
  /* ------------------------------------------------------------------------ */

  return (
    <>
      <section
        id="work"
        className="relative z-10 -mt-10 rounded-t-[40px] bg-[#0C0C0C] px-5 pb-24 pt-20 sm:-mt-12 sm:rounded-t-[50px] sm:px-8 md:-mt-14 md:rounded-t-[60px] md:px-10"
      >
        {/* ---------------------------------------------------------------- */}
        {/* Heading                                                           */}
        {/* ---------------------------------------------------------------- */}

        <FadeIn>
          <div className="mb-12 text-center sm:mb-16 md:mb-20">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-[#D7E2EA]/40 sm:text-sm">
              Selected Work
            </p>

            <h2
              className="hero-heading font-black uppercase leading-none tracking-tight"
              style={{ fontSize: "clamp(3.2rem, 9vw, 110px)" }}
            >
              Projects
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-[#D7E2EA]/45 sm:text-base">
              A visual selection of graphic design, branding, UI/UX and video
              work.
            </p>
          </div>
        </FadeIn>

        {/* ---------------------------------------------------------------- */}
        {/* Work filter                                                       */}
        {/* ---------------------------------------------------------------- */}

        <div className="mx-auto mb-14 max-w-6xl sm:mb-20">
          <div
            className="flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            role="tablist"
            aria-label="Filter projects by category"
          >
            {["All", ...CATEGORIES].map((category) => {
              const isActive = activeFilter === category;

              const count =
                category === "All"
                  ? projects.length + VIDEO_COUNT
                  : category === "Video Editing"
                    ? VIDEO_COUNT
                    : projects.filter(
                        (project) =>
                          project.category.toLowerCase() ===
                          category.toLowerCase(),
                      ).length;

              return (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveFilter(category)}
                  className={`shrink-0 rounded-full border px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.18em] transition-all duration-300 sm:px-5 sm:py-3 sm:text-xs ${
                    isActive
                      ? "border-[#D7E2EA] bg-[#D7E2EA] text-[#08090A]"
                      : "border-[#D7E2EA]/20 bg-[#101012] text-[#D7E2EA]/55 hover:border-[#D7E2EA]/45 hover:text-[#D7E2EA]"
                  }`}
                >
                  {category}

                  <span
                    className={`ml-2 ${
                      isActive
                        ? "text-[#08090A]/55"
                        : "text-[#D7E2EA]/30"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* Gallery content                                                   */}
        {/* ---------------------------------------------------------------- */}

        <div className="mx-auto max-w-6xl">
          {loading || error ? (
            <EmptyState loading={loading} error={error} />
          ) : activeFilter === "All" ? (
            <>
              {/* Graphic Design */}
              <ProjectCategoryBlock
                projects={graphicProjects}
                title="Graphic Design"
                subtitle="POSTERS · CAMPAIGNS · VISUAL DESIGN"
                onOpen={setSelected}
              />

              {/* Branding */}
              <ProjectCategoryBlock
                projects={brandingProjects}
                title="Branding"
                subtitle="IDENTITY · VISUAL SYSTEMS · BRAND APPLICATIONS"
                onOpen={setSelected}
              />

              {/* UI/UX */}
              <ProjectCategoryBlock
                projects={uiuxProjects}
                title="UI/UX"
                subtitle="PRODUCT · APP · INTERFACE DESIGN"
                onOpen={setSelected}
              />

              {/* Other existing work */}
              <ProjectCategoryBlock
                projects={otherProjects}
                title="Other Work"
                subtitle="SELECTED CREATIVE WORK"
                onOpen={setSelected}
              />

              {/* Video */}
              <VideoCategoryBlock onOpen={setSelectedVideo} />
            </>
          ) : activeFilter === "Video Editing" ? (
            <VideoCategoryBlock onOpen={setSelectedVideo} />
          ) : (
            <ProjectCategoryBlock
              projects={filteredProjects}
              title={activeFilter}
              subtitle={`SELECTED ${activeFilter.toUpperCase()}`}
              onOpen={setSelected}
            />
          )}
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Project modal                                                       */}
      {/* ------------------------------------------------------------------ */}

      {selected ? (
        <ProjectModal
          project={selected}
          onClose={() => setSelected(null)}
        />
      ) : null}

      {/* ------------------------------------------------------------------ */}
      {/* Video modal                                                         */}
      {/* ------------------------------------------------------------------ */}

      {selectedVideo ? (
        <VideoModal
          video={selectedVideo}
          onClose={() => setSelectedVideo(null)}
        />
      ) : null}
    </>
  );
}