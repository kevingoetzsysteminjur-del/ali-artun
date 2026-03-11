"use client";

import Image from "next/image";

const particles = [
  { left: "8%",  top: "70%", size: 10, duration: 12, delay: 0 },
  { left: "20%", top: "30%", size: 7,  duration: 16, delay: 2 },
  { left: "42%", top: "75%", size: 10, duration: 11, delay: 0.5 },
  { left: "60%", top: "85%", size: 12, duration: 13, delay: 1.5 },
  { left: "75%", top: "20%", size: 8,  duration: 10, delay: 0 },
  { left: "88%", top: "55%", size: 10, duration: 18, delay: 1 },
];

const houses = [
  { left: "5%",  top: "10%", size: 40, duration: 25, delay: 0 },
  { left: "85%", top: "55%", size: 32, duration: 30, delay: 5 },
];

function HouseShape({ size }: { size: number }) {
  const s = size;
  const roofH = Math.round(s * 0.45);
  const wall = Math.round(s * 0.55);
  return (
    <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} fill="none">
      <polyline
        points={`2,${roofH} ${s / 2},2 ${s - 2},${roofH}`}
        stroke="#C5A028"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <rect
        x={Math.round(s * 0.15)}
        y={roofH}
        width={Math.round(s * 0.7)}
        height={wall}
        stroke="#C5A028"
        strokeWidth="1.5"
      />
      <rect
        x={Math.round(s * 0.38)}
        y={Math.round(roofH + wall * 0.45)}
        width={Math.round(s * 0.24)}
        height={Math.round(wall * 0.55)}
        stroke="#C5A028"
        strokeWidth="1"
      />
    </svg>
  );
}

export default function VideoIntro() {
  return (
    <section
      style={{
        minHeight: "100vh",
        background: "#F9F8F5",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "32px 16px",
        boxSizing: "border-box",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background animation */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        {particles.map((p, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
              borderRadius: "50%",
              background: "#C5A028",
              opacity: 0.2,
              animation: `floatUp ${p.duration}s ${p.delay}s ease-in-out infinite`,
            }}
          />
        ))}
        {houses.map((h, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: h.left,
              top: h.top,
              opacity: 0.06,
              animation: `drift ${h.duration}s ${h.delay}s ease-in-out infinite`,
            }}
          >
            <HouseShape size={h.size} />
          </div>
        ))}
      </div>

      <style>{`
        @keyframes floatUp {
          0%   { transform: translate(0, 0) scale(1);       opacity: 0.12; }
          25%  { transform: translate(20px, -15px) scale(1.1); opacity: 0.28; }
          50%  { transform: translate(40px, 5px) scale(0.95);  opacity: 0.18; }
          75%  { transform: translate(15px, -25px) scale(1.1); opacity: 0.3; }
          100% { transform: translate(0, 0) scale(1);       opacity: 0.12; }
        }
        @keyframes drift {
          0%   { transform: translate(0, 0) rotate(0deg); }
          33%  { transform: translate(6px, -10px) rotate(2deg); }
          66%  { transform: translate(-5px, 8px) rotate(-2deg); }
          100% { transform: translate(0, 0) rotate(0deg); }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(8px); }
        }
      `}</style>

      {/* Content wrapper: two-column layout on desktop */}
      <div
        style={{
          width: "100%",
          maxWidth: 1000,
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: 32,
          position: "relative",
          alignItems: "center",
        }}
        className="lg:grid-cols-[1fr_1fr] grid"
      >
        {/* Left: Logo + Claim */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16, textAlign: "center" }}>
          <Image
            src="/logo.png"
            alt="Plan A Immobilien Logo"
            width={280}
            height={105}
            style={{
              width: "min(260px, calc(100vw - 80px))",
              height: "auto",
              display: "block",
              borderRadius: 8,
              boxShadow: "0 4px 24px rgba(197,160,40,0.3)",
            }}
          />
          {/* Ali cartoon if present */}
          <Image
            src="/ali-cartoon.png"
            alt="Ali Artun Cartoon"
            width={90}
            height={90}
            style={{
              width: "auto",
              height: 90,
              display: "block",
              filter: "drop-shadow(0 4px 16px rgba(197,160,40,0.5))",
            }}
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
          <p style={{
            fontFamily: "var(--font-playfair), 'Playfair Display', serif",
            fontStyle: "italic",
            fontSize: "1.15rem",
            color: "#C5A028",
            letterSpacing: "0.03em",
            margin: 0,
          }}>
            Entscheidungen auf einem anderen Niveau.
          </p>
          <p style={{
            fontSize: "1rem",
            color: "#6B5E4E",
            lineHeight: 1.6,
            maxWidth: 300,
          }}>
            Immobilienverkauf mit geprüfter Käuferfinanzierung in Mosbach & Umgebung
          </p>
          <a
            href="#hero"
            className="btn-primary"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" });
              window.scrollBy({ top: window.innerHeight, behavior: "smooth" });
            }}
          >
            Zur Website
            <span className="btn-arrow">→</span>
          </a>
        </div>

        {/* Right: Video (contained, max 700px, smaller) */}
        <div style={{ width: "100%", maxWidth: 700, margin: "0 auto" }}>
          <div
            style={{
              position: "relative",
              width: "100%",
              paddingTop: "56.25%",
              borderRadius: 14,
              overflow: "hidden",
              boxShadow: "0 6px 32px rgba(0,0,0,0.10)",
              border: "1px solid rgba(197,160,40,0.2)",
            }}
          >
            <iframe
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
              src="https://www.youtube.com/embed/HxJ_R-bG22Q"
              title="Plan A Immobilien & Finanzierung"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
          <p style={{ textAlign: "center", marginTop: 10, color: "#8B7355", fontSize: "0.85rem" }}>
            Ali Artun stellt sich vor
          </p>
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{ marginTop: 28, position: "relative" }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#C5A028"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ animation: "bounce 1.5s infinite" }}
        >
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </div>
    </section>
  );
}
