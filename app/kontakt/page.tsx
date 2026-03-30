import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import KontaktClient from "./KontaktClient";

export const metadata = {
  title: "Kontakt",
  description: "Nehmen Sie Kontakt mit Plan A Immobilien & Finanzierung auf. Ali Artun – Ihr Ansprechpartner.",
};

export default function KontaktPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <KontaktClient />
      </main>
      <Footer />
    </>
  );
}
