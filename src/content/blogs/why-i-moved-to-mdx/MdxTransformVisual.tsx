"use client";

import { useEffect, useRef } from "react";
import type { ClassNameProps } from "@/types";

import styles from "./MdxTransformVisual.module.scss";

// ---- timeline (seconds) ----
const LOOP_DURATION = 9.2;
const STATIC_TIME = 6.6;

const TIMELINE = {
  appearEnd: 0.8,
  typeStart: 0.6,
  scanStart: 2.2,
  scanEnd: 3.8,
  morphStart: 4.0,
  morphEnd: 5.2,
  glowStart: 5.0,
  glowEnd: 5.9,
  exitStart: 8.0,
  exitEnd: 8.8,
} as const;

const ROW_COUNT = 7;
const SCAN_BAND_SLICES = 10;
const MAX_DPR = 2;
const MAX_FRAME_DELTA = 0.1;
const MONO_FONT =
  'ui-monospace, SFMono-Regular, Menlo, Consolas, "Liberation Mono", monospace';

// ---- palette (resolved from the site's theme tokens) ----
interface Palette {
  surface: string;
  line: string;
  ink: string;
  muted: string;
  accent: string;
}

const PALETTE_TOKENS: Record<keyof Palette, string> = {
  surface: "--background",
  line: "--border-strong",
  ink: "--text-primary",
  muted: "--text-muted",
  accent: "--purple",
};

// ---- document content ----
type Tone = "key" | "value" | "punct" | "heading" | "text" | "link" | "mark";

interface Token {
  tone: Tone;
  x: number;
  w?: number;
  ch?: string;
}

const TONES: Record<
  Tone,
  { color: keyof Palette; alpha: number; thickness: number }
> = {
  key: { color: "ink", alpha: 0.6, thickness: 1 },
  value: { color: "muted", alpha: 0.5, thickness: 1 },
  punct: { color: "muted", alpha: 0.9, thickness: 1 },
  heading: { color: "ink", alpha: 0.85, thickness: 1.8 },
  text: { color: "muted", alpha: 0.5, thickness: 1 },
  link: { color: "accent", alpha: 0.95, thickness: 1 },
  mark: { color: "accent", alpha: 0.85, thickness: 1 },
};

// x / w are fractions of the document content width
const TS_ROWS: Token[][] = [
  [{ tone: "punct", x: 0, ch: "{" }],
  [
    { tone: "key", x: 0.07, w: 0.16 },
    { tone: "value", x: 0.27, w: 0.44 },
  ],
  [
    { tone: "key", x: 0.07, w: 0.12 },
    { tone: "punct", x: 0.23, ch: "[" },
  ],
  [{ tone: "value", x: 0.14, w: 0.52 }],
  [
    { tone: "value", x: 0.14, w: 0.3 },
    { tone: "value", x: 0.48, w: 0.2 },
  ],
  [{ tone: "punct", x: 0.07, ch: "]" }],
  [{ tone: "punct", x: 0, ch: "}" }],
];

const MDX_ROWS: Token[][] = [
  [
    { tone: "mark", x: 0, ch: "#" },
    { tone: "heading", x: 0.09, w: 0.36 },
  ],
  [],
  [{ tone: "text", x: 0, w: 0.94 }],
  [
    { tone: "text", x: 0, w: 0.66 },
    { tone: "link", x: 0.7, w: 0.2 },
  ],
  [{ tone: "text", x: 0, w: 0.82 }],
  [],
  [{ tone: "text", x: 0, w: 0.46 }],
];

// ---- math helpers ----
const clamp01 = (value: number) => Math.min(1, Math.max(0, value));
const progress = (t: number, from: number, to: number) =>
  clamp01((t - from) / (to - from));
const easeOut = (p: number) => 1 - (1 - p) ** 3;
const easeInOut = (p: number) =>
  p < 0.5 ? 4 * p * p * p : 1 - (-2 * p + 2) ** 3 / 2;
const lerp = (from: number, to: number, p: number) => from + (to - from) * p;

// ---- canvas helpers ----
function roundedRectPath(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  radius: number,
) {
  const r = Math.max(0, Math.min(radius, w / 2, h / 2));

  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

// position along a rounded rectangle outline, clockwise from the top edge
function pointOnRoundedRect(
  x: number,
  y: number,
  w: number,
  h: number,
  radius: number,
  s: number,
): [number, number] {
  const r = Math.max(0, Math.min(radius, w / 2, h / 2));
  const straightW = w - 2 * r;
  const straightH = h - 2 * r;
  const arc = (Math.PI * r) / 2;
  const total = 2 * straightW + 2 * straightH + 4 * arc;
  let d = (((s % 1) + 1) % 1) * total;

  if (d < straightW) return [x + r + d, y];
  d -= straightW;

  if (d < arc) {
    const a = d / r;
    return [x + w - r + r * Math.sin(a), y + r - r * Math.cos(a)];
  }
  d -= arc;

  if (d < straightH) return [x + w, y + r + d];
  d -= straightH;

  if (d < arc) {
    const a = d / r;
    return [x + w - r + r * Math.cos(a), y + h - r + r * Math.sin(a)];
  }
  d -= arc;

  if (d < straightW) return [x + w - r - d, y + h];
  d -= straightW;

  if (d < arc) {
    const a = d / r;
    return [x + r - r * Math.sin(a), y + h - r + r * Math.cos(a)];
  }
  d -= arc;

  if (d < straightH) return [x, y + h - r - d];
  d -= straightH;

  const a = d / r;
  return [x + r - r * Math.cos(a), y + r - r * Math.sin(a)];
}

// theme tokens may use light-dark() / color-mix(), so let the browser resolve them
function readPalette(probe: HTMLElement): Palette {
  const palette = {} as Palette;

  for (const key of Object.keys(PALETTE_TOKENS) as (keyof Palette)[]) {
    probe.style.color = `var(${PALETTE_TOKENS[key]})`;
    palette[key] = getComputedStyle(probe).color;
  }

  return palette;
}

// ---- row geometry ----
interface RowGeometry {
  x: number;
  width: number;
  barHeight: number;
  fontSize: number;
  rowHeight: number;
}

function drawToken(
  ctx: CanvasRenderingContext2D,
  token: Token,
  centerY: number,
  geometry: RowGeometry,
  palette: Palette,
  amount: number,
  highlight: number,
  scene: number,
) {
  const tone = TONES[token.tone];
  const alpha = Math.min(1, tone.alpha + highlight * 0.35) * scene;
  const x = geometry.x + token.x * geometry.width;

  ctx.fillStyle = palette[tone.color];

  if (token.ch) {
    ctx.globalAlpha = alpha * amount;
    ctx.fillText(token.ch, x, centerY + 0.5);
    return;
  }

  const width = (token.w ?? 0) * geometry.width * amount;
  const height = geometry.barHeight * tone.thickness;

  if (width < 0.5) return;

  ctx.globalAlpha = alpha;
  roundedRectPath(ctx, x, centerY - height / 2, width, height, height / 2);
  ctx.fill();
}

// ---- frame ----
function drawFrame(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  dpr: number,
  t: number,
  palette: Palette,
) {
  ctx.clearRect(0, 0, width, height);

  const {
    appearEnd,
    typeStart,
    scanStart,
    scanEnd,
    morphStart,
    morphEnd,
    glowStart,
    glowEnd,
    exitStart,
    exitEnd,
  } = TIMELINE;

  const appear = easeOut(progress(t, 0, appearEnd));
  const exit = easeInOut(progress(t, exitStart, exitEnd));
  const scene = appear * (1 - exit);

  if (scene <= 0.001) return;

  // ---- geometry ----
  const docH = height * 0.68;
  const docW = Math.min(width * 0.64, docH * 1.55);
  const docX = (width - docW) / 2;
  const docY = (height - docH) / 2;
  const cx = width / 2;
  const cy = height / 2;
  const radius = Math.max(5, docH * 0.045);

  const morphProgress = progress(t, morphStart, morphEnd);
  const scale =
    lerp(0.96, 1, appear) *
    (1 - 0.02 * exit) *
    (1 + 0.018 * Math.sin(Math.PI * morphProgress));

  // ---- phases ----
  const labelProgress = easeInOut(
    progress(t, morphStart + 0.25, morphStart + 0.75),
  );
  const glowRamp = easeOut(progress(t, glowStart, glowEnd));
  const glow = glowRamp * (0.85 + 0.15 * Math.sin(t * 2.4)) * (1 - exit);
  const orbit = glowRamp * (1 - exit);

  ctx.save();
  ctx.translate(cx, cy);
  ctx.scale(scale, scale);
  ctx.translate(-cx, -cy);

  // ---- glow ----
  if (glow > 0.01) {
    ctx.save();
    ctx.shadowColor = palette.accent;
    ctx.shadowBlur = 16 * glow * dpr;
    ctx.globalAlpha = 0.55 * glow * scene;
    ctx.fillStyle = palette.accent;
    roundedRectPath(ctx, docX, docY, docW, docH, radius);
    ctx.fill();
    ctx.restore();
  }

  // ---- document ----
  ctx.globalAlpha = scene;
  ctx.fillStyle = palette.surface;
  roundedRectPath(ctx, docX, docY, docW, docH, radius);
  ctx.fill();

  ctx.lineWidth = 1;
  ctx.strokeStyle = palette.line;
  ctx.globalAlpha = scene * (1 - labelProgress);
  ctx.stroke();
  ctx.strokeStyle = palette.accent;
  ctx.globalAlpha = scene * labelProgress * 0.9;
  ctx.stroke();

  // ---- header ----
  const padX = docW * 0.07;
  const headerH = docH * 0.2;
  const fontSize = Math.min(11.5, Math.max(8, docH * 0.085));
  const chipH = fontSize * 1.9;
  const chipW = fontSize * 3.6;
  const chipX = docX + padX;
  const chipY = docY + (headerH - chipH) / 2;
  const chipCenterX = chipX + chipW / 2;
  const chipCenterY = chipY + chipH / 2;
  const fileX = chipX + chipW + fontSize * 0.8;

  ctx.textBaseline = "middle";

  // chip frame
  ctx.globalAlpha = scene * (1 - labelProgress);
  ctx.strokeStyle = palette.line;
  roundedRectPath(ctx, chipX, chipY, chipW, chipH, 3);
  ctx.stroke();

  ctx.fillStyle = palette.accent;
  ctx.globalAlpha = scene * labelProgress * 0.16;
  ctx.fill();
  ctx.globalAlpha = scene * labelProgress * 0.9;
  ctx.strokeStyle = palette.accent;
  ctx.stroke();

  // chip + file labels (TS -> MDX)
  ctx.font = `700 ${fontSize}px ${MONO_FONT}`;
  ctx.textAlign = "center";
  ctx.fillStyle = palette.ink;
  ctx.globalAlpha = scene * (1 - labelProgress);
  ctx.fillText("TS", chipCenterX, chipCenterY + 0.5 - labelProgress * 3);
  ctx.globalAlpha = scene * labelProgress;
  ctx.fillText("MDX", chipCenterX, chipCenterY + 0.5 + (1 - labelProgress) * 3);

  ctx.font = `500 ${fontSize * 0.95}px ${MONO_FONT}`;
  ctx.textAlign = "left";
  ctx.fillStyle = palette.muted;
  ctx.globalAlpha = scene * (1 - labelProgress);
  ctx.fillText("content.ts", fileX, chipCenterY + 0.5 - labelProgress * 3);
  ctx.globalAlpha = scene * labelProgress;
  ctx.fillText(
    "content.mdx",
    fileX,
    chipCenterY + 0.5 + (1 - labelProgress) * 3,
  );

  // header divider
  ctx.globalAlpha = scene * 0.6;
  ctx.strokeStyle = palette.line;
  ctx.beginPath();
  ctx.moveTo(docX, docY + headerH + 0.5);
  ctx.lineTo(docX + docW, docY + headerH + 0.5);
  ctx.stroke();

  // ---- rows ----
  const rowsTop = docY + headerH + docH * 0.07;
  const rowsBottom = docY + docH - docH * 0.08;
  const rowHeight = (rowsBottom - rowsTop) / ROW_COUNT;
  const geometry: RowGeometry = {
    x: docX + padX,
    width: docW - padX * 2,
    barHeight: Math.min(4.5, Math.max(2.5, rowHeight * 0.3)),
    fontSize: Math.min(13, rowHeight * 0.95),
    rowHeight,
  };

  const scanRaw = progress(t, scanStart, scanEnd);
  const scanEased = easeInOut(scanRaw);
  const scanY = docY + scanEased * docH;
  const scanVisible = Math.min(1, scanRaw / 0.1, (1 - scanRaw) / 0.1);

  ctx.font = `600 ${geometry.fontSize}px ${MONO_FONT}`;
  ctx.textAlign = "left";

  for (let i = 0; i < ROW_COUNT; i++) {
    const rowY = rowsTop + i * rowHeight;
    const centerY = rowY + rowHeight / 2;

    const typed = easeOut(
      progress(t, typeStart + i * 0.1, typeStart + i * 0.1 + 0.5),
    );
    const out = easeInOut(
      progress(t, morphStart + i * 0.07, morphStart + i * 0.07 + 0.4),
    );
    const into = easeInOut(
      progress(
        t,
        morphStart + 0.3 + i * 0.07,
        morphStart + 0.3 + i * 0.07 + 0.4,
      ),
    );

    const distance = (scanY - centerY) / (rowHeight * 1.1);
    const highlight =
      scanVisible > 0 ? Math.exp(-distance * distance) * scanVisible : 0;

    for (const token of TS_ROWS[i]) {
      drawToken(
        ctx,
        token,
        centerY,
        geometry,
        palette,
        typed * (1 - out),
        highlight,
        scene,
      );
    }

    for (const token of MDX_ROWS[i]) {
      drawToken(ctx, token, centerY, geometry, palette, into, 0, scene);
    }
  }

  // ---- scan line ----
  if (scanVisible > 0.001) {
    ctx.save();
    roundedRectPath(ctx, docX, docY, docW, docH, radius);
    ctx.clip();

    const bandHeight = Math.max(16, docH * 0.16);
    const sliceHeight = bandHeight / SCAN_BAND_SLICES;

    // soft trailing band, built from slices so it blends cleanly in both themes
    ctx.fillStyle = palette.ink;

    for (let i = 0; i < SCAN_BAND_SLICES; i++) {
      const fade = (i + 1) / SCAN_BAND_SLICES;

      ctx.globalAlpha = scene * scanVisible * 0.012 * fade * fade * 8;
      ctx.fillRect(
        docX,
        scanY - bandHeight + i * sliceHeight,
        docW,
        sliceHeight + 0.5,
      );
    }

    ctx.globalAlpha = scene * scanVisible * 0.55;
    ctx.fillRect(docX, scanY - 0.5, docW, 1);
    ctx.restore();
  }

  ctx.restore();

  // ---- transformation pulse ----
  const pulse = progress(t, morphStart + 0.35, morphStart + 1.35);

  if (pulse > 0 && pulse < 1) {
    const grow = easeOut(pulse) * 16;

    ctx.globalAlpha = scene * (1 - pulse) * 0.5;
    ctx.strokeStyle = palette.accent;
    ctx.lineWidth = 1;
    roundedRectPath(
      ctx,
      docX - grow,
      docY - grow,
      docW + grow * 2,
      docH + grow * 2,
      radius + grow,
    );
    ctx.stroke();
  }

  // ---- orbit ----
  if (orbit > 0.01) {
    const offset = 12;
    const ox = docX - offset;
    const oy = docY - offset;
    const ow = docW + offset * 2;
    const oh = docH + offset * 2;
    const or = radius + offset;

    ctx.globalAlpha = orbit * 0.2;
    ctx.strokeStyle = palette.accent;
    ctx.lineWidth = 1;
    roundedRectPath(ctx, ox, oy, ow, oh, or);
    ctx.stroke();

    const head = (t - glowStart) * 0.2;
    const trail = 14;

    ctx.fillStyle = palette.accent;

    for (let k = trail; k >= 0; k--) {
      const [px, py] = pointOnRoundedRect(ox, oy, ow, oh, or, head - k * 0.006);
      const fade = 1 - k / (trail + 1);

      ctx.globalAlpha = orbit * fade * fade * 0.9;
      ctx.beginPath();
      ctx.arc(px, py, 1 + 1.6 * fade, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  ctx.globalAlpha = 1;
}

// ---- mdx transform visual ----
export default function MdxTransformVisual({ className }: ClassNameProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const probeRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const canvas = canvasRef.current;
    const probe = probeRef.current;
    const ctx = canvas?.getContext("2d");

    if (!wrapper || !canvas || !probe || !ctx) return;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    let palette = readPalette(probe);
    let width = 0;
    let height = 0;
    let dpr = 1;
    let elapsed = 0;
    let lastTime = 0;
    let frame = 0;
    let isVisible = false;
    let isReduced = motionQuery.matches;

    const render = () => {
      if (!width || !height) return;

      const t = isReduced ? STATIC_TIME : elapsed;
      drawFrame(ctx, width, height, dpr, t, palette);
    };

    const tick = (now: number) => {
      const delta = Math.min((now - lastTime) / 1000, MAX_FRAME_DELTA);

      lastTime = now;
      elapsed = (elapsed + delta) % LOOP_DURATION;
      render();
      frame = requestAnimationFrame(tick);
    };

    const start = () => {
      if (frame || isReduced || !isVisible) return;

      lastTime = performance.now();
      frame = requestAnimationFrame(tick);
    };

    const stop = () => {
      cancelAnimationFrame(frame);
      frame = 0;
    };

    const resize = () => {
      width = wrapper.clientWidth;
      height = wrapper.clientHeight;

      if (!width || !height) return;

      dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      render();
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(wrapper);

    // ---- only animate while on screen ----
    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;

        if (isVisible) {
          start();
        } else {
          stop();
        }
      },
      { rootMargin: "80px" },
    );
    intersectionObserver.observe(wrapper);

    // ---- follow theme switches ----
    const themeObserver = new MutationObserver(() => {
      palette = readPalette(probe);

      if (!frame) render();
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    // ---- follow reduced motion preference ----
    const handleMotionChange = (event: MediaQueryListEvent) => {
      isReduced = event.matches;
      stop();

      if (isReduced) {
        render();
      } else {
        start();
      }
    };
    motionQuery.addEventListener("change", handleMotionChange);

    return () => {
      stop();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      themeObserver.disconnect();
      motionQuery.removeEventListener("change", handleMotionChange);
    };
  }, []);

  const classNames = [styles.visual, className].filter(Boolean).join(" ");

  return (
    <div ref={wrapperRef} className={classNames} aria-hidden="true">
      <canvas ref={canvasRef} className={styles.visual__canvas} />
      <span ref={probeRef} className={styles.visual__probe} />
    </div>
  );
}
