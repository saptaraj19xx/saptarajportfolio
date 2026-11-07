import starfieldSky from "../assets/starfield-sky.svg";

type ShootingStarsProps = {
  className?: string;
};

export function ShootingStars({ className = "" }: ShootingStarsProps) {
  return (
    <div
      aria-hidden="true"
      className={`shooting-stars-layer pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {/* Repeat the same fixed-size sky tile in every section. */}
      <div
        className="absolute inset-0 z-0 opacity-[0.88]"
        style={{
          backgroundImage: `url(${starfieldSky})`,
          backgroundPosition: "center top",
          backgroundRepeat: "repeat",
          backgroundSize: "1600px 900px",
        }}
      />
    </div>
  );
}

/**
 * One viewport-wide meteor layer stays active while the visitor scrolls.
 * Keeping it outside individual sections prevents the animation from
 * restarting or being missed when a section enters the viewport.
 */
export function ShootingStarOverlay() {
  return (
    <div
      aria-hidden="true"
      className="shooting-stars-overlay pointer-events-none fixed inset-0 overflow-hidden"
    >
      <span className="shooting-star shooting-star--one" />
      <span className="shooting-star shooting-star--two" />
      <span className="shooting-star shooting-star--three" />
    </div>
  );
}
