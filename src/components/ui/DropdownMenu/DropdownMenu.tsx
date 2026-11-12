"use client";

import {
  createContext,
  useContext,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { HiXMark } from "react-icons/hi2";
import {
  AnimatePresence,
  MotionConfig,
  motion,
  stagger,
  useIsPresent,
  type Variants,
} from "motion/react";
import {
  Menu,
  MenuItem,
  MenuTrigger,
  OverlayTriggerStateContext,
  Popover,
} from "react-aria-components";
import type { DropdownMenuItemProps, DropdownMenuProps } from "@/types";

import styles from "./DropdownMenu.module.scss";

export { MenuTrigger };

// ---- motion components ----
const MotionPopover = motion.create(Popover);

// ---- motion transitions ----
const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;
const INDICATOR_TRANSITION = {
  type: "spring",
  stiffness: 500,
  damping: 40,
  mass: 0.8,
} as const;

const POPOVER_VARIANTS: Variants = {
  hidden: { opacity: 0, y: -6, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.3,
      ease: EASE_OUT_EXPO,
      delayChildren: stagger(0.05, { startDelay: 0.06 }),
    },
  },
};

const POPOVER_EXIT = {
  opacity: 0,
  y: -4,
  scale: 0.98,
  transition: { duration: 0.15, ease: "easeIn" },
} as const;

const ITEM_VARIANTS: Variants = {
  hidden: { opacity: 0, x: -12, y: -8 },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: { duration: 0.45, ease: EASE_OUT_EXPO },
  },
};

const TRIGGER_ICON_MOTION = {
  initial: { opacity: 0, rotate: -90, scale: 0.6 },
  animate: { opacity: 1, rotate: 0, scale: 1 },
  exit: { opacity: 0, rotate: 90, scale: 0.6 },
  transition: { duration: 0.2, ease: EASE_OUT_EXPO },
} as const;

// ---- trigger icon: swaps to a close icon while the menu is open ----
export function DropdownTriggerIcon({ icon }: { icon: ReactNode }) {
  const isOpen = useContext(OverlayTriggerStateContext)?.isOpen ?? false;

  return (
    <MotionConfig reducedMotion="user">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={isOpen ? "close" : "open"}
          className={styles.triggerIcon}
          aria-hidden="true"
          {...TRIGGER_ICON_MOTION}
        >
          {isOpen ? <HiXMark className={styles.triggerIcon__close} /> : icon}
        </motion.span>
      </AnimatePresence>
    </MotionConfig>
  );
}

// ---- hover indicator context ----
type IndicatorRect = {
  x: number;
  y: number;
  width: number;
  height: number;
  shouldSlide: boolean;
};

const DropdownHoverContext = createContext<(item: HTMLElement) => void>(
  () => {},
);

// ---- dropdown menu ----
export default function DropdownMenu(props: DropdownMenuProps) {
  const triggerState = useContext(OverlayTriggerStateContext);

  return (
    <MotionConfig reducedMotion="user">
      <AnimatePresence>
        {triggerState?.isOpen ? (
          <DropdownMenuContent {...props} onClose={triggerState.close} />
        ) : null}
      </AnimatePresence>
    </MotionConfig>
  );
}

// ---- dropdown menu content ----
function DropdownMenuContent({
  children,
  orientation = "vertical",
  className = "",
  placement = "bottom end",
  offset = 8,
  onClose,
  ...menuProps
}: DropdownMenuProps & { onClose: () => void }) {
  const isPresent = useIsPresent();
  const bodyRef = useRef<HTMLDivElement>(null);
  const [indicator, setIndicator] = useState<IndicatorRect | null>(null);

  const popoverClassName = [styles.popover, className]
    .filter(Boolean)
    .join(" ");
  const menuClassName = [styles.menu, styles[`menu--${orientation}`]].join(" ");

  // ---- move the indicator onto the hovered item ----
  const showIndicator = (item: HTMLElement) => {
    const body = bodyRef.current;
    if (!body) return;

    const bodyRect = body.getBoundingClientRect();
    const itemRect = item.getBoundingClientRect();
    setIndicator((previous) => ({
      x: itemRect.left - bodyRect.left,
      y: itemRect.top - bodyRect.top,
      width: itemRect.width,
      height: itemRect.height,
      shouldSlide: previous !== null,
    }));
  };

  // slide between items, but jump into place when appearing from hidden
  const { shouldSlide = false, ...indicatorRect } = indicator ?? {};
  const isVisible = indicator !== null;
  const positionTransition = shouldSlide
    ? INDICATOR_TRANSITION
    : { duration: 0 };

  return (
    <MotionPopover
      isOpen
      isExiting={!isPresent}
      onOpenChange={(isOpen) => {
        if (!isOpen) onClose();
      }}
      placement={placement}
      offset={offset}
      className={popoverClassName}
      variants={POPOVER_VARIANTS}
      initial="hidden"
      animate="visible"
      exit={POPOVER_EXIT}
    >
      <div
        ref={bodyRef}
        className={styles.popover__body}
        onPointerLeave={() => setIndicator(null)}
      >
        <motion.span
          className={styles.indicator}
          aria-hidden="true"
          initial={false}
          animate={{
            opacity: isVisible ? 1 : 0,
            ...indicatorRect,
          }}
          transition={{
            opacity: { duration: 0.2 },
            x: positionTransition,
            y: positionTransition,
            width: positionTransition,
            height: positionTransition,
          }}
        />

        <DropdownHoverContext.Provider value={showIndicator}>
          <Menu {...menuProps} className={menuClassName}>
            {children}
          </Menu>
        </DropdownHoverContext.Provider>
      </div>
    </MotionPopover>
  );
}

// ---- dropdown menu item ----
export function DropdownMenuItem({
  children,
  className = "",
  isActive = false,
  textValue,
  ...rest
}: DropdownMenuItemProps) {
  const showIndicator = useContext(DropdownHoverContext);
  const classNames = [styles.item, className].filter(Boolean).join(" ");

  return (
    <MenuItem
      {...rest}
      className={classNames}
      textValue={
        textValue ?? (typeof children === "string" ? children : undefined)
      }
      data-active={isActive || undefined}
      onHoverStart={(event) => showIndicator(event.target as HTMLElement)}
    >
      <motion.span className={styles.item__content} variants={ITEM_VARIANTS}>
        {children}
      </motion.span>
    </MenuItem>
  );
}
