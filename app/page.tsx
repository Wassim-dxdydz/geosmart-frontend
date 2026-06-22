"use client";

import Hero from "@/components/sections/Hero";
import { useLang } from "@/components/layout/LangContext";
import Features from "@/components/sections/Features";
import Footer from "@/components/sections/Footer";
import Pricing from "@/components/sections/Pricing";

export default function Home() {
  const { lang } = useLang();
  return (
    <main className="bg-[#0F1117] dark:bg-[#0F1117] light:bg-slate-50 min-h-screen">
      <Hero lang={lang} />
      <Features lang={lang} />
      <Pricing />
      <Footer />
    </main>
  );
}