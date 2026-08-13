// Laufende Exposé-Websites. Neues Objekt = neuer Eintrag hier.
export interface ExposeListing {
  titel: string;
  kurzbeschreibung: string;
  url: string;
}

export const exposeListings: ExposeListing[] = [
  {
    titel: "Maisonette-Wohnung · Offenau",
    kurzbeschreibung: "Wohnen unterm First — 144 m², 2 Balkone, Spitzboden-Atelier",
    url: "https://plan-a-offenau-expose.vercel.app/",
  },
];
