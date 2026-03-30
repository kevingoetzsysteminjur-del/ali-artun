import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import FinanzierungClient from "./FinanzierungClient";

export const metadata = {
  title: "Finanzierung",
  description: "KFW-Beratung, BAFA, staatliche Förderungen und Privatkredite. Plan A Immobilien berät Sie unabhängig und unverbindlich.",
};

export default function FinanzierungPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <FinanzierungClient />
      </main>
      <Footer />
    </>
  );
}
