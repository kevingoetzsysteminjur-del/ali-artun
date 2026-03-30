import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import HomeClient from "./HomeClient";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HomeClient />
      </main>
      <Footer />
    </>
  );
}
