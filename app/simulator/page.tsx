"use client";

import { useState } from "react";
import { motion, AnimatePresence, type HTMLMotionProps } from "framer-motion";
import { ArrowRight, ArrowLeft, FlaskConical, CheckCircle2, RotateCcw, Download } from "lucide-react";
import { useLang } from "@/components/layout/LangContext";
import Link from "next/link";

// ─── Types ───────────────────────────────────────────────────────────────────
interface SimInputs {
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
      { key: "ROD", label: "Degré d'altération (ROD)",    unit: "-",   min: 0,   max: 5,   step: 1,   placeholder: "0 à 5" },
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
      { key: "ROD", label: "Alteration degree (ROD)",  unit: "-",   min: 0,   max: 5,   step: 1,   placeholder: "0 to 5" },
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
  const oy = 170;
  const phiRad = (phi * Math.PI) / 180;
  const sc = 0.55;
  const ox = 50;

  const sigma3s = [20, 70, 150];
  const circles = sigma3s.map((s3, i) => {
    const s1 = (s3 * (1 + Math.sin(phiRad)) + 2 * c * Math.cos(phiRad)) / (1 - Math.sin(phiRad));
    const cx = ox + ((s1 + s3) / 2) * sc;
    const r  = ((s1 - s3) / 2) * sc;
    return { cx, r, stroke: i === 2 ? "#F59E0B" : "#6366F1", opacity: [0.45, 0.72, 1][i], sw: [1.4, 1.7, 2.1][i] };
  });

  const y1e = oy - c * sc;
  const x2e = ox + 300 * sc;
  const y2e = oy - (c + 300 * Math.tan(phiRad)) * sc;

  return (
    <svg viewBox="0 0 460 200" className="w-full h-48" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <clipPath id="res-clip">
          <rect x="0" y="0" width="460" height={oy} />
        </clipPath>
      </defs>
      {/* Grid */}
      {[80,160,240,320,400].map(x => (
        <line key={x} x1={x} y1="10" x2={x} y2={oy} stroke="#6366F1" strokeWidth="0.3" opacity="0.12" />
      ))}
      {[40,80,120,160].map(y => (
        <line key={y} x1={ox} y1={oy-y} x2="445" y2={oy-y} stroke="#6366F1" strokeWidth="0.3" opacity="0.12" />
      ))}
      {/* Axes */}
      <line x1={ox-6} y1={oy} x2="448" y2={oy} stroke="#334155" strokeWidth="1" />
      <line x1={ox} y1={oy+5} x2={ox} y2="8" stroke="#334155" strokeWidth="1" />
      <polygon points={`444,${oy-3} 451,${oy} 444,${oy+3}`} fill="#334155" />
      <polygon points={`${ox-3},11 ${ox},4 ${ox+3},11`} fill="#334155" />
      <text x="454" y={oy+4} fill="#64748b" fontSize="10" fontStyle="italic">σ</text>
      <text x={ox-14} y="10" fill="#64748b" fontSize="10" fontStyle="italic">τ</text>
      {/* Ticks */}
      {[50,100,150,200,250].map(s => {
        const x = ox + s * sc;
        return x < 445 ? (
          <g key={s}>
            <line x1={x} y1={oy} x2={x} y2={oy+4} stroke="#334155" strokeWidth="0.7" />
            <text x={x-8} y={oy+13} fill="#475569" fontSize="7">{s}</text>
          </g>
        ) : null;
      })}
      {[50,100,150].map(tv => {
        const y = oy - tv * sc;
        return (
          <g key={tv}>
            <line x1={ox-4} y1={y} x2={ox} y2={y} stroke="#334155" strokeWidth="0.7" />
            <text x="10" y={y+3} fill="#475569" fontSize="7">{tv}</text>
          </g>
        );
      })}
      {/* Envelope */}
      <line x1={ox} y1={y1e} x2={x2e} y2={y2e}
        stroke="#6366F1" strokeWidth="1.6" strokeDasharray="5 3" opacity="0.85" />
      {/* Circles */}
      {circles.map((circ, i) => (
        <motion.circle key={i} cx={circ.cx} cy={oy} r={circ.r}
          fill="none" stroke={circ.stroke} strokeWidth={circ.sw}
          opacity={circ.opacity} clipPath="url(#res-clip)"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: circ.opacity }}
          style={{ transformOrigin: `${circ.cx}px ${oy}px` }}
          transition={{ duration: 0.8, delay: i * 0.2, ease: "easeOut" as const }}
        />
      ))}
      {/* Labels */}
      <circle cx={ox} cy={y1e} r="3" fill="#6366F1" opacity="0.9" />
      <text x={ox+5} y={y1e-5} fill="#F59E0B" fontSize="8">c = {c} kPa</text>
      <text x={x2e+4} y={y2e+4} fill="#F59E0B" fontSize="10" fontWeight="bold">φ = {phi}°</text>
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

  const set = (key: keyof SimInputs, val: string) =>
    setInputs(prev => ({ ...prev, [key]: val }));

  const canNext = () => {
    if (step === 0) return !!inputs.soilType;
    if (step === 1) return !!inputs.testType;
    if (step === 2) return tr.params.every(p => inputs[p.key as keyof SimInputs] !== "");
    return false;
  };

  const handleCalculate = () => {
    setLoading(true);
    setTimeout(() => {
      setResults(mockPredict(inputs));
      setLoading(false);
      setStep(3);
    }, 1800);
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

      <div className="relative max-w-3xl mx-auto px-6 py-20">

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
                <div>
                  <h2 className="text-lg font-bold dark:text-white text-gray-900 mb-1">
                    {lang === "fr" ? "Paramètres d'essai" : "Test parameters"}
                  </h2>
                  <p className="text-sm dark:text-gray-400 text-gray-500 mb-6">
                    {lang === "fr" ? "Entrez les valeurs mesurées en laboratoire." : "Enter the values measured in the laboratory."}
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    {tr.params.map((p) => (
                      <div key={p.key} className="flex flex-col gap-1.5">
                        <label className="text-xs font-medium dark:text-gray-400 text-gray-600">
                          {p.label}
                        </label>
                        <div className="relative">
                          <input
                            type="number"
                            min={p.min}
                            max={p.max}
                            step={p.step}
                            value={inputs[p.key as keyof SimInputs]}
                            onChange={(e) => set(p.key as keyof SimInputs, e.target.value)}
                            placeholder={p.placeholder}
                            className="w-full pr-10 pl-3 py-2.5 rounded-xl border dark:border-white/10 border-gray-200 dark:bg-white/5 bg-gray-50 dark:text-white text-gray-900 dark:placeholder-gray-600 placeholder-gray-400 text-sm focus:outline-none focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/20 transition-all"
                          />
                          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs dark:text-gray-500 text-gray-400 font-mono">
                            {p.unit}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
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

                  {/* Result stats */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                    {[
                      { label: tr.cohesionLabel,   value: `${results.cohesion} kPa`, color: "text-emerald-400" },
                      { label: tr.phiLabel,         value: `${results.phi}°`,         color: "text-amber-400"   },
                      { label: tr.confidenceLabel,  value: `${results.confidence}%`,  color: "text-indigo-400"  },
                      { label: tr.soilLabel,        value: results.soilLabel,          color: "dark:text-white text-gray-900" },
                    ].map((r, i) => (
                      <motion.div
                        key={r.label}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1, duration: 0.4 }}
                        className="rounded-xl border dark:border-white/10 border-gray-200 dark:bg-white/5 bg-gray-50 px-4 py-3"
                      >
                        <p className="text-xs dark:text-gray-500 text-gray-400 mb-1">{r.label}</p>
                        <p className={`text-lg font-black ${r.color}`}>{r.value}</p>
                      </motion.div>
                    ))}
                  </div>

                  {/* Mohr diagram */}
                  <div className="rounded-xl border dark:border-white/10 border-gray-100 dark:bg-white/5 bg-gray-50 p-4 mb-4">
                    <p className="text-xs dark:text-gray-500 text-gray-400 mb-2 uppercase tracking-wider">
                      {tr.analysisLabel} · Mohr-Coulomb
                    </p>
                    <ResultMohr c={results.cohesion} phi={results.phi} />
                  </div>
                </div>
              )}

            </motion.div>
          </AnimatePresence>

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