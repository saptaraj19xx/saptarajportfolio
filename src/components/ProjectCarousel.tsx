import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import type { Project } from "../data/projects";

type ProjectCarouselProps = {
  projects: Project[];
  onSelect: (project: Project) => void;
};

function getRelativeOffset(index: number, activeIndex: number, total: number) {
  let offset = index - activeIndex;
  if (offset > total / 2) offset -= total;
  if (offset < -total / 2) offset += total;
  return offset;
}

export function ProjectCarousel({ projects, onSelect }: ProjectCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!projects.length) return null;

  const move = (direction: -1 | 1) => {
    setActiveIndex((current) => (current + direction + projects.length) % projects.length);
  };

  return (
    <div className="relative isolate overflow-hidden rounded-[30px] border border-[#879EAD]/20 bg-[#0D1114] px-2 pb-7 pt-5 shadow-[0_24px_90px_rgba(0,0,0,0.24)] sm:rounded-[38px] sm:px-6 sm:pb-9 sm:pt-8">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(150,174,190,0.13) 1px, transparent 1.7px), repeating-linear-gradient(132deg, transparent 0 38px, rgba(133,157,174,0.055) 39px 40px, transparent 41px 68px), radial-gradient(ellipse at 50% 45%, rgba(102,130,150,0.16), transparent 68%)",
          backgroundSize: "66px 66px, 100% 100%, 100% 100%",
          backgroundPosition: "8px 2px, center, center",
        }}
      />

      <div className="relative mx-auto h-[510px] w-full max-w-[1220px] sm:h-[570px] lg:h-[640px]" aria-label="Graphic design project carousel">
        {projects.map((project, index) => {
          const offset = getRelativeOffset(index, activeIndex, projects.length);
          const isActive = offset === 0;
          const isNeighbour = Math.abs(offset) === 1;
          const isVisible = isActive || isNeighbour;
          const side = offset < 0 ? "20%" : "80%";
          const image = project.thumbnail_image || project.cover_image;
          const visualCount = project.gallery?.length ?? 0;

          return (
            <motion.button
              key={project.id}
              type="button"
              onClick={() => {
                if (isActive) onSelect(project);
                else setActiveIndex(index);
              }}
              aria-label={isActive ? `Open case study: ${project.name}` : `Show project: ${project.name}`}
              aria-pressed={isActive}
              initial={false}
              animate={{
                left: isActive ? "50%" : side,
                x: "-50%",
                y: "-50%",
                scale: isActive ? 1 : isNeighbour ? 0.76 : 0.58,
                rotateY: isActive ? 0 : offset < 0 ? 15 : -15,
                opacity: isActive ? 1 : isNeighbour ? 0.62 : 0,
                filter: isActive ? "brightness(1)" : "brightness(0.58)",
                zIndex: isActive ? 30 : isNeighbour ? 20 : 0,
              }}
              transition={{ type: "spring", stiffness: 185, damping: 25, mass: 0.88 }}
              style={{
                perspective: 1200,
                pointerEvents: isVisible ? "auto" : "none",
              }}
              className={`absolute top-[calc(50%+8px)] block aspect-[4/5] w-[min(76vw,310px)] overflow-hidden rounded-[22px] border border-[#90A8B8]/30 bg-[#11171B] text-left shadow-[0_24px_70px_rgba(0,0,0,0.62)] outline-none transition-[border-color,box-shadow] duration-300 focus-visible:ring-2 focus-visible:ring-[#9EB5C4] sm:w-[min(38vw,350px)] sm:rounded-[28px] lg:w-[min(31vw,390px)] ${
                isActive ? "border-[#A9C0CE]/75 shadow-[0_28px_90px_rgba(0,0,0,0.68)]" : "hover:border-[#A9C0CE]/65"
              }`}
            >
              <div className="absolute inset-0 grid place-items-center bg-[#141A1E]">
                <img
                  src={image}
                  alt={`${project.name} project artwork`}
                  loading={Math.abs(offset) <= 1 ? "eager" : "lazy"}
                  decoding="async"
                  draggable={false}
                  className="h-full w-full select-none object-contain p-2 sm:p-3"
                />
              </div>

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-black/0 to-black/10" />

              <div className="pointer-events-none absolute left-4 top-4 flex items-center gap-2 sm:left-5 sm:top-5">
                <span className="text-[9px] font-semibold tracking-[0.2em] text-white/70">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {visualCount > 1 ? (
                  <span className="rounded-full border border-white/15 bg-black/30 px-2 py-1 text-[7px] uppercase tracking-[0.16em] text-white/65 backdrop-blur-sm">
                    {visualCount} visuals
                  </span>
                ) : null}
              </div>

              <div className="pointer-events-none absolute inset-x-0 bottom-0 p-4 sm:p-5">
                <p className="mb-1 text-[8px] font-semibold uppercase tracking-[0.24em] text-white/55 sm:text-[9px]">
                  {project.category}
                </p>
                <div className="flex items-end justify-between gap-3">
                  <h3 className="line-clamp-2 text-sm font-semibold uppercase leading-tight tracking-[0.02em] text-white sm:text-base">
                    {project.name}
                  </h3>
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/35 bg-black/35 text-white backdrop-blur-sm sm:h-10 sm:w-10">
                    <ArrowUpRight size={15} />
                  </span>
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>

      <div className="relative z-40 flex items-center justify-center gap-4 sm:gap-6">
        <button
          type="button"
          onClick={() => move(-1)}
          aria-label="Previous graphic design project"
          className="group inline-flex h-11 items-center gap-2 rounded-lg border border-[#879EAD]/35 bg-[#141B20]/80 px-3.5 text-[#D7E2EA]/80 transition duration-300 hover:-translate-x-1 hover:border-[#A9C0CE]/75 hover:bg-[#1C282F] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9EB5C4] sm:h-12 sm:rounded-xl sm:px-5"
        >
          <ArrowLeft size={15} className="transition-transform duration-300 group-hover:-translate-x-1" />
          <span className="text-[8px] font-semibold uppercase tracking-[0.2em] sm:text-[9px]">Previous</span>
        </button>

        <p className="min-w-[72px] text-center text-[9px] font-semibold uppercase tracking-[0.22em] text-[#AFC0CA]/65 tabular-nums">
          {String(activeIndex + 1).padStart(2, "0")} <span className="text-[#6F8593]">/</span> {String(projects.length).padStart(2, "0")}
        </p>

        <button
          type="button"
          onClick={() => move(1)}
          aria-label="Next graphic design project"
          className="group inline-flex h-11 items-center gap-2 rounded-lg border border-[#A9C0CE]/55 bg-[#9EB5C4] px-3.5 text-[#0C1115] transition duration-300 hover:translate-x-1 hover:border-[#D2E0E8] hover:bg-[#C0D0DA] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D2E0E8] sm:h-12 sm:rounded-xl sm:px-5"
        >
          <span className="text-[8px] font-bold uppercase tracking-[0.2em] sm:text-[9px]">Next project</span>
          <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  );
}
