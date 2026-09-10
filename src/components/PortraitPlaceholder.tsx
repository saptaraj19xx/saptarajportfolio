/**
 * Stand-in for the hero portrait until you have a real character render.
 * Swap it out once ready — see the "Creating your character" section in
 * README.md for how to get one made, then replace <PortraitPlaceholder />
 * in HeroSection.tsx with a plain <img src="/your-character.png" ... />.
 */
export function PortraitPlaceholder({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 500"
      className={className}
      role="img"
      aria-label="Placeholder character illustration"
    >
      <defs>
        <linearGradient id="portraitGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#646973" />
          <stop offset="100%" stopColor="#BBCCD7" />
        </linearGradient>
        <linearGradient id="portraitBg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1a1a1c" />
          <stop offset="100%" stopColor="#101012" />
        </linearGradient>
      </defs>

      <rect x="0" y="0" width="400" height="500" rx="24" fill="url(#portraitBg)" />

      {/* simple abstract bust silhouette */}
      <circle cx="200" cy="185" r="82" fill="url(#portraitGrad)" opacity="0.9" />
      <path
        d="M 70 480 C 70 360 120 300 200 300 C 280 300 330 360 330 480 Z"
        fill="url(#portraitGrad)"
        opacity="0.9"
      />

      {/* thin editorial frame lines, consistent with the site's mono/coordinate motifs */}
      <rect
        x="16"
        y="16"
        width="368"
        height="468"
        rx="20"
        fill="none"
        stroke="rgba(215,226,234,0.25)"
        strokeWidth="1"
      />
      <text
        x="32"
        y="464"
        fill="rgba(215,226,234,0.5)"
        fontFamily="monospace"
        fontSize="11"
        letterSpacing="2"
      >
        S.B — 01
      </text>
    </svg>
  );
}
