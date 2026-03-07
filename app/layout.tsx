import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Playfair_Display } from "next/font/google";
import "./globals.css";

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
  title: "Plan A Immobilien – Premium Immobilienmakler München",
  description:
    "Plan A Immobilien – Ihr vertrauenswürdiger Partner für Immobilienkauf, Verkauf und Bewertung in München. Mit Expertise und Leidenschaft zur Traumimmobilie.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body className={`${geist.variable} ${playfair.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
