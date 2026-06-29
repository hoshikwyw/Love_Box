"use client";

import { useEffect, useMemo, useState } from "react";
import { MapContainer, TileLayer, Marker, Polyline, Tooltip } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { story } from "@/data/story";

type LL = [number, number];

/** Quadratic-bezier arc between two points, so the route bends like a flight path. */
function arc(a: LL, b: LL, bend = 0.18, n = 64): LL[] {
  const mid: LL = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  const ctrl: LL = [mid[0] - dy * bend, mid[1] + dx * bend];
  const pts: LL[] = [];
  for (let i = 0; i <= n; i++) {
    const t = i / n;
    const lat = (1 - t) ** 2 * a[0] + 2 * (1 - t) * t * ctrl[0] + t ** 2 * b[0];
    const lng = (1 - t) ** 2 * a[1] + 2 * (1 - t) * t * ctrl[1] + t ** 2 * b[1];
    pts.push([lat, lng]);
  }
  return pts;
}

function pinIcon(name: string, photo: string, emoji: string, color: string) {
  const avatar = photo
    ? `<span class="love-pin__heart heart-mask" style="--c:${color}"><span class="love-pin__avatar heart-mask" style="background-image:url('${photo}')"></span></span>`
    : `<span class="love-pin__emoji">${emoji}</span>`;
  return L.divIcon({
    className: "",
    iconSize: [0, 0],
    iconAnchor: [0, 0],
    html: `<div class="love-pin"><span class="love-pin__dot" style="--c:${color}"></span>${avatar}<span class="love-pin__label">${name}</span></div>`,
  });
}

function planeIcon(angle: number) {
  return L.divIcon({
    className: "",
    iconSize: [0, 0],
    iconAnchor: [0, 0],
    html: `<div class="love-plane" style="transform:translate(-50%,-50%) rotate(${angle}deg)">✈️</div>`,
  });
}

export default function LoveMap() {
  const her: LL = story.her.coords;
  const you: LL = story.you.coords;
  const path = useMemo(() => arc(you, her), [her, you]);

  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIdx((p) => (p + 1) % path.length), 110);
    return () => clearInterval(id);
  }, [path.length]);

  const cur = path[idx];
  const nxt = path[(idx + 1) % path.length];
  // bearing for the plane: clockwise from north, minus the emoji's built-in NE tilt
  const angle =
    (Math.atan2(nxt[1] - cur[1], nxt[0] - cur[0]) * 180) / Math.PI - 45;

  const center: LL = [(her[0] + you[0]) / 2, (her[1] + you[1]) / 2];

  return (
    <MapContainer
      center={center}
      zoom={6}
      scrollWheelZoom={false}
      zoomControl={false}
      attributionControl={false}
      // Static, decorative map — so it never hijacks page scrolling on touch.
      dragging={false}
      touchZoom={false}
      doubleClickZoom={false}
      keyboard={false}
      className="h-[360px] w-full sm:h-[440px]"
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        subdomains="abcd"
      />

      {/* glow underlay + dashed route on top */}
      <Polyline positions={path} pathOptions={{ color: "#f6a5c0", weight: 8, opacity: 0.18 }} />
      <Polyline
        positions={path}
        pathOptions={{ color: "#f5d488", weight: 2.5, opacity: 0.95, dashArray: "1 10", lineCap: "round" }}
      />

      <Marker position={you} icon={pinIcon(story.you.city, story.you.photo, "💜", "#a78bfa")}>
        <Tooltip direction="top" offset={[0, -28]} className="love-tip">
          {story.you.name} is here
        </Tooltip>
      </Marker>
      <Marker position={her} icon={pinIcon(story.her.city, story.her.photo, "💗", "#f6a5c0")}>
        <Tooltip direction="top" offset={[0, -28]} className="love-tip">
          {story.her.name} is here
        </Tooltip>
      </Marker>

      <Marker position={cur} icon={planeIcon(angle)} />
    </MapContainer>
  );
}
