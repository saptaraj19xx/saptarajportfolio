import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode, ElementType } from "react";

export function FadeIn({
  children,
  delay = 0,
  duration = 0.7,
  x = 0,
  y = 30,
  as = "div",
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
  as?: ElementType;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const MotionTag = motion.create(as);

  return (
    <MotionTag
      className={className}
      initial={reduce ? undefined : { opacity: 0, x, y }}
      whileInView={reduce ? undefined : { opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "50px", amount: 0 }}
      transition={{ duration, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </MotionTag>
  );
}
