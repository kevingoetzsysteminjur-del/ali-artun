"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function ScrollReveal({ children }: { children?: React.ReactNode }) {
  useScrollReveal("reveal");
  return <>{children}</>;
}
