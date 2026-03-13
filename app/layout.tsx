import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Playfair_Display } from "next/font/google";
import "./globals.css";
import PageLoader from "@/components/PageLoader";
import CookieBanner from "@/components/CookieBanner";
import WhatsAppButton from "@/components/WhatsAppButton";
import ScrollToTop from "@/components/ScrollToTop";
import ScrollReveal from "@/components/ScrollReveal";
import ChatBot from "@/components/ChatBot";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AuthProvider } from "@/contexts/AuthContext";
import AdminBadge from "@/components/admin/AdminBadge";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: {
    default: "Immobilienmakler Mosbach | Plan A Immobilien – Ali Artun",
    template: "%s | Plan A Immobilien",
  },
  description:
    "Ihr Immobilienmakler in Mosbach und Neckar-Odenwald-Kreis. Plan A Immobilien verkauft Ihre Immobilie sicher mit geprüfter Käuferfinanzierung. ✓ Kostenlose Bewertung ✓ Lokaler Experte",
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
    title: "Immobilienmakler Mosbach | Plan A Immobilien",
    description:
      "Sicherer Immobilienverkauf mit geprüfter Käuferfinanzierung im Neckar-Odenwald-Kreis.",
    url: "https://plan-a-immobilien.de",
  },
  twitter: {
    card: "summary_large_image",
    title: "Plan A Immobilien Mosbach",
    description:
      "Ihr lokaler Immobilienmakler mit geprüfter Käuferfinanzierung.",
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
    "Immobilienmakler in Mosbach mit geprüfter Käuferfinanzierung. Planbare Abschlüsse durch Strategie, Struktur und Finanzierungsprüfung.",
  url: "https://plan-a-immobilien.de",
  telephone: "+496261123456",
  email: "info@plana-immobilien.de",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Mosbach",
    addressRegion: "Baden-Württemberg",
    addressCountry: "DE",
  },
  areaServed: "Neckar-Odenwald-Kreis",
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
    <html lang="de" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem('theme')||(window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');document.documentElement.classList.toggle('dark',t==='dark')}catch(e){}`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </head>
      <body className={`${geist.variable} ${playfair.variable} antialiased`}>
        <AuthProvider>
          <ThemeProvider>
            <LanguageProvider>
              <PageLoader />
              <ScrollReveal />
              {children}
              <CookieBanner />
              <WhatsAppButton />
              <ScrollToTop />
              <ChatBot />
              <AdminBadge />
            </LanguageProvider>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
