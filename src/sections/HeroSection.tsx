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
      className="relative flex min-h-[720px] h-[100svh] flex-col justify-between"
      style={{ overflowX: "clip" }}
    >
      <FadeIn delay={0} y={-20} as="nav">
        <div className="flex items-center justify-between gap-4 px-4 pt-5 sm:px-6 sm:pt-6 md:px-10 md:pt-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-[10px] font-medium uppercase tracking-[0.12em] text-[#D7E2EA] transition-opacity duration-200 hover:opacity-70 sm:text-xs sm:tracking-wider md:text-lg lg:text-[1.4rem]"
            >
              {link.label}
            </a>
          ))}
        </div>
      </FadeIn>

      <Magnet
        padding={150}
        strength={3}
        activeTransition="transform 0.3s ease-out"
        inactiveTransition="transform 0.6s ease-in-out"
        className="absolute bottom-[16%] left-1/2 z-10 w-[220px] -translate-x-1/2 translate-y-0 sm:bottom-0 sm:w-[340px] md:w-[440px] lg:w-[520px]"
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

      <div className="mt-6 overflow-hidden sm:mt-4 md:-mt-5">
        <FadeIn delay={0.15} y={40}>
          <h1 className="hero-heading w-full whitespace-nowrap text-[13.5vw] font-black uppercase leading-none tracking-[-0.04em] sm:text-[15vw] sm:tracking-tight md:text-[16vw] lg:text-[17.5vw]">
            Hi, i&apos;m Saptaraj
          </h1>
        </FadeIn>
      </div>

      <div className="flex items-end justify-between gap-4 px-4 pb-5 sm:px-6 sm:pb-7 md:px-10 md:pb-10">
        <FadeIn delay={0.35} y={20}>
          <p className="max-w-[125px] font-light uppercase leading-snug tracking-[0.04em] text-[#D7E2EA] sm:max-w-[220px] sm:tracking-wide md:max-w-[260px]" style={{ fontSize: "clamp(0.72rem, 1.4vw, 1.5rem)" }}>
            I design visuals that speak,
            <br />
            edit stories that flow,
            <br />
            and create work
            <br />
            people remember.
          </p>
        </FadeIn>

        <FadeIn delay={0.5} y={20}>
          <ContactButton className="shrink-0" />
        </FadeIn>
      </div>
    </section>
  );
}
