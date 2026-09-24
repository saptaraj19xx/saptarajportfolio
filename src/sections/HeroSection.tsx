import { FadeIn } from "../components/FadeIn";
import { Magnet } from "../components/Magnet";
import { ContactButton } from "../components/ContactButton";
import saptarajCharacter from "../assets/saptaraj-character.png";

const NAV_LINKS = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export function HeroSection() {
  return (
    <section
      className="
        relative
        h-[760px]
        w-full
        overflow-hidden
        sm:h-[100svh]
        sm:min-h-[720px]
        md:min-h-[720px]
      "
    >
      {/* =========================================================
    TOP NAVIGATION
    ========================================================= */}

<nav
  className="
    absolute
    left-0
    right-0
    top-0
    z-[100]
    flex
    items-center
    justify-between
    gap-4
    px-4
    pt-5
    sm:px-6
    sm:pt-6
    md:px-10
    md:pt-8
  "
>
  {NAV_LINKS.map((link, index) => (
    <FadeIn
      key={link.label}
      delay={index * 0.08}
      y={-15}
    >
      <a
        href={link.href}
        className="
          block
          text-[10px]
          font-medium
          uppercase
          tracking-[0.12em]
          text-[#D7E2EA]
          transition-opacity
          duration-200
          hover:opacity-70
          sm:text-xs
          sm:tracking-wider
          md:text-lg
          lg:text-[1.4rem]
        "
      >
        {link.label}
      </a>
    </FadeIn>
  ))}
</nav>

      {/* =========================================================
          HERO NAME
          ========================================================= */}

      <div
        className="
          absolute
          left-0
          right-0
          top-[22%]
          z-10
          flex
          w-full
          justify-center
          px-3
          sm:top-[31%]
          sm:px-4
          md:top-[35%]
          md:px-6
        "
      >
        <FadeIn delay={0.15} y={35}>
          <h1
            className="
              hero-heading
              text-center
              font-black
              uppercase
              leading-[0.82]
              tracking-[-0.055em]
              sm:whitespace-nowrap
              sm:tracking-[-0.045em]
            "
            style={{
              fontSize: "clamp(4.2rem, 11.8vw, 13rem)",
            }}
          >
            {/* Mobile */}
            <span className="block sm:hidden">
              HI, I&apos;M
              <br />
              SAPTARAJ
            </span>

            {/* Tablet / Desktop */}
            <span className="hidden sm:inline">
              HI, I&apos;M SAPTARAJ
            </span>
          </h1>
        </FadeIn>
      </div>

      {/* =========================================================
          SAPTARAJ CHARACTER
          ========================================================= */}

      <Magnet
        padding={150}
        strength={3}
        activeTransition="transform 0.3s ease-out"
        inactiveTransition="transform 0.6s ease-in-out"
        className="
          absolute
          bottom-[15%]
          left-1/2
          z-20
          w-[245px]
          -translate-x-1/2
          sm:bottom-0
          sm:w-[340px]
          md:w-[440px]
          lg:w-[520px]
        "
      >
        <FadeIn delay={0.6} y={30}>
          <div className="relative flex h-auto w-full items-end justify-center">
            <img
              src={saptarajCharacter}
              alt="Saptaraj"
              className="block h-auto w-full object-contain object-bottom"
            />
          </div>
        </FadeIn>
      </Magnet>

      {/* =========================================================
          DESCRIPTION
          ========================================================= */}

      <div
        className="
          absolute
          bottom-5
          left-4
          z-30
          sm:bottom-7
          sm:left-6
          md:bottom-10
          md:left-10
        "
      >
        <FadeIn delay={0.35} y={20}>
          <p
            className="
              max-w-[145px]
              font-light
              uppercase
              leading-[1.35]
              tracking-[0.035em]
              text-[#D7E2EA]
              sm:max-w-[220px]
              sm:leading-snug
              sm:tracking-wide
              md:max-w-[260px]
            "
            style={{
              fontSize: "clamp(0.68rem, 1.25vw, 1.5rem)",
            }}
          >
            I design visuals that speak,
            <br />
            edit stories that flow,
            <br />
            and create work
            <br />
            people remember.
          </p>
        </FadeIn>
      </div>

      {/* =========================================================
          CONTACT BUTTON
          ========================================================= */}

      <div
        className="
          absolute
          bottom-5
          right-4
          z-30
          sm:bottom-7
          sm:right-6
          md:bottom-10
          md:right-10
        "
      >
        <FadeIn delay={0.5} y={20}>
          <ContactButton className="shrink-0" />
        </FadeIn>
      </div>
    </section>
  );
}