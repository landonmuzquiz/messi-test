"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties, KeyboardEvent } from "react";

const MARGIN = 24;

// Client component: renders the (server-fetched) message pinned to the top-right,
// then teleports it to a random on-screen spot each time it's clicked.
export default function MovingName({ text }: { text: string }) {
  const ref = useRef<HTMLHeadingElement>(null);
  const [pos, setPos] = useState<{ top: number; left: number } | null>(null);
  const words = text.split(" ");

  // On mount, convert the initial top-right anchor into pixel coordinates so
  // later moves animate smoothly (transitioning from `right`/`auto` would jump).
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    setPos({ top: MARGIN, left: window.innerWidth - el.offsetWidth - MARGIN });
  }, []);

  const moveRandom = () => {
    const el = ref.current;
    const w = el?.offsetWidth ?? 200;
    const h = el?.offsetHeight ?? 50;
    const maxLeft = Math.max(0, window.innerWidth - w);
    const maxTop = Math.max(0, window.innerHeight - h);
    setPos({ top: Math.random() * maxTop, left: Math.random() * maxLeft });
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLHeadingElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      moveRandom();
    }
  };

  const style: CSSProperties = pos
    ? { position: "fixed", top: pos.top, left: pos.left }
    : { position: "fixed", top: MARGIN, right: MARGIN };

  return (
    <h1
      ref={ref}
      role="button"
      tabIndex={0}
      onClick={moveRandom}
      onKeyDown={handleKeyDown}
      aria-label={`Move ${text}`}
      style={style}
      className="cursor-pointer select-none text-4xl font-semibold tracking-tight outline-none transition-all duration-300 ease-out"
    >
      {words.map((word, i) => (
        <span
          key={i}
          className={i % 2 === 0 ? "text-blue-600" : "text-red-600"}
        >
          {word}
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </h1>
  );
}
