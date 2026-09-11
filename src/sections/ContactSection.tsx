import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Mail } from "lucide-react";

const email = "borthakursaptaraj@gmail.com";

const links = [
  {
    label: "EMAIL",
    value: email,
    href: `mailto:${email}`,
  },
  {
    label: "LINKEDIN",
    value: "linkedin.com/in/saptaraj-borthakur-94741b28b",
    href: "https://www.linkedin.com/in/saptaraj-borthakur-94741b28b/",
  },
  {
    label: "BEHANCE",
    value: "behance.net/saptaraborthak",
    href: "https://www.behance.net/saptaraborthak",
  },
];

export function ContactSection() {
  const reducedMotion = useReducedMotion();

  return (
    <>
      <section
        id="contact"
        className="relative overflow-hidden bg-[#08090A] py-24 sm:py-32 lg:py-48"
      >
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, y: 30 }}
            whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.75 }}
            className="relative"
          >
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.38em] text-[#52616C]">
              HAVE A PROJECT IN MIND?
            </p>

            <h2
              className="hero-heading max-w-[1200px] font-black uppercase leading-[0.82] tracking-[-0.05em]"
              style={{ fontSize: "clamp(3.6rem, 11vw, 150px)" }}
            >
              LET&apos;S
              <br />
              CREATE.
            </h2>

            <div className="mt-10 grid gap-7 sm:mt-12 sm:gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
              <p className="max-w-xl text-base font-medium leading-7 text-[#71808C] sm:text-lg">
                Looking for graphic design, video editing, UI/UX, branding or
                creative direction? Let&apos;s turn the idea into something
                worth remembering.
              </p>

              <a
                href={`mailto:${email}?subject=Project%20Enquiry`}
                className="group inline-flex w-full items-center justify-center gap-3 rounded-full border-2 border-[#D7E2EA] bg-[#D7E2EA] px-6 py-4 text-[10px] sm:px-7 sm:text-xs font-black uppercase tracking-[0.2em] text-[#08090A] transition-all duration-300 hover:-translate-y-1 hover:border-white hover:bg-white"
              >
                <Mail size={16} />
                Start a Project
                <ArrowUpRight
                  size={17}
                  className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </a>
            </div>
          </motion.div>

          <div className="mt-16 border-t border-[#D7E2EA]/10 sm:mt-24">
            <div className="grid divide-y divide-[#D7E2EA]/10 sm:grid-cols-2 lg:grid-cols-3 sm:divide-x sm:divide-y-0">
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="group py-6 sm:px-7 sm:py-7 first:sm:pl-0 last:sm:pr-0"
                >
                  <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.3em] text-[#52616C]">
                    {link.label}
                  </p>
                  <div className="flex items-center justify-between gap-4">
                    <span className="break-all text-sm font-bold text-[#D7E2EA] transition-colors duration-300 group-hover:text-white">
                      {link.value}
                    </span>
                    <ArrowUpRight
                      size={16}
                      className="shrink-0 text-[#52616C] transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[#D7E2EA]"
                    />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-[#D7E2EA]/10 bg-[#08090A]">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-5 px-5 py-7 sm:px-8 sm:py-8 lg:flex-row lg:items-center lg:justify-between lg:px-12">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-[#D7E2EA]">
            SAPTARAJ BORTHAKUR
          </p>

          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#52616C]">
            GRAPHIC DESIGN · VIDEO · UI/UX · BRANDING
          </p>

          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#52616C]">
            © 2026
          </p>
        </div>
      </footer>
    </>
  );
}

export default ContactSection;
