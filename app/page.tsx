import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import VideoIntro from "@/components/sections/video-intro";
import Hero from "@/components/sections/hero";
import Stats from "@/components/sections/stats";
import Services from "@/components/sections/services";
import VorherNachher from "@/components/sections/vorher-nachher";
import Properties from "@/components/sections/properties";
import RechnerPreview from "@/components/sections/rechner-preview";
import About from "@/components/sections/about";
import Testimonials from "@/components/sections/testimonials";
import Contact from "@/components/sections/contact";
import TrustBadges from "@/components/TrustBadges";
import Auszeichnungen from "@/components/Auszeichnungen";
import PartnerLogos from "@/components/sections/partner-logos";
import MedienLeiste from "@/components/sections/medien-leiste";
import FAQSection from "@/components/FAQSection";
import FinanzierungPreview from "@/components/sections/finanzierung-preview";
import PartnerTeaser from "@/components/sections/partner-teaser";

function GoldDivider() {
  return (
    <div className="h-px bg-gradient-to-r from-transparent via-[#C5A028]/30 to-transparent" />
  );
}

export default function Home() {
  return (
    <>
      <main>
        <VideoIntro />
        <Navbar />
        <Hero />
        <TrustBadges />
        <MedienLeiste />
        <GoldDivider />
        <Stats />
        <GoldDivider />
        <Services />
        <PartnerLogos />
        <GoldDivider />
        <VorherNachher />
        <GoldDivider />
        <FinanzierungPreview />
        <GoldDivider />
        <Properties />
        <GoldDivider />
        <RechnerPreview />
        <GoldDivider />
        <About />
        <GoldDivider />
        <Auszeichnungen />
        <GoldDivider />
        <Testimonials />
        <GoldDivider />
        <PartnerTeaser />
        <GoldDivider />
        <FAQSection />
        <GoldDivider />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
