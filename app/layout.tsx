import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GeoSmartX — Plateforme IA Géotechnique",
  description: "Calcul instantané des paramètres mécaniques du sol.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className="dark">
      <body className={`${inter.className} bg-[#0F1117] text-white antialiased`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}