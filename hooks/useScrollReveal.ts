"use client";
import { useEffect } from "react";

export function useScrollReveal(className = "reveal") {
  useEffect(() => {
    const els = document.querySelectorAll(`.${className}, .reveal-left, .reveal-right`);
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("revealed");
            observer.unobserve(e.target);
          }
        }),
      { threshold: 0.15 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}
