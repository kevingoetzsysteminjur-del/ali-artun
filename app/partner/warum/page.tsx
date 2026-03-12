import type { Metadata } from "next";
import PartnerWarumClient from "./PartnerWarumClient";

export const metadata: Metadata = {
  title: "Warum Partner bei Plan A? | Plan A Immobilien & Finanzierung",
  description:
    "Starten Sie als selbstständiger Immobilienpartner bei Ali Artun. Kostenlose Ausbildung, attraktive Provisionen, 300+ Partnerbanken – nebenberuflich oder hauptberuflich.",
};

export default function PartnerWarumPage() {
  return <PartnerWarumClient />;
}
