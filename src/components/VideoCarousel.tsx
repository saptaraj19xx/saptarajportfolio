import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";

export type VideoCarouselItem = {
  src: string;
  label: string;
  title: string;
  poster: string;
  vertical?: boolean;
};

type VideoCarouselProps = {
  videos: VideoCarouselItem[];
  onSelect: (video: VideoCarouselItem) => void;
};

function getRelativeOffset(index: number, activeIndex: number, total: number) {
  let offset = index - activeIndex;

  if (offset > total / 2) offset -= total;
  if (offset < -total / 2) offset += total;

  return offset;
}

export function VideoCarousel({ videos, onSelect }: VideoCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!videos.length) return null;

  const move = (direction: -1 | 1) => {
    setActiveIndex((current) => (current + direction + videos.length) % videos.length);
  };

  return (
    <div className="relative isolate overflow-hidden rounded-[30px] border border-[#8D713B]/30 bg-[#120E08] px-2 pb-7 pt-5 shadow-[0_24px_90px_rgba(0,0,0,0.22)] sm:rounded-[38px] sm:px-6 sm:pb-9 sm:pt-8">
      {/* Warm, understated texture inspired by the reference carousel. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(190,145,58,0.18) 1.2px, transparent 1.8px), repeating-linear-gradient(132deg, transparent 0 34px, rgba(169,126,48,0.075) 35px 37px, transparent 38px 62px), radial-gradient(ellipse at 50% 55%, rgba(119,83,26,0.18), transparent 65%)",
          backgroundSize: "62px 62px, 100% 100%, 100% 100%",
          backgroundPosition: "10px 0, center, center",
        }}
      />

      <div className="relative mx-auto h-[500px] w-full max-w-[1220px] sm:h-[570px] lg:h-[660px]" aria-label="Video carousel">
        {videos.map((video, index) => {
          const offset = getRelativeOffset(index, activeIndex, videos.length);
          const isActive = offset === 0;
          const isNeighbour = Math.abs(offset) === 1;
          const isVisible = isActive || isNeighbour;
          const side = offset < 0 ? "left-[20%]" : "left-[80%]";

          return (
            <motion.button
              key={video.title}
              type="button"
              onClick={() => {
                if (isActive) onSelect(video);
                else setActiveIndex(index);
              }}
              aria-label={isActive ? `Play ${video.title}` : `Show ${video.title}`}
              aria-pressed={isActive}
              initial={false}
              animate={{
                left: isActive ? "50%" : side === "left-[20%]" ? "20%" : "80%",
                x: "-50%",
                y: "-50%",
                scale: isActive ? 1 : isNeighbour ? 0.76 : 0.58,
                rotateY: isActive ? 0 : offset < 0 ? 17 : -17,
                opacity: isActive ? 1 : isNeighbour ? 0.68 : 0,
                filter: isActive ? "brightness(1)" : "brightness(0.62)",
                zIndex: isActive ? 30 : isNeighbour ? 20 : 0,
              }}
              transition={{
                type: "spring",
                stiffness: 190,
                damping: 25,
                mass: 0.85,
              }}
              style={{
                perspective: 1200,
                pointerEvents: isVisible ? "auto" : "none",
              }}
              className={`absolute top-[calc(50%+22px)] block w-[min(76vw,340px)] overflow-hidden rounded-[26px] border border-[#A88A4E]/55 bg-[#080808] text-left shadow-[0_24px_70px_rgba(0,0,0,0.6)] outline-none transition-[border-color,box-shadow] duration-300 focus-visible:ring-2 focus-visible:ring-[#C5A45F] sm:w-[min(38vw,370px)] sm:rounded-[32px] lg:w-[min(31vw,390px)] ${
                isActive ? "border-[#C6A45D]/85 shadow-[0_28px_90px_rgba(0,0,0,0.65)]" : "hover:border-[#C6A45D]/75"
              } ${video.vertical ? "aspect-[9/14]" : "aspect-video"}`}
            >
              {video.poster ? (
                <img
                  src={video.poster}
                  alt={`${video.title} preview`}
                  loading={Math.abs(offset) <= 1 ? "eager" : "lazy"}
                  decoding="async"
                  draggable={false}
                  className="absolute inset-0 h-full w-full select-none object-cover object-top"
                />
              ) : (
                <div className="absolute inset-0 grid place-items-center bg-gradient-to-br from-[#262019] to-black">
                  <span className="text-xs uppercase tracking-[0.25em] text-white/35">Video preview</span>
                </div>
              )}

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/5 to-black/15" />

              <div className="pointer-events-none absolute inset-x-0 bottom-0 p-4 sm:p-5">
                <p className="mb-1 text-[8px] font-semibold uppercase tracking-[0.25em] text-white/55 sm:text-[9px]">
                  {video.label}
                </p>
                <div className="flex items-end justify-between gap-3">
                  <h3 className="truncate text-sm font-semibold uppercase tracking-[0.03em] text-white sm:text-base">
                    {video.title}
                  </h3>
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/35 bg-black/35 text-white backdrop-blur-sm sm:h-10 sm:w-10">
                    <Play size={14} fill="currentColor" />
                  </span>
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>

      <div className="relative z-40 flex items-center justify-center gap-5 sm:gap-8">
        <button
          type="button"
          onClick={() => move(-1)}
          aria-label="Previous video"
          className="group inline-flex h-12 min-w-[104px] items-center justify-center gap-2 rounded-xl border border-[#8D713B]/65 bg-[#171108]/70 px-4 text-[#E6D7B9] shadow-[0_8px_26px_rgba(0,0,0,0.22)] transition duration-300 hover:-translate-x-1 hover:border-[#C6A45D] hover:bg-[#21190D] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C6A45D] sm:h-[54px] sm:min-w-[124px] sm:rounded-2xl"
        >
          <ChevronLeft size={17} strokeWidth={1.9} className="transition-transform duration-300 group-hover:-translate-x-1" />
          <span className="text-[9px] font-semibold uppercase tracking-[0.2em]">Prev</span>
        </button>

        <p className="min-w-[68px] text-center text-[10px] font-medium uppercase tracking-[0.24em] text-[#D7C6A2]/65 tabular-nums">
          {String(activeIndex + 1).padStart(2, "0")} <span className="text-[#8D713B]">/</span> {String(videos.length).padStart(2, "0")}
        </p>

        <button
          type="button"
          onClick={() => move(1)}
          aria-label="Next video"
          className="group inline-flex h-12 min-w-[104px] items-center justify-center gap-2 rounded-xl border border-[#C6A45D] bg-[#C6A45D] px-4 text-[#171108] shadow-[0_10px_30px_rgba(0,0,0,0.25)] transition duration-300 hover:translate-x-1 hover:bg-[#D8B96F] hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E4C77E] sm:h-[54px] sm:min-w-[124px] sm:rounded-2xl"
        >
          <span className="text-[9px] font-bold uppercase tracking-[0.2em]">Next</span>
          <ChevronRight size={17} strokeWidth={2} className="transition-transform duration-300 group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  );
}
