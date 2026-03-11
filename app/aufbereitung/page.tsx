import type { Metadata } from "next";
import AufbereitungClient from "./AufbereitungClient";

export const metadata: Metadata = {
  title: "Objektaufbereitung | Plan A Immobilien & Finanzierung",
  description: "Professionelle Immobilienaufbereitung in Mosbach. Wir bereiten Ihr Objekt für den bestmöglichen Verkaufspreis vor – Reinigung, Renovierung, Fotografie.",
};

export default function AufbereitungPage() {
  return <AufbereitungClient />;
}
