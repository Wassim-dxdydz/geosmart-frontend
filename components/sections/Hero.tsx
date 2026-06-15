"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";

const fadeUp = (delay = 0): HTMLMotionProps<"div"> => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: "easeOut" },
});

export default function Hero({ lang = "fr" }: { lang?: "fr" | "en" }) {
  const translations = {
    fr: {
      badge: "Plateforme IA Géotechnique",
      subtitle: "Moins de temps. Moins de coûts. Plus de précision.",
      description:
        "La première plateforme d'intelligence prédictive dédiée au calcul des paramètres du sol. Automatisez vos analyses et optimisez vos projets de fondations en quelques clics.",
      cta1: "Tester le Simulateur",
      cta2: "Voir les fonctionnalités",
      cardTitle: "Diagramme de Mohr-Coulomb",
      cardStatus: "Calculé",
      cardLabel: "Analyse en cours",
      cohesion: "Cohésion (c)",
      angle: "Angle (φ)",
      soil: "Nature du sol",
      soilVal: "Argile limon.",
      confidence: "Confiance",
      statLabels: ["Analyse complète", "Précision", "Conforme normes"],
    },
    en: {
      badge: "Geotechnical AI Platform",
      subtitle: "Less time. Less cost. More precision.",
      description:
        "The first predictive intelligence platform dedicated to soil parameter calculation. Automate your analyses and optimize your foundation projects in just a few clicks.",
      cta1: "Try the Simulator",
      cta2: "See features",
      cardTitle: "Mohr-Coulomb Diagram",
      cardStatus: "Computed",
      cardLabel: "Analysis running",
      cohesion: "Cohesion (c)",
      angle: "Angle (φ)",
      soil: "Soil type",
      soilVal: "Silty clay",
      confidence: "Confidence",
      statLabels: ["Full analysis", "Precision", "Norm compliant"],
    },
  };

  const t = translations[lang];

  const stats = [
    { value: "< 30s", label: t.statLabels[0] },
    { value: "±2%",   label: t.statLabels[1] },
    { value: "100%",  label: t.statLabels[2] },
  ];

  const results = [
    { label: t.cohesion,   value: "18 kPa", sub: "+2.3%", color: "text-emerald-500" },
    { label: t.angle,      value: "32°",    sub: "±0.5°", color: "text-amber-500"   },
    { label: t.soil,       value: t.soilVal, sub: "",      color: "dark:text-white text-gray-900" },
    { label: t.confidence, value: "97.4%",  sub: "↑",     color: "text-indigo-500"  },
  ];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-4 dark:bg-[#0F1117] bg-slate-50 transition-colors duration-300">

      {/* Background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.04)_1px,transparent_1px)] bg-[size:64px_64px]" />

      {/* Glows — subtle in light mode */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 dark:bg-indigo-600/10 bg-indigo-400/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 w-64 h-64 dark:bg-amber-500/5 bg-amber-400/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 w-full grid md:grid-cols-2 gap-12 items-center py-20">

        {/* ── Left: Text ── */}
        <div className="flex flex-col gap-6">

          {/* Badge */}
          <motion.div {...fadeUp(0.1)}>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-500 dark:text-indigo-400 text-xs font-medium tracking-wide uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 dark:bg-indigo-400 animate-pulse" />
              {t.badge}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1 {...fadeUp(0.2)} className="text-5xl md:text-6xl font-black leading-tight">
            <span className="dark:text-white text-gray-900">Geo</span>
            <span className="text-indigo-500 dark:text-indigo-400">SmartX</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p {...fadeUp(0.3)} className="text-xl md:text-2xl text-amber-500 dark:text-amber-400 font-light leading-snug">
            {t.subtitle}
          </motion.p>

          {/* Description */}
          <motion.p {...fadeUp(0.4)} className="dark:text-gray-400 text-gray-600 text-base leading-relaxed max-w-md">
            {t.description}
          </motion.p>

          {/* CTAs */}
          <motion.div {...fadeUp(0.5)} className="flex flex-wrap gap-3 pt-2">
            <Link
              href="/simulator"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-all duration-200 hover:shadow-xl hover:shadow-indigo-500/30 hover:-translate-y-0.5"
            >
              {t.cta1} <ArrowRight size={16} />
            </Link>
            <Link
              href="#features"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border dark:border-white/10 border-gray-300 dark:hover:border-white/30 hover:border-gray-400 dark:text-gray-300 text-gray-600 dark:hover:text-white hover:text-gray-900 font-semibold text-sm transition-all duration-200 dark:hover:bg-white/5 hover:bg-gray-100"
            >
              {t.cta2}
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div {...fadeUp(0.6)} className="flex gap-8 pt-2">
            {stats.map((stat) => (
              <div key={stat.value}>
                <div className="text-2xl font-black text-indigo-500 dark:text-indigo-400">{stat.value}</div>
                <div className="text-xs dark:text-gray-500 text-gray-500 mt-0.5">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── Right: Card ── */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
          className="relative"
        >
          <div className="rounded-2xl border dark:border-white/10 border-gray-200 dark:bg-white/5 bg-white shadow-2xl dark:shadow-none p-5 transition-colors duration-300">

            {/* Card header */}
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-xs dark:text-gray-500 text-gray-400 uppercase tracking-wider">{t.cardLabel}</p>
                <p className="text-sm font-semibold dark:text-white text-gray-900 mt-0.5">{t.cardTitle}</p>
              </div>
              <span className="flex items-center gap-1.5 text-xs text-emerald-500 bg-emerald-400/10 border border-emerald-400/20 px-2 py-1 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                {t.cardStatus}
              </span>
            </div>

            {/* Plot */}
            <div className="my-8">
              <MohrCircleSVG />
            </div>

            {/* Result grid */}
            <div className="grid grid-cols-2 gap-2 mt-3">
              {results.map((item) => (
                <div key={item.label} className="dark:bg-white/5 bg-gray-50 rounded-lg px-3 py-2.5 border dark:border-white/5 border-gray-100 transition-colors duration-300">
                  <p className="text-xs dark:text-gray-500 text-gray-400 mb-0.5">{item.label}</p>
                  <p className={`text-sm font-bold ${item.color}`}>
                    {item.value}{" "}
                    {item.sub && <span className="text-xs font-normal opacity-70">{item.sub}</span>}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="absolute -inset-4 bg-indigo-600/5 rounded-3xl blur-2xl -z-10" />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 dark:text-gray-600 text-gray-400 text-xs"
      >
        <span className="uppercase tracking-widest">Scroll</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
          <ChevronDown size={16} />
        </motion.div>
      </motion.div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Mohr-Coulomb SVG — visual-first design matching the reference image
// 3 half-circles spread wide across the plot, orange + indigo palette
// Low-opacity grid squares for unit reference
// ─────────────────────────────────────────────────────────────────────────────
function MohrCircleSVG() {
  const oy = 210;
  const circles = [
    { cx: 170, r: 50,  stroke: "#6366F1", opacity: 0.45, sw: 1.5 },
    { cx: 285, r: 80,  stroke: "#6366F1", opacity: 0.75, sw: 1.8 },
    { cx: 440, r: 120, stroke: "#F59E0B", opacity: 1.00, sw: 2.2 },
  ];

  // Grid squares — low opacity, every 80px
  const gridStep = 80;
  const gridLines: { x1: number; y1: number; x2: number; y2: number }[] = [];

  // Vertical lines
  for (let x = 80; x <= 560; x += gridStep) {
    gridLines.push({ x1: x, y1: 15, x2: x, y2: oy });
  }
  // Horizontal lines
  for (let y = oy - gridStep; y >= 15; y -= gridStep) {
    gridLines.push({ x1: 60, y1: y, x2: 560, y2: y });
  }

  return (
    <svg viewBox="0 0 600 240" className="w-full h-56" xmlns="http://www.w3.org/2000/svg">
      <defs>
        {/* Clip to show only upper half of circles */}
        <clipPath id="above-axis">
          <rect x="0" y="0" width="600" height={oy} />
        </clipPath>
      </defs>

      {/* Grid */}
      {gridLines.map((l, i) => (
        <line key={i} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
          stroke="#6366F1" strokeWidth="0.4" opacity="0.12" />
      ))}

      {/* σ axis */}
      <line x1="60" y1={oy} x2="575" y2={oy} stroke="#475569" strokeWidth="1.2" />
      <polygon points={`571,${oy-3} 578,${oy} 571,${oy+3}`} fill="#475569" />
      <text x="582" y={oy+4} fill="#64748b" fontSize="12" fontStyle="italic">σ</text>
      <text x="550" y={oy+16} fill="#64748b" fontSize="8">(kPa)</text>

      {/* τ axis */}
      <line x1="68" y1={oy+6} x2="68" y2="12" stroke="#475569" strokeWidth="1.2" />
      <polygon points="65,15 68,8 71,15" fill="#475569" />
      <text x="52" y="14" fill="#64748b" fontSize="12" fontStyle="italic">τ</text>
      <text x="10" y="28" fill="#64748b" fontSize="8">(kPa)</text>

      {/* σ ticks */}
      {["100","200","300","400","500"].map((label, i) => {
        const x = 80 + (i + 1) * gridStep;
        return (
          <g key={label}>
            <line x1={x} y1={oy} x2={x} y2={oy+5} stroke="#475569" strokeWidth="0.8" />
            <text x={x-8} y={oy+14} fill="#64748b" fontSize="8">{label}</text>
          </g>
        );
      })}

      {/* τ ticks */}
      {["50","100","150"].map((label, i) => {
        const y = oy - (i + 1) * gridStep * 0.65;
        return (
          <g key={label}>
            <line x1="64" y1={y} x2="72" y2={y} stroke="#475569" strokeWidth="0.8" />
            <text x="20" y={y+3} fill="#64748b" fontSize="8">{label}</text>
          </g>
        );
      })}

      {/* Failure envelope */}
      <line x1="68" y1="185" x2="500" y2="68"
        stroke="#6366F1" strokeWidth="1.8" strokeDasharray="6 3" opacity="0.85" />

      {/* Half-circles */}
      {circles.map((c, i) => (
        <circle key={i} cx={c.cx} cy={oy} r={c.r}
          fill="none" stroke={c.stroke} strokeWidth={c.sw}
          opacity={c.opacity} clipPath="url(#above-axis)" />
      ))}

      {/* c intercept */}
      <circle cx="68" cy="185" r="3" fill="#6366F1" opacity="0.9" />
      <text x="74" y="170" fill="#F59E0B" fontSize="9">c = 18 kPa</text>

      {/* φ label */}
      <text x="505" y="80" fill="#F59E0B" fontSize="11" fontWeight="bold">φ = 32°</text>

      {/* φ arc */}
      <path d="M 87 210 A 30 30 0 0 0 82 183"
        fill="none" stroke="#F59E0B" strokeWidth="2" opacity="0.6" />
    </svg>
  );
}