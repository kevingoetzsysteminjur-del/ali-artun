"use client";
import { useEffect, useState } from "react";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import Link from "next/link";

interface Prop { id: string; titel: string; ort: string; typ: string; preis: string; }

const ALLE_PROPS: Prop[] = [
  { id: "prop-1", titel: "Stilvolle Eigentumswohnung", ort: "Mosbach, Baden-Württemberg", typ: "Eigentumswohnung", preis: "295.000 €" },
  { id: "prop-2", titel: "Einfamilienhaus mit Garten", ort: "Neckar-Odenwald-Kreis", typ: "Einfamilienhaus", preis: "485.000 €" },
  { id: "prop-3", titel: "Mehrfamilienhaus als Kapitalanlage", ort: "Mosbach Innenstadt", typ: "Mehrfamilienhaus", preis: "720.000 €" },
  { id: "prop-4", titel: "Attraktives Grundstück in Bestlage", ort: "Buchen, Odenwald", typ: "Grundstück", preis: "145.000 €" },
];

export default function MerkzettelPage() {
  const [ids, setIds] = useState<string[]>([]);
  useEffect(() => {
    const saved = localStorage.getItem("merkzettel");
    if (saved) setIds(JSON.parse(saved));
  }, []);

  const remove = (id: string) => {
    const next = ids.filter(i => i !== id);
    setIds(next);
    localStorage.setItem("merkzettel", JSON.stringify(next));
  };

  const saved = ALLE_PROPS.filter(p => ids.includes(p.id));

  return (
    <>
      <Navbar />
      <main>
        <section style={{ background: "linear-gradient(135deg,#1B3A4B 0%,#0e2230 100%)", padding: "120px 0 80px" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>
            <p style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: "#C8A96E", marginBottom: "16px" }}>GESPEICHERT</p>
            <h1 style={{ fontFamily: "var(--font-dm-serif, serif)", fontSize: "clamp(2rem, 4vw, 3.5rem)", color: "#fff", lineHeight: 1.1 }}>
              Ihr Merkzettel
            </h1>
          </div>
        </section>

        <section style={{ backgroundColor: "#F7F5F2", padding: "80px 0", minHeight: "50vh" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>
            {saved.length === 0 ? (
              <div style={{ textAlign: "center", padding: "80px 24px" }}>
                <svg width="64" height="64" fill="none" stroke="#E5E7EB" strokeWidth="1" viewBox="0 0 24 24" style={{ marginBottom: "24px" }}>
                  <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
                </svg>
                <h2 style={{ fontFamily: "var(--font-dm-serif, serif)", fontSize: "1.6rem", color: "#1A1A1A", marginBottom: "12px" }}>Noch keine Immobilien gespeichert</h2>
                <p style={{ fontSize: "14px", color: "#6B7280", fontWeight: 300, marginBottom: "32px" }}>Klicken Sie auf das Herz-Symbol bei einer Immobilie, um sie zu speichern.</p>
                <Link href="/#angebote"
                  style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "14px 32px", backgroundColor: "#1B3A4B", color: "#fff", borderRadius: "50px", textDecoration: "none", fontSize: "14px", fontWeight: 500 }}>
                  Immobilien entdecken →
                </Link>
              </div>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "24px" }} className="merk-grid">
                {saved.map(p => (
                  <div key={p.id} style={{ backgroundColor: "#fff", borderRadius: "16px", overflow: "hidden", border: "1px solid #E5E7EB" }}>
                    <div style={{ height: "180px", background: "linear-gradient(135deg,#1B3A4B,#0e2230)", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                      <svg width="40" height="40" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1" viewBox="0 0 24 24"><path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z"/><path d="M9 21V12h6v9"/></svg>
                      <button onClick={() => remove(p.id)}
                        style={{ position: "absolute", top: "12px", right: "12px", width: "34px", height: "34px", borderRadius: "50%", backgroundColor: "rgba(255,255,255,0.15)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(4px)" }}>
                        <svg width="16" height="16" fill="#ff6b6b" viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>
                      </button>
                    </div>
                    <div style={{ padding: "20px" }}>
                      <span style={{ fontSize: "10px", fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: "#C8A96E" }}>{p.typ}</span>
                      <h3 style={{ fontFamily: "var(--font-dm-serif, serif)", fontSize: "1.1rem", color: "#1A1A1A", margin: "8px 0 4px" }}>{p.titel}</h3>
                      <p style={{ fontSize: "13px", color: "#9CA3AF", margin: "0 0 12px", fontWeight: 300 }}>{p.ort}</p>
                      <p style={{ fontFamily: "var(--font-dm-serif, serif)", fontSize: "1.2rem", color: "#1B3A4B", margin: 0 }}>{p.preis}</p>
                      <Link href="/kontakt?betreff=Immobilienverkauf"
                        style={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: "16px", padding: "10px 20px", backgroundColor: "#1B3A4B", color: "#fff", borderRadius: "50px", textDecoration: "none", fontSize: "13px", fontWeight: 500 }}>
                        Anfrage senden →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
      <style>{`@media(max-width:900px){.merk-grid{grid-template-columns:1fr 1fr!important;}}@media(max-width:560px){.merk-grid{grid-template-columns:1fr!important;}}`}</style>
    </>
  );
}
