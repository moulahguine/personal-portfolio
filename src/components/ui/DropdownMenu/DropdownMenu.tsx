"use client";

import {
  Children,
  useContext,
  useRef,
  type PointerEvent,
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
// same motion as before — only these timings are shorter
const ITEM_STAGGER = 0.06;
const ITEM_STAGGER_START = 0.06;
const ITEM_DURATION = 0.22;
const POPOVER_DURATION = 0.22;

const getRevealDuration = (itemCount: number) =>
  ITEM_STAGGER_START +
  Math.max(itemCount - 1, 0) * ITEM_STAGGER +
  ITEM_DURATION;

// ---- popover variants ----
const POPOVER_VARIANTS: Variants = {
  hidden: { opacity: 0, y: -6, scale: 0.98, height: 0 },
  visible: (itemCount: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    height: "auto",
    transition: {
      duration: POPOVER_DURATION,
      ease: EASE_OUT_EXPO,
      height: { duration: getRevealDuration(itemCount), ease: "linear" },
      delayChildren: stagger(ITEM_STAGGER, { startDelay: ITEM_STAGGER_START }),
    },
  }),
};

// ---- popover exit variants ----
const POPOVER_EXIT = {
  opacity: 0,
  y: -4,
  scale: 0.98,
  transition: { duration: 0.12, ease: "easeIn" },
} as const;

// ---- item variants ----
const ITEM_VARIANTS: Variants = {
  hidden: { opacity: 0, y: -15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: ITEM_DURATION, ease: EASE_OUT_EXPO },
  },
};

// ---- trigger icon motion variants ----
const TRIGGER_ICON_MOTION = {
  initial: { opacity: 0, rotate: -90, scale: 0.3 },
  animate: { opacity: 1, rotate: 0, scale: 1 },
  exit: { opacity: 0, rotate: 90, scale: 0.3 },
  transition: { duration: 0.3, ease: EASE_OUT_EXPO },
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
  const itemCount = Children.count(children);
  const indicatorRef = useRef<HTMLSpanElement>(null);

  // ---- hover indicator ----
  const moveIndicator = (event: PointerEvent<HTMLDivElement>) => {
    const indicator = indicatorRef.current;
    const item = (event.target as HTMLElement).closest<HTMLElement>(
      '[role="menuitem"]',
    );
    if (!indicator || !item) return;

    if (item.hasAttribute("data-active")) {
      delete indicator.dataset.visible;
      return;
    }

    const wasHidden = !indicator.dataset.visible;
    indicator.style.transform = `translate(${item.offsetLeft}px, ${item.offsetTop}px)`;
    indicator.style.width = `${item.offsetWidth}px`;
    indicator.style.height = `${item.offsetHeight}px`;

    if (wasHidden) {
      void indicator.offsetWidth;
      indicator.dataset.visible = "true";
    }
  };

  const hideIndicator = () => {
    if (indicatorRef.current) delete indicatorRef.current.dataset.visible;
  };

  return (
    <MotionPopover
      isOpen
      isExiting={!isPresent}
      onOpenChange={(isOpen) => {
        if (!isOpen) onClose();
      }}
      placement={placement}
      offset={offset}
      className={`${styles.popover} ${className}`}
      variants={POPOVER_VARIANTS}
      custom={itemCount}
      initial="hidden"
      animate="visible"
      exit={POPOVER_EXIT}
    >
      <span
        ref={indicatorRef}
        className={styles.indicator}
        aria-hidden="true"
      />
      <Menu
        {...menuProps}
        className={`${styles.menu} ${styles[`menu--${orientation}`]}`}
        onPointerMove={moveIndicator}
        onPointerLeave={hideIndicator}
      >
        {children}
      </Menu>
    </MotionPopover>
  );
}

// ---- dropdown menu item ----
export function DropdownMenuItem({
  children,
  className = "",
  isActive = false,
  textValue,
  icon,
  label,
  ...rest
}: DropdownMenuItemProps) {
  const content = children ?? (
    <>
      {icon != null ? (
        <span className={styles.item__icon} aria-hidden="true">
          {icon}
        </span>
      ) : null}
      {label != null ? (
        <span className={styles.item__label}>{label}</span>
      ) : null}
    </>
  );

  return (
    <MenuItem
      {...rest}
      className={`${styles.item} ${className}`}
      textValue={
        textValue ??
        (typeof label === "string"
          ? label
          : typeof children === "string"
            ? children
            : undefined)
      }
      data-active={isActive || undefined}
    >
      <motion.span className={styles.item__content} variants={ITEM_VARIANTS}>
        {content}
      </motion.span>
    </MenuItem>
  );
}
