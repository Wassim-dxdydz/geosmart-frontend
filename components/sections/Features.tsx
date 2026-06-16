"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { Zap, Target, FileText, Shield, Clock, BarChart3 } from "lucide-react";

const translations = {
  fr: {
    badge: "Fonctionnalités Clés",
    title: "Tout ce dont vous avez besoin",
    titleAccent: "pour vos analyses géotechniques",
    subtitle:
      "GeoSmartX centralise vos données d'essais, exécute les corrélations et produit les livrables — sans aucune formule manuelle.",
    features: [
      {
        icon: Zap,
        category: "Rapidité",
        title: "Calcul Instantané",
        description:
          "Entrez vos données d'essais et obtenez instantanément vos paramètres mécaniques (c et φ) ainsi que vos graphiques de Mohr-Coulomb.",
        bullets: ["Résultats en < 30 secondes", "Essais triaxiaux & cisaillement direct", "Visualisation en temps réel"],
        color: "indigo",
      },
      {
        icon: Target,
        category: "Précision",
        title: "Précision Algorithmique",
        description:
          "Réduisez les risques d'erreur grâce à nos modèles de corrélation avancés adaptés aux différentes natures de sol.",
        bullets: ["Précision ±2% sur paramètres", "Modèles calibrés par nature de sol", "Validation croisée automatique"],
        color: "amber",
      },
      {
        icon: FileText,
        category: "Productivité",
        title: "Rapports Optimisés",
        description:
          "Économisez des heures de travail manuel en exportant des synthèses claires et prêtes pour vos rapports d'études.",
        bullets: ["Export PDF & Excel natif", "Mise en page conforme RPA 2024", "Archivage sécurisé des projets"],
        color: "emerald",
      },
    ],
    stats: [
      { value: "10x", label: "Plus rapide qu'un calcul manuel" },
      { value: "60%", label: "De réduction du temps de rapport" },
      { value: "8",   label: "Types d'essais pris en charge" },
      { value: "24/7", label: "Disponibilité de la plateforme" },
    ],
    trustBadge: "Pourquoi nous faire confiance ?",
    trustTitle: "Construit sur des bases scientifiques solides",
    trustItems: [
      {
        icon: Shield,
        title: "Rigueur scientifique",
        description: "Nos algorithmes sont fondés sur les travaux académiques les plus récents en mécanique des sols.",
      },
      {
        icon: Clock,
        title: "Conformité normative",
        description: "Calculs conformes au RPA 2024, aux normes AFNOR et aux standards internationaux ISSMGE.",
      },
      {
        icon: BarChart3,
        title: "Données sécurisées",
        description: "Vos projets sont chiffrés et stockés sur des infrastructures cloud haute disponibilité.",
      },
    ],
  },
  en: {
    badge: "Key Features",
    title: "Everything you need",
    titleAccent: "for your geotechnical analyses",
    subtitle:
      "GeoSmartX centralizes your test data, runs correlations, and produces deliverables — without any manual formulas.",
    features: [
      {
        icon: Zap,
        category: "Speed",
        title: "Instant Calculation",
        description:
          "Enter your test data and instantly get your mechanical parameters (c and φ) along with Mohr-Coulomb diagrams.",
        bullets: ["Results in < 30 seconds", "Triaxial & direct shear tests", "Real-time visualization"],
        color: "indigo",
      },
      {
        icon: Target,
        category: "Precision",
        title: "Algorithmic Precision",
        description:
          "Reduce error risk with our advanced correlation models tailored to different soil types.",
        bullets: ["±2% parameter precision", "Soil-calibrated models", "Automatic cross-validation"],
        color: "amber",
      },
      {
        icon: FileText,
        category: "Productivity",
        title: "Optimized Reports",
        description:
          "Save hours of manual work by exporting clear summaries ready for your study reports.",
        bullets: ["Native PDF & Excel export", "RPA 2024 compliant layout", "Secure project archiving"],
        color: "emerald",
      },
    ],
    stats: [
      { value: "10x",  label: "Faster than manual calculation" },
      { value: "60%",  label: "Report time reduction" },
      { value: "8",    label: "Supported test types" },
      { value: "24/7", label: "Platform availability" },
    ],
    trustBadge: "Why trust us?",
    trustTitle: "Built on solid scientific foundations",
    trustItems: [
      {
        icon: Shield,
        title: "Scientific rigor",
        description: "Our algorithms are based on the latest academic work in soil mechanics.",
      },
      {
        icon: Clock,
        title: "Normative compliance",
        description: "Calculations compliant with RPA 2024, AFNOR standards and ISSMGE international standards.",
      },
      {
        icon: BarChart3,
        title: "Secure data",
        description: "Your projects are encrypted and stored on high-availability cloud infrastructure.",
      },
    ],
  },
};

const colorMap = {
  indigo: {
    icon: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
    category: "text-indigo-400",
    bullet: "bg-indigo-400",
    glow: "group-hover:shadow-indigo-500/10",
  },
  amber: {
    icon: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    category: "text-amber-400",
    bullet: "bg-amber-400",
    glow: "group-hover:shadow-amber-500/10",
  },
  emerald: {
    icon: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    category: "text-emerald-400",
    bullet: "bg-emerald-400",
    glow: "group-hover:shadow-emerald-500/10",
  },
};

const fadeUp = (delay = 0): HTMLMotionProps<"div"> => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay, ease: "easeOut" as const },
});

export default function Features({ lang = "fr" }: { lang?: "fr" | "en" }) {
  const t = translations[lang];

  return (
    <section
      id="features"
      className="relative py-24 dark:bg-[#0F1117] bg-slate-50 transition-colors duration-300 overflow-hidden"
    >
      {/* Background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent via-indigo-500/30 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-6">

        {/* ── Section header ── */}
        <motion.div {...fadeUp(0)} className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 text-xs font-medium tracking-wide uppercase mb-4">
            {t.badge}
          </span>
          <h2 className="text-4xl md:text-5xl font-black dark:text-white text-gray-900 mb-4">
            {t.title}{" "}
            <span className="block text-indigo-400">{t.titleAccent}</span>
          </h2>
          <p className="dark:text-gray-400 text-gray-600 max-w-2xl mx-auto text-base leading-relaxed">
            {t.subtitle}
          </p>
        </motion.div>

        {/* ── Feature cards ── */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {t.features.map((feature, i) => {
            const Icon = feature.icon;
            const colors = colorMap[feature.color as keyof typeof colorMap];
            return (
              <motion.div
                key={feature.title}
                {...fadeUp(i * 0.1)}
                className={`group relative rounded-2xl border dark:border-white/10 border-gray-200 dark:bg-white/5 bg-white p-6 hover:shadow-xl ${colors.glow} transition-all duration-300 hover:-translate-y-1`}
              >
                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-11 h-11 rounded-xl border ${colors.icon} mb-4`}>
                  <Icon size={20} />
                </div>

                {/* Category */}
                <p className={`text-xs font-semibold uppercase tracking-wider ${colors.category} mb-1`}>
                  {feature.category}
                </p>

                {/* Title */}
                <h3 className="text-lg font-bold dark:text-white text-gray-900 mb-3">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="dark:text-gray-400 text-gray-600 text-sm leading-relaxed mb-4">
                  {feature.description}
                </p>

                {/* Bullets */}
                <ul className="flex flex-col gap-2">
                  {feature.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-center gap-2 text-sm dark:text-gray-300 text-gray-700">
                      <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${colors.bullet}`} />
                      {bullet}
                    </li>
                  ))}
                </ul>

                {/* Subtle glow on hover */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-gradient-to-br from-indigo-500/5 to-transparent" />
              </motion.div>
            );
          })}
        </div>

        {/* ── Stats bar ── */}
        <motion.div
          {...fadeUp(0.3)}
          className="grid grid-cols-2 md:grid-cols-4 gap-px dark:bg-white/10 bg-gray-200 rounded-2xl overflow-hidden mb-16"
        >
          {t.stats.map((stat, i) => (
            <div
              key={stat.value}
              className="dark:bg-[#0F1117] bg-white px-6 py-8 text-center"
            >
              <div className="text-3xl font-black text-indigo-400 mb-1">{stat.value}</div>
              <div className="text-xs dark:text-gray-500 text-gray-500 leading-snug">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* ── Trust section ── */}
        <motion.div {...fadeUp(0.2)} className="text-center mb-10">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-400 text-xs font-medium tracking-wide uppercase mb-4">
            {t.trustBadge}
          </span>
          <h3 className="text-2xl md:text-3xl font-black dark:text-white text-gray-900">
            {t.trustTitle}
          </h3>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {t.trustItems.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                {...fadeUp(i * 0.1)}
                className="flex gap-4 p-5 rounded-2xl dark:bg-white/5 bg-white border dark:border-white/10 border-gray-200"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                  <Icon size={18} />
                </div>
                <div>
                  <h4 className="font-semibold dark:text-white text-gray-900 mb-1">{item.title}</h4>
                  <p className="text-sm dark:text-gray-400 text-gray-600 leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}