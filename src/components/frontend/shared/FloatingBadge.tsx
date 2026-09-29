import type { CSSProperties, ReactNode } from "react";

export type FloatingBadgeAnimation = "bounce-slow" | "float-medium" | "float-slow" | "none";

type FloatingBadgeProps = {
  /** Exact placement (top/left/right/width/…). Kept as inline style on purpose. */
  style?: CSSProperties;
  animation?: FloatingBadgeAnimation;
  className?: string;
  children: ReactNode;
};

const animationClasses: Record<Exclude<FloatingBadgeAnimation, "none">, string> = {
  "bounce-slow": "hiw-anim-bounce",
  "float-medium": "hiw-anim-float-m",
  "float-slow": "hiw-anim-float-s",
};

/**
 * Reusable floating badge for the Cara Kerja visuals.
 * Renders the exact `.hiw-float` markup; only the wrapper is shared,
 * so every badge keeps its own design, size and positioning.
 */
export function FloatingBadge({
  style,
  animation = "float-medium",
  className = "",
  children,
}: FloatingBadgeProps) {
  const animationClass = animation === "none" ? "" : animationClasses[animation];
  return (
    <div className={`hiw-float${animationClass ? ` ${animationClass}` : ""}${className ? ` ${className}` : ""}`} style={style}>
      {children}
    </div>
  );
}
