"use client";

import { useState, useEffect } from "react";
import { ChevronUp } from "lucide-react";

export default function ScrollToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!show) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-[88px] right-4 sm:bottom-6 sm:right-[148px] z-50 w-11 h-11 rounded-full bg-white border border-[#B8860B]/40 flex items-center justify-center shadow-md hover:bg-[#B8860B] hover:border-[#B8860B] hover:text-white transition-all duration-200 group"
      aria-label="Nach oben scrollen"
    >
      <ChevronUp size={20} className="text-[#B8860B] group-hover:text-white transition-colors" />
    </button>
  );
}
