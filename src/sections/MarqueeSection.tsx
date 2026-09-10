import { useEffect, useRef } from "react";
import { ROW1_ITEMS, ROW2_ITEMS } from "../data/marqueeItems";

import chromeVideoCamera from "../assets/services/chrome-video-camera.png";
import glassPlayOrb from "../assets/services/glass-play-orb.png";
import holographicFilmReel from "../assets/services/holographic-film-reel.png";
import cyberpunkInterface from "../assets/services/iridescent-cyberpunk-interface-orbit.png";
import compassGyroscope from "../assets/services/neon-iridescent-compass-gyroscope.png";
import motionPrism from "../assets/services/neon-motion-play-prism.png";
import socialMediaOrbit from "../assets/services/neon-social-media-orbit.png";
import neonWaveform from "../assets/services/neon-waveform.png";

const SERVICE_ASSETS: Record<string, string> = {
  "graphic design": chromeVideoCamera,
  "video editing": glassPlayOrb,
  "ui/ux": holographicFilmReel,
  "ui/ux design": holographicFilmReel,
  branding: cyberpunkInterface,
  "web design": compassGyroscope,
  motion: motionPrism,
  "creative direction": socialMediaOrbit,
  "social media": neonWaveform,
};

function getAsset(label: string) {
  return SERVICE_ASSETS[label.trim().toLowerCase()] ?? null;
}

function tripled(items: string[]) {
  return [...items, ...items, ...items];
}

function Tile({ label }: { label: string }) {
  const asset = getAsset(label);

  return (
    <div
      className="
        group
        relative
        flex
        h-[190px]
        w-[300px]
        flex-shrink-0
        flex-col
        items-center
        justify-between
        rounded-2xl
        border
        border-[#D7E2EA]/15
        bg-[#141416]
        px-6
        pb-7
        pt-5
        transition-transform
        duration-300
        hover:-translate-y-1
        sm:h-[220px]
        sm:w-[360px]
      "
    >
      {/* 3D ASSET */}
      <div className="flex h-[115px] w-full items-center justify-center">
        {asset && (
          <img
            src={asset}
            alt=""
            aria-hidden="true"
            className="
              pointer-events-none
              h-[105px]
              w-[105px]
              object-contain
              transition-transform
              duration-500
              group-hover:scale-110
              sm:h-[125px]
              sm:w-[125px]
            "
          />
        )}
      </div>

      {/* SERVICE NAME */}
      <span
        className="
          relative
          z-10
          text-center
          text-lg
          font-medium
          uppercase
          tracking-wide
          text-[#D7E2EA]/70
          sm:text-2xl
        "
      >
        {label}
      </span>
    </div>
  );
}

export function MarqueeSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleScroll() {
      const section = sectionRef.current;

      if (!section) return;

      const sectionTop =
        section.getBoundingClientRect().top + window.scrollY;

      const offset =
        (window.scrollY - sectionTop + window.innerHeight) * 0.3;

      if (row1Ref.current) {
        row1Ref.current.style.transform =
          `translateX(${offset - 200}px)`;
      }

      if (row2Ref.current) {
        row2Ref.current.style.transform =
          `translateX(${-(offset - 200)}px)`;
      }
    }

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const row1 = tripled(ROW1_ITEMS);
  const row2 = tripled(ROW2_ITEMS);

  return (
    <section
      ref={sectionRef}
      className="
        bg-[#0C0C0C]
        pb-20
        pt-32
        sm:pb-24
        sm:pt-40
        md:pb-28
        md:pt-48
      "
      style={{ overflowX: "clip" }}
    >
      <div className="flex flex-col gap-10 sm:gap-14">
        {/* ROW 1 */}
        <div
          ref={row1Ref}
          className="flex gap-5 sm:gap-6"
          style={{
            willChange: "transform",
          }}
        >
          {row1.map((label, i) => (
            <Tile
              key={`row1-${label}-${i}`}
              label={label}
            />
          ))}
        </div>

        {/* ROW 2 */}
        <div
          ref={row2Ref}
          className="flex gap-5 sm:gap-6"
          style={{
            willChange: "transform",
          }}
        >
          {row2.map((label, i) => (
            <Tile
              key={`row2-${label}-${i}`}
              label={label}
            />
          ))}
        </div>
      </div>
    </section>
  );
}