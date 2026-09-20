"use client";

import { useState } from "react";
import { Link } from "@/components";
import { type ClassNameProps } from "@/types";
import * as motion from "motion/react-client";

import { LOGO_PATH, LOGO_VIEWBOX } from "./logoPath";
import styles from "./Logo.module.scss";

const COLOR = "#1f1f1f";
const HOVER_COLOR = "#ffd500";
const STROKE_WIDTH = 9;

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
            stroke={COLOR}
            strokeWidth={STROKE_WIDTH}
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, ease: "linear" }}
          />

          {hoverKey > 0 && (
            <motion.path
              key={hoverKey}
              d={LOGO_PATH}
              fill="none"
              stroke={HOVER_COLOR}
              strokeWidth={STROKE_WIDTH}
              strokeLinecap="butt"
              strokeLinejoin="round"
              pathLength={1}
              initial={{ pathLength: 0.18, pathOffset: -0.18 }}
              animate={{ pathOffset: 1 }}
              transition={{ duration: 0.8, ease: "linear" }}
            />
          )}
        </svg>
      </div>
    </Link>
  );
}
