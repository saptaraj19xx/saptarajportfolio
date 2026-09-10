import { useState } from "react";
import { parseEmbedUrl, isDirectVideoFile } from "../lib/video";

export function ProjectVideo({
  videoUrl,
  posterUrl,
  title,
  className = "",
}: {
  videoUrl: string;
  posterUrl?: string;
  title: string;
  className?: string;
}) {
  const [playing, setPlaying] = useState(false);
  const embed = parseEmbedUrl(videoUrl);
  const isFile = isDirectVideoFile(videoUrl);

  if (playing) {
    if (embed) {
      return (
        <iframe
          src={`${embed.embedSrc}${embed.embedSrc.includes("?") ? "&" : "?"}autoplay=1`}
          title={title}
          className={className}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
          allowFullScreen
        />
      );
    }
    if (isFile) {
      return (
        <video src={videoUrl} controls autoPlay playsInline className={`${className} object-cover`}>
          Your browser doesn&apos;t support embedded video.
        </video>
      );
    }
  }

  const thumbnail = embed?.provider === "youtube" ? embed.thumbnail : posterUrl;

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      className={`group relative overflow-hidden bg-[#141416] ${className}`}
      aria-label={`Play video: ${title}`}
    >
      {thumbnail && (
        <img src={thumbnail} alt="" className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
      )}
      <span className="absolute inset-0 bg-black/30 transition-colors group-hover:bg-black/45" />
      <span className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#D7E2EA] transition-transform group-hover:scale-110">
        <svg width="16" height="18" viewBox="0 0 12 14" fill="none" aria-hidden="true">
          <path d="M1 1.5L11 7L1 12.5V1.5Z" fill="#0C0C0C" />
        </svg>
      </span>
    </button>
  );
}
