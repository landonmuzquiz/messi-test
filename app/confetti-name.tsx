"use client";

import confetti from "canvas-confetti";
import type { KeyboardEvent, MouseEvent } from "react";

// Client component: renders the (server-fetched) message and pops confetti on
// click. Kept separate so app/page.tsx can stay an async server component.
export default function ConfettiName({ text }: { text: string }) {
  const words = text.split(" ");

  const fireAt = (x: number, y: number) => {
    confetti({
      particleCount: 150,
      spread: 80,
      startVelocity: 45,
      origin: { x, y },
    });
  };

  const handleClick = (e: MouseEvent<HTMLHeadingElement>) => {
    fireAt(e.clientX / window.innerWidth, e.clientY / window.innerHeight);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLHeadingElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      fireAt(0.5, 0.5);
    }
  };

  return (
    <h1
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      aria-label={`Celebrate ${text}`}
      className="cursor-pointer select-none text-4xl font-semibold tracking-tight outline-none"
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
