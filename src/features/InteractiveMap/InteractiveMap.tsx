"use client";

import { useEffect, useMemo } from "react";
import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";
import L, { type LatLngTuple } from "leaflet";
import { useTheme } from "next-themes";
import type { ClassNameProps } from "@/types";

import "leaflet/dist/leaflet.css";
import "./InteractiveMap.scss";

// ---- config ----
const ISTANBUL: LatLngTuple = [41.0082, 28.9784];
const INTRO_ZOOM = 10;
const TARGET_ZOOM = 13;
const INTRO_DURATION = 1.2;

const DARK_TILES = "/api/map-tiles/dark_all/{z}/{x}/{y}{r}.png";
const LIGHT_TILES = "/api/map-tiles/light_all/{z}/{x}/{y}{r}.png";

// ---- map intro animation ----
function MapIntroAnimation() {
  const map = useMap();

  useEffect(() => {
    let active = true;

    const playIntro = () => {
      if (!active) return;

      map.invalidateSize();
      map.setView(ISTANBUL, INTRO_ZOOM, { animate: false });

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (prefersReducedMotion) {
        map.setView(ISTANBUL, TARGET_ZOOM, { animate: false });
        return;
      }

      // Wait a frame so the wide view renders before zooming in
      requestAnimationFrame(() => {
        if (!active) return;

        map.flyTo(ISTANBUL, TARGET_ZOOM, {
          duration: INTRO_DURATION,
          easeLinearity: 0.25,
        });
      });
    };

    map.whenReady(playIntro);

    return () => {
      active = false;
    };
  }, [map]);

  return null;
}

// ---- interactive location map ----
export default function InteractiveMap({ className }: ClassNameProps) {
  const { resolvedTheme } = useTheme();
  const isLight = resolvedTheme === "light";

  const pulseIcon = useMemo(
    () =>
      L.divIcon({
        className: "interactive-map__pulse",
        html: `
          <span class="interactive-map__pulse-dot"></span>
          <span class="interactive-map__pulse-ring"></span>
          <span class="interactive-map__pulse-ring"></span>
          <span class="interactive-map__pulse-ring"></span>
        `,
        iconSize: [18, 18],
        iconAnchor: [9, 9],
      }),
    [],
  );

  const classNames = [
    "interactive-map",
    isLight ? "interactive-map-light" : "interactive-map-dark",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  // ---- here tile url is determined by the theme ----
  const tileUrl = isLight ? LIGHT_TILES : DARK_TILES;

  return (
    <div className={classNames}>
      <MapContainer
        center={ISTANBUL}
        zoom={INTRO_ZOOM}
        zoomAnimation
        fadeAnimation
        zoomControl={false}
        scrollWheelZoom
        doubleClickZoom
        dragging
        touchZoom
        className="interactive-map__map"
        aria-label="Map showing my current location in Istanbul, Türkiye"
      >
        <TileLayer
          key={tileUrl}
          url={tileUrl}
          attribution="&copy; OpenStreetMap contributors &copy; CARTO"
        />

        <Marker
          position={ISTANBUL}
          icon={pulseIcon}
          interactive={false}
          keyboard={false}
        />
        <MapIntroAnimation />
      </MapContainer>
    </div>
  );
}
