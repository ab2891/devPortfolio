"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";

const columns = 46;
const rows = 18;
const characters = " .:-=+*#%@";

function drawField(frame: number) {
  return Array.from({ length: rows }, (_, y) =>
    Array.from({ length: columns }, (_, x) => {
      const dx = (x - columns / 2) / 12;
      const dy = (y - rows / 2) / 6;
      const radius = Math.sqrt(dx * dx + dy * dy);
      const wave = Math.sin(radius * 5 - frame * 0.09 + Math.sin(dx * 2 + frame * 0.03));
      const envelope = Math.max(0, 1 - radius / 2.3);
      return characters[Math.floor(((wave + 1) / 2) * envelope * (characters.length - 1))];
    }).join("")
  ).join("\n");
}

export function AsciiField() {
  const [frame, setFrame] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(true);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(preference.matches);
    update();
    preference.addEventListener("change", update);
    return () => preference.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (paused || reducedMotion) return;
    const interval = window.setInterval(() => {
      if (!document.hidden) setFrame(value => (value + 1) % 12566);
    }, 100);
    return () => window.clearInterval(interval);
  }, [paused, reducedMotion]);

  return (
    <div className={styles.asciiPanel}>
      <div className={styles.asciiMeta}><span>Field notes / 001</span><span aria-hidden="true">46 × 18</span></div>
      <div role="img" aria-label="An abstract ripple field drawn in ASCII characters">
        <pre className={styles.ascii} aria-hidden="true">{drawField(frame)}</pre>
      </div>
      <div className={styles.asciiMeta}><span>Small parts. Interesting patterns.</span>{!reducedMotion && <button type="button" onClick={() => setPaused(value => !value)} aria-pressed={paused}>{paused ? "Play" : "Pause"} animation</button>}</div>
    </div>
  );
}
