import type { Metadata } from "next";
import PartnerClient from "./PartnerClient";

export const metadata: Metadata = {
  title: "Partner werden | Plan A Immobilien & Finanzierung",
  description: "Werde selbstständiger Immobilienmakler-Partner bei Plan A Immobilien. Professionelle Ausbildung, attraktive Provisionen, 300+ Partnerbanken.",
};

export default function PartnerPage() {
  return <PartnerClient />;
}
