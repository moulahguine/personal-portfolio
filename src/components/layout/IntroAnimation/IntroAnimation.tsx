"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";

import { LOGO_PATH, LOGO_VIEWBOX } from "../Logo/logoPath";

const DRAW_DURATION = 1.05;
const LOGO_HOLD_DURATION = 0.15;
const UNDRAW_DURATION = 0.65;
const LOGO_DURATION = DRAW_DURATION + LOGO_HOLD_DURATION + UNDRAW_DURATION;
const DOOR_PAUSE_DURATION = 0.15;
const DOOR_DELAY = LOGO_DURATION + DOOR_PAUSE_DURATION;
const DOOR_DURATION = 0.8;

export default function IntroAnimation() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (!isVisible) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.body.dataset.contentState = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isVisible]);

  const handleIntroComplete = () => {
    document.body.dataset.contentState = "entering";
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1300,
        display: "grid",
        placeItems: "center",
        overflow: "hidden",
        pointerEvents: "auto",
      }}
    >
      <motion.div
        initial={{ x: "0%" }}
        animate={{ x: "-100%" }}
        transition={{
          delay: DOOR_DELAY,
          duration: DOOR_DURATION,
          ease: [0.76, 0, 0.24, 1],
        }}
        style={{
          position: "absolute",
          inset: "0 auto 0 0",
          width: "calc(50% + 1px)",
          background: "var(--primary)",
          willChange: "transform",
        }}
      />

      <motion.div
        initial={{ x: "0%" }}
        animate={{ x: "100%" }}
        transition={{
          delay: DOOR_DELAY,
          duration: DOOR_DURATION,
          ease: [0.76, 0, 0.24, 1],
        }}
        onAnimationComplete={handleIntroComplete}
        style={{
          position: "absolute",
          inset: "0 0 0 auto",
          width: "calc(50% + 1px)",
          background: "var(--primary)",
          willChange: "transform",
        }}
      />

      <svg
        viewBox={LOGO_VIEWBOX}
        xmlns="http://www.w3.org/2000/svg"
        style={{
          position: "relative",
          zIndex: 1,
          width: "min(52vw, 260px)",
          overflow: "visible",
        }}
      >
        <motion.path
          d={LOGO_PATH}
          fill="none"
          stroke="var(--primary-on)"
          strokeWidth={9}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{
            pathLength: [0, 1, 1, 0],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            pathLength: {
              duration: LOGO_DURATION,
              times: [
                0,
                DRAW_DURATION / LOGO_DURATION,
                (DRAW_DURATION + LOGO_HOLD_DURATION) / LOGO_DURATION,
                1,
              ],
              ease: [0.65, 0, 0.35, 1],
            },
            opacity: {
              duration: LOGO_DURATION,
              times: [0, 0.03, 0.94, 1],
              ease: "linear",
            },
          }}
        />
      </svg>
    </div>
  );
}
