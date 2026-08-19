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
];

function curvedPath(from: { x: number; y: number }, to: { x: number; y: number }, bend: number) {
  const mx = (from.x + to.x) / 2;
  const my = (from.y + to.y) / 2;
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const len = Math.hypot(dx, dy) || 1;
  // Senkrechter Versatz auf den Mittelpunkt fuer eine deutlich sichtbare Kurve statt einer Geraden.
  const nx = (-dy / len) * len * bend;
  const ny = (dx / len) * len * bend;
  const cx = mx + nx;
  const cy = my + ny;
  return `M ${from.x},${from.y} Q ${cx.toFixed(1)},${cy.toFixed(1)} ${to.x},${to.y}`;
}

// Aeussere Komposition: das Plan-A-Logo (Dach-Silhouette mit "A") stark
// vergroessert als offener Umriss-Rahmen, dahinter/darum die Karte.
const FRAME_W = 460;
const FRAME_H = 560;
const M = 20;
const X0 = M;
const X1 = FRAME_W - M;
const Y_APEX = M;
const Y_BASE = FRAME_H - M;
const X_MID = (X0 + X1) / 2;

// Dach: einfaches, offenes Giebel-Dreieck (wie im Logo), kein Boden, keine Waende.
const ROOF_PATH = `M ${X0},${Y_BASE} L ${X_MID},${Y_APEX} L ${X1},${Y_BASE}`;

// "A": kleineres, tiefer ansetzendes Dreieck mit Querbalken, zentriert im Dach.
const A_APEX_Y = Y_APEX + 70;
const A_BASE_Y = Y_BASE - 10;
const A_HALF_BASE = 95;
const A_X0 = X_MID - A_HALF_BASE;
const A_X1 = X_MID + A_HALF_BASE;
const BAR_T = 0.55;
const BAR_Y = A_APEX_Y + (A_BASE_Y - A_APEX_Y) * BAR_T;
const BAR_X0 = X_MID - A_HALF_BASE * BAR_T;
const BAR_X1 = X_MID + A_HALF_BASE * BAR_T;
const A_LEFT_PATH = `M ${A_X0},${A_BASE_Y} L ${X_MID},${A_APEX_Y}`;
const A_RIGHT_PATH = `M ${X_MID},${A_APEX_Y} L ${A_X1},${A_BASE_Y}`;
const A_BAR_PATH = `M ${BAR_X0},${BAR_Y} L ${BAR_X1},${BAR_Y}`;

// Karten-Bereich: mittig im breiteren, unteren Teil des Dachs platziert.
const MAP_Y = 190;
const MAP_H = 330;
const MAP_W = 250;
const MAP_X = X_MID - MAP_W / 2;

export default function GermanyMap() {
  return (
    <div className="w-full max-w-[420px] mx-auto flex flex-col items-center gap-5 hero-graphic-wrap">
      <svg
        viewBox={`0 0 ${FRAME_W} ${FRAME_H}`}
        role="img"
        aria-label="Plan-A-Logo als Rahmen um eine Karte von Deutschland mit hervorgehobenem Arbeitsgebiet in Baden-Wuerttemberg und Standort Mosbach"
        className="w-full h-auto"
      >
        {/* Logo-Rahmen: duenne goldene Outline, offen, kein Volltonhintergrund */}
        <g fill="none" stroke="#C5A028" strokeLinejoin="round" strokeLinecap="round">
          <path d={ROOF_PATH} strokeWidth={2} />
          <path d={A_LEFT_PATH} strokeWidth={1.5} />
          <path d={A_RIGHT_PATH} strokeWidth={1.5} />
          <path d={A_BAR_PATH} strokeWidth={1.5} />
        </g>

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
            <filter id="rayGlow" x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation="2.4" />
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
                <stop offset="0%" stopColor="#F0C040" stopOpacity={0.95} />
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
          {RAY_TARGETS.map((t, i) => {
            const bend = 0.32 + (i % 2) * 0.1;
            const d = curvedPath(MOSBACH, t, i % 2 === 0 ? bend : -bend);
            return (
              <g key={t.id}>
                <path
                  d={d}
                  fill="none"
                  stroke={`url(#rayGrad-${t.id})`}
                  strokeWidth={3}
                  strokeLinecap="round"
                  filter="url(#rayGlow)"
                  opacity={0.55}
                />
                <path
                  d={d}
                  fill="none"
                  stroke={`url(#rayGrad-${t.id})`}
                  strokeWidth={1.3}
                  strokeLinecap="round"
                />
              </g>
            );
          })}

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
