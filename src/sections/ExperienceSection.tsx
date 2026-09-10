import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Download } from "lucide-react";

const experience = [
  {
    number: "01",
    role: "Freelance Graphic Designer & Video Editor",
    company: "Fiverr · Upwork",
    period: "JAN 2023 — PRESENT",
    description:
      "Designing and delivering social media graphics, promotional creatives, thumbnails, branding assets, and short-form video content for international and Indian clients.",
    highlights: [
      "100+ social media graphics, promotional creatives, thumbnails, and branding assets",
      "Short-form content for Instagram Reels, YouTube Shorts, and TikTok",
      "End-to-end brand identity projects for 15+ clients",
      "AI-assisted workflows using Gemini and Imagen",
    ],
  },
  {
    number: "02",
    role: "Content & Visual Designer",
    company: "ARTSET Organization",
    period: "AUG 2023 — NOV 2023",
    description:
      "Created promotional reels and visual content for student career development campaigns, combining storytelling, motion graphics, and visual editing.",
    highlights: [
      "20+ video and graphic assets across a four-month contract",
      "Promotional and testimonial video editing",
      "Motion graphics using After Effects and Premiere Pro",
      "Campaign content reaching 10,000+ impressions per post",
    ],
  },
];

const selectedProjects = [
  {
    number: "01",
    name: "GameBazaar",
    type: "MARKETPLACE APP UI/UX",
    period: "2025 — PRESENT",
  },
  {
    number: "02",
    name: "CodeCrack",
    type: "GAME UI DESIGN",
    period: "2024",
  },
  {
    number: "03",
    name: "ARTSET Promotional Training Reel",
    type: "VIDEO · MOTION GRAPHICS",
    period: "2023",
  },
];

const education = [
  {
    title: "Diploma in Animation & VFX",
    place: "Arena Animation / Aptech",
    period: "2022 — 2024",
  },
  {
    title: "B.A. (Hons) Geography",
    place: "Tinsukia College · Dibrugarh University",
    period: "2018 — 2021",
  },
];

const certifications = [
  "Adobe Photoshop Certification",
  "Graphic Design Basics — California Institute of the Arts",
  "UX Design Workshop — Google UX Design Team",
  "Video Editing Bootcamp — SkillShare",
  "AI Tools Mastery Workshop — Clapingo",
  "Build Real-World AI Applications with Gemini and Imagen — Google Cloud",
  "AI for Beginners — HP LIFE",
];

const tools = [
  "Photoshop",
  "Illustrator",
  "InDesign",
  "Figma",
  "Premiere Pro",
  "After Effects",
  "CapCut",
  "DaVinci Resolve",
  "Blender",
  "Gemini",
  "Imagen",
];

export function ExperienceSection() {
  const reducedMotion = useReducedMotion();

  return (
    <section
      id="experience"
      className="relative overflow-hidden bg-[#08090A] py-24 sm:py-36 lg:py-44"
    >
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        {/* Section intro */}
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 30 }}
          whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7 }}
          className="mb-16 sm:mb-28"
        >
          <p className="mb-5 text-xs font-bold uppercase tracking-[0.38em] text-[#52616C]">
            EXPERIENCE · CREDENTIALS · DIRECTION
          </p>

          <h2
            className="hero-heading max-w-[1100px] font-black uppercase leading-[0.84] tracking-[-0.045em]"
            style={{ fontSize: "clamp(3.4rem, 9vw, 118px)" }}
          >
            EXPERIENCE
          </h2>

          <p className="mt-8 max-w-2xl text-base font-medium leading-7 text-[#71808C] sm:text-lg">
            A creative practice built across graphic design, video editing,
            motion graphics, UI/UX and AI-assisted creative workflows.
          </p>
        </motion.div>

        {/* Experience */}
        <div className="mb-28">
          <div className="mb-8 flex items-end justify-between border-b border-[#D7E2EA]/10 pb-5">
            <div>
              <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.35em] text-[#52616C]">
                PROFESSIONAL EXPERIENCE
              </p>
              <h3 className="text-3xl font-black uppercase tracking-tight text-[#D7E2EA] sm:text-5xl">
                WORK
              </h3>
            </div>
            <span className="hidden text-xs font-bold uppercase tracking-[0.25em] text-[#52616C] sm:block">
              3+ YEARS
            </span>
          </div>

          <div className="divide-y divide-[#D7E2EA]/10">
            {experience.map((item) => (
              <motion.article
                key={item.number}
                initial={reducedMotion ? false : { opacity: 0, y: 25 }}
                whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6 }}
                className="grid gap-8 py-10 lg:grid-cols-[110px_minmax(0,1fr)_minmax(300px,0.7fr)] lg:gap-12"
              >
                <div className="text-5xl font-black tracking-[-0.06em] text-[#D7E2EA] sm:text-6xl">
                  {item.number}
                </div>

                <div>
                  <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.3em] text-[#52616C]">
                    {item.company}
                  </p>
                  <h4 className="max-w-xl text-2xl font-black uppercase leading-tight text-[#D7E2EA] sm:text-4xl">
                    {item.role}
                  </h4>
                  <p className="mt-4 max-w-2xl text-sm font-medium leading-6 text-[#71808C] sm:text-base">
                    {item.description}
                  </p>
                </div>

                <div>
                  <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.25em] text-[#52616C]">
                    {item.period}
                  </p>
                  <ul className="space-y-3">
                    {item.highlights.map((highlight) => (
                      <li
                        key={highlight}
                        className="flex gap-3 text-sm font-medium leading-6 text-[#9AA7B0]"
                      >
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#D7E2EA]" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.article>
            ))}
          </div>
        </div>

        {/* Selected projects */}
        <div className="mb-28">
          <div className="mb-8 border-b border-[#D7E2EA]/10 pb-5">
            <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.35em] text-[#52616C]">
              SELECTED PROJECTS
            </p>
            <h3 className="text-3xl font-black uppercase tracking-tight text-[#D7E2EA] sm:text-5xl">
              SELECTED WORK
            </h3>
          </div>

          <div className="divide-y divide-[#D7E2EA]/10">
            {selectedProjects.map((project) => (
              <div
                key={project.number}
                className="grid gap-4 py-7 sm:grid-cols-[90px_1fr_auto] sm:items-center sm:gap-5"
              >
                <span className="text-4xl font-black tracking-[-0.05em] text-[#D7E2EA]">
                  {project.number}
                </span>

                <div>
                  <p className="text-xl font-black uppercase text-[#D7E2EA] sm:text-2xl">
                    {project.name}
                  </p>
                  <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.25em] text-[#52616C]">
                    {project.type}
                  </p>
                </div>

                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#52616C] sm:text-xs">
                  {project.period}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Education + certifications + tools */}
        <div className="grid gap-16 lg:grid-cols-3">
          <div>
            <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.35em] text-[#52616C]">
              EDUCATION
            </p>
            <h3 className="mb-8 text-3xl font-black uppercase text-[#D7E2EA]">
              EDUCATION
            </h3>

            <div className="space-y-7">
              {education.map((item) => (
                <div key={item.title} className="border-t border-[#D7E2EA]/10 pt-5">
                  <p className="text-lg font-black uppercase text-[#D7E2EA]">
                    {item.title}
                  </p>
                  <p className="mt-2 text-sm text-[#71808C]">{item.place}</p>
                  <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#52616C]">
                    {item.period}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.35em] text-[#52616C]">
              TRAINING
            </p>
            <h3 className="mb-8 text-3xl font-black uppercase text-[#D7E2EA]">
              CERTIFICATIONS
            </h3>

            <ul className="space-y-3">
              {certifications.map((item) => (
                <li
                  key={item}
                  className="border-b border-[#D7E2EA]/10 pb-3 text-sm font-medium leading-6 text-[#9AA7B0]"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.35em] text-[#52616C]">
              CREATIVE STACK
            </p>
            <h3 className="mb-8 text-3xl font-black uppercase text-[#D7E2EA]">
              TOOLS
            </h3>

            <div className="flex flex-wrap gap-2">
              {tools.map((tool) => (
                <span
                  key={tool}
                  className="rounded-full border border-[#D7E2EA]/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.08em] text-[#9AA7B0]"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Resume CTA */}
        <div className="mt-20 border-t border-[#D7E2EA]/10 pt-10">
          <a
            href="#contact"
            className="group inline-flex items-center gap-3 rounded-full border-2 border-[#D7E2EA] bg-[#D7E2EA] px-7 py-4 text-xs font-black uppercase tracking-[0.2em] text-[#08090A] transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:border-white"
          >
            <Download size={15} />
            Discuss a project
            <ArrowUpRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </a>
        </div>
      </div>
    </section>
  );
}

export default ExperienceSection;
