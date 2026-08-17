// Laufende Exposé-Websites. Neues Objekt = neuer Eintrag hier (neuestes zuerst).
export interface ExposeListing {
  titel: string;
  kurzbeschreibung: string;
  url: string;
  buttonLabel?: string;
}

export const exposeListings: ExposeListing[] = [
  {
    titel: "Dachgeschosswohnung · Schefflenz",
    kurzbeschreibung: "Lichtdurchflutete Wohnung mit Sonnenbalkon und eigenem Garten — 93 m², 3 Zimmer, eigener Garten ca. 340 m²",
    url: "/exposes/expose-schefflenz.pdf",
    buttonLabel: "Exposé als PDF öffnen",
  },
  {
    titel: "Maisonette-Wohnung · Offenau",
    kurzbeschreibung: "Wohnen unterm First — 144 m², 2 Balkone, Spitzboden-Atelier",
    url: "https://plan-a-offenau-expose.vercel.app/",
  },
];
