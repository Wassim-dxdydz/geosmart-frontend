"use client";

import Pricing from "@/components/sections/Pricing";
import Footer from "@/components/sections/Footer";

export default function PricingPage() {
  return (
    <main className="dark:bg-[#0F1117] bg-slate-50 min-h-screen transition-colors duration-300">
      <Pricing standalone={true} />
      <Footer />
    </main>
  );
}