type ShootingStarsProps = {
  className?: string;
};

const STAR_POINTS = [
  [3, 8, 0.72, 1], [8, 22, 0.42, 1], [14, 5, 0.86, 2], [19, 16, 0.55, 1],
  [24, 7, 0.64, 1], [29, 28, 0.5, 1], [34, 12, 0.82, 2], [39, 4, 0.46, 1],
  [44, 21, 0.7, 1], [49, 9, 0.53, 1], [54, 31, 0.8, 2], [59, 14, 0.48, 1],
  [64, 5, 0.76, 1], [69, 24, 0.58, 1], [74, 11, 0.88, 2], [79, 3, 0.5, 1],
  [84, 19, 0.68, 1], [89, 7, 0.45, 1], [95, 25, 0.78, 2], [11, 39, 0.58, 1],
  [17, 52, 0.8, 1], [22, 43, 0.46, 1], [27, 61, 0.7, 2], [32, 48, 0.55, 1],
  [37, 72, 0.76, 1], [42, 56, 0.44, 1], [47, 83, 0.68, 2], [52, 46, 0.86, 1],
  [57, 66, 0.52, 1], [62, 54, 0.74, 2], [67, 78, 0.48, 1], [72, 44, 0.8, 1],
  [77, 62, 0.58, 1], [82, 49, 0.76, 2], [87, 74, 0.5, 1], [92, 57, 0.7, 1],
  [5, 82, 0.52, 1], [13, 91, 0.78, 2], [21, 77, 0.48, 1], [30, 94, 0.72, 1],
  [40, 88, 0.56, 1], [58, 93, 0.82, 2], [70, 89, 0.52, 1], [80, 96, 0.76, 1],
  [90, 86, 0.6, 1], [97, 97, 0.84, 2],
] as const;

export function ShootingStars({ className = "" }: ShootingStarsProps) {
  return (
    <div
      aria-hidden="true"
      className={`shooting-stars-layer pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {STAR_POINTS.map(([x, y, opacity, size], index) => (
        <span
          key={index}
          className="shooting-starfield-dot"
          style={{
            left: `${x}%`,
            top: `${y}%`,
            width: `${size}px`,
            height: `${size}px`,
            opacity,
            animationDelay: `${(index % 11) * -0.47}s`,
          }}
        />
      ))}
      <span className="shooting-star shooting-star--one" />
      <span className="shooting-star shooting-star--two" />
    </div>
  );
}
