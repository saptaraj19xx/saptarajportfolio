import { useState } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { VideoCarousel } from "../components/VideoCarousel";
import { ShootingStars } from "../components/ShootingStars";

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

type VideoItem = {
  src: string;
  label: string;
  title: string;
  poster: string;
  vertical?: boolean;
};

const VIDEOS: VideoItem[] = [
  { src: videoUrl("Instagram Reel 1.mp4"), poster: posterUrl("Instagram Reel 1.webp"), label: "Instagram Reel", title: "Reel 01", vertical: true },
  { src: videoUrl("Instagram Reel 2.mp4"), poster: posterUrl("Instagram Reel 2.webp"), label: "Instagram Reel", title: "Reel 02", vertical: true },
  { src: videoUrl("Instagram Reel 3.mp4"), poster: posterUrl("Instagram Reel 3.webp"), label: "Instagram Reel", title: "Reel 03", vertical: true },
  { src: videoUrl("podcast 1.mp4"), poster: posterUrl("podcast 1.webp"), label: "Podcast Edit", title: "Podcast 01", vertical: true },
  { src: videoUrl("podcast 2.mp4"), poster: posterUrl("podcast 2.webp"), label: "Podcast Edit", title: "Podcast 02", vertical: true },
  { src: videoUrl("podcast 3.mp4"), poster: posterUrl("podcast 3.webp"), label: "Podcast Edit", title: "Podcast 03", vertical: true },
  { src: videoUrl("podcast 4.mp4"), poster: posterUrl("podcast 4.webp"), label: "Podcast Edit", title: "Podcast 04", vertical: true },
  { src: videoUrl("podcast 5.mp4"), poster: posterUrl("podcast 5.webp"), label: "Podcast Edit", title: "Podcast 05", vertical: true },
];

export const VIDEO_COUNT = VIDEOS.length;

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

export function VideoShowcaseSection() {
  const [selected, setSelected] = useState<VideoItem | null>(null);

  return (
    <>
      <section
        id="video-work"
        className="relative isolate starfield-section overflow-hidden bg-[#0C0C0C] px-5 pb-24 pt-16 sm:px-8 sm:pb-28 sm:pt-20 md:px-10 md:pb-36 md:pt-28"
      >
        <ShootingStars className="z-[5]" />
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

          {/* 3D video carousel */}
          <VideoCarousel videos={VIDEOS} onSelect={setSelected} />

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
        <VideoModal video={selected} onClose={() => setSelected(null)} />
      ) : null}
    </>
  );
}
