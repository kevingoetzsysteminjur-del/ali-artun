"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

interface MaskottchenProps {
  size?: number;
  animate?: boolean;
  variant?: "full" | "avatar";
}

export default function Maskottchen({ size = 120, animate = true, variant = "full" }: MaskottchenProps) {
  const [show, setShow] = useState(!animate);

  useEffect(() => {
    if (!animate) return;
    const t = setTimeout(() => setShow(true), 300);
    return () => clearTimeout(t);
  }, [animate]);

  const height = variant === "avatar" ? size : Math.round(size * 1.6);

  return (
    <div
      style={{
        width: size,
        height: height,
        opacity: show ? 1 : 0,
        transition: animate ? "opacity 0.5s ease" : undefined,
        position: "relative",
        display: "inline-block",
        flexShrink: 0,
      }}
    >
      <Image
        src="/images/maskottchen.png"
        alt="Plan A Maskottchen"
        fill
        style={{ objectFit: "contain" }}
      />
    </div>
  );
}
