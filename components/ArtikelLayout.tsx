import Link from "next/link";

interface ArtikelLayoutProps {
  kategorie: string;
  kategorieColor: string;
  titel: string;
  datum: string;
  lesezeit: string;
  children: React.ReactNode;
  weitereArtikel: { slug: string; titel: string; kategorie: string }[];
}

export default function ArtikelLayout({ kategorie, kategorieColor, titel, datum, lesezeit, children, weitereArtikel }: ArtikelLayoutProps) {
  return (
    <div style={{ backgroundColor: "#FAFAF8", minHeight: "100vh" }}>
      {/* Breadcrumb + Back */}
      <div style={{ backgroundColor: "#FAF8F4", borderBottom: "1px solid rgba(197,160,40,0.15)", padding: "0 24px" }}>
        <div style={{ maxWidth: "860px", margin: "0 auto", padding: "14px 0", display: "flex", alignItems: "center", gap: "8px", fontFamily: "var(--font-body)", fontSize: "12px", color: "#9E9189" }}>
          <Link href="/" style={{ color: "#9E9189", textDecoration: "none", transition: "color 0.2s" }}>Startseite</Link>
          <span>›</span>
          <Link href="/ratgeber" style={{ color: "#9E9189", textDecoration: "none" }}>Ratgeber</Link>
          <span>›</span>
          <span style={{ color: "#4A3728" }}>{titel.length > 40 ? titel.substring(0, 40) + "…" : titel}</span>
        </div>
      </div>

      <div style={{ maxWidth: "860px", margin: "0 auto", padding: "48px 24px 80px" }}>
        {/* Artikel Hero */}
        <header style={{ marginBottom: "48px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
            <span style={{ padding: "4px 12px", backgroundColor: `${kategorieColor}18`, color: kategorieColor, fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", fontFamily: "var(--font-body)", fontWeight: 600, borderRadius: "20px" }}>
              {kategorie}
            </span>
            <span style={{ fontFamily: "var(--font-body)", fontSize: "12px", color: "#9E9189" }}>{datum} · {lesezeit} Lesezeit</span>
          </div>
          <h1 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 400, color: "#1a1a1a", lineHeight: 1.25, letterSpacing: "0.04em", marginBottom: "24px" }}>
            {titel}
          </h1>
          <div style={{ width: "60px", height: "2px", background: "linear-gradient(90deg, #C5A028, #A08020)" }} />
        </header>

        {/* Artikel Inhalt */}
        <div className="artikel-inhalt">
          {children}
        </div>

        {/* CTA Box */}
        <div style={{ marginTop: "56px", padding: "36px 40px", border: "1px solid rgba(197,160,40,0.3)", backgroundColor: "#FAF8F4", borderLeft: "4px solid #C5A028" }}>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#C5A028", marginBottom: "10px" }}>Kostenlose Beratung</p>
          <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.5rem", fontWeight: 400, color: "#1a1a1a", marginBottom: "10px" }}>Haben Sie Fragen zu Ihrer Immobilie?</h3>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "14px", color: "#6B5E4E", marginBottom: "20px", lineHeight: 1.6 }}>
            Ali Artun berät Sie persönlich, unverbindlich und kostenlos. Rufen Sie jetzt an oder nutzen Sie das Kontaktformular.
          </p>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <a href="/#kontakt" className="btn-primary">Jetzt beraten lassen <span className="btn-arrow">→</span></a>
            <a href="tel:+4962611234560" className="btn-secondary">📞 06261 / 123 456</a>
          </div>
        </div>

        {/* Weitere Artikel */}
        {weitereArtikel.length > 0 && (
          <div style={{ marginTop: "56px" }}>
            <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.3rem", fontWeight: 400, color: "#1a1a1a", marginBottom: "20px", letterSpacing: "0.04em" }}>Weitere Artikel</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "16px" }}>
              {weitereArtikel.map(a => (
                <Link key={a.slug} href={`/ratgeber/${a.slug}`} style={{ textDecoration: "none", display: "block", padding: "20px", border: "1px solid rgba(197,160,40,0.2)", backgroundColor: "#fff", transition: "border-color 0.2s" }}>
                  <span style={{ fontFamily: "var(--font-body)", fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", color: "#C5A028", display: "block", marginBottom: "8px" }}>{a.kategorie}</span>
                  <span style={{ fontFamily: "var(--font-heading)", fontSize: "0.95rem", color: "#1a1a1a", lineHeight: 1.4 }}>{a.titel}</span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Zurück */}
        <div style={{ marginTop: "40px" }}>
          <Link href="/ratgeber" className="btn-secondary" style={{ fontSize: "12px" }}>← Zur Übersicht</Link>
        </div>
      </div>
    </div>
  );
}
