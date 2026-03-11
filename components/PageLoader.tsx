"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

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
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#FAF8F4] transition-opacity duration-300"
      style={{ opacity: fading ? 0 : 1 }}
    >
      <div className="text-center">
        <Image
          src="/logo.png"
          alt="Plan A Immobilien"
          width={200}
          height={80}
          className="w-auto object-contain"
          style={{ maxWidth: "200px", maxHeight: "80px" }}
          priority
        />
      </div>
    </div>
  );
}
