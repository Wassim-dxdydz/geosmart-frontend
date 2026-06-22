"use client";

import { useState } from "react";
import { motion, AnimatePresence, type HTMLMotionProps } from "framer-motion";
import { ArrowRight, ArrowLeft, FlaskConical, CheckCircle2, RotateCcw, Download } from "lucide-react";
import { useLang } from "@/components/layout/LangContext";
import Link from "next/link";
import { predict } from "@/lib/usePredict";
import { exportPDF } from "@/lib/exportPDF";
import { ParamStep } from "@/components/ui/ParamInput";

// ─── Types ───────────────────────────────────────────────────────────────────
interface SimInputs extends Record<string, string> {
  soilType: string;
  testType: string;
  FC: string;
  WL: string;
  IP: string;
  MC: string; 
  SR: string;
  ROD: string;
}

interface SimResults {
  cohesion: number;
  phi: number;
  confidence: number;
  soilLabel: string;
}

// ─── Mock prediction ─────────────────────────────────────────────────────────
function mockPredict(inputs: SimInputs): SimResults {
  const fc = parseFloat(inputs.FC) || 30;
  const wl = parseFloat(inputs.WL) || 40;
  const mc = parseFloat(inputs.MC) || 25;

  const cohesion  = Math.round(8 + fc * 0.3 + wl * 0.1 + Math.random() * 4);
  const phi       = Math.round(42 - fc * 0.12 - mc * 0.05 + Math.random() * 3);
  const confidence = Math.round(920 + Math.random() * 70) / 10;

  const soilLabel =
    fc > 50 ? (inputs.soilType === "clay" ? "Argile" : "Limon") :
    fc > 20 ? "Argile limoneuse" : "Sable limoneux";

  return { cohesion, phi, confidence, soilLabel };
}

// ─── Translations ─────────────────────────────────────────────────────────────
const t = {
  fr: {
    title: "Simulateur Géotechnique",
    subtitle: "Entrez vos paramètres d'essai pour obtenir c et φ.",
    steps: ["Type de sol", "Type d'essai", "Paramètres", "Résultats"],
    soilTypeLabel: "Nature du sol",
    soilTypes: [
      { value: "clay",  label: "Argile",  desc: "Sol fin plastique, faible perméabilité" },
      { value: "silt",  label: "Limon",   desc: "Sol fin peu plastique, sensible à l'eau" },
      { value: "marl",  label: "Marne",   desc: "Mélange argile-calcaire, cohésif" },
      { value: "sand",  label: "Sable",   desc: "Sol granulaire, bonne perméabilité" },
    ],
    testTypeLabel: "Type d'essai",
    testTypes: [
      { value: "UU", label: "Triaxial UU", desc: "Non Consolidé – Non Drainé · Court terme" },
      { value: "CU", label: "Triaxial CU", desc: "Consolidé – Non Drainé · Remblais, barrages" },
      { value: "CD", label: "Triaxial CD", desc: "Consolidé – Drainé · Long terme" },
    ],
    params: [
      { key: "FC",  label: "Teneur en fines (FC)",        unit: "%",   min: 0,   max: 100, step: 1,   placeholder: "ex: 35" },
      { key: "WL",  label: "Limite de liquidité (WL)",    unit: "%",   min: 10,  max: 120, step: 1,   placeholder: "ex: 42" },
      { key: "IP",  label: "Indice de plasticité (IP)",   unit: "%",   min: 0,   max: 80,  step: 1,   placeholder: "ex: 18" },
      { key: "MC",  label: "Teneur en eau (MC)",          unit: "%",   min: 0,   max: 100, step: 0.5, placeholder: "ex: 24" },
      { key: "SR",  label: "Degré de saturation (SR)",    unit: "%",   min: 0,   max: 100, step: 1,   placeholder: "ex: 85" },
      { key: "ROD", label: "Degré d'altération (ROD)",    unit: "-",   min: 0,   max: 5,   step: 0.1, placeholder: "ex: 1.6" },
    ],
    next: "Suivant",
    back: "Retour",
    calculate: "Calculer",
    calculating: "Calcul en cours...",
    restart: "Nouvelle analyse",
    export: "Exporter PDF",
    resultsTitle: "Résultats de l'analyse",
    cohesionLabel: "Cohésion (c)",
    phiLabel: "Angle de frottement (φ)",
    confidenceLabel: "Indice de confiance",
    soilLabel: "Nature identifiée",
    backHome: "← Accueil",
    analysisLabel: "Analyse en cours",
    computed: "Calculé",
  },
  en: {
    title: "Geotechnical Simulator",
    subtitle: "Enter your test parameters to get c and φ.",
    steps: ["Soil type", "Test type", "Parameters", "Results"],
    soilTypeLabel: "Soil type",
    soilTypes: [
      { value: "clay",  label: "Clay",  desc: "Fine plastic soil, low permeability" },
      { value: "silt",  label: "Silt",  desc: "Fine low-plastic soil, water-sensitive" },
      { value: "marl",  label: "Marl",  desc: "Clay-limestone mix, cohesive" },
      { value: "sand",  label: "Sand",  desc: "Granular soil, good permeability" },
    ],
    testTypeLabel: "Test type",
    testTypes: [
      { value: "UU", label: "Triaxial UU", desc: "Unconsolidated – Undrained · Short term" },
      { value: "CU", label: "Triaxial CU", desc: "Consolidated – Undrained · Embankments" },
      { value: "CD", label: "Triaxial CD", desc: "Consolidated – Drained · Long term" },
    ],
    params: [
      { key: "FC",  label: "Fines content (FC)",      unit: "%",   min: 0,   max: 100, step: 1,   placeholder: "e.g. 35" },
      { key: "WL",  label: "Liquid limit (WL)",        unit: "%",   min: 10,  max: 120, step: 1,   placeholder: "e.g. 42" },
      { key: "IP",  label: "Plasticity index (IP)",    unit: "%",   min: 0,   max: 80,  step: 1,   placeholder: "e.g. 18" },
      { key: "MC",  label: "Water content (MC)",       unit: "%",   min: 0,   max: 100, step: 0.5, placeholder: "e.g. 24" },
      { key: "SR",  label: "Saturation degree (SR)",   unit: "%",   min: 0,   max: 100, step: 1,   placeholder: "e.g. 85" },
      { key: "ROD", label: "Alteration degree (ROD)",  unit: "-",   min: 0,   max: 5,   step: 0.1, placeholder: "e.g. 1.6" },
    ],
    next: "Next",
    back: "Back",
    calculate: "Calculate",
    calculating: "Calculating...",
    restart: "New analysis",
    export: "Export PDF",
    resultsTitle: "Analysis results",
    cohesionLabel: "Cohesion (c)",
    phiLabel: "Friction angle (φ)",
    confidenceLabel: "Confidence index",
    soilLabel: "Identified soil",
    backHome: "← Home",
    analysisLabel: "Analysis running",
    computed: "Computed",
  },
};

// ─── Result Mohr diagram ──────────────────────────────────────────────────────
function ResultMohr({ c, phi }: { c: number; phi: number }) {
  const W   = 560;
  const H   = 280;
  const ox  = 55;   // sigma=0 → SVG x
  const oy  = H - 28; // tau=0  → SVG y

  const phiRad = (phi * Math.PI) / 180;

  // Auto-scale: fit largest circle in both dimensions
  const sigma3s = [20, 70, 150];
  const s1Max = (150 * (1 + Math.sin(phiRad)) + 2 * c * Math.cos(phiRad)) / (1 - Math.sin(phiRad));
  const rMax  = (s1Max - 150) / 2;
  const scH   = (W - ox - 20) / s1Max;
  const scV   = (oy - 30) / rMax;
  const sc    = Math.min(scH, scV) * 0.92; // 8% margin

  // Circles
  const circles = sigma3s.map((s3, i) => {
    const s1 = (s3 * (1 + Math.sin(phiRad)) + 2 * c * Math.cos(phiRad)) / (1 - Math.sin(phiRad));
    const cx = ox + ((s1 + s3) / 2) * sc;
    const r  = ((s1 - s3) / 2) * sc;
    return { cx, r, stroke: i === 2 ? "#F59E0B" : "#6366F1", opacity: [0.45, 0.72, 1][i], sw: [1.4, 1.7, 2.1][i] };
  });

  // Envelope — clipped at top (y=18)
  const y1e = oy - c * sc;
  const sigmaAtTop = (oy - 18 - c * sc) / (Math.tan(phiRad) * sc);
  const x2e = ox + sigmaAtTop * sc;
  const y2e = 18;

  // Sigma ticks
  const sigmaStep = s1Max > 500 ? 100 : s1Max > 200 ? 50 : 25;
  const sigmaTicks: number[] = [];
  for (let s = sigmaStep; s < s1Max * 0.95; s += sigmaStep) sigmaTicks.push(Math.round(s));

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-64" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <clipPath id="res-clip">
          <rect x={ox} y="15" width={W - ox - 5} height={oy - 15} />
        </clipPath>
      </defs>

      {/* Grid */}
      {sigmaTicks.map(s => (
        <line key={s} x1={ox + s*sc} y1="15" x2={ox + s*sc} y2={oy}
          stroke="#6366F1" strokeWidth="0.3" opacity="0.1" />
      ))}
      {[0.25, 0.5, 0.75, 1].map(f => (
        <line key={f} x1={ox} y1={oy - rMax*sc*f} x2={W - 10} y2={oy - rMax*sc*f}
          stroke="#6366F1" strokeWidth="0.3" opacity="0.1" />
      ))}

      {/* Sigma axis */}
      <line x1={ox - 6} y1={oy} x2={W - 8} y2={oy} stroke="#334155" strokeWidth="1" />
      <polygon points={`${W-8},${oy-3} ${W-2},${oy} ${W-8},${oy+3}`} fill="#334155" />
      <text x={W - 4} y={oy + 4} fill="#64748b" fontSize="11" fontStyle="italic">σ</text>

      {/* Tau axis */}
      <line x1={ox} y1={oy + 5} x2={ox} y2="10" stroke="#334155" strokeWidth="1" />
      <polygon points={`${ox-3},13 ${ox},7 ${ox+3},13`} fill="#334155" />
      <text x={ox - 14} y="12" fill="#64748b" fontSize="11" fontStyle="italic">τ</text>

      {/* Sigma ticks */}
      {sigmaTicks.map(s => {
        const x = ox + s * sc;
        return (
          <g key={s}>
            <line x1={x} y1={oy} x2={x} y2={oy + 4} stroke="#334155" strokeWidth="0.7" />
            <text x={x} y={oy + 12} fill="#475569" fontSize="8" textAnchor="middle">{s}</text>
          </g>
        );
      })}

      {/* Tau ticks */}
      {[0.25, 0.5, 0.75].map(f => {
        const val = Math.round(rMax * f);
        const y = oy - val * sc;
        return (
          <g key={f}>
            <line x1={ox - 3} y1={y} x2={ox} y2={y} stroke="#334155" strokeWidth="0.7" />
            <text x={ox - 5} y={y + 3} fill="#475569" fontSize="8" textAnchor="end">{val}</text>
          </g>
        );
      })}

      {/* Failure envelope — clipped */}
      <line x1={ox} y1={y1e} x2={x2e} y2={y2e}
        stroke="#6366F1" strokeWidth="1.6" strokeDasharray="5 3" opacity="0.85"
        clipPath="url(#res-clip)" />

      {/* Circles — clipped to upper half */}
      {circles.map((circ, i) => (
        <motion.circle key={i}
          cx={circ.cx} cy={oy} r={circ.r}
          fill="none" stroke={circ.stroke}
          strokeWidth={circ.sw} opacity={circ.opacity}
          clipPath="url(#res-clip)"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: circ.opacity }}
          style={{ transformOrigin: `${circ.cx}px ${oy}px` }}
          transition={{ duration: 0.8, delay: i * 0.2, ease: "easeOut" as const }}
        />
      ))}

      {/* c intercept */}
      <circle cx={ox} cy={y1e} r="3" fill="#6366F1" opacity="0.9" />
      <text x={ox + 5} y={y1e - 5} fill="#F59E0B" fontSize="9">c = {c} kPa</text>

      {/* φ label */}
      <text x={x2e + 4} y={y2e + 12} fill="#F59E0B" fontSize="11" fontWeight="bold">φ = {phi}°</text>
    </svg>
  );
}

// ─── Progress bar ─────────────────────────────────────────────────────────────
function StepBar({ current, steps }: { current: number; steps: string[] }) {
  return (
    <div className="flex items-center gap-2 mb-8">
      {steps.map((label, i) => (
        <div key={i} className="flex items-center gap-2 flex-1 last:flex-none">
          <div className="flex flex-col items-center gap-1">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
              i < current  ? "bg-indigo-500 text-white" :
              i === current ? "bg-indigo-600 text-white ring-2 ring-indigo-500/40" :
              "dark:bg-white/5 bg-gray-100 dark:text-gray-500 text-gray-400"
            }`}>
              {i < current ? <CheckCircle2 size={14} /> : i + 1}
            </div>
            <span className={`text-xs whitespace-nowrap transition-colors ${
              i === current ? "dark:text-white text-gray-900 font-medium" : "dark:text-gray-500 text-gray-400"
            }`}>{label}</span>
          </div>
          {i < steps.length - 1 && (
            <div className={`flex-1 h-px mb-5 transition-all duration-500 ${
              i < current ? "bg-indigo-500" : "dark:bg-white/10 bg-gray-200"
            }`} />
          )}
        </div>
      ))}
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function SimulatorPage() {
  const { lang } = useLang();
  const tr = t[lang];

  const [step, setStep] = useState(0);
  const [inputs, setInputs] = useState<SimInputs>({
    soilType: "", testType: "",
    FC: "", WL: "", IP: "", MC: "", SR: "", ROD: "",
  });
  const [results, setResults] = useState<SimResults | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const set = (key: keyof SimInputs, val: string) =>
    setInputs(prev => ({ ...prev, [key]: val }));

  const canNext = () => {
    if (step === 0) return !!inputs.soilType;
    if (step === 1) return !!inputs.testType;
    if (step === 2) return tr.params.every(p => inputs[p.key as keyof SimInputs] !== "");
    return false;
  };

const handleCalculate = async () => {
    setLoading(true);
    setError(null);
    try {
      const soilMap: Record<string, string> = {
        clay: "argile",
        silt: "limons",
        marl: "marne",
        sand: "sable",
      };
      const data = await predict({
        soil_type: soilMap[inputs.soilType] ?? inputs.soilType,
        test_type: inputs.testType.toLowerCase(),
        FC: inputs.FC, WL: inputs.WL, IP: inputs.IP,
        MC: inputs.MC, SR: inputs.SR, ROD: inputs.ROD,
      });
      setResults({
        cohesion:   data.cohesion,
        phi:        data.phi,
        confidence: data.confidence,
        soilLabel:  data.soil_label,
      });
      setStep(3);
    } catch (err: any) {
      setError(err.message ?? "Erreur de prédiction");
    } finally {
      setLoading(false);
    }
  };

  const handleRestart = () => {
    setStep(0);
    setResults(null);
    setInputs({ soilType: "", testType: "", FC: "", WL: "", IP: "", MC: "", SR: "", ROD: "" });
  };

  const slideVariants = {
    enter:  { opacity: 0, x: 40  },
    center: { opacity: 1, x: 0   },
    exit:   { opacity: 0, x: -40 },
  };

  return (
    <main className="min-h-screen dark:bg-[#0F1117] bg-slate-50 transition-colors duration-300">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.03)_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-indigo-600/8 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-6 py-20">

        {/* Header */}
        <div className="text-center mb-6">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 text-xs font-medium tracking-wide uppercase mb-3">
            <FlaskConical size={12} />
            {tr.title}
          </span>
          <h1 className="text-3xl font-black dark:text-white text-gray-900 mb-2">{tr.title}</h1>
          <p className="dark:text-gray-400 text-gray-500 text-sm">{tr.subtitle}</p>
        </div>

        {/* Step bar */}
        <StepBar current={step} steps={tr.steps} />

        {/* Card */}
        <div className="rounded-2xl border dark:border-white/10 border-gray-200 dark:bg-white/5 bg-white shadow-xl overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: "easeInOut" as const }}
              className="p-8"
            >

              {/* ── STEP 0: Soil type ── */}
              {step === 0 && (
                <div>
                  <h2 className="text-lg font-bold dark:text-white text-gray-900 mb-1">{tr.soilTypeLabel}</h2>
                  <p className="text-sm dark:text-gray-400 text-gray-500 mb-6">
                    {lang === "fr" ? "Sélectionnez la nature du sol à analyser." : "Select the soil type to analyze."}
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    {tr.soilTypes.map((s) => (
                      <button
                        key={s.value}
                        onClick={() => set("soilType", s.value)}
                        className={`p-4 rounded-xl border text-left transition-all duration-200 ${
                          inputs.soilType === s.value
                            ? "border-indigo-500 bg-indigo-500/10 dark:text-white text-gray-900"
                            : "dark:border-white/10 border-gray-200 dark:hover:border-white/20 hover:border-gray-300 dark:text-gray-300 text-gray-700"
                        }`}
                      >
                        <p className="font-semibold mb-1">{s.label}</p>
                        <p className="text-xs dark:text-gray-500 text-gray-400">{s.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* ── STEP 1: Test type ── */}
              {step === 1 && (
                <div>
                  <h2 className="text-lg font-bold dark:text-white text-gray-900 mb-1">{tr.testTypeLabel}</h2>
                  <p className="text-sm dark:text-gray-400 text-gray-500 mb-6">
                    {lang === "fr" ? "Choisissez le type d'essai réalisé en laboratoire." : "Choose the type of laboratory test performed."}
                  </p>
                  <div className="flex flex-col gap-3">
                    {tr.testTypes.map((tt) => (
                      <button
                        key={tt.value}
                        onClick={() => set("testType", tt.value)}
                        className={`p-4 rounded-xl border text-left transition-all duration-200 flex items-center gap-4 ${
                          inputs.testType === tt.value
                            ? "border-indigo-500 bg-indigo-500/10"
                            : "dark:border-white/10 border-gray-200 dark:hover:border-white/20 hover:border-gray-300"
                        }`}
                      >
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-black text-lg flex-shrink-0 ${
                          inputs.testType === tt.value
                            ? "bg-indigo-500 text-white"
                            : "dark:bg-white/5 bg-gray-100 dark:text-gray-400 text-gray-500"
                        }`}>
                          {tt.value}
                        </div>
                        <div>
                          <p className={`font-semibold ${inputs.testType === tt.value ? "text-indigo-400" : "dark:text-white text-gray-900"}`}>
                            {tt.label}
                          </p>
                          <p className="text-xs dark:text-gray-500 text-gray-400">{tt.desc}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* ── STEP 2: Parameters ── */}
              {step === 2 && (
                <ParamStep
                  params={tr.params}
                  inputs={inputs}
                  onChange={(key: string, val: string) => set(key as keyof SimInputs, val)}
                  lang={lang}
                />
              )}

              {/* ── STEP 3: Results ── */}
              {step === 3 && results && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-lg font-bold dark:text-white text-gray-900">{tr.resultsTitle}</h2>
                      <p className="text-xs dark:text-gray-500 text-gray-400 mt-0.5">
                        {inputs.soilType} · {inputs.testType}
                      </p>
                    </div>
                    <span className="flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 px-2 py-1 rounded-full">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      {tr.computed}
                    </span>
                  </div>

                  {/* ── Two column layout: stats left, diagram right ── */}
                  <div className="flex gap-4">

                    {/* Left: 4 stat cards stacked vertically — 15% */}
                    <div className="flex flex-col gap-3 w-[20%] flex-shrink-0">
                      {[
                        { label: tr.cohesionLabel,  value: `${results.cohesion} kPa`, color: "text-emerald-400" },
                        { label: tr.phiLabel,        value: `${results.phi}°`,         color: "text-amber-400"   },
                        { label: tr.confidenceLabel, value: `${results.confidence}%`,  color: "text-indigo-400"  },
                        { label: tr.soilLabel,       value: results.soilLabel,          color: "dark:text-white text-gray-900" },
                      ].map((r, i) => (
                        <motion.div
                          key={r.label}
                          initial={{ opacity: 0, x: -16 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1, duration: 0.4 }}
                          className="rounded-xl border dark:border-white/10 border-gray-200 dark:bg-white/5 bg-gray-50 px-3 py-3 flex-1"
                        >
                          <p className="text-xs dark:text-gray-500 text-gray-400 mb-1 leading-tight">{r.label}</p>
                          <p className={`text-base font-black ${r.color}`}>{r.value}</p>
                        </motion.div>
                      ))}
                    </div>

                    {/* Right: Mohr diagram — 70% */}
                    <motion.div
                      initial={{ opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className="flex-1 rounded-xl border dark:border-white/10 border-gray-100 dark:bg-white/5 bg-gray-50 p-4 pt-6"
                    >
                      <p className="text-xs dark:text-gray-500 text-gray-400 mb-3 uppercase tracking-wider">
                        {tr.analysisLabel} · Mohr-Coulomb
                      </p>
                      <ResultMohr c={results.cohesion} phi={results.phi} />
                    </motion.div>
                  </div>
                </div>
              )}

            </motion.div>
          </AnimatePresence>

          {error && (
            <div className="mx-8 mb-4 px-4 py-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm">
              {error}
            </div>
          )}

          {/* Footer buttons */}
          <div className="px-8 pb-8 flex items-center justify-between">
            {step > 0 && step < 3 ? (
              <button
                onClick={() => setStep(s => s - 1)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl border dark:border-white/10 border-gray-200 dark:text-gray-400 text-gray-500 dark:hover:bg-white/5 hover:bg-gray-50 text-sm transition-all"
              >
                <ArrowLeft size={15} /> {tr.back}
              </button>
            ) : <div />}

            {step < 2 && (
              <button
                onClick={() => setStep(s => s + 1)}
                disabled={!canNext()}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold text-sm transition-all"
              >
                {tr.next} <ArrowRight size={15} />
              </button>
            )}

            {step === 2 && (
              <button
                onClick={handleCalculate}
                disabled={!canNext() || loading}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white font-semibold text-sm transition-all"
              >
                {loading
                  ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> {tr.calculating}</>
                  : <>{tr.calculate} <ArrowRight size={15} /></>
                }
              </button>
            )}

            {step === 3 && (
              <div className="flex gap-3 ml-auto">
                <button
                  onClick={handleRestart}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl border dark:border-white/10 border-gray-200 dark:text-gray-400 text-gray-500 dark:hover:bg-white/5 hover:bg-gray-50 text-sm transition-all"
                >
                  <RotateCcw size={14} /> {tr.restart}
                </button>
                <button
                  onClick={() => exportPDF({
                    cohesion:   results!.cohesion,
                    phi:        results!.phi,
                    confidence: results!.confidence,
                    soilLabel:  results!.soilLabel,
                    soilType:   inputs.soilType,
                    testType:   inputs.testType,
                    inputs: {
                      FC: inputs.FC, WL: inputs.WL, IP: inputs.IP,
                      MC: inputs.MC, SR: inputs.SR, ROD: inputs.ROD,
                    },
                    lang,
                  })}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-all"
                >
                  <Download size={14} /> {tr.export}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}