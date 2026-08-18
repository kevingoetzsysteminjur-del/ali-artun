// Laufende Exposé-Websites. Neues Objekt = neuer Eintrag hier (neuestes zuerst).
export interface ExposeListing {
  titel: string;
  kurzbeschreibung: string;
  url: string;
  buttonLabel?: string;
  cover?: string;
}

export const exposeListings: ExposeListing[] = [
  {
    titel: "Maisonette-Wohnung · Offenau",
    kurzbeschreibung: "Wohnen unterm First — 144 m², 2 Balkone, Spitzboden-Atelier",
    url: "/exposes/expose-offenau.pdf",
    buttonLabel: "Exposé als PDF öffnen",
    cover: "/exposes/covers/expose-offenau-v2.jpg",
  },
  {
    titel: "Dachgeschosswohnung · Schefflenz",
    kurzbeschreibung: "Lichtdurchflutete Wohnung mit Sonnenbalkon und eigenem Garten — 93 m², 3 Zimmer, eigener Garten ca. 340 m²",
    url: "/exposes/expose-schefflenz.pdf",
    buttonLabel: "Exposé als PDF öffnen",
    cover: "/exposes/covers/expose-schefflenz-v2.jpg",
  },
];
