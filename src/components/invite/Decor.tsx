import type { CSSProperties } from "react";
import eucalyptus from "@/assets/eucalyptus.png";
import wildflowers from "@/assets/wildflowers.png";
import butterfly from "@/assets/butterfly.png";
import mushrooms from "@/assets/mushrooms.png";
import bird from "@/assets/bird.png";

export const art = { eucalyptus, wildflowers, butterfly, mushrooms, bird };

type Motion = "none" | "float" | "float-slow" | "flutter" | "sway" | "drift";

interface DecorProps {
  src: string;
  className?: string;
  /** Rotation in degrees, kept through animations via --rot. */
  rotate?: number;
  motion?: Motion;
  flip?: boolean;
  opacity?: number;
  delay?: number;
  style?: CSSProperties;
}

const motionClass: Record<Motion, string> = {
  none: "",
  float: "animate-float",
  "float-slow": "animate-float-slow",
  flutter: "animate-flutter",
  sway: "animate-sway",
  drift: "animate-drift",
};

/**
 * Absolutely positioned watercolor decoration. Position it with className
 * (e.g. "-left-16 top-10 w-52"). Non-interactive and hidden from screen readers.
 */
export function Decor({ src, className = "", rotate = 0, motion = "none", flip = false, opacity = 1, delay = 0, style }: DecorProps) {
  return (
    <img
      src={src}
      alt=""
      aria-hidden
      loading="lazy"
      decoding="async"
      draggable={false}
      className={`pointer-events-none absolute select-none ${motionClass[motion]} ${className}`}
      style={
        {
          "--rot": `${rotate}deg`,
          transform: `rotate(${rotate}deg) ${flip ? "scaleX(-1)" : ""}`,
          transformOrigin: motion === "sway" ? "bottom center" : "center",
          opacity,
          animationDelay: `${delay}s`,
          ...style,
        } as CSSProperties
      }
    />
  );
}

/** A tiny four-point gold sparkle. */
export function Sparkle({ className = "", delay = 0, size = 14 }: { className?: string; delay?: number; size?: number }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={`pointer-events-none absolute animate-twinkle text-gold ${className}`}
      style={{ animationDelay: `${delay}s` }}
    >
      <path fill="currentColor" d="M12 0c.6 7 5 11.4 12 12-7 .6-11.4 5-12 12-.6-7-5-11.4-12-12 7-.6 11.4-5 12-12z" />
    </svg>
  );
}
