"use client";

import Image from "next/image";

export default function VideoIntro() {
  return (
    <section
      style={{
        minHeight: "100vh",
        background: "linear-gradient(160deg, #F9F8F5 0%, #F0EBE0 60%, #EDE5D6 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 16px",
        boxSizing: "border-box",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Dezente Hintergrund-Ornamente */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        {/* Großer Kreis oben links */}
        <div style={{
          position: "absolute", top: "-120px", left: "-120px",
          width: 380, height: 380, borderRadius: "50%",
          border: "1px solid rgba(197,160,40,0.12)",
        }} />
        <div style={{
          position: "absolute", top: "-80px", left: "-80px",
          width: 280, height: 280, borderRadius: "50%",
          border: "1px solid rgba(197,160,40,0.08)",
        }} />
        {/* Großer Kreis unten rechts */}
        <div style={{
          position: "absolute", bottom: "-100px", right: "-100px",
          width: 340, height: 340, borderRadius: "50%",
          border: "1px solid rgba(197,160,40,0.1)",
        }} />
        {/* Gold-Punkte */}
        <div style={{ position: "absolute", top: "15%", right: "8%", width: 6, height: 6, borderRadius: "50%", background: "#C5A028", opacity: 0.3 }} />
        <div style={{ position: "absolute", top: "30%", right: "14%", width: 4, height: 4, borderRadius: "50%", background: "#C5A028", opacity: 0.2 }} />
        <div style={{ position: "absolute", bottom: "25%", left: "6%", width: 5, height: 5, borderRadius: "50%", background: "#C5A028", opacity: 0.25 }} />
      </div>

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(8px); }
        }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Haupt-Grid */}
      <div
        style={{
          width: "100%",
          maxWidth: 1080,
          display: "grid",
          gap: 48,
          position: "relative",
          alignItems: "center",
        }}
        className="grid grid-cols-1 lg:grid-cols-[420px_1fr]"
      >
        {/* Linke Spalte: Branding */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 0,
            textAlign: "center",
            animation: "fadeSlideUp 0.7s ease both",
          }}
        >
          {/* Logo */}
          <Image
            src="/logo.png"
            alt="Plan A Immobilien Logo"
            width={260}
            height={98}
            style={{
              width: "min(240px, calc(100vw - 80px))",
              height: "auto",
              display: "block",
              marginBottom: 8,
            }}
            priority
          />

          {/* Trennlinie Gold */}
          <div style={{
            width: 48, height: 2,
            background: "linear-gradient(90deg, transparent, #C5A028, transparent)",
            margin: "16px auto",
            borderRadius: 2,
          }} />

          {/* Claim */}
          <p style={{
            fontFamily: "var(--font-playfair), 'Playfair Display', serif",
            fontStyle: "italic",
            fontSize: "1.1rem",
            color: "#8A6A18",
            letterSpacing: "0.02em",
            margin: "0 0 6px 0",
            lineHeight: 1.5,
          }}>
            Entscheidungen auf einem anderen Niveau.
          </p>

          <p style={{
            fontSize: "0.9rem",
            color: "#8B7355",
            lineHeight: 1.65,
            maxWidth: 280,
            margin: "0 0 28px 0",
          }}>
            Immobilienverkauf mit geprüfter Käuferfinanzierung<br />
            in Mosbach & Umgebung
          </p>

          {/* Maskottchen — nur Desktop */}
          <div className="hidden lg:flex justify-center" style={{ marginBottom: 28 }}>
            <Image
              src="/images/maskottchen.png"
              alt="Plan A Maskottchen"
              width={110}
              height={154}
              style={{ width: 110, height: "auto", objectFit: "contain" }}
            />
          </div>

          {/* CTA Button */}
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

        {/* Rechte Spalte: Video */}
        <div
          style={{
            width: "100%",
            animation: "fadeSlideUp 0.7s ease 0.15s both",
          }}
        >
          {/* Video-Card */}
          <div style={{
            background: "white",
            borderRadius: 20,
            padding: 12,
            boxShadow: "0 8px 48px rgba(197,160,40,0.12), 0 2px 16px rgba(0,0,0,0.06)",
            border: "1px solid rgba(197,160,40,0.18)",
          }}>
            <div
              style={{
                position: "relative",
                width: "100%",
                paddingTop: "56.25%",
                borderRadius: 12,
                overflow: "hidden",
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

          {/* Unter dem Video */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginTop: 14,
            paddingLeft: 4,
          }}>
            <div style={{
              width: 36, height: 36,
              borderRadius: "50%",
              overflow: "hidden",
              border: "2px solid #C5A028",
              flexShrink: 0,
            }}>
              <Image src="/ali.png" alt="Ali Artun" width={36} height={36} style={{ objectFit: "cover", width: "100%", height: "100%" }} />
            </div>
            <div>
              <p style={{ margin: 0, fontSize: "0.85rem", fontWeight: 600, color: "#3D2C1A", lineHeight: 1.3 }}>
                Ali Artun stellt sich vor
              </p>
              <p style={{ margin: 0, fontSize: "0.75rem", color: "#8B7355" }}>
                Ihr Immobilienberater · Mosbach
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll-Indikator */}
      <div style={{ marginTop: 36, position: "relative" }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="26"
          height="26"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#C5A028"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ animation: "bounce 1.5s infinite", opacity: 0.6 }}
        >
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </div>
    </section>
  );
}
