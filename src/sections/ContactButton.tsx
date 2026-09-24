export function ContactButton({ className = "" }: { className?: string }) {
  return (
    <a
      href="#contact"
      className={`
        group
        inline-flex
        items-center
        justify-center
        gap-3
        rounded-full
        border
        border-[#D7E2EA]/35
        bg-[#08090A]
        px-7
        py-3
        text-xs
        font-semibold
        uppercase
        tracking-[0.18em]
        text-[#D7E2EA]
        transition-all
        duration-300
        hover:border-[#D7E2EA]
        hover:bg-[#D7E2EA]
        hover:text-[#08090A]
        sm:px-9
        sm:py-3.5
        sm:text-sm
        md:px-10
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
    </a>
  );
}