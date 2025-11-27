import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Marketing Québec | Benchmark & Tarification Automatisée",
  description:
    "Étude de la concurrence en marketing digital IA (Québec · Amérique du Nord), offres recommandées, calculateur de devis compétitif, portail client avec automatisations.",
  metadataBase: new URL("https://agentic-0e25bb23.vercel.app"),
  openGraph: {
    title: "AI Marketing Québec | Benchmark & Tarification Automatisée",
    description:
      "Benchmark des agences IA au Québec & Amérique du Nord, offres recommandées, devis en temps réel, signature électronique et paiements automatisés.",
    locale: "fr_CA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Marketing Québec",
    description:
      "Étude concurrentielle, offres IA prioritaires, moteur de devis et portail client automatisé.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="bg-black">
      <body className={`${geistSans.variable} ${geistMono.variable} bg-black text-white antialiased`}>
        <div className="bg-black text-white">{children}</div>
      </body>
    </html>
  );
}
