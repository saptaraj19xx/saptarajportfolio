import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { X, Play } from "lucide-react";

import reel1 from "../assets/videos/Instagram Reel 1.mp4";
import reel2 from "../assets/videos/Instagram Reel 2.mp4";
import reel3 from "../assets/videos/Instagram Reel 3.mp4";
import podcast1 from "../assets/videos/Podcast 1.mp4";
import podcast2 from "../assets/videos/podcast 2.mp4";
import podcast3 from "../assets/videos/podcast 3.mp4";
import podcast4 from "../assets/videos/podcast 4.mp4";
import podcast5 from "../assets/videos/podcast 5.mp4";

type VideoItem = {
  src: string;
  label: string;
  title: string;
  vertical?: boolean;
};

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


function VideoCard({
  video,
  index,
  onOpen,
}: {
  video: VideoItem;
  index: number;
  onOpen: (video: VideoItem) => void;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const inView = useInView(ref, {
    once: true,
    margin: "-80px",
  });

  return (
    <motion.button
      ref={ref}
      type="button"
      onClick={() => onOpen(video)}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.7,
        delay: index * 0.06,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`group relative overflow-hidden rounded-[28px] border border-[#D7E2EA]/15 bg-[#111214] text-left shadow-[0_20px_70px_rgba(0,0,0,0.25)] sm:rounded-[36px] ${
        video.vertical ? "aspect-[9/14]" : "aspect-video"
      }`}
      aria-label={`Open ${video.title}`}
    >
      <video
        src={video.src}
        muted
        loop
        autoPlay
        playsInline
        preload="metadata"
        className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.045]"
      />

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-90" />

      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 sm:p-6">
        <div>
          <p className="mb-1 text-[9px] font-semibold uppercase tracking-[0.28em] text-[#D7E2EA]/55 sm:text-[10px]">
            {video.label}
          </p>

          <h3 className="text-xl font-semibold uppercase tracking-tight text-[#D7E2EA] sm:text-2xl">
            {video.title}
          </h3>
        </div>

        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[#D7E2EA]/35 bg-black/30 text-[#D7E2EA] backdrop-blur-sm transition duration-300 group-hover:bg-[#D7E2EA] group-hover:text-[#0C0C0C]">
          <Play size={15} fill="currentColor" />
        </span>
      </div>
    </motion.button>
  );
}

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

export function VideoShowcaseSection() {
  const [selected, setSelected] = useState<VideoItem | null>(null);

  return (
    <>
      <section
        id="video-work"
        className="relative overflow-hidden bg-[#0C0C0C] px-5 pb-24 pt-16 sm:px-8 sm:pb-28 sm:pt-20 md:px-10 md:pb-36 md:pt-28"
      >
        {/* Ambient glow */}
        <div className="pointer-events-none absolute left-1/2 top-[20%] h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-[#273747]/10 blur-[140px]" />

        <div className="relative z-10 mx-auto max-w-[1500px]">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="mb-12 flex flex-col items-start justify-between gap-5 sm:mb-16 sm:flex-row sm:items-end md:mb-20"
          >
            <div>
              <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.35em] text-[#D7E2EA]/40 sm:text-xs">
                Motion / Reels / Shorts
              </p>

              <h2
                className="hero-heading font-black uppercase leading-[0.82] tracking-tight"
                style={{ fontSize: "clamp(4rem, 12vw, 150px)" }}
              >
                Video
              </h2>
            </div>

            <p className="max-w-sm text-sm leading-relaxed text-[#D7E2EA]/45 sm:text-base">
              Selected edits, short-form content and motion work — built to
              catch attention and keep it.
            </p>
          </motion.div>

          {/* Videos */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            {VIDEOS.map((video, index) => (
              <VideoCard
                key={video.title}
                video={video}
                index={index}
                onOpen={setSelected}
              />
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="mt-10 flex justify-center sm:mt-14">
            <a
              href="#about"
              className="rounded-full border border-[#D7E2EA]/25 px-7 py-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#D7E2EA]/75 transition duration-300 hover:border-[#D7E2EA]/60 hover:bg-[#D7E2EA]/10 hover:text-[#D7E2EA] sm:px-9 sm:py-3.5 sm:text-xs"
            >
              Continue to About Me
            </a>
          </div>
        </div>
      </section>

      {selected ? (
        <VideoModal
          video={selected}
          onClose={() => setSelected(null)}
        />
      ) : null}
    </>
  );
}