type ShootingStarsProps = {
  className?: string;
};

export function ShootingStars({ className = "" }: ShootingStarsProps) {
  return (
    <div
      aria-hidden="true"
      className={`shooting-stars-layer pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      <span className="shooting-star shooting-star--one" />
      <span className="shooting-star shooting-star--two" />
      <span className="shooting-star shooting-star--three" />
      <span className="shooting-star shooting-star--four" />
    </div>
  );
}
