import type { Metadata } from "next";
import RechnerClient from "./RechnerClient";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "Immobilien-Rechner | Plan A Immobilien – Mosbach",
  description:
    "Berechnen Sie Kaufnebenkosten und monatliche Finanzierungsrate für Ihre Immobilie in der Region Mosbach und Neckar-Odenwald-Kreis.",
};

export default function RechnerPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#FAF8F4] pt-24 pb-20">
        <RechnerClient />
      </main>
      <Footer />
    </>
  );
}
