import type { Metadata } from "next";
import { Playfair_Display, Outfit } from "next/font/google";
import "./globals.css";
import CookieBanner from "@/components/CookieBanner";
import WhatsAppButton from "@/components/WhatsAppButton";
import ScrollToTop from "@/components/ScrollToTop";
import ScrollReveal from "@/components/ScrollReveal";
import FloatingActions from "@/components/FloatingActions";
import ChatBot from "@/components/ChatBot";
import LiveNotification from "@/components/LiveNotification";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import { AuthProvider } from "@/contexts/AuthContext";

const playfair = Playfair_Display({
  variable: "--font-dm-serif",
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
});

const outfit = Outfit({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://plan-a-immobilien.de"),
  title: {
    default: "Plan A Immobilien & Finanzierung | Mosbach – Deutschlandweit",
    template: "%s | Plan A Immobilien",
  },
  description:
    "Unabhängige Beratung für Immobilienverkauf, Finanzierung und staatliche Förderungen. Hauptsitz Mosbach – deutschlandweit tätig.",
  keywords: [
    "Immobilienmakler Mosbach",
    "Haus verkaufen Mosbach",
    "Wohnung verkaufen Mosbach",
    "Immobilien Neckar-Odenwald-Kreis",
    "Immobilienbewertung Mosbach",
    "Makler Mosbach",
    "Plan A Immobilien",
    "Ali Artun",
    "Baufinanzierung Mosbach",
    "Immobilien verkaufen Baden-Württemberg",
  ],
  openGraph: {
    type: "website",
    locale: "de_DE",
    siteName: "Plan A Immobilien",
    title: "Plan A Immobilien & Finanzierung | Mosbach",
    description:
      "Unabhängige Beratung für Immobilienverkauf, Finanzierung und staatliche Förderungen. Hauptsitz Mosbach – deutschlandweit tätig.",
    url: "https://plan-a-immobilien.de",
    images: [{ url: "/images/plan-a-logo.png", width: 888, height: 382, alt: "Plan A Immobilien & Finanzierung" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Plan A Immobilien Mosbach",
    description:
      "Unabhängige Beratung für Immobilienverkauf und Finanzierung.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  name: "Plan A Immobilien & Finanzierung",
  description:
    "Unabhängige Beratung für Immobilienverkauf, Finanzierung und staatliche Förderungen. Hauptsitz Mosbach – deutschlandweit tätig.",
  url: "https://plan-a-immobilien.de",
  telephone: "+491736259429",
  email: "Info@plana-immobilien-finanzierung.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Mosbacher Str. 75",
    addressLocality: "Mosbach",
    postalCode: "74821",
    addressRegion: "Baden-Württemberg",
    addressCountry: "DE",
  },
  areaServed: "Deutschland",
  founder: {
    "@type": "Person",
    name: "Ali Artun",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </head>
      <body className={`${playfair.variable} ${outfit.variable} antialiased`}>
        <AuthProvider>
          <ScrollProgressBar />
          <ScrollReveal />
          {children}
          <FloatingActions />
          <ChatBot />
          <LiveNotification />
          <CookieBanner />
          <WhatsAppButton />
          <ScrollToTop />
        </AuthProvider>
      </body>
    </html>
  );
}
