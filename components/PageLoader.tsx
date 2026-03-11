"use client";

import { useState, useEffect } from "react";

export default function PageLoader() {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFading(true), 600);
    const hideTimer = setTimeout(() => setVisible(false), 900);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-stone-900 transition-opacity duration-300"
      style={{ opacity: fading ? 0 : 1 }}
    >
      <div className="text-center">
        <div
          className="inline-flex items-center justify-center w-16 h-16 rounded-full border-2 mb-4"
          style={{ borderColor: "#C9A96E" }}
        >
          <span
            className="font-heading font-bold text-xl"
            style={{ color: "#C9A96E" }}
          >
            PA
          </span>
        </div>
        <p className="text-stone-400 text-sm tracking-widest uppercase">
          Immobilien
        </p>
      </div>
    </div>
  );
}
