import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavbarWrapper from "@/components/layout/NavbarWrapper";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { LangProvider } from "@/components/layout/LangContext";
import { SessionProvider } from "@/components/layout/SessionProvider";

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
    <html lang="fr" suppressHydrationWarning>
      <body
        className={`
          ${inter.className}
          bg-[#0F1117] dark:bg-[#0F1117] bg-slate-50
          text-gray-900 dark:text-white
          antialiased transition-colors duration-300
        `}
      >
        <SessionProvider>
          <ThemeProvider>
            <LangProvider>
              <NavbarWrapper/>
              {children}
            </LangProvider>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}