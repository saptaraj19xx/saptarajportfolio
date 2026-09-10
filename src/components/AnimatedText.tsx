import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion, type MotionValue } from "framer-motion";

function Character({
  char,
  index,
  total,
  scrollYProgress,
}: {
  char: string;
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
}) {
  const start = index / total;
  const end = start + 1 / total;
  const opacity = useTransform(scrollYProgress, [start, end], [0.2, 1]);
  const display = char === " " ? "\u00A0" : char;

  return (
    <span className="relative inline-block" aria-hidden="true">
      <span className="invisible">{display}</span>
      <motion.span className="absolute left-0 top-0" style={{ opacity }}>
        {display}
      </motion.span>
    </span>
  );
}

export function AnimatedText({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.2"],
  });

  if (reduce) {
    return (
      <p ref={ref} className={className}>
        {text}
      </p>
    );
  }

  const characters = Array.from(text);

  return (
    <p ref={ref} className={className} aria-label={text}>
      {characters.map((char, i) => (
        <Character key={i} char={char} index={i} total={characters.length} scrollYProgress={scrollYProgress} />
      ))}
    </p>
  );
}
