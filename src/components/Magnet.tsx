import { useEffect, useRef, type ReactNode } from "react";

export function Magnet({
  children,
  padding = 100,
  strength = 4,
  activeTransition = "transform 0.3s ease-out",
  inactiveTransition = "transform 0.6s ease-in-out",
  className = "",
  disabled = false,
}: {
  children: ReactNode;
  padding?: number;
  strength?: number;
  activeTransition?: string;
  inactiveTransition?: string;
  className?: string;
  disabled?: boolean;
}) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const isActiveRef = useRef(false);

  useEffect(() => {
    if (disabled) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    function handleMouseMove(e: MouseEvent) {
      const el = wrapperRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distX = Math.max(rect.left - padding - e.clientX, e.clientX - (rect.right + padding), 0);
      const distY = Math.max(rect.top - padding - e.clientY, e.clientY - (rect.bottom + padding), 0);
      const withinRange = distX === 0 && distY === 0;

      if (withinRange) {
        const x = (e.clientX - centerX) / strength;
        const y = (e.clientY - centerY) / strength;
        if (!isActiveRef.current) {
          el.style.transition = activeTransition;
          isActiveRef.current = true;
        }
        el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      } else if (isActiveRef.current) {
        el.style.transition = inactiveTransition;
        el.style.transform = "translate3d(0px, 0px, 0)";
        isActiveRef.current = false;
      }
    }

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [padding, strength, activeTransition, inactiveTransition, disabled]);

  return (
    <div ref={wrapperRef} className={className} style={{ willChange: "transform" }}>
      {children}
    </div>
  );
}
