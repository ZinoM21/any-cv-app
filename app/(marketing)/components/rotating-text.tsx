"use client";

import { useState, useEffect } from "react";

const texts = ["Professional CV", "Standout Site"];

export function RotatingText() {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setFade(true);
      setTimeout(() => {
        setIndex((prevIndex) => (prevIndex + 1) % texts.length);
        setFade(false);
      }, 500); // Half of the interval for smooth transition
    }, 4000); // Change text every 3 seconds

    return () => clearInterval(intervalId);
  }, []);

  return (
    <span
      className={`transition-opacity duration-500 text-primary ${
        fade ? "opacity-0" : "opacity-100"
      }`}
      aria-live="polite"
    >
      {texts[index]}
    </span>
  );
}
