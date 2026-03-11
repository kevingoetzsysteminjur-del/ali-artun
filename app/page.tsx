import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import VideoIntro from "@/components/sections/video-intro";
import Hero from "@/components/sections/hero";
import Stats from "@/components/sections/stats";
import Services from "@/components/sections/services";
import Properties from "@/components/sections/properties";
import About from "@/components/sections/about";
import Testimonials from "@/components/sections/testimonials";
import Contact from "@/components/sections/contact";
import TrustBadges from "@/components/TrustBadges";
import FAQSection from "@/components/FAQSection";

function GoldDivider() {
  return (
    <div className="h-px bg-gradient-to-r from-transparent via-[#C9A96E]/30 to-transparent" />
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
        <GoldDivider />
        <Stats />
        <GoldDivider />
        <Services />
        <GoldDivider />
        <Properties />
        <GoldDivider />
        <About />
        <GoldDivider />
        <Testimonials />
        <GoldDivider />
        <FAQSection />
        <GoldDivider />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
