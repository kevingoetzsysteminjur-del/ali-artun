"use client";
import { useState, useRef, useCallback } from "react";

interface Props {
  vorherSrc: string;
  nachherSrc: string;
  label: string;
}

export default function VorherNachherSlider({ vorherSrc, nachherSrc, label }: Props) {
  const [pos, setPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const calc = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setPos((x / rect.width) * 100);
  }, []);

  const onMouseDown = (e: React.MouseEvent) => { dragging.current = true; calc(e.clientX); };
  const onMouseMove = (e: React.MouseEvent) => { if (dragging.current) calc(e.clientX); };
  const onMouseUp = () => { dragging.current = false; };

  const onTouchStart = (e: React.TouchEvent) => { dragging.current = true; calc(e.touches[0].clientX); };
  const onTouchMove = (e: React.TouchEvent) => { if (dragging.current) calc(e.touches[0].clientX); };
  const onTouchEnd = () => { dragging.current = false; };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <div
        ref={containerRef}
        onMouseDown={onMouseDown} onMouseMove={onMouseMove} onMouseUp={onMouseUp} onMouseLeave={onMouseUp}
        onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}
        style={{ position: "relative", width: "100%", aspectRatio: "4/3", borderRadius: "14px", overflow: "hidden", cursor: "ew-resize", userSelect: "none", touchAction: "none" }}>
        {/* Nachher (Hintergrund) */}
        <img src={nachherSrc} alt="Nachher" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
        {/* Vorher (geclippt) */}
        <div style={{ position: "absolute", inset: 0, overflow: "hidden", width: `${pos}%` }}>
          <img src={vorherSrc} alt="Vorher" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", minWidth: `${10000 / pos}%` }} />
        </div>
        {/* Divider line */}
        <div style={{ position: "absolute", top: 0, bottom: 0, left: `${pos}%`, width: "2px", backgroundColor: "#fff", transform: "translateX(-50%)", pointerEvents: "none" }}>
          {/* Handle */}
          <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "36px", height: "36px", borderRadius: "50%", backgroundColor: "#fff", boxShadow: "0 2px 12px rgba(0,0,0,0.3)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="16" height="16" fill="none" stroke="#1B3A4B" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 18l-6-6 6-6M15 6l6 6-6 6"/></svg>
          </div>
        </div>
        {/* Labels */}
        <div style={{ position: "absolute", top: "10px", left: "10px", padding: "4px 10px", backgroundColor: "rgba(0,0,0,0.55)", borderRadius: "50px", fontSize: "11px", fontWeight: 500, color: "#fff", letterSpacing: "0.08em", pointerEvents: "none" }}>VORHER</div>
        <div style={{ position: "absolute", top: "10px", right: "10px", padding: "4px 10px", backgroundColor: "rgba(200,169,110,0.85)", borderRadius: "50px", fontSize: "11px", fontWeight: 500, color: "#fff", letterSpacing: "0.08em", pointerEvents: "none" }}>NACHHER</div>
      </div>
      <p style={{ fontSize: "12px", color: "#9CA3AF", textAlign: "center", margin: 0 }}>{label}</p>
    </div>
  );
}
