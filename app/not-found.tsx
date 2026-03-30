import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: "70vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#F7F5F2", padding: "80px 24px" }}>
        <div style={{ textAlign: "center", maxWidth: "480px" }}>
          <Image src="/maskottchen.png" alt="Plan A" width={160} height={160} style={{ width: "160px", height: "auto", marginBottom: "24px", opacity: 0.85 }} />
          <p style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: "#C8A96E", marginBottom: "12px" }}>FEHLER 404</p>
          <h1 style={{ fontFamily: "var(--font-dm-serif, serif)", fontSize: "2.5rem", color: "#1A1A1A", marginBottom: "16px" }}>
            Ups, diese Seite gibt es nicht.
          </h1>
          <p style={{ fontSize: "15px", color: "#6B7280", lineHeight: 1.7, fontWeight: 300, marginBottom: "36px" }}>
            Die gesuchte Seite existiert nicht oder wurde verschoben. Kehren Sie zur Startseite zurück.
          </p>
          <Link href="/"
            style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "14px 32px", backgroundColor: "#1B3A4B", color: "#fff", borderRadius: "50px", textDecoration: "none", fontSize: "14px", fontWeight: 500 }}>
            Zur Startseite →
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
