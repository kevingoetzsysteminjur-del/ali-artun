import type { Metadata } from "next";
import TerminClient from "./TerminClient";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "Termin vereinbaren | Plan A Immobilien – Mosbach",
  description:
    "Vereinbaren Sie ein kostenloses Beratungsgespräch mit Ali Artun von Plan A Immobilien in Mosbach. Online-Terminbuchung für Immobilienverkauf, Bewertung und Finanzierungsberatung.",
};

export default function TerminPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#FAF8F4] pt-24 pb-20">
        <TerminClient />
      </main>
      <Footer />
    </>
  );
}
