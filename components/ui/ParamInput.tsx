"use client";

import { useId, useState } from "react";
import { SlidersHorizontal, Keyboard } from "lucide-react";

interface ParamInputProps {
  label: string;
  unit: string;
  min: number;
  max: number;
  step: number;
  placeholder: string;
  value: string;
  onChange: (val: string) => void;
  mode: "slider" | "type";
}

export function ParamInput({
  label, unit, min, max, step, placeholder, value, onChange, mode,
}: ParamInputProps) {
  const id = useId();
  const title = `${label} ${unit}`.trim();
  const numVal = parseFloat(value) || min;
  const pct = Math.min(100, Math.max(0, ((numVal - min) / (max - min)) * 100));

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <label htmlFor={id} className="text-xs font-medium dark:text-gray-400 text-gray-600">
          {label}
        </label>
        <span className="text-xs font-mono dark:text-gray-500 text-gray-400">{unit}</span>
      </div>

      {mode === "type" ? (
        /* ── Number input ── */
        <div className="relative">
          <input
            id={id}
            title={title}
            type="number"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full pr-10 pl-3 py-2.5 rounded-xl border dark:border-white/10 border-gray-200 dark:bg-white/5 bg-gray-50 dark:text-white text-gray-900 dark:placeholder-gray-600 placeholder-gray-400 text-sm focus:outline-none focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/20 transition-all"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs dark:text-gray-500 text-gray-400 font-mono">
            {unit}
          </span>
        </div>
      ) : (
        /* ── Slider ── */
        <div className="flex flex-col gap-2">
          {/* Value display */}
          <div className="flex items-center justify-between">
            <span className="text-xs dark:text-gray-500 text-gray-400">{min}</span>
            <span className="text-sm font-black text-indigo-400">
              {value || min}{unit !== "-" ? ` ${unit}` : ""}
            </span>
            <span className="text-xs dark:text-gray-500 text-gray-400">{max}</span>
          </div>

          {/* Custom slider */}
          <div className="relative h-8 flex items-center">
            {/* Track background */}
            <div className="absolute w-full h-1.5 rounded-full dark:bg-white/10 bg-gray-200" />
            {/* Track fill */}
            <div
              className="absolute h-1.5 rounded-full bg-indigo-500 transition-all duration-75"
              style={{ width: `${pct}%` }}
            />
            {/* Custom thumb (visual only) */}
            <div
              className="absolute w-5 h-5 rounded-full bg-indigo-500 border-2 border-white shadow-lg shadow-indigo-500/40 transition-all duration-75 pointer-events-none z-10"
              style={{ left: `calc(${pct}% - 10px)` }}
            />
            {/* Native range input — full size, fully transparent, on top */}
            <input
              type="range"
              min={min}
              max={max}
              step={step}
              value={value || min}
              onChange={(e) => onChange(e.target.value)}
              className="range-input"
              title={label}
              aria-label={label}
            />
          </div>
        </div>
      )}
    </div>
  );
}

interface ParamStepProps {
  params: {
    key: string;
    label: string;
    unit: string;
    min: number;
    max: number;
    step: number;
    placeholder: string;
  }[];
  inputs: Record<string, string>;
  onChange: (key: string, val: string) => void;
  lang: "fr" | "en";
}

export function ParamStep({ params, inputs, onChange, lang }: ParamStepProps) {
  const [mode, setMode] = useState<"slider" | "type">("slider");

  return (
    <div>
      {/* Mode toggle */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-lg font-bold dark:text-white text-gray-900">
            {lang === "fr" ? "Paramètres d'essai" : "Test parameters"}
          </h2>
          <p className="text-sm dark:text-gray-400 text-gray-500">
            {lang === "fr" ? "Entrez les valeurs mesurées en laboratoire." : "Enter the values measured in the laboratory."}
          </p>
        </div>

        {/* Toggle button */}
        <div className="flex items-center rounded-xl border dark:border-white/10 border-gray-200 overflow-hidden flex-shrink-0">
          <button
            onClick={() => setMode("slider")}
            title="Slider mode"
            aria-label="Slider mode"
            className={`flex items-center gap-1.5 px-3 py-2 text-xs font-medium transition-all ${
              mode === "slider"
                ? "bg-indigo-600 text-white"
                : "dark:text-gray-400 text-gray-500 dark:hover:bg-white/5 hover:bg-gray-50"
            }`}
          >
            <SlidersHorizontal size={13} />
            {lang === "fr" ? "Slider" : "Slider"}
          </button>
          <button
            onClick={() => setMode("type")}
            title="Type mode"
            aria-label="Type mode"
            className={`flex items-center gap-1.5 px-3 py-2 text-xs font-medium transition-all ${
              mode === "type"
                ? "bg-indigo-600 text-white"
                : "dark:text-gray-400 text-gray-500 dark:hover:bg-white/5 hover:bg-gray-50"
            }`}
          >
            <Keyboard size={13} />
            {lang === "fr" ? "Saisie" : "Type"}
          </button>
        </div>
      </div>

      {/* Parameters grid */}
      <div className="grid grid-cols-2 gap-x-6 gap-y-5">
        {params.map((p) => (
          <ParamInput
            key={p.key}
            label={p.label}
            unit={p.unit}
            min={p.min}
            max={p.max}
            step={p.step}
            placeholder={p.placeholder}
            value={inputs[p.key] ?? ""}
            onChange={(val) => onChange(p.key, val)}
            mode={mode}
          />
        ))}
      </div>
    </div>
  );
}