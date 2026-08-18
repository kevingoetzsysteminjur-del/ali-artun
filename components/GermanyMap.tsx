import germanyMap from "@svg-maps/germany";

type MapLocation = { id: string; name: string; path: string };
const locations = germanyMap.locations as MapLocation[];

const ARBEITSGEBIET_ID = "bw";

// Ungefaehre Position von Mosbach (Neckar-Odenwald-Kreis) innerhalb der
// Baden-Wuerttemberg-Flaeche, proportional aus Lat/Long in die SVG-Bounding-Box
// von @svg-maps/germany umgerechnet.
const MOSBACH_POSITION = { x: 210, y: 594 };

export default function GermanyMap() {
  return (
    <div className="w-full max-w-[380px]">
      <svg
        viewBox={germanyMap.viewBox}
        role="img"
        aria-label="Karte von Deutschland mit hervorgehobenem Arbeitsgebiet in Baden-Wuerttemberg um Mosbach"
        className="w-full h-auto"
      >
        {locations.map((location) => {
          const isArbeitsgebiet = location.id === ARBEITSGEBIET_ID;
          return (
            <path
              key={location.id}
              d={location.path}
              fill={isArbeitsgebiet ? "#C5A028" : "#E4DFD3"}
              stroke="#FAF8F4"
              strokeWidth={1.5}
              strokeLinejoin="round"
            />
          );
        })}

        {/* Standortmarkierung Mosbach */}
        <g transform={`translate(${MOSBACH_POSITION.x} ${MOSBACH_POSITION.y})`}>
          <circle r={10} fill="#B8860B" opacity={0.25} />
          <circle r={5} fill="#4A3728" stroke="#FAF8F4" strokeWidth={2} />
        </g>
      </svg>
    </div>
  );
}
