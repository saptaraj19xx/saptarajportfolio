/**
 * Simple abstract decorative shapes for the About section corners, drawn
 * inline instead of hotlinking external image assets from someone else's
 * site. Swap "variant" or replace with your own graphics any time.
 */
export function DecorShape({
  variant,
  className = "",
}: {
  variant: "ring" | "cube" | "blob" | "grid";
  className?: string;
}) {
  const common = { width: "100%", height: "100%", "aria-hidden": true } as const;

  if (variant === "ring") {
    return (
      <div className={className}>
        <svg viewBox="0 0 200 200" {...common}>
          <circle cx="100" cy="100" r="80" stroke="#4a5057" strokeWidth="1.5" fill="none" />
          <circle cx="100" cy="100" r="55" stroke="#2f3338" strokeWidth="1" fill="none" />
        </svg>
      </div>
    );
  }

  if (variant === "cube") {
    return (
      <div className={className}>
        <svg viewBox="0 0 200 200" {...common}>
          <path
            d="M100 20 175 60 175 140 100 180 25 140 25 60Z"
            stroke="#4a5057"
            strokeWidth="1.5"
            fill="none"
          />
          <path d="M25 60 100 100 175 60M100 100V180" stroke="#4a5057" strokeWidth="1.5" fill="none" />
        </svg>
      </div>
    );
  }

  if (variant === "blob") {
    return (
      <div className={className}>
        <svg viewBox="0 0 200 200" {...common}>
          <path
            d="M100 30c40 0 65 30 65 65s-30 70-70 70-60-35-60-70 25-65 65-65Z"
            fill="#15171a"
            stroke="#4a5057"
            strokeWidth="1.5"
          />
        </svg>
      </div>
    );
  }

  return (
    <div className={className}>
      <svg viewBox="0 0 200 200" {...common}>
        {[0, 1, 2, 3].map((row) =>
          [0, 1, 2, 3].map((col) => (
            <circle key={`${row}-${col}`} cx={30 + col * 47} cy={30 + row * 47} r="4" fill="#4a5057" />
          ))
        )}
      </svg>
    </div>
  );
}
