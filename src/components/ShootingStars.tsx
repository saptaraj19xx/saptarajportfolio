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
      {/* A real transparent starfield texture keeps the stars visible at every viewport size. */}
      <img
        src={starfieldSky}
        alt=""
        draggable={false}
        className="absolute inset-0 z-0 h-full w-full select-none object-cover opacity-[0.88]"
      />

      {/* Fine meteor trails move over the static night sky. */}
      <span className="shooting-star shooting-star--one" />
      <span className="shooting-star shooting-star--two" />
    </div>
  );
}
