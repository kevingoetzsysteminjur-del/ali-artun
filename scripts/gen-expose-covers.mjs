// Erzeugt Karten-Cover für /unsere-expose aus der ersten PDF-Seite jedes Exposés.
// Schneidet den reinen Foto-Bereich aus (ohne Logo-Kopfzeile und Textblock),
// da der Logo-Header auf der Karte live per HTML/CSS gerendert wird (siehe components/expose-card.tsx).
//
// Nutzung: npm install --no-save pdf-to-img sharp && node scripts/gen-expose-covers.mjs
import { pdf } from "pdf-to-img";
import sharp from "sharp";
import { writeFile, mkdir, unlink } from "node:fs/promises";

const files = [
  { pdf: "public/exposes/expose-offenau.pdf", out: "public/exposes/covers/expose-offenau-v2.jpg" },
  { pdf: "public/exposes/expose-schefflenz.pdf", out: "public/exposes/covers/expose-schefflenz-v2.jpg" },
];

// Foto-Bereich im PDF-Template: beginnt nach der Logo-Kopfzeile (~y 210px bei scale 2),
// endet vor dem Textblock (Titel/Eckdaten). Gilt für alle Exposés im aktuellen Plan-A-Template.
const CROP = { top: 210, height: 720 };

await mkdir("public/exposes/covers", { recursive: true });

for (const { pdf: pdfPath, out } of files) {
  const tmpPng = out.replace(/\.jpg$/, ".tmp.png");
  const doc = await pdf(pdfPath, { scale: 2 });
  for await (const page of doc) {
    await writeFile(tmpPng, page);
    break;
  }
  const { width } = await sharp(tmpPng).metadata();
  await sharp(tmpPng)
    .removeAlpha()
    .extract({ left: 0, top: CROP.top, width, height: CROP.height })
    .jpeg({ quality: 88 })
    .toFile(out);
  await unlink(tmpPng);
  console.log("done", out);
}
