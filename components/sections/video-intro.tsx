"use client";

import Image from "next/image";

const particles = [
  { left: "8%",  top: "70%", size: 12, duration: 12, delay: 0 },
  { left: "15%", top: "55%", size: 9,  duration: 16, delay: 2 },
  { left: "23%", top: "80%", size: 14, duration: 14, delay: 1 },
  { left: "31%", top: "45%", size: 9,  duration: 18, delay: 3 },
  { left: "42%", top: "75%", size: 12, duration: 11, delay: 0.5 },
  { left: "50%", top: "60%", size: 9,  duration: 15, delay: 4 },
  { left: "60%", top: "85%", size: 14, duration: 13, delay: 1.5 },
  { left: "68%", top: "50%", size: 9,  duration: 17, delay: 2.5 },
  { left: "75%", top: "72%", size: 12, duration: 10, delay: 0 },
  { left: "82%", top: "40%", size: 9,  duration: 19, delay: 3.5 },
  { left: "90%", top: "65%", size: 14, duration: 12, delay: 1 },
  { left: "5%",  top: "30%", size: 9,  duration: 14, delay: 2 },
  { left: "18%", top: "20%", size: 12, duration: 16, delay: 0 },
  { left: "35%", top: "15%", size: 9,  duration: 20, delay: 4.5 },
  { left: "55%", top: "25%", size: 12, duration: 13, delay: 1 },
  { left: "72%", top: "18%", size: 9,  duration: 15, delay: 3 },
  { left: "88%", top: "28%", size: 14, duration: 11, delay: 0.5 },
  { left: "95%", top: "82%", size: 9,  duration: 18, delay: 2 },
];

const houses = [
  { left: "7%",  top: "15%", size: 48, duration: 25, delay: 0 },
  { left: "82%", top: "60%", size: 40, duration: 30, delay: 5 },
  { left: "55%", top: "10%", size: 36, duration: 28, delay: 10 },
  { left: "20%", top: "65%", size: 44, duration: 22, delay: 3 },
];

function HouseShape({ size }: { size: number }) {
  const s = size;
  const wall = Math.round(s * 0.55);
  const roofH = Math.round(s * 0.45);
  return (
    <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} fill="none">
      {/* roof */}
      <polyline
        points={`2,${roofH} ${s / 2},2 ${s - 2},${roofH}`}
        stroke="#C9A96E"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      {/* walls */}
      <rect
        x={Math.round(s * 0.15)}
        y={roofH}
        width={Math.round(s * 0.7)}
        height={wall}
        stroke="#C9A96E"
        strokeWidth="1.5"
      />
      {/* door */}
      <rect
        x={Math.round(s * 0.38)}
        y={Math.round(roofH + wall * 0.45)}
        width={Math.round(s * 0.24)}
        height={Math.round(wall * 0.55)}
        stroke="#C9A96E"
        strokeWidth="1"
      />
    </svg>
  );
}

export default function VideoIntro() {
  return (
    <section
      style={{
        height: "100vh",
        background: "#F9F8F5",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 24px 24px",
        boxSizing: "border-box",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Hintergrund-Animation */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        {/* Goldene Partikel */}
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
              background: "#C9A96E",
              opacity: 0.25,
              animation: `floatUp ${p.duration}s ${p.delay}s ease-in-out infinite`,
            }}
          />
        ))}

        {/* Haus-Silhouetten */}
        {houses.map((h, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: h.left,
              top: h.top,
              opacity: 0.08,
              animation: `drift ${h.duration}s ${h.delay}s ease-in-out infinite`,
            }}
          >
            <HouseShape size={h.size} />
          </div>
        ))}
      </div>

      {/* CSS Keyframes */}
      <style>{`
        @keyframes floatUp {
          0%   { transform: translate(0px, 0px) scale(1);        opacity: 0.15; }
          15%  { transform: translate(30px, -20px) scale(1.1);   opacity: 0.35; }
          30%  { transform: translate(60px, 10px) scale(0.9);    opacity: 0.25; }
          45%  { transform: translate(40px, -35px) scale(1.2);   opacity: 0.4; }
          60%  { transform: translate(80px, -15px) scale(1);     opacity: 0.2; }
          75%  { transform: translate(50px, 20px) scale(1.1);    opacity: 0.35; }
          90%  { transform: translate(20px, -10px) scale(0.95);  opacity: 0.25; }
          100% { transform: translate(0px, 0px) scale(1);        opacity: 0.15; }
        }
        @keyframes drift {
          0%   { transform: translate(0px, 0px) rotate(0deg); }
          33%  { transform: translate(8px, -12px) rotate(3deg); }
          66%  { transform: translate(-6px, 10px) rotate(-2deg); }
          100% { transform: translate(0px, 0px) rotate(0deg); }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(8px); }
        }
      `}</style>

      {/* Logo + Cartoon + Claim */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 30, position: "relative", gap: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <Image
            src="/logo_transparent.png"
            alt="Plan A Immobilien Logo"
            width={350}
            height={132}
            style={{
              width: 350,
              height: "auto",
              display: "block",
              borderRadius: 8,
              boxShadow: "0 4px 24px rgba(201,169,110,0.35)",
            }}
          />
          <Image
            src="/ali-cartoon.png"
            alt="Ali Artun Cartoon"
            width={100}
            height={100}
            style={{ width: "auto", height: 130, display: "block", filter: "drop-shadow(0 4px 16px rgba(201,169,110,0.5))" }}
          />
        </div>
        <p style={{
          fontFamily: "var(--font-playfair), 'Playfair Display', serif",
          fontStyle: "italic",
          fontSize: "1.25rem",
          color: "#C9A96E",
          letterSpacing: "0.03em",
          margin: 0,
        }}>
          Entscheidungen auf einem anderen Niveau.
        </p>
      </div>

      {/* Video */}
      <div style={{ width: "100%", maxWidth: 1100, flex: "0 1 auto", position: "relative" }}>
        <div
          style={{
            position: "relative",
            width: "100%",
            paddingTop: "56.25%",
            borderRadius: 16,
            overflow: "hidden",
            boxShadow: "0 8px 40px rgba(0,0,0,0.12)",
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
      </div>

      {/* Scroll-Indikator */}
      <div style={{ marginTop: 32, position: "relative" }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#C9A96E"
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
