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
      {/* Repeat the same fixed-size sky tile in every section.
          This keeps star size and spacing identical in short and tall sections. */}
      <div
        className="absolute inset-0 z-0 opacity-[0.88]"
        style={{
          backgroundImage: `url(${starfieldSky})`,
          backgroundPosition: "center top",
          backgroundRepeat: "repeat",
          backgroundSize: "1600px 900px",
        }}
      />

      {/* Fine meteor trails move over the static night sky. */}
      <span className="shooting-star shooting-star--one" />
    </div>
  );
}
