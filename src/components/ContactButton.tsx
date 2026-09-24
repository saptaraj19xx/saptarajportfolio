import { useEffect, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";

export function ContactButton({ className = "" }: { className?: string }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = new FormData(event.currentTarget);
    const firstName = String(form.get("firstName") || "").trim();
    const lastName = String(form.get("lastName") || "").trim();
    const email = String(form.get("email") || "").trim();
    const message = String(form.get("message") || "").trim();

    const name = `${firstName} ${lastName}`.trim();

    const subject = `Portfolio Inquiry${name ? ` — ${name}` : ""}`;
    const body = [
      `Name: ${name || "Not provided"}`,
      `Email: ${email || "Not provided"}`,
      "",
      "Message:",
      message || "No message provided.",
    ].join("\n");

    window.location.href =
      `mailto:borthakursaptaraj@gmail.com?subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(body)}`;
  };

  return (
    <>
      <button
  type="button"
  onClick={() => setOpen(true)}
  className={`
    group
    inline-flex
    items-center
    justify-center
    gap-3
    rounded-full
    border
    border-[#304653]
    bg-[#25292A]
    px-8
    py-3.5
    text-xs
    font-semibold
    uppercase
    tracking-[0.18em]
    text-[#F1F1ED]
    shadow-[0_8px_24px_rgba(0,0,0,0.18)]
    transition-all
    duration-300
    hover:-translate-y-0.5
    hover:border-[#526775]
    hover:bg-[#2C3132]
    sm:px-10
    sm:py-4
    sm:text-sm
    md:px-11
    md:py-4
    md:text-base
    ${className}
  `}
>
  <span>Contact Me</span>

  <svg
    viewBox="0 0 16 16"
    fill="none"
    className="
      h-3.5
      w-3.5
      transition-transform
      duration-300
      group-hover:translate-x-0.5
      group-hover:-translate-y-0.5
    "
    aria-hidden="true"
  >
    <path
      d="M4 12L12 4M6 4H12V10"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
</button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/75 px-4 py-6 backdrop-blur-md sm:px-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) setOpen(false);
            }}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="contact-title"
              className="relative max-h-[92vh] w-full max-w-5xl overflow-y-auto rounded-[30px] border border-[#D7E2EA]/15 bg-[#0C0C0C] shadow-[0_30px_100px_rgba(0,0,0,0.7)]"
              initial={{ opacity: 0, y: 35, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 25, scale: 0.97 }}
              transition={{ duration: 0.3 }}
            >
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close contact form"
                className="absolute right-5 top-5 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-[#D7E2EA]/15 text-2xl font-light text-[#D7E2EA] transition hover:bg-white/5"
              >
                ×
              </button>

              <div className="relative grid gap-10 p-7 sm:p-10 md:grid-cols-[0.8fr_1.2fr] md:gap-14 md:p-14 lg:p-16">
                <div className="flex flex-col justify-between">
                  <div>
                    <p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-[#D7E2EA]/40">
                      Saptaraj / Contact
                    </p>

                    <h2
                      id="contact-title"
                      className="text-5xl font-black uppercase leading-[0.88] tracking-tight text-[#D7E2EA] sm:text-6xl md:text-7xl"
                    >
                      Get in
                      <br />
                      Touch.
                    </h2>

                    <p className="mt-7 max-w-sm text-sm leading-7 text-[#D7E2EA]/55 sm:text-base">
                      Have a project, collaboration, or idea in mind? Tell me
                      a little about it and let&apos;s create something worth
                      remembering.
                    </p>
                  </div>

                  <div className="mt-10 md:mt-16">
                    <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#D7E2EA]/35">
                      Email
                    </p>
                    <a
                      href="mailto:borthakursaptaraj@gmail.com"
                      className="break-all text-sm font-medium text-[#D7E2EA] transition-opacity hover:opacity-70 sm:text-base"
                    >
                      borthakursaptaraj@gmail.com
                    </a>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="relative">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <label className="block">
                      <span className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.25em] text-[#D7E2EA]/45">
                        First Name
                      </span>
                      <input
                        name="firstName"
                        type="text"
                        required
                        autoComplete="given-name"
                        className="w-full rounded-2xl border border-[#D7E2EA]/15 bg-white/[0.025] px-4 py-4 text-sm text-[#D7E2EA] outline-none transition focus:border-fuchsia-500/60 focus:bg-white/[0.04]"
                      />
                    </label>

                    <label className="block">
                      <span className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.25em] text-[#D7E2EA]/45">
                        Last Name
                      </span>
                      <input
                        name="lastName"
                        type="text"
                        required
                        autoComplete="family-name"
                        className="w-full rounded-2xl border border-[#D7E2EA]/15 bg-white/[0.025] px-4 py-4 text-sm text-[#D7E2EA] outline-none transition focus:border-fuchsia-500/60 focus:bg-white/[0.04]"
                      />
                    </label>
                  </div>

                  <label className="mt-5 block">
                    <span className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.25em] text-[#D7E2EA]/45">
                      Email
                    </span>
                    <input
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      className="w-full rounded-2xl border border-[#D7E2EA]/15 bg-white/[0.025] px-4 py-4 text-sm text-[#D7E2EA] outline-none transition focus:border-fuchsia-500/60 focus:bg-white/[0.04]"
                    />
                  </label>

                  <label className="mt-5 block">
                    <span className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.25em] text-[#D7E2EA]/45">
                      Message
                    </span>
                    <textarea
                      name="message"
                      required
                      rows={6}
                      className="w-full resize-none rounded-2xl border border-[#D7E2EA]/15 bg-white/[0.025] px-4 py-4 text-sm leading-6 text-[#D7E2EA] outline-none transition focus:border-fuchsia-500/60 focus:bg-white/[0.04]"
                    />
                  </label>

                  <div className="mt-6 flex flex-wrap gap-4">
                    <button
                      type="submit"
                      className="
                        inline-flex
                        items-center
                        justify-center
                        rounded-full
                        border
                        border-white
                        bg-white
                        px-8
                        py-3.5
                        text-xs
                        font-semibold
                        uppercase
                        tracking-[0.18em]
                        text-[#08090A]
                        transition-all
                        duration-300
                        hover:-translate-y-0.5
                        hover:bg-[#D7E2EA]
                        hover:border-[#D7E2EA]
                        sm:px-10
                        sm:text-sm
                      "
                    >
                      Send Message
                    </button>

                    <button
                      type="button"
                      onClick={() => setOpen(false)}
                      className="rounded-full border border-[#D7E2EA]/15 px-7 py-3.5 text-xs font-semibold uppercase tracking-widest text-[#D7E2EA]/60 transition hover:border-[#D7E2EA]/30 hover:text-[#D7E2EA]"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
