"use client";
import { useEffect, useState } from "react";

interface MaskottchenProps {
  size?: number;
  animate?: boolean; // wave animation
  variant?: "full" | "avatar"; // full = with body, avatar = just head for small use
}

export default function Maskottchen({ size = 120, animate = true, variant = "full" }: MaskottchenProps) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShow(true), 300);
    return () => clearTimeout(t);
  }, []);

  if (!show && animate) return <div style={{ width: size, height: variant === "avatar" ? size : size * 1.4 }} />;

  if (variant === "avatar") {
    return (
      <svg width={size} height={size} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        {/* Hat brim */}
        <ellipse cx="40" cy="22" rx="22" ry="4" fill="#1a1a1a"/>
        {/* Hat top */}
        <rect x="24" y="4" width="32" height="20" rx="4" fill="#1a1a1a"/>
        {/* Hat band */}
        <rect x="24" y="19" width="32" height="4" rx="1" fill="#C5A028"/>
        {/* Face */}
        <circle cx="40" cy="46" r="18" fill="#FDEBC8"/>
        {/* Eyes */}
        <circle cx="33" cy="43" r="2.5" fill="#2D1A0A"/>
        <circle cx="47" cy="43" r="2.5" fill="#2D1A0A"/>
        {/* Eye shine */}
        <circle cx="34" cy="42" r="0.8" fill="white"/>
        <circle cx="48" cy="42" r="0.8" fill="white"/>
        {/* Smile */}
        <path d="M33 51 Q40 57 47 51" stroke="#2D1A0A" strokeWidth="1.8" strokeLinecap="round" fill="none"/>
        {/* Cheeks */}
        <circle cx="29" cy="49" r="4" fill="#F4A0A0" opacity="0.5"/>
        <circle cx="51" cy="49" r="4" fill="#F4A0A0" opacity="0.5"/>
        {/* Moustache */}
        <path d="M35 47.5 Q38 46 40 47 Q42 46 45 47.5" stroke="#8B5E3C" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
        {/* Collar */}
        <path d="M28 62 L40 65 L52 62" stroke="#1a1a1a" strokeWidth="2" fill="none"/>
        {/* Bowtie */}
        <path d="M36 64 L40 67 L44 64 L40 61 Z" fill="#C5A028"/>
      </svg>
    );
  }

  // Full body mascot
  return (
    <div
      style={{
        width: size,
        display: "inline-block",
        opacity: show ? 1 : 0,
        transition: "opacity 0.5s ease",
      }}
    >
      <svg
        width={size}
        height={size * 1.6}
        viewBox="0 0 100 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Plan A Maskottchen"
      >
        {/* === BODY === */}
        {/* Suit jacket */}
        <path d="M20 100 Q20 140 25 155 L75 155 Q80 140 80 100 L70 90 L60 95 L50 93 L40 95 L30 90 Z" fill="#2D2D2D"/>
        {/* Shirt front */}
        <path d="M40 95 L50 93 L60 95 L58 130 L42 130 Z" fill="white"/>
        {/* Suit lapels */}
        <path d="M30 90 L40 95 L38 105 L25 100 Z" fill="#3D3D3D"/>
        <path d="M70 90 L60 95 L62 105 L75 100 Z" fill="#3D3D3D"/>
        {/* Bowtie */}
        <path d="M44 93 L50 96 L56 93 L50 90 Z" fill="#C5A028"/>
        {/* Pocket square */}
        <path d="M65 103 L69 101 L70 105 L67 107 Z" fill="#C5A028"/>
        {/* Buttons */}
        <circle cx="50" cy="108" r="1.5" fill="#C5A028"/>
        <circle cx="50" cy="116" r="1.5" fill="#C5A028"/>
        <circle cx="50" cy="124" r="1.5" fill="#C5A028"/>
        {/* Legs */}
        <rect x="35" y="152" width="13" height="8" rx="2" fill="#1a1a1a"/>
        <rect x="52" y="152" width="13" height="8" rx="2" fill="#1a1a1a"/>
        {/* Shoes */}
        <ellipse cx="41" cy="159" rx="9" ry="3.5" fill="#0a0a0a"/>
        <ellipse cx="59" cy="159" rx="9" ry="3.5" fill="#0a0a0a"/>

        {/* === LEFT ARM (static) === */}
        <path d="M20 100 Q10 115 12 130" stroke="#2D2D2D" strokeWidth="12" strokeLinecap="round" fill="none"/>
        <path d="M12 130 Q10 136 14 138" stroke="#FDEBC8" strokeWidth="9" strokeLinecap="round" fill="none"/>
        {/* Left hand */}
        <circle cx="14" cy="140" r="6" fill="#FDEBC8"/>

        {/* === RIGHT ARM (waving) === */}
        <g style={animate ? { transformOrigin: "80px 100px", animation: "maskottchen-wave 2.5s ease-in-out 0.5s 3" } : {}}>
          <path d="M80 100 Q90 85 88 70" stroke="#2D2D2D" strokeWidth="12" strokeLinecap="round" fill="none"/>
          <path d="M88 70 Q90 64 86 62" stroke="#FDEBC8" strokeWidth="9" strokeLinecap="round" fill="none"/>
          {/* Right hand waving */}
          <g style={animate ? { transformOrigin: "86px 60px", animation: "maskottchen-hand 2.5s ease-in-out 0.5s 3" } : {}}>
            <circle cx="86" cy="58" r="7" fill="#FDEBC8"/>
            {/* Fingers */}
            <circle cx="80" cy="53" r="3" fill="#FDEBC8"/>
            <circle cx="86" cy="51" r="3" fill="#FDEBC8"/>
            <circle cx="92" cy="53" r="3" fill="#FDEBC8"/>
            <circle cx="94" cy="59" r="3" fill="#FDEBC8"/>
          </g>
        </g>

        {/* === NECK === */}
        <rect x="44" y="79" width="12" height="14" rx="4" fill="#FDEBC8"/>

        {/* === HEAD === */}
        {/* Hat brim */}
        <ellipse cx="50" cy="28" rx="26" ry="5" fill="#1a1a1a"/>
        {/* Hat top */}
        <rect x="30" y="5" width="40" height="26" rx="5" fill="#1a1a1a"/>
        {/* Hat band */}
        <rect x="30" y="24" width="40" height="5" rx="1" fill="#C5A028"/>

        {/* Face */}
        <ellipse cx="50" cy="58" rx="20" ry="22" fill="#FDEBC8"/>

        {/* Ears */}
        <ellipse cx="30" cy="58" rx="4" ry="5" fill="#FDEBC8"/>
        <ellipse cx="70" cy="58" rx="4" ry="5" fill="#FDEBC8"/>
        <ellipse cx="30" cy="58" rx="2" ry="3" fill="#F4C5A0"/>
        <ellipse cx="70" cy="58" rx="2" ry="3" fill="#F4C5A0"/>

        {/* Eyes */}
        <circle cx="42" cy="54" r="3.5" fill="white"/>
        <circle cx="58" cy="54" r="3.5" fill="white"/>
        <circle cx="42" cy="54" r="2.5" fill="#2D1A0A"/>
        <circle cx="58" cy="54" r="2.5" fill="#2D1A0A"/>
        {/* Eye shine */}
        <circle cx="43" cy="53" r="0.9" fill="white"/>
        <circle cx="59" cy="53" r="0.9" fill="white"/>
        {/* Eyebrows */}
        <path d="M38 49.5 Q42 48 46 49.5" stroke="#6B3D1E" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
        <path d="M54 49.5 Q58 48 62 49.5" stroke="#6B3D1E" strokeWidth="1.5" strokeLinecap="round" fill="none"/>

        {/* Nose */}
        <ellipse cx="50" cy="60" rx="3" ry="2" fill="#E8A87C"/>

        {/* Moustache */}
        <path d="M43 64 Q47 62 50 63.5 Q53 62 57 64" stroke="#8B5E3C" strokeWidth="2" strokeLinecap="round" fill="none"/>

        {/* Smile */}
        <path d="M40 68 Q50 76 60 68" stroke="#2D1A0A" strokeWidth="2" strokeLinecap="round" fill="none"/>

        {/* Cheeks */}
        <circle cx="35" cy="65" r="6" fill="#F4A0A0" opacity="0.4"/>
        <circle cx="65" cy="65" r="6" fill="#F4A0A0" opacity="0.4"/>
      </svg>
    </div>
  );
}
