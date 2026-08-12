"use client";

import { useEffect, useMemo, useState } from "react";
import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";
import L, { type LatLngTuple } from "leaflet";
import type { ClassNameProps } from "@/types";

import "leaflet/dist/leaflet.css";
import "./InteractiveMap.scss";

// ---- config ----
const ISTANBUL: LatLngTuple = [41.0082, 28.9784];
const INTRO_ZOOM = 10;
const TARGET_ZOOM = 13;
const INTRO_DURATION = 1.2;

const LIGHT_TILES =
  "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png";
const DARK_TILES =
  "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png";

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
  const [isLight, setIsLight] = useState(true);

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: light)");

    const syncTheme = () => setIsLight(media.matches);

    syncTheme();
    media.addEventListener("change", syncTheme);

    return () => media.removeEventListener("change", syncTheme);
  }, []);

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
    <div className={classNames} tabIndex={-1}>
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
