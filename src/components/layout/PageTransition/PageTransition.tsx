"use client";

import { motion } from "motion/react";
import { usePathname, useRouter } from "next/navigation";
import { type ReactNode, useEffect, useRef, useState } from "react";
import { NAV_ITEMS } from "@/data";

type TransitionPhase = "idle" | "covering" | "covered" | "revealing";
type TransitionDirection = "forward" | "backward";

interface PageTransitionProps {
  children: ReactNode;
}

export default function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [phase, setPhase] = useState<TransitionPhase>("idle");
  const [destinationName, setDestinationName] = useState("");
  const [direction, setDirection] = useState<TransitionDirection>("forward");
  const destinationRef = useRef("");
  const startingPathRef = useRef(pathname);

  useEffect(() => {
    const handleInternalLink = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const target = event.target;

      if (!(target instanceof Element)) {
        return;
      }

      const link = target.closest<HTMLAnchorElement>("a[href]");

      if (
        !link ||
        (link.target && link.target !== "_self") ||
        link.hasAttribute("download")
      ) {
        return;
      }

      const destination = new URL(link.href, window.location.href);
      const current = new URL(window.location.href);
      const isSamePage =
        destination.pathname === current.pathname &&
        destination.search === current.search;

      if (destination.origin !== current.origin || isSamePage) {
        return;
      }

      event.preventDefault();

      if (phase !== "idle") {
        return;
      }

      const findRouteIndex = (path: string) =>
        NAV_ITEMS.findIndex(({ href }) =>
          href === "/" ? path === "/" : path.startsWith(href),
        );
      const currentIndex = findRouteIndex(current.pathname);
      const destinationIndex = findRouteIndex(destination.pathname);
      const destinationRoute = NAV_ITEMS[destinationIndex];

      destinationRef.current =
        destination.pathname + destination.search + destination.hash;
      setDestinationName(
        (
          destinationRoute?.label ??
          destination.pathname.split("/").filter(Boolean).at(-1) ??
          "Home"
        ).toUpperCase(),
      );
      setDirection(destinationIndex < currentIndex ? "backward" : "forward");
      startingPathRef.current = pathname;
      setPhase("covering");
    };

    document.addEventListener("click", handleInternalLink, true);

    return () => {
      document.removeEventListener("click", handleInternalLink, true);
    };
  }, [pathname, phase]);

  useEffect(() => {
    if (phase !== "covered" || pathname === startingPathRef.current) {
      return;
    }

    const pause = window.setTimeout(() => setPhase("revealing"), 20);

    return () => window.clearTimeout(pause);
  }, [pathname, phase]);

  const handleAnimationComplete = () => {
    if (phase === "covering") {
      document.body.dataset.contentState = "hidden";
      setPhase("covered");
      router.push(destinationRef.current);
    }

    if (phase === "revealing") {
      document.body.dataset.contentState = "entering";
      setPhase("idle");
    }
  };

  const isBackward = direction === "backward";
  const fullTitleClip = "polygon(0 0, 100% 0, 100% 100%, 0 100%)";
  const titleClipStart = isBackward
    ? "polygon(100% 0, 100% 0, 100% 100%, 92% 100%)"
    : "polygon(0 0, 0 0, 8% 100%, 0 100%)";
  const titleClipEnd = isBackward
    ? "polygon(0 0, 8% 0, 0 100%, 0 100%)"
    : "polygon(92% 0, 100% 0, 100% 100%, 100% 100%)";

  return (
    <>
      {children}

      {phase !== "idle" && (
        <>
          <motion.div
            aria-hidden="true"
            data-page-transition={phase}
            data-transition-direction={direction}
            data-transition-page={destinationName}
            initial={{ x: isBackward ? "100%" : "-100%" }}
            animate={{
              x: phase === "revealing" ? (isBackward ? "-100%" : "100%") : "0%",
            }}
            transition={{ duration: 0.65, ease: [0.5, 1, 0.3, 1] }}
            onAnimationComplete={handleAnimationComplete}
            style={{
              position: "fixed",
              top: 0,
              bottom: 0,
              left: isBackward ? "-10vw" : 0,
              width: "110vw",
              height: "100dvh",
              zIndex: 1200,
              background: "var(--primary)",
              clipPath: isBackward
                ? "polygon(8% 0, 100% 0, 100% 100%, 0 100%)"
                : "polygon(0 0, 92% 0, 100% 100%, 0 100%)",
              pointerEvents: "auto",
              willChange: "transform",
              overflow: "hidden",
            }}
          />

          <motion.div
            aria-hidden="true"
            initial={{ clipPath: titleClipStart }}
            animate={{
              clipPath: phase === "revealing" ? titleClipEnd : fullTitleClip,
            }}
            transition={{ duration: 0.65, ease: [0.5, 1, 0.3, 1] }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 1201,
              display: "grid",
              placeItems: "center",
              pointerEvents: "none",
              overflow: "hidden",
              willChange: "clip-path",
            }}
          >
            <motion.span
              initial={{ x: isBackward ? 70 : -70, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{
                x: {
                  duration: 0.35,
                  delay: 0.12,
                  ease: [0.16, 1, 0.3, 1],
                },
                opacity: {
                  duration: 0.2,
                  delay: 0.12,
                  ease: "easeOut",
                },
              }}
              style={{
                color: "var(--primary-on)",
                fontFamily: 'var(--font-playfair), "Playfair Display", serif',
                fontSize: "clamp(3rem, 10vw, 8rem)",
                fontWeight: 700,
                letterSpacing: "0.08em",
                lineHeight: 1,
              }}
            >
              {destinationName}
            </motion.span>
          </motion.div>
        </>
      )}
    </>
  );
}
