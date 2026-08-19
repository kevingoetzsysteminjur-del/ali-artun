import germanyMap from "@svg-maps/germany";

type MapLocation = { id: string; name: string; path: string };
const locations = germanyMap.locations as MapLocation[];

const ARBEITSGEBIET_ID = "bw";

// Ungefaehre Position von Mosbach (Neckar-Odenwald-Kreis) innerhalb der
// Baden-Wuerttemberg-Flaeche, proportional aus Lat/Long in die SVG-Bounding-Box
// von @svg-maps/germany (viewBox 0 0 586 793) umgerechnet.
const MOSBACH = { x: 210, y: 594 };

// Grobe Zielpunkte auf der Karte fuer die "deutschlandweit"-Lichtspuren.
// Muessen nicht exakt auf Staedte treffen, nur plausibel im Landesgebiet liegen.
const RAY_TARGETS = [
  { id: "n", x: 247, y: 165 }, // Hamburg / Norden
  { id: "ne", x: 487, y: 260 }, // Berlin / Nordosten
  { id: "e", x: 460, y: 400 }, // Sachsen / Osten
  { id: "se", x: 420, y: 630 }, // Bayern / Suedosten
  { id: "sw", x: 140, y: 560 }, // Saarland-Pfalz / Suedwesten
  { id: "w", x: 120, y: 400 }, // NRW / Westen
];

function curvedPath(from: { x: number; y: number }, to: { x: number; y: number }, bend: number) {
  const mx = (from.x + to.x) / 2;
  const my = (from.y + to.y) / 2;
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const len = Math.hypot(dx, dy) || 1;
  // Senkrechter Versatz auf den Mittelpunkt fuer eine sanfte Kurve statt Geraden.
  const nx = (-dy / len) * len * bend;
  const ny = (dx / len) * len * bend;
  const cx = mx + nx;
  const cy = my + ny;
  return `M ${from.x},${from.y} Q ${cx.toFixed(1)},${cy.toFixed(1)} ${to.x},${to.y}`;
}

// Aeussere Komposition: offener Haus-Umriss (Fuenfeck) als Rahmen.
const FRAME_W = 460;
const FRAME_H = 560;
const M = 20;
const ROOF_H = 90;
const X0 = M;
const X1 = FRAME_W - M;
const Y_APEX = M;
const Y_EAVE = M + ROOF_H;
const Y_BASE = FRAME_H - M;
const X_MID = (X0 + X1) / 2;
const HOUSE_PATH = `M ${X0},${Y_BASE} L ${X0},${Y_EAVE} L ${X_MID},${Y_APEX} L ${X1},${Y_EAVE} L ${X1},${Y_BASE}`;

// Karten-Bereich innerhalb der Haus-Waende (mit Innenabstand).
const INNER_PAD = 25;
const MAP_X = X0 + INNER_PAD;
const MAP_Y = Y_EAVE + INNER_PAD;
const MAP_W = X1 - X0 - INNER_PAD * 2;
const MAP_H = Y_BASE - Y_EAVE - INNER_PAD * 2;

export default function GermanyMap() {
  return (
    <div className="w-full max-w-[420px] mx-auto flex flex-col items-center gap-5 hero-graphic-wrap">
      <svg
        viewBox={`0 0 ${FRAME_W} ${FRAME_H}`}
        role="img"
        aria-label="Haus-Rahmen mit Karte von Deutschland, hervorgehobenem Arbeitsgebiet in Baden-Wuerttemberg und Standort Mosbach"
        className="w-full h-auto"
      >
        {/* Haus-Rahmen: duenne goldene Outline, offen (kein Boden, kein Volltonhintergrund) */}
        <path
          d={HOUSE_PATH}
          fill="none"
          stroke="#C5A028"
          strokeWidth={1.5}
          strokeLinejoin="round"
          strokeLinecap="round"
        />

        <svg
          x={MAP_X}
          y={MAP_Y}
          width={MAP_W}
          height={MAP_H}
          viewBox={germanyMap.viewBox}
          preserveAspectRatio="xMidYMid meet"
          overflow="visible"
        >
          <defs>
            <filter id="rayGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="1.1" />
            </filter>
            {RAY_TARGETS.map((t) => (
              <linearGradient
                key={t.id}
                id={`rayGrad-${t.id}`}
                gradientUnits="userSpaceOnUse"
                x1={MOSBACH.x}
                y1={MOSBACH.y}
                x2={t.x}
                y2={t.y}
              >
                <stop offset="0%" stopColor="#E8B820" stopOpacity={0.9} />
                <stop offset="100%" stopColor="#C5A028" stopOpacity={0} />
              </linearGradient>
            ))}
          </defs>

          {/* Bundeslaender */}
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

          {/* Lichtspuren: deutschlandweite Taetigkeit, ausgehend von Mosbach */}
          <g filter="url(#rayGlow)">
            {RAY_TARGETS.map((t, i) => (
              <path
                key={t.id}
                d={curvedPath(MOSBACH, t, i % 2 === 0 ? 0.18 : -0.18)}
                fill="none"
                stroke={`url(#rayGrad-${t.id})`}
                strokeWidth={1.4}
                strokeLinecap="round"
              />
            ))}
          </g>

          {/* Standortmarkierung Mosbach */}
          <g transform={`translate(${MOSBACH.x} ${MOSBACH.y})`}>
            <circle r={11} fill="#E8B820" opacity={0.22} />
            <circle r={4.5} fill="#C5A028" stroke="#FAF8F4" strokeWidth={1.6} />
          </g>

          <text
            x={MOSBACH.x + 14}
            y={MOSBACH.y - 10}
            fontSize={19}
            fontWeight={700}
            letterSpacing="1.6"
            fill="#B8860B"
          >
            HAUPTSITZ MOSBACH
          </text>
        </svg>
      </svg>

      <p
        style={{
          fontSize: "12px",
          fontWeight: 700,
          letterSpacing: "0.25em",
          textTransform: "uppercase",
          color: "#B8860B",
          textAlign: "center",
          margin: 0,
        }}
      >
        Mosbach · Deutschlandweit für Sie da
      </p>
    </div>
  );
}
