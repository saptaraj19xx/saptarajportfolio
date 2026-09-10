import { FadeIn } from "../components/FadeIn";
import { SERVICES } from "../data/services";

export function ServicesSection() {
  return (
    <section
      className="rounded-t-[40px] bg-white px-5 py-20 sm:rounded-t-[50px] sm:px-8 sm:py-24 md:rounded-t-[60px] md:px-10 md:py-32"
    >
      <FadeIn>
        <h2
          className="mb-16 text-center font-black uppercase text-[#0C0C0C] sm:mb-20 md:mb-28"
          style={{ fontSize: "clamp(3rem, 12vw, 160px)" }}
        >
          Services
        </h2>
      </FadeIn>

      <div className="mx-auto max-w-5xl">
        {SERVICES.map((service, i) => (
          <FadeIn key={service.number} delay={i * 0.1}>
            <div
              className="flex items-start gap-4 border-t py-7 last:border-b sm:gap-6 sm:py-10 md:py-12"
              style={{ borderColor: "rgba(12, 12, 12, 0.15)" }}
            >
              <span
                className="w-[72px] shrink-0 font-black leading-none text-[#0C0C0C] sm:w-auto"
                style={{ fontSize: "clamp(2.9rem, 10vw, 140px)" }}
              >
                {service.number}
              </span>
              <div className="flex flex-col justify-center gap-3">
                <h3
                  className="font-medium uppercase text-[#0C0C0C]"
                  style={{ fontSize: "clamp(1rem, 2.2vw, 2.1rem)" }}
                >
                  {service.name}
                </h3>
                <p
                  className="max-w-2xl font-light leading-relaxed text-[#0C0C0C] opacity-60"
                  style={{ fontSize: "clamp(0.85rem, 1.6vw, 1.25rem)" }}
                >
                  {service.description}
                </p>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
