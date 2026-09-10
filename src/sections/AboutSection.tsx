import { FadeIn } from "../components/FadeIn";
import { AnimatedText } from "../components/AnimatedText";
import { ContactButton } from "../components/ContactButton";

import crystalStar from "../assets/about/crystal-star.png";
import neonCursor from "../assets/about/neon-cursor.png";
import neonSmiley from "../assets/about/neon-smiley.png";
import ringedPlanet from "../assets/about/ringed-planet.png";

const ABOUT_TEXT =
  "I enjoy turning ideas into visuals, interfaces and experiences that feel clear, expressive and memorable — from a poster to a full product interface to the final cut of a film.";

export function AboutSection() {
  return (
    <section
      id="about"
      className="relative flex min-h-[680px] flex-col items-center justify-center overflow-hidden px-5 py-20 sm:min-h-screen sm:px-8 md:px-10"
    >
      {/* =========================================================
          DECORATIVE 3D ASSETS
          ========================================================= */}

      {/* Top-left — Crystal Star */}
      <FadeIn
        delay={0.1}
        x={-80}
        y={0}
        duration={0.9}
        className="pointer-events-none absolute left-[3%] top-[3%] z-0 w-[110px] sm:left-[5%] sm:w-[145px] md:left-[6%] md:w-[175px]"
      >
        <img
          src={crystalStar}
          alt=""
          aria-hidden="true"
          className="h-auto w-full object-contain"
        />
      </FadeIn>

      {/* Top-right — Ringed Planet */}
      <FadeIn
        delay={0.2}
        x={80}
        y={0}
        duration={0.9}
        className="pointer-events-none absolute right-[3%] top-[4%] z-0 w-[115px] sm:right-[5%] sm:w-[150px] md:right-[6%] md:w-[185px]"
      >
        <img
          src={ringedPlanet}
          alt=""
          aria-hidden="true"
          className="h-auto w-full object-contain"
        />
      </FadeIn>

      {/* Bottom-left — Neon Smiley */}
      <FadeIn
        delay={0.3}
        x={-80}
        y={20}
        duration={0.9}
        className="pointer-events-none absolute bottom-[8%] left-[5%] z-0 w-[105px] sm:left-[8%] sm:w-[140px] md:left-[10%] md:w-[170px]"
      >
        <img
          src={neonSmiley}
          alt=""
          aria-hidden="true"
          className="h-auto w-full object-contain"
        />
      </FadeIn>

      {/* Bottom-right — Neon Cursor */}
      <FadeIn
        delay={0.4}
        x={80}
        y={20}
        duration={0.9}
        className="pointer-events-none absolute bottom-[7%] right-[5%] z-0 w-[105px] sm:right-[8%] sm:w-[140px] md:right-[10%] md:w-[170px]"
      >
        <img
          src={neonCursor}
          alt=""
          aria-hidden="true"
          className="h-auto w-full object-contain"
        />
      </FadeIn>

      {/* =========================================================
          MAIN CONTENT
          ========================================================= */}

      <div className="relative z-10 flex flex-col items-center gap-10 sm:gap-14 md:gap-16">
        {/* Heading */}
        <FadeIn delay={0} y={40}>
          <h2
            className="hero-heading text-center font-black uppercase leading-none tracking-tight"
            style={{ fontSize: "clamp(2.9rem, 12vw, 160px)" }}
          >
            Hi, I&apos;m
            <br />
            Saptaraj.
          </h2>
        </FadeIn>

        {/* Animated Description */}
        <AnimatedText
          text={ABOUT_TEXT}
          className="max-w-[560px] text-center text-[clamp(1rem,2vw,1.35rem)] font-medium leading-relaxed text-[#D7E2EA]"
        />
      </div>

      {/* Contact Button */}
      <div className="relative z-10 mt-14 sm:mt-20 md:mt-24">
        <ContactButton />
      </div>
    </section>
  );
}