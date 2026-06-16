"use client";

import { useEffect, useState } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import Link from "next/link";
import { ArrowRight, BookOpen, FlaskConical, BarChart3, FileText, ChevronRight, Search, ExternalLink } from "lucide-react";
import { useLang } from "@/components/layout/LangContext";

const fadeUp = (delay = 0): HTMLMotionProps<"div"> => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, delay, ease: "easeOut" as const },
});

const translations = {
  fr: {
    badge: "Documentation",
    title: "Tout ce que vous devez savoir",
    titleAccent: "pour utiliser GeoSmartX",
    searchPlaceholder: "Rechercher dans la documentation...",
    sections: [
      {
        id: "intro",
        icon: BookOpen,
        color: "indigo",
        title: "Introduction",
        description: "Comprendre GeoSmartX et ses capacites",
        articles: [
          { title: "Qu'est-ce que GeoSmartX ?", time: "2 min" },
          { title: "Comment fonctionne le modele IA ?", time: "5 min" },
          { title: "Premiers pas avec le simulateur", time: "3 min" },
          { title: "Types de sols supportes", time: "4 min" },
        ],
      },
      {
        id: "tests",
        icon: FlaskConical,
        color: "amber",
        title: "Types d'Essais",
        description: "UU, CU, CD — guide complet",
        articles: [
          { title: "Essai Triaxial Non-Consolide Non-Draine (UU)", time: "6 min" },
          { title: "Essai Triaxial Consolide Non-Draine (CU)", time: "6 min" },
          { title: "Essai Triaxial Consolide Draine (CD)", time: "6 min" },
          { title: "Essai de Cisaillement Direct", time: "5 min" },
        ],
      },
      {
        id: "parameters",
        icon: BarChart3,
        color: "emerald",
        title: "Parametres d'Entree",
        description: "FC, WL, IP, MC, SR, ROD expliques",
        articles: [
          { title: "Teneur en Fines (FC)", time: "3 min" },
          { title: "Limite de Liquidite (WL) et Indice de Plasticite (IP)", time: "4 min" },
          { title: "Teneur en Eau (MC) et Degre de Saturation (SR)", time: "4 min" },
          { title: "Degre d'Alteration (ROD)", time: "3 min" },
        ],
      },
      {
        id: "results",
        icon: FileText,
        color: "rose",
        title: "Lire les Resultats",
        description: "Interpreter cohesion, angle et diagramme",
        articles: [
          { title: "Comprendre la cohesion (c) et l'angle de frottement (phi)", time: "5 min" },
          { title: "Lire un diagramme de Mohr-Coulomb", time: "7 min" },
          { title: "Indice de confiance et fiabilite", time: "4 min" },
          { title: "Exporter vos resultats en PDF / Excel", time: "3 min" },
        ],
      },
    ],
    paramTable: {
      title: "Reference rapide des parametres",
      headers: ["Parametre", "Symbole", "Unite", "Plage typique", "Description"],
      rows: [
        ["Teneur en fines",       "FC",  "%",    "0 - 100",    "Fraction de particules < 0.075 mm"],
        ["Limite de liquidite",   "WL",  "%",    "20 - 100",   "Teneur en eau a la limite liquide"],
        ["Indice de plasticite",  "IP",  "%",    "0 - 60",     "WL moins limite de plasticite"],
        ["Teneur en eau",         "MC",  "%",    "5 - 80",     "Rapport eau/sol sec"],
        ["Degre de saturation",   "SR",  "%",    "0 - 100",    "Fraction des vides remplis d'eau"],
        ["Degre d'alteration",    "ROD", "-",    "0 - 5",      "Echelle d'alteration de la roche"],
      ],
    },
    testTable: {
      title: "Quand utiliser quel essai ?",
      headers: ["Essai", "Conditions de drainage", "Application typique", "Sols concernes"],
      rows: [
        ["UU", "Non consolide - Non draine", "Stabilite a court terme", "Argiles saturees"],
        ["CU", "Consolide - Non draine",     "Remblais, barrages",      "Argiles, limons"],
        ["CD", "Consolide - Draine",         "Stabilite a long terme",  "Sables, graviers"],
      ],
    },
    cta: "Lancer le Simulateur",
    ctaDesc: "Appliquez vos connaissances directement dans le simulateur.",
  },
  en: {
    badge: "Documentation",
    title: "Everything you need to know",
    titleAccent: "to use GeoSmartX",
    searchPlaceholder: "Search documentation...",
    sections: [
      {
        id: "intro",
        icon: BookOpen,
        color: "indigo",
        title: "Introduction",
        description: "Understanding GeoSmartX and its capabilities",
        articles: [
          { title: "What is GeoSmartX?", time: "2 min" },
          { title: "How does the AI model work?", time: "5 min" },
          { title: "Getting started with the simulator", time: "3 min" },
          { title: "Supported soil types", time: "4 min" },
        ],
      },
      {
        id: "tests",
        icon: FlaskConical,
        color: "amber",
        title: "Test Types",
        description: "UU, CU, CD - complete guide",
        articles: [
          { title: "Unconsolidated Undrained Triaxial Test (UU)", time: "6 min" },
          { title: "Consolidated Undrained Triaxial Test (CU)", time: "6 min" },
          { title: "Consolidated Drained Triaxial Test (CD)", time: "6 min" },
          { title: "Direct Shear Test", time: "5 min" },
        ],
      },
      {
        id: "parameters",
        icon: BarChart3,
        color: "emerald",
        title: "Input Parameters",
        description: "FC, WL, IP, MC, SR, ROD explained",
        articles: [
          { title: "Fines Content (FC)", time: "3 min" },
          { title: "Liquid Limit (WL) and Plasticity Index (IP)", time: "4 min" },
          { title: "Water Content (MC) and Saturation Degree (SR)", time: "4 min" },
          { title: "Alteration Degree (ROD)", time: "3 min" },
        ],
      },
      {
        id: "results",
        icon: FileText,
        color: "rose",
        title: "Reading Results",
        description: "Interpreting cohesion, angle and diagram",
        articles: [
          { title: "Understanding cohesion (c) and friction angle (phi)", time: "5 min" },
          { title: "Reading a Mohr-Coulomb diagram", time: "7 min" },
          { title: "Confidence index and reliability", time: "4 min" },
          { title: "Exporting results to PDF / Excel", time: "3 min" },
        ],
      },
    ],
    paramTable: {
      title: "Quick parameter reference",
      headers: ["Parameter", "Symbol", "Unit", "Typical range", "Description"],
      rows: [
        ["Fines content",       "FC",  "%",    "0 - 100",    "Fraction of particles < 0.075 mm"],
        ["Liquid limit",        "WL",  "%",    "20 - 100",   "Water content at liquid limit"],
        ["Plasticity index",    "IP",  "%",    "0 - 60",     "WL minus plastic limit"],
        ["Water content",       "MC",  "%",    "5 - 80",     "Water to dry soil ratio"],
        ["Saturation degree",   "SR",  "%",    "0 - 100",    "Fraction of voids filled with water"],
        ["Alteration degree",   "ROD", "-",    "0 - 5",      "Rock alteration scale"],
      ],
    },
    testTable: {
      title: "When to use which test?",
      headers: ["Test", "Drainage conditions", "Typical application", "Soils concerned"],
      rows: [
        ["UU", "Unconsolidated - Undrained", "Short-term stability",  "Saturated clays"],
        ["CU", "Consolidated - Undrained",   "Embankments, dams",     "Clays, silts"],
        ["CD", "Consolidated - Drained",     "Long-term stability",   "Sands, gravels"],
      ],
    },
    cta: "Launch the Simulator",
    ctaDesc: "Apply your knowledge directly in the simulator.",
  },
};

const colorMap = {
  indigo: {
    icon: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
    badge: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20",
    dot: "bg-indigo-400",
  },
  amber: {
    icon: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    badge: "text-amber-400 bg-amber-500/10 border-amber-500/20",
    dot: "bg-amber-400",
  },
  emerald: {
    icon: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    badge: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    dot: "bg-emerald-400",
  },
  rose: {
    icon: "bg-rose-500/10 text-rose-400 border-rose-500/20",
    badge: "text-rose-400 bg-rose-500/10 border-rose-500/20",
    dot: "bg-rose-400",
  },
};

export default function DocsPage() {
  const { lang } = useLang();
  const t = translations[lang];
  const [search, setSearch] = useState("");
  const [activeSection, setActiveSection] = useState("intro");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    t.sections.forEach((section) => {
      const el = document.getElementById(`section-${section.id}`);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(section.id);
        },
        { rootMargin: "-50% 0px -50% 0px", threshold: 0 }
      );
      observer.observe(el);
      observers.push(observer);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [t.sections]);
  
  const filteredSections = t.sections.map((section) => ({
    ...section,
    articles: section.articles.filter((a) =>
      a.title.toLowerCase().includes(search.toLowerCase())
    ),
  })).filter((s) => s.articles.length > 0 || search === "");

  return (
    <main suppressHydrationWarning className="dark:bg-[#0F1117] bg-slate-50 min-h-screen transition-colors duration-300">
      <div className="fixed inset-0 bg-[linear-gradient(rgba(99,102,241,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.03)_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none" />

      {/* ── Header ── */}
      <section className="relative pt-32 pb-12">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div {...fadeUp(0.1)} className="text-center mb-10">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 text-xs font-medium tracking-wide uppercase mb-4">
              {t.badge}
            </span>
            <h1 className="text-4xl md:text-5xl font-black dark:text-white text-gray-900 mb-3">
              {t.title}
              <span className="block text-indigo-400">{t.titleAccent}</span>
            </h1>
          </motion.div>

          {/* Search bar */}
          <motion.div {...fadeUp(0.2)} className="max-w-xl mx-auto relative">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 dark:text-gray-500 text-gray-400" />
            <input
              type="text"
              placeholder={t.searchPlaceholder}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border dark:border-white/10 border-gray-200 dark:bg-white/5 bg-white dark:text-white text-gray-900 dark:placeholder-gray-500 placeholder-gray-400 text-sm focus:outline-none focus:border-indigo-500/50 transition-colors"
            />
          </motion.div>
        </div>
      </section>

      {/* ── Main content: sidebar + articles ── */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="flex gap-8">

          {/* Sidebar */}
          <aside className="hidden lg:flex flex-col gap-2 w-56 flex-shrink-0 sticky top-24 self-start">
            {t.sections.map((section) => {
              const Icon = section.icon;
              const colors = colorMap[section.color as keyof typeof colorMap];
              const isActive = activeSection === section.id;
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-200 text-sm ${
                    isActive
                      ? "dark:bg-white/10 bg-indigo-50 dark:text-white text-indigo-600 font-medium"
                      : "dark:text-gray-400 text-gray-600 dark:hover:bg-white/5 hover:bg-gray-100"
                  }`}
                >
                  <div className={`w-7 h-7 rounded-lg border flex items-center justify-center flex-shrink-0 ${colors.icon}`}>
                    <Icon size={14} />
                  </div>
                  {section.title}
                  {isActive && <ChevronRight size={14} className="ml-auto" />}
                </button>
              );
            })}
          </aside>

          {/* Articles grid */}
          <div className="flex-1 flex flex-col gap-8">
            {filteredSections.map((section, si) => {
              const Icon = section.icon;
              const colors = colorMap[section.color as keyof typeof colorMap];
              return (
                <motion.div key={section.id} id={`section-${section.id}`} {...fadeUp(si * 0.05)}>
                  {/* Section header */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-9 h-9 rounded-xl border flex items-center justify-center ${colors.icon}`}>
                      <Icon size={18} />
                    </div>
                    <div>
                      <h2 className="font-bold dark:text-white text-gray-900 text-lg">{section.title}</h2>
                      <p className="text-xs dark:text-gray-500 text-gray-400">{section.description}</p>
                    </div>
                  </div>

                  {/* Article cards */}
                  <div className="grid sm:grid-cols-2 gap-3">
                    {section.articles.map((article, ai) => (
                      <motion.div
                        key={article.title}
                        {...fadeUp(ai * 0.05)}
                        className="group flex items-center justify-between p-4 rounded-xl border dark:border-white/10 border-gray-200 dark:bg-white/5 bg-white hover:shadow-md dark:hover:border-white/20 hover:border-gray-300 transition-all duration-200 cursor-pointer"
                      >
                        <div className="flex items-center gap-3">
                          <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${colors.dot}`} />
                          <span className="text-sm dark:text-gray-300 text-gray-700 group-hover:dark:text-white group-hover:text-gray-900 transition-colors">
                            {article.title}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0 ml-3">
                          <span className="text-xs dark:text-gray-600 text-gray-400">{article.time}</span>
                          <ExternalLink size={13} className="dark:text-gray-600 text-gray-300 group-hover:text-indigo-400 transition-colors" />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              );
            })}

            {/* ── Parameter reference table ── */}
            <motion.div {...fadeUp(0.2)}>
              <h2 className="font-bold dark:text-white text-gray-900 text-lg mb-4">{t.paramTable.title}</h2>
              <div className="rounded-2xl border dark:border-white/10 border-gray-200 overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="dark:bg-white/5 bg-gray-50 border-b dark:border-white/10 border-gray-200">
                      {t.paramTable.headers.map((h) => (
                        <th key={h} className="px-4 py-3 text-left text-xs font-semibold dark:text-gray-400 text-gray-500 uppercase tracking-wider">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {t.paramTable.rows.map((row, i) => (
                      <tr key={i} className="border-b dark:border-white/5 border-gray-100 last:border-0 dark:hover:bg-white/5 hover:bg-gray-50 transition-colors">
                        {row.map((cell, j) => (
                          <td key={j} className={`px-4 py-3 dark:text-gray-300 text-gray-700 ${j === 1 ? "font-mono text-indigo-400 font-semibold" : ""}`}>
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>

            {/* ── Test comparison table ── */}
            <motion.div {...fadeUp(0.2)}>
              <h2 className="font-bold dark:text-white text-gray-900 text-lg mb-4">{t.testTable.title}</h2>
              <div className="rounded-2xl border dark:border-white/10 border-gray-200 overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="dark:bg-white/5 bg-gray-50 border-b dark:border-white/10 border-gray-200">
                      {t.testTable.headers.map((h) => (
                        <th key={h} className="px-4 py-3 text-left text-xs font-semibold dark:text-gray-400 text-gray-500 uppercase tracking-wider">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {t.testTable.rows.map((row, i) => (
                      <tr key={i} className="border-b dark:border-white/5 border-gray-100 last:border-0 dark:hover:bg-white/5 hover:bg-gray-50 transition-colors">
                        {row.map((cell, j) => (
                          <td key={j} className={`px-4 py-3 dark:text-gray-300 text-gray-700 ${j === 0 ? "font-mono font-bold text-amber-400" : ""}`}>
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>

            {/* ── CTA ── */}
            <motion.div
              {...fadeUp(0.1)}
              className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-2xl border dark:border-indigo-500/20 border-indigo-200 dark:bg-indigo-500/5 bg-indigo-50"
            >
              <div>
                <h3 className="font-bold dark:text-white text-gray-900 mb-1">{t.cta}</h3>
                <p className="text-sm dark:text-gray-400 text-gray-600">{t.ctaDesc}</p>
              </div>
              <Link
                href="/simulator"
                className="flex-shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-all duration-200 hover:shadow-lg hover:shadow-indigo-500/25"
              >
                {t.cta} <ArrowRight size={16} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}