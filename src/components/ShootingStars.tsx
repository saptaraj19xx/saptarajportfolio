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
      {/* The same fixed-size star texture is used in every section. */}
      <div
        className="absolute inset-0 z-0 opacity-[0.88]"
        style={{
          backgroundImage: `url(${starfieldSky})`,
          backgroundPosition: "center top",
          backgroundRepeat: "repeat",
          backgroundSize: "1600px 900px",
        }}
      />

      {/* Meteors stay in the background stack: above the tiny stars,
          but behind headings, cards, buttons and other section content. */}
      <span className="shooting-star shooting-star--one" />
      <span className="shooting-star shooting-star--two" />
      <span className="shooting-star shooting-star--three" />
    </div>
  );
}
