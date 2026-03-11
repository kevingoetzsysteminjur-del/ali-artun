import type { Metadata } from "next";
import FinanzierungClient from "./FinanzierungClient";

export const metadata: Metadata = {
  title: "Baufinanzierung | Plan A Immobilien & Finanzierung",
  description: "Unabhängige Baufinanzierung aus einer Hand. Zugang zu 300+ Partnerbanken – schnelle Entscheidung, beste Konditionen. Mosbach & Neckar-Odenwald-Kreis.",
};

export default function FinanzierungPage() {
  return <FinanzierungClient />;
}
