"use client";

import { useState } from "react";
import { Link } from "@/components";
import { type ClassNameProps } from "@/types";
import * as motion from "motion/react-client";

import { LOGO_PATH, LOGO_SEGMENTS, LOGO_VIEWBOX } from "./logoPath";
import styles from "./Logo.module.scss";

const STROKE_WIDTH = 9;
const HOVER_TRAIL_LENGTH = 30;
const HOVER_DURATION = 0.8;

const TOTAL_TRAVEL =
  LOGO_SEGMENTS.reduce((sum, segment) => sum + segment.length, 0) +
  HOVER_TRAIL_LENGTH;
const HOVER_SPEED = TOTAL_TRAVEL / HOVER_DURATION;

const HOVER_SEGMENTS = LOGO_SEGMENTS.map((segment, index) => {
  const startDistance = LOGO_SEGMENTS.slice(0, index).reduce(
    (sum, previous) => sum + previous.length,
    0,
  );
  const trail = HOVER_TRAIL_LENGTH / segment.length;

  return {
    d: segment.d,
    trail,
    delay: startDistance / HOVER_SPEED,
    duration: (segment.length + HOVER_TRAIL_LENGTH) / HOVER_SPEED,
  };
});

export default function Logo({ className }: ClassNameProps) {
  const [hoverKey, setHoverKey] = useState(0);

  return (
    <Link
      href="/"
      className={`${styles.logo} ${className?.trim()}`}
      aria-label="Home"
      onMouseEnter={() => setHoverKey((key) => key + 1)}
    >
      <div className={styles.logo__container} aria-hidden>
        <svg viewBox={LOGO_VIEWBOX} xmlns="http://www.w3.org/2000/svg">
          <motion.path
            d={LOGO_PATH}
            fill="none"
            stroke="var(--text-primary)"
            strokeWidth={STROKE_WIDTH}
            strokeLinecap="butt"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, ease: "linear" }}
          />

          {hoverKey > 0 &&
            HOVER_SEGMENTS.map(({ d, trail, delay, duration }, index) => (
              <motion.path
                key={`${hoverKey}-${index}`}
                d={d}
                fill="none"
                stroke="var(--primary)"
                strokeWidth={STROKE_WIDTH}
                strokeLinecap="butt"
                strokeLinejoin="round"
                pathLength={1}
                initial={{ pathLength: trail, pathOffset: -trail }}
                animate={{ pathOffset: 1 }}
                transition={{ delay, duration, ease: "linear" }}
              />
            ))}
        </svg>
      </div>
    </Link>
  );
}
