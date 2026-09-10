/**
 * Stands in for the hero portrait until you have a real character render.
 * See the README for how to create one, then swap this out for a plain
 * <img src="/character.png" ... /> in HeroSection.tsx.
 */
export function CharacterPlaceholder({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flex aspect-[3/4] w-full flex-col items-center justify-center gap-3 rounded-[32px] border-2 border-dashed border-[#3a3f45] bg-gradient-to-b from-[#15171a] to-[#0c0c0c] ${className}`}
    >
      <svg width="72" height="72" viewBox="0 0 72 72" fill="none" aria-hidden="true">
        <circle cx="36" cy="26" r="14" stroke="#4a5057" strokeWidth="2" />
        <path
          d="M12 64c0-14 10.7-24 24-24s24 10 24 24"
          stroke="#4a5057"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
      <p className="px-4 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-[#6b7178]">
        Your character
        <br />
        goes here
      </p>
    </div>
  );
}
