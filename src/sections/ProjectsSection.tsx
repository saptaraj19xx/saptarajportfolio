import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight, Plus, X } from "lucide-react";

import { FadeIn } from "../components/FadeIn";
import { LiveProjectButton } from "../components/LiveProjectButton";
import { ProjectVideo } from "../components/ProjectVideo";
import { VideoCarousel } from "../components/VideoCarousel";

import { useProjects } from "../lib/projects";
import type { Project } from "../data/projects";
import { CATEGORIES } from "../data/projects";

/* -------------------------------------------------------------------------- */
/* Video assets                                                               */
/* -------------------------------------------------------------------------- */

const videoFiles = import.meta.glob("../assets/videos/*.mp4", {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>;

const videoUrl = (filename: string) =>
  videoFiles[`../assets/videos/${filename}`] ?? "";

const posterFiles = import.meta.glob("../assets/video-posters/*.webp", {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>;

const posterUrl = (filename: string) =>
  posterFiles[`../assets/video-posters/${filename}`] ?? "";

/* -------------------------------------------------------------------------- */
/* Types                                                                     */
/* -------------------------------------------------------------------------- */

type VideoItem = {
  src: string;
  label: string;
  title: string;
  poster: string;
  vertical?: boolean;
};

/* -------------------------------------------------------------------------- */
/* Video data                                                                 */
/* -------------------------------------------------------------------------- */

const VIDEOS: VideoItem[] = [
  {
    src: videoUrl("Instagram Reel 1.mp4"),
    poster: posterUrl("Instagram Reel 1.webp"),
    label: "Instagram Reel",
    title: "Reel 01",
    vertical: true,
  },
  {
    src: videoUrl("Instagram Reel 2.mp4"),
    poster: posterUrl("Instagram Reel 2.webp"),
    label: "Instagram Reel",
    title: "Reel 02",
    vertical: true,
  },
  {
    src: videoUrl("Instagram Reel 3.mp4"),
    poster: posterUrl("Instagram Reel 3.webp"),
    label: "Instagram Reel",
    title: "Reel 03",
    vertical: true,
  },
  {
    src: videoUrl("podcast 1.mp4"),
    poster: posterUrl("podcast 1.webp"),
    label: "Podcast Edit",
    title: "Podcast 01",
    vertical: true,
  },
  {
    src: videoUrl("podcast 2.mp4"),
    poster: posterUrl("podcast 2.webp"),
    label: "Podcast Edit",
    title: "Podcast 02",
    vertical: true,
  },
  {
    src: videoUrl("podcast 3.mp4"),
    poster: posterUrl("podcast 3.webp"),
    label: "Podcast Edit",
    title: "Podcast 03",
    vertical: true,
  },
  {
    src: videoUrl("podcast 4.mp4"),
    poster: posterUrl("podcast 4.webp"),
    label: "Podcast Edit",
    title: "Podcast 04",
    vertical: true,
  },
  {
    src: videoUrl("podcast 5.mp4"),
    poster: posterUrl("podcast 5.webp"),
    label: "Podcast Edit",
    title: "Podcast 05",
    vertical: true,
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

  const imageAspect =
    index % 5 === 0
      ? "aspect-[4/5]"
      : index % 3 === 0
        ? "aspect-square"
        : "aspect-[4/3]";

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
      className="group relative mb-5 inline-block w-full break-inside-avoid overflow-hidden rounded-[26px] border border-[#D7E2EA]/10 bg-[#0C0C0C] align-top transition-all duration-500 hover:-translate-y-1 hover:border-[#D7E2EA]/25 sm:rounded-[32px]"
    >
      <button
        type="button"
        onClick={() => onOpen(project)}
        className="block w-full text-left"
        aria-label={`Open ${project.name}`}
      >
        <div className={`relative ${imageAspect} overflow-hidden bg-[#151618]`}>
          <img
            src={project.thumbnail_image || project.cover_image}
            alt={`${project.name} project cover`}
            loading="lazy"
            decoding="async"
            fetchPriority="low"
            className="h-full w-full object-contain p-2 transition duration-500 ease-out group-hover:scale-[1.025] sm:p-3"
          />

          <div className="pointer-events-none absolute left-4 top-4 sm:left-5 sm:top-5">
            <span className="text-[9px] font-medium uppercase tracking-[0.22em] text-white/65 sm:text-[10px]">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>

          <span className="absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-full bg-black/45 text-white/75 opacity-0 transition-all duration-300 group-hover:opacity-100 sm:right-5 sm:top-5 sm:h-9 sm:w-9">
            <ArrowUpRight size={15} strokeWidth={1.7} />
          </span>

          {gallery.length > 1 ? (
            <span className="absolute bottom-4 left-4 rounded-full border border-white/15 bg-black/55 px-3 py-1.5 text-[8px] font-medium uppercase tracking-[0.2em] text-white/75 backdrop-blur sm:left-5">
              +{gallery.length - 1} project visuals
            </span>
          ) : null}
        </div>

        <div className="px-1 pb-1 pt-4 sm:pt-5">
          <div className="mb-2 flex items-center justify-between gap-4">
            <p className="truncate text-[8px] font-medium uppercase tracking-[0.28em] text-[#D7E2EA]/38 sm:text-[9px]">
              {project.category}
            </p>

            <span className="flex shrink-0 items-center gap-1 text-[8px] font-medium uppercase tracking-[0.18em] text-[#D7E2EA]/32 transition-colors duration-300 group-hover:text-[#D7E2EA]/65 sm:text-[9px]">
              View
              <ArrowUpRight
                size={11}
                strokeWidth={1.5}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </span>
          </div>

          <h4 className="truncate text-base font-semibold uppercase tracking-[-0.01em] text-[#D7E2EA]/82 transition-colors duration-300 group-hover:text-[#D7E2EA] sm:text-lg">
            {project.name}
          </h4>
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
          preload="none"
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
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  const leadImage = project.hero_image || project.cover_image;
  const galleryImages = (
    project.gallery?.length ? project.gallery : [project.cover_image]
  ).filter((image) => image !== leadImage);

  return (
    <motion.div
      className="fixed inset-0 z-[100] overflow-y-auto bg-[#050607]/95 p-0 backdrop-blur-md sm:p-5 lg:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      onClick={onClose}
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        onClick={(event) => event.stopPropagation()}
        className="mx-auto min-h-screen max-w-7xl overflow-hidden border-x border-[#D7E2EA]/10 bg-[#0C0D0E] shadow-[0_24px_100px_rgba(0,0,0,0.55)] sm:min-h-0 sm:rounded-[30px] sm:border"
        initial={{ opacity: 0, y: 18, scale: 0.985 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 12, scale: 0.99 }}
        transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Cinematic lead image */}
        <header className="relative isolate flex min-h-[430px] flex-col justify-between overflow-hidden bg-[#111416] sm:min-h-[520px] lg:min-h-[650px]">
          <img
            src={leadImage}
            alt={`${project.name} — featured project artwork`}
            fetchPriority="high"
            decoding="async"
            className="absolute inset-0 h-full w-full object-contain px-3 pb-10 pt-16 sm:px-10 sm:pb-12 sm:pt-16"
          />
          <div className="pointer-events-none absolute inset-0 -z-0 bg-gradient-to-t from-[#0C0D0E] via-[#0C0D0E]/25 to-black/20" />
          <div className="relative z-10 flex items-center justify-between gap-4 px-5 pt-5 sm:px-9 sm:pt-8">
            <div>
              <p className="text-[9px] font-semibold uppercase tracking-[0.32em] text-[#D7E2EA]/65 sm:text-[10px]">
                Selected work <span className="px-2 text-[#D7E2EA]/25">/</span> {project.category}
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close project"
              className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/20 bg-black/40 text-white backdrop-blur-md transition duration-300 hover:rotate-90 hover:bg-white hover:text-black"
            >
              <X size={19} />
            </button>
          </div>

          <div className="relative z-10 px-5 pb-7 sm:px-9 sm:pb-10">
            <p className="mb-3 text-[9px] font-medium uppercase tracking-[0.3em] text-[#D7E2EA]/45 sm:text-[10px]">
              Case study <span className="px-2">—</span> {project.category}
            </p>
            <h3
              id="project-modal-title"
              className="max-w-5xl text-[clamp(2.5rem,7vw,6.8rem)] font-black uppercase leading-[0.9] tracking-[-0.045em] text-[#E7EDF1]"
            >
              {project.name}
            </h3>
          </div>
        </header>

        {/* Project overview */}
        <section className="grid gap-8 border-b border-[#D7E2EA]/10 px-5 py-8 sm:px-9 sm:py-10 lg:grid-cols-[minmax(0,1fr)_260px] lg:gap-14">
          <div>
            <p className="mb-4 text-[9px] font-semibold uppercase tracking-[0.3em] text-[#D7E2EA]/40">
              The brief / overview
            </p>
            <p className="max-w-3xl text-base leading-[1.85] text-[#D7E2EA]/75 sm:text-lg">
              {project.description || "A selected creative project by Saptaraj."}
            </p>
          </div>

          <aside className="flex flex-col justify-between gap-6 border-t border-[#D7E2EA]/10 pt-5 lg:border-l lg:border-t-0 lg:pl-7 lg:pt-0">
            <div>
              <p className="mb-2 text-[9px] uppercase tracking-[0.25em] text-[#D7E2EA]/35">
                Discipline
              </p>
              <p className="text-sm font-medium uppercase tracking-[0.08em] text-[#D7E2EA]/85">
                {project.category}
              </p>
            </div>
            {project.live_url ? (
              <div>
                <LiveProjectButton href={project.live_url} />
              </div>
            ) : (
              <p className="text-[9px] uppercase tracking-[0.22em] text-[#D7E2EA]/30">
                Selected portfolio project
              </p>
            )}
          </aside>
        </section>

        {/* Visual story / project gallery */}
        {galleryImages.length > 0 ? (
          <section className="px-5 py-9 sm:px-9 sm:py-12">
            <div className="mb-6 flex items-end justify-between gap-4 sm:mb-8">
              <div>
                <p className="mb-2 text-[9px] font-semibold uppercase tracking-[0.3em] text-[#D7E2EA]/40">
                  Behind the details
                </p>
                <h4 className="text-2xl font-bold uppercase tracking-[-0.03em] text-[#D7E2EA] sm:text-3xl">
                  The visual story
                </h4>
              </div>
              <span className="pb-1 text-[9px] uppercase tracking-[0.2em] text-[#D7E2EA]/35">
                {String(galleryImages.length).padStart(2, "0")} frames
              </span>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-5">
              {galleryImages.map((image, index) => (
                <figure
                  key={`${project.id}-gallery-${index}`}
                  className={`group relative overflow-hidden rounded-[20px] border border-[#D7E2EA]/10 bg-[#141719] sm:rounded-[26px] ${
                    index % 3 === 0 ? "md:col-span-12" : "md:col-span-6"
                  }`}
                >
                  <img
                    src={image}
                    alt={`${project.name} — visual ${index + 1}`}
                    loading="lazy"
                    decoding="async"
                    className="block h-auto max-h-[900px] min-h-[220px] w-full object-contain transition-transform duration-700 ease-out group-hover:scale-[1.01]"
                  />
                  <figcaption className="absolute bottom-3 right-3 rounded-full border border-white/10 bg-black/45 px-3 py-1.5 text-[8px] font-medium uppercase tracking-[0.2em] text-white/60 backdrop-blur-md sm:bottom-4 sm:right-4">
                    {String(index + 1).padStart(2, "0")} / {String(galleryImages.length).padStart(2, "0")}
                  </figcaption>
                </figure>
              ))}
            </div>
          </section>
        ) : null}

        {/* Motion / video feature */}
        {project.video_url ? (
          <section className="border-t border-[#D7E2EA]/10 px-5 py-9 sm:px-9 sm:py-12">
            <div className="mb-6">
              <p className="mb-2 text-[9px] font-semibold uppercase tracking-[0.3em] text-[#D7E2EA]/40">
                In motion
              </p>
              <h4 className="text-2xl font-bold uppercase tracking-[-0.03em] text-[#D7E2EA] sm:text-3xl">
                Project film
              </h4>
            </div>
            <ProjectVideo
              videoUrl={project.video_url}
              posterUrl={project.video_poster}
              title={project.name}
              className="aspect-video w-full overflow-hidden rounded-[20px] border border-[#D7E2EA]/10 bg-[#141719] sm:rounded-[26px]"
            />
          </section>
        ) : null}

        <footer className="flex items-center justify-between gap-4 border-t border-[#D7E2EA]/10 px-5 py-5 sm:px-9">
          <p className="text-[8px] uppercase tracking-[0.24em] text-[#D7E2EA]/30 sm:text-[9px]">
            Saptaraj Borthakur <span className="px-2">/</span> Selected work
          </p>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.22em] text-[#D7E2EA]/65 transition hover:text-white"
          >
            Close case study <X size={13} />
          </button>
        </footer>
      </motion.div>
    </motion.div>
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
  layout = "showcase",
}: {
  projects: Project[];
  title: string;
  subtitle: string;
  onOpen: (project: Project) => void;
  layout?: "grid" | "showcase";
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

      {layout === "showcase" ? (
        <ProjectShowcase projects={projects} onSelect={onOpen} />
      ) : (
        <>
          <div className="columns-1 gap-4 sm:columns-2 sm:gap-5 lg:columns-3">
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
        </>
      )}
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Project category showcase                                                  */
/* -------------------------------------------------------------------------- */

function ProjectShowcase({
  projects,
  onSelect,
}: {
  projects: Project[];
  onSelect: (project: Project) => void;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showMore, setShowMore] = useState(false);

  if (!projects.length) return null;

  const activeProject = projects[activeIndex] ?? projects[0];
  const activeImage = activeProject.thumbnail_image || activeProject.cover_image;

  const sideProjects = Array.from(
    { length: Math.min(4, projects.length - 1) },
    (_, offset) => {
      const index = (activeIndex + offset + 1) % projects.length;
      return { project: projects[index], index };
    },
  );

  const sideIndices = new Set(sideProjects.map((item) => item.index));
  const remainingProjects = projects
    .map((project, index) => ({ project, index }))
    .filter(({ index }) => index !== activeIndex && !sideIndices.has(index));

  const changeProject = (direction: -1 | 1) => {
    setActiveIndex((current) => (current + direction + projects.length) % projects.length);
  };

  const selectProject = (index: number) => {
    setActiveIndex(index);
    setShowMore(false);
  };

  const projectImage = (project: Project) =>
    project.thumbnail_image || project.cover_image;

  return (
    <div className="relative isolate overflow-hidden rounded-[28px] border border-[#8D713B]/35 bg-[#100D08] p-3 shadow-[0_28px_100px_rgba(0,0,0,0.32)] sm:rounded-[36px] sm:p-5 lg:p-7">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-75"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(190,145,58,0.13) 1px, transparent 1.8px), repeating-linear-gradient(132deg, transparent 0 36px, rgba(169,126,48,0.055) 37px 39px, transparent 40px 68px), radial-gradient(ellipse at 22% 60%, rgba(161,111,34,0.2), transparent 48%)",
          backgroundSize: "64px 64px, 100% 100%, 100% 100%",
          backgroundPosition: "8px 0, center, center",
        }}
      />

      <div className="relative grid gap-6 lg:grid-cols-[minmax(250px,1.04fr)_minmax(230px,0.88fr)_minmax(300px,1.08fr)] lg:items-center lg:gap-7">
        {/* Featured artwork */}
        <motion.div
          key={activeProject.id}
          initial={{ opacity: 0, x: -16, scale: 0.985 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-[430px] lg:max-w-none"
        >
          <div className="pointer-events-none absolute -left-2 top-7 h-[86%] w-[94%] rotate-[-5deg] rounded-[24px] border border-[#B18A43]/40 bg-[#241A0B]/55 sm:rounded-[30px]" />
          <div className="pointer-events-none absolute -left-1 top-4 h-[91%] w-[97%] rotate-[-2.5deg] rounded-[24px] border border-[#B18A43]/35 bg-[#19130A]/75 sm:rounded-[30px]" />

          <button
            type="button"
            onClick={() => onSelect(activeProject)}
            aria-label={`Open featured project: ${activeProject.name}`}
            className="group relative block aspect-[4/5] w-full overflow-hidden rounded-[22px] border border-[#C69B4B]/70 bg-[#17130C] shadow-[0_0_42px_rgba(188,135,43,0.17),0_28px_70px_rgba(0,0,0,0.52)] transition duration-500 hover:border-[#E0B85F] hover:shadow-[0_0_55px_rgba(188,135,43,0.24),0_28px_70px_rgba(0,0,0,0.58)] sm:rounded-[30px]"
          >
            <img
              src={activeImage}
              alt={`${activeProject.name} featured artwork`}
              loading="eager"
              decoding="async"
              className="absolute inset-0 h-full w-full object-contain p-2.5 transition-transform duration-700 ease-out group-hover:scale-[1.025] sm:p-4"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/10" />
            <span className="absolute left-3 top-3 rounded-full border border-white/15 bg-black/45 px-3 py-1.5 text-[7px] font-semibold uppercase tracking-[0.22em] text-white/80 backdrop-blur-md sm:left-4 sm:top-4 sm:text-[8px]">
              Featured / {String(activeIndex + 1).padStart(2, "0")}
            </span>
            <span className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full border border-white/25 bg-black/35 text-white backdrop-blur-md transition duration-300 group-hover:rotate-45 group-hover:bg-white group-hover:text-black sm:right-4 sm:top-4">
              <ArrowUpRight size={16} />
            </span>
          </button>
        </motion.div>

        {/* Project information */}
        <motion.div
          key={`${activeProject.id}-details`}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.32, delay: 0.05 }}
          className="flex min-w-0 flex-col justify-center py-1 lg:py-5"
        >
          <span className="mb-5 inline-flex w-fit items-center rounded-full border border-[#B98A36]/70 bg-[#2A1D0A]/45 px-3.5 py-2 text-[8px] font-bold uppercase tracking-[0.22em] text-[#E4B654] sm:text-[9px]">
            Featured project
          </span>

          <p className="mb-3 text-[8px] font-semibold uppercase tracking-[0.25em] text-[#D7E2EA]/40 sm:text-[9px]">
            {activeProject.category} <span className="px-2 text-[#D7E2EA]/20">/</span> Selected work
          </p>

          <h4 className="max-w-md text-3xl font-black uppercase leading-[0.94] tracking-[-0.045em] text-[#E3E9ED] sm:text-4xl lg:text-[clamp(2rem,3vw,3.25rem)]">
            {activeProject.name}
          </h4>

          <p className="mt-5 max-w-md text-sm leading-[1.8] text-[#D7E2EA]/65 sm:text-[15px]">
            {activeProject.description || "A selected creative project by Saptaraj."}
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {[activeProject.category, "Visual design", "Selected work"].map((tag, index) => (
              <span
                key={`${tag}-${index}`}
                className="rounded-full border border-[#D7E2EA]/15 bg-white/[0.025] px-3 py-1.5 text-[8px] font-medium uppercase tracking-[0.13em] text-[#D7E2EA]/65"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => onSelect(activeProject)}
              className="inline-flex items-center gap-4 rounded-xl border border-[#E2B65A] bg-gradient-to-b from-[#EAC46E] to-[#BE8730] px-5 py-3.5 text-[10px] font-bold uppercase tracking-[0.12em] text-[#171108] shadow-[0_8px_28px_rgba(185,130,41,0.2)] transition duration-300 hover:-translate-y-0.5 hover:brightness-110 sm:px-6"
            >
              View project <ArrowUpRight size={15} />
            </button>
            {activeProject.live_url ? (
              <span onClick={(event) => event.stopPropagation()}>
                <LiveProjectButton href={activeProject.live_url} />
              </span>
            ) : null}
          </div>
        </motion.div>

        {/* Four project previews */}
        <div className="min-w-0 border-t border-[#B18A43]/20 pt-5 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
          <div className="mb-4 flex items-center justify-between gap-3">
            <p className="text-[8px] font-semibold uppercase tracking-[0.24em] text-[#D7E2EA]/40">
              More selected work
            </p>
            <span className="text-[8px] uppercase tracking-[0.18em] text-[#D7E2EA]/30">
              {String(projects.length).padStart(2, "0")} projects
            </span>
          </div>

          {sideProjects.length > 0 ? (
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {sideProjects.map(({ project, index }) => (
                <button
                  key={project.id}
                  type="button"
                  onClick={() => selectProject(index)}
                  aria-label={`Feature project: ${project.name}`}
                  className="group relative overflow-hidden rounded-[17px] border border-[#D7E2EA]/15 bg-[#17130D] text-left transition duration-300 hover:-translate-y-1 hover:border-[#C69B4B]/70 sm:rounded-[21px]"
                >
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <img
                      src={projectImage(project)}
                      alt={`${project.name} preview`}
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 h-full w-full object-contain p-1.5 transition-transform duration-500 group-hover:scale-[1.035] sm:p-2"
                    />
                    <span className="absolute left-2.5 top-2.5 text-[7px] font-semibold tracking-[0.18em] text-white/70 sm:left-3 sm:top-3">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent opacity-60 transition-opacity group-hover:opacity-30" />
                  </div>
                  <div className="px-2.5 pb-2.5 pt-2 sm:px-3 sm:pb-3">
                    <p className="mb-1 truncate text-[6px] font-semibold uppercase tracking-[0.18em] text-[#D7E2EA]/40 sm:text-[7px]">
                      {project.category}
                    </p>
                    <p className="line-clamp-2 text-[9px] font-semibold uppercase leading-snug text-[#D7E2EA]/85 sm:text-[10px]">
                      {project.name}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="grid min-h-[180px] place-items-center rounded-2xl border border-dashed border-[#D7E2EA]/15 text-center text-[9px] uppercase tracking-[0.2em] text-[#D7E2EA]/35">
              This is the first project
            </div>
          )}
        </div>
      </div>

      {/* Navigation and more-projects controls */}
      <div className="relative mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-[#B18A43]/20 pt-5 sm:mt-7 sm:pt-6">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => changeProject(-1)}
            aria-label="Previous project"
            className="grid h-10 w-10 place-items-center rounded-full border border-[#B18A43]/65 bg-[#171108]/80 text-[#E4C88F] transition duration-300 hover:border-[#E0B85F] hover:bg-[#2B1E0A] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C69B4B]"
          >
            <ArrowLeft size={17} />
          </button>
          <button
            type="button"
            onClick={() => changeProject(1)}
            aria-label="Next project"
            className="grid h-10 w-10 place-items-center rounded-full border border-[#C69B4B] bg-[#C69B4B] text-[#171108] transition duration-300 hover:bg-[#E0B85F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E0B85F]"
          >
            <ArrowRight size={17} />
          </button>
          <span className="ml-2 min-w-[66px] text-center text-[9px] font-semibold uppercase tracking-[0.2em] text-[#D7C6A2]/70 tabular-nums">
            {String(activeIndex + 1).padStart(2, "0")} <span className="text-[#8D713B]">/</span> {String(projects.length).padStart(2, "0")}
          </span>
        </div>

        <div className="flex flex-1 items-center justify-center gap-1.5 px-2 sm:gap-2">
          {projects.map((project, index) => (
            <button
              key={project.id}
              type="button"
              onClick={() => selectProject(index)}
              aria-label={`Go to project ${index + 1}: ${project.name}`}
              aria-current={index === activeIndex ? "step" : undefined}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === activeIndex
                  ? "w-8 bg-[#D9A94D]"
                  : "w-3 bg-[#D7E2EA]/20 hover:bg-[#D7E2EA]/50"
              }`}
            />
          ))}
        </div>

        {remainingProjects.length > 0 ? (
          <button
            type="button"
            onClick={() => setShowMore((current) => !current)}
            aria-expanded={showMore}
            className="inline-flex min-h-[48px] min-w-[124px] items-center justify-center gap-2 rounded-xl border border-[#D7E2EA]/20 bg-[#15130F]/80 px-4 py-2.5 text-[#E7DDC8] transition duration-300 hover:border-[#C69B4B]/70 hover:bg-[#211A0F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C69B4B]"
          >
            <Plus size={17} className={`transition-transform duration-300 ${showMore ? "rotate-45" : ""}`} />
            <span className="text-[8px] font-semibold uppercase tracking-[0.18em]">
              {showMore ? "Show less" : `${remainingProjects.length} more projects`}
            </span>
          </button>
        ) : null}
      </div>

      {showMore && remainingProjects.length > 0 ? (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="relative mt-6 grid grid-cols-2 gap-3 border-t border-[#B18A43]/20 pt-6 sm:grid-cols-3 lg:grid-cols-4"
        >
          {remainingProjects.map(({ project, index }) => (
            <button
              key={project.id}
              type="button"
              onClick={() => selectProject(index)}
              className="group overflow-hidden rounded-[18px] border border-[#D7E2EA]/12 bg-[#15130F] text-left transition hover:border-[#C69B4B]/65"
            >
              <div className="aspect-[4/3] overflow-hidden bg-[#1A1711]">
                <img
                  src={projectImage(project)}
                  alt={`${project.name} artwork`}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-contain p-2 transition-transform duration-500 group-hover:scale-[1.04]"
                />
              </div>
              <div className="p-3">
                <p className="mb-1 text-[7px] uppercase tracking-[0.18em] text-[#D7E2EA]/40">{project.category}</p>
                <p className="line-clamp-2 text-[10px] font-semibold uppercase leading-snug text-[#D7E2EA]/85">{project.name}</p>
              </div>
            </button>
          ))}
        </motion.div>
      ) : null}
    </div>
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

      <VideoCarousel videos={VIDEOS} onSelect={onOpen} />
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
    className="flex flex-wrap justify-center gap-3 pb-2"
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
                layout="showcase"
              />

              {/* Branding */}
              <ProjectCategoryBlock
                projects={brandingProjects}
                title="Branding"
                subtitle="IDENTITY · VISUAL SYSTEMS · BRAND APPLICATIONS"
                onOpen={setSelected}
                layout="showcase"
              />

              {/* UI/UX */}
              <ProjectCategoryBlock
                projects={uiuxProjects}
                title="UI/UX"
                subtitle="PRODUCT · APP · INTERFACE DESIGN"
                onOpen={setSelected}
                layout="showcase"
              />

              {/* Other existing work */}
              <ProjectCategoryBlock
                projects={otherProjects}
                title="Other Work"
                subtitle="SELECTED CREATIVE WORK"
                onOpen={setSelected}
                layout="showcase"
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
              layout="showcase"
            />
          )}
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Project modal                                                       */}
      {/* ------------------------------------------------------------------ */}

      <AnimatePresence initial={false}>
        {selected ? (
          <ProjectModal
            key={selected.id}
            project={selected}
            onClose={() => setSelected(null)}
          />
        ) : null}
      </AnimatePresence>

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