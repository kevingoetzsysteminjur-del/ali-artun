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
      className="fixed bottom-6 right-24 z-50 w-11 h-11 rounded-full bg-white border border-[#C9A96E]/40 flex items-center justify-center shadow-md hover:bg-[#C9A96E] hover:border-[#C9A96E] hover:text-white transition-all duration-200 group"
      aria-label="Nach oben scrollen"
    >
      <ChevronUp size={20} className="text-[#C9A96E] group-hover:text-white transition-colors" />
    </button>
  );
}
