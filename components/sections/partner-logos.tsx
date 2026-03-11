const PARTNER = [
  { name: "Sparkasse",     farbe: "#E30613", schrift: "font-bold" },
  { name: "Volksbank",     farbe: "#003087", schrift: "font-bold" },
  { name: "Interhyp",      farbe: "#E2001A", schrift: "font-semibold" },
  { name: "Dr. Klein",     farbe: "#1B3A6B", schrift: "font-semibold" },
  { name: "ING",           farbe: "#FF6200", schrift: "font-bold" },
  { name: "Commerzbank",   farbe: "#FFCC00", schrift: "font-bold", dunkel: true },
  { name: "Deutsche Bank", farbe: "#0018A8", schrift: "font-semibold" },
  { name: "Postbank",      farbe: "#FFD200", schrift: "font-bold", dunkel: true },
];

function LogoItem({ name, farbe, schrift, dunkel }: { name: string; farbe: string; schrift: string; dunkel?: boolean }) {
  return (
    <div className="flex-shrink-0 mx-8 flex items-center group">
      <div
        className="px-5 py-2.5 rounded-lg border text-sm tracking-wide transition-all duration-300 grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100"
        style={{ borderColor: `${farbe}30`, background: `${farbe}08` }}
      >
        <span
          className={`${schrift} text-[13px] tracking-wide`}
          style={{ color: dunkel ? "#333" : farbe }}
        >
          {name}
        </span>
      </div>
    </div>
  );
}

export default function PartnerLogos() {
  return (
    <section className="bg-white py-14 border-y border-[#C5A028]/10 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 lg:px-8 mb-8 text-center">
        <p className="text-xs font-semibold tracking-[0.2em] uppercase text-stone-400">
          Starke Partner für Ihre Finanzierung
        </p>
      </div>

      {/* Marquee */}
      <div className="overflow-hidden relative">
        {/* Fade-out Ränder */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        <div className="flex items-center partner-marquee">
          {/* Doppelter Satz für nahtlose Schleife */}
          {[...PARTNER, ...PARTNER].map((p, i) => (
            <LogoItem key={i} {...p} />
          ))}
        </div>
      </div>

      <p className="text-center text-stone-400 text-xs mt-6">
        Platzhalter – Partnervereinbarungen werden eingerichtet
      </p>
    </section>
  );
}
