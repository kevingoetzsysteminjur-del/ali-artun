"use client";
import { useState, useEffect } from "react";

export default function ScrollProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const el = document.documentElement;
      const scrolled = el.scrollTop || document.body.scrollTop;
      const total = el.scrollHeight - el.clientHeight;
      setProgress(total > 0 ? (scrolled / total) * 100 : 0);
    };
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <div style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 9999, height: "2px", backgroundColor: "transparent", pointerEvents: "none" }}>
      <div style={{ height: "100%", backgroundColor: "#D4A017", width: `${progress}%`, transition: "width 0.1s linear", boxShadow: "0 0 6px rgba(212,160,23,0.6)" }} />
    </div>
  );
}
