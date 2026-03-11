const MEDIEN = [
  { name: "Rhein-Neckar-Zeitung", kuerzel: "RNZ", farbe: "#B22222" },
  { name: "Mosbach aktuell",       kuerzel: "MA",  farbe: "#1A4A8A" },
  { name: "MRN News",              kuerzel: "MRN", farbe: "#2D6A4F" },
  { name: "Südwest Presse",        kuerzel: "SWP", farbe: "#8B0000" },
];

export default function MedienLeiste() {
  return (
    <section className="bg-stone-50 border-y border-stone-200/60 py-10">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <p className="text-center text-xs font-semibold tracking-[0.2em] uppercase text-stone-400 mb-7">
          Regionale Medien & Präsenz
        </p>

        <div className="flex flex-wrap justify-center items-center gap-6 lg:gap-10">
          {MEDIEN.map((m) => (
            <div
              key={m.name}
              className="flex items-center gap-2.5 opacity-40 hover:opacity-80 transition-opacity duration-200 cursor-default"
              title={m.name}
            >
              {/* Stilisiertes Logo-Quadrat */}
              <div
                className="w-8 h-8 rounded-md flex items-center justify-center text-white text-[10px] font-black flex-shrink-0"
                style={{ backgroundColor: m.farbe }}
              >
                {m.kuerzel}
              </div>
              <span className="text-stone-700 font-semibold text-sm whitespace-nowrap">
                {m.name}
              </span>
            </div>
          ))}

          {/* Platzhalter-Hinweis */}
          <div className="w-full text-center mt-4">
            <p className="text-stone-400 text-xs">
              Medienpartnerschaften in Planung · Platzhalter
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
