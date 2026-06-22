"use client";

import { useState, Suspense, useEffect } from "react";
import { signIn } from "next-auth/react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { useLang } from "@/components/layout/LangContext";
import { useTheme } from "next-themes";
import Link from "next/link";
import { Eye, EyeOff, ArrowRight, Mail, Lock, Sun, Moon, Globe } from "lucide-react";

const fadeUp = (delay = 0): HTMLMotionProps<"div"> => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: "easeOut" as const },
});

const translations = {
  fr: {
    welcomeBack: "Bon retour",
    welcomeNew: "Créer un compte",
    subtitleLogin: "Connectez-vous pour accéder au simulateur géotechnique.",
    subtitleRegister: "1 mois gratuit, aucune carte requise.",
    email: "Adresse email",
    password: "Mot de passe",
    forgotPassword: "Mot de passe oublié ?",
    loginBtn: "Se connecter",
    registerBtn: "Créer mon compte",
    orWith: "ou",
    googleBtn: "Continuer avec Google",
    noAccount: "Pas encore de compte ?",
    hasAccount: "Déjà un compte ?",
    registerLink: "S'inscrire gratuitement",
    loginLink: "Se connecter",
    emailPlaceholder: "vous@exemple.com",
    passwordPlaceholder: "••••••••",
    leftTitle: "La géotechnique\nréinventée par l'IA",
    leftSub: "Calculez c et φ en moins de 30 secondes.",
    stat1Label: "Cohésion",
    stat2Label: "Angle de frottement",
    stat3Label: "Confiance",
    analysisLabel: "Analyse en cours",
    computed: "Calculé",
  },
  en: {
    welcomeBack: "Welcome back",
    welcomeNew: "Create an account",
    subtitleLogin: "Sign in to access the geotechnical simulator.",
    subtitleRegister: "1 month free, no card required.",
    email: "Email address",
    password: "Password",
    forgotPassword: "Forgot password?",
    loginBtn: "Sign in",
    registerBtn: "Create account",
    orWith: "or",
    googleBtn: "Continue with Google",
    noAccount: "Don't have an account?",
    hasAccount: "Already have an account?",
    registerLink: "Sign up for free",
    loginLink: "Sign in",
    emailPlaceholder: "you@example.com",
    passwordPlaceholder: "••••••••",
    leftTitle: "Geotechnics\nreinvented by AI",
    leftSub: "Calculate c and φ in under 30 seconds.",
    stat1Label: "Cohesion",
    stat2Label: "Friction angle",
    stat3Label: "Confidence",
    analysisLabel: "Analysis running",
    computed: "Computed",
  },
};

function AnimatedMohr({ t }: { t: typeof translations["fr"] }) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    let current = 0;
    const TOTAL = 5;
    const advance = () => {
      current += 1;
      setStep(current);
      if (current < TOTAL) {
        setTimeout(advance, 1200);
      } else {
        setTimeout(() => {
          setStep(0);
          current = 0;
          setTimeout(advance, 600);
        }, 3000);
      }
    };
    const t0 = setTimeout(advance, 800);
    return () => clearTimeout(t0);
  }, []);

  const oy = 155;
  const circles = [
    { cx: 100, r: 42,  stroke: "#6366F1", opacity: 0.5,  sw: 1.5 },
    { cx: 200, r: 72,  stroke: "#6366F1", opacity: 0.75, sw: 1.8 },
    { cx: 330, r: 108, stroke: "#F59E0B", opacity: 1.0,  sw: 2.1 },
  ];

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-4 w-full">
      <div className="flex items-center justify-between mb-2">
        <p className="text-xs text-gray-400">{t.analysisLabel}</p>
        <span className="flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 px-2 py-0.5 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          {t.computed}
        </span>
      </div>

      {/* Taller SVG */}
      <svg viewBox="0 0 440 185" className="w-full h-44" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <clipPath id="lc">
            <rect x="0" y="0" width="440" height={oy} />
          </clipPath>
        </defs>

        {/* Grid */}
        {[80,160,240,320,400].map(x => (
          <line key={x} x1={x} y1="8" x2={x} y2={oy} stroke="#6366F1" strokeWidth="0.3" opacity="0.12" />
        ))}
        {[50,100,150].map(y => (
          <line key={y} x1="35" y1={oy-y} x2="430" y2={oy-y} stroke="#6366F1" strokeWidth="0.3" opacity="0.12" />
        ))}

        {/* Axes */}
        <line x1="35" y1={oy} x2="432" y2={oy} stroke="#334155" strokeWidth="1" />
        <line x1="42" y1={oy+4} x2="42" y2="6" stroke="#334155" strokeWidth="1" />
        <polygon points={`428,${oy-3} 435,${oy} 428,${oy+3}`} fill="#334155" />
        <polygon points="39,9 42,3 45,9" fill="#334155" />
        <text x="438" y={oy+4} fill="#475569" fontSize="9" fontStyle="italic">σ</text>
        <text x="30" y="9" fill="#475569" fontSize="9" fontStyle="italic">τ</text>

        {/* Axis ticks */}
        {[100,200,300,400].map((s,i) => (
          <g key={s}>
            <line x1={42+s*0.95} y1={oy} x2={42+s*0.95} y2={oy+4} stroke="#334155" strokeWidth="0.7"/>
            <text x={42+s*0.95-8} y={oy+13} fill="#334155" fontSize="7">{s}</text>
          </g>
        ))}
        {[50,100,150].map(t => (
          <g key={t}>
            <line x1="39" y1={oy-t} x2="45" y2={oy-t} stroke="#334155" strokeWidth="0.7"/>
            <text x="10" y={oy-t+3} fill="#334155" fontSize="7">{t}</text>
          </g>
        ))}

        {/* Envelope */}
        {step >= 4 && (
          <motion.line
            x1="42" y1="127" x2="400" y2="19"
            stroke="#6366F1" strokeWidth="1.5"
            strokeDasharray="5 3" opacity="0.85"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.85 }}
            transition={{ duration: 1.2, ease: "easeOut" as const }}
          />
        )}

        {/* Circles */}
        {circles.map((c, i) => step >= i + 1 && (
          <motion.circle
            key={i}
            cx={c.cx} cy={oy} r={c.r}
            fill="none" stroke={c.stroke}
            strokeWidth={c.sw} opacity={c.opacity}
            clipPath="url(#lc)"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: c.opacity }}
            style={{ transformOrigin: `${c.cx}px ${oy}px` }}
            transition={{ duration: 1.0, ease: "easeOut" as const }}
          />
        ))}

        {step >= 5 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
            <circle cx="42" cy="128" r="2.5" fill="#6366F1" opacity="0.9" />
            <text x="47" y="135" fill="#F59E0B" fontSize="8">c = 18 kPa</text>
            <text x="360" y="30" fill="#F59E0B" fontSize="9" fontWeight="bold">φ = 32°</text>
          </motion.g>
        )}
      </svg>
    </div>
  );
}

function LoginContent() {
  const { lang, setLang } = useLang();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const t = translations[lang];
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/simulator";

  const [mode, setMode] = useState<"login" | "register">("login");
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const isDark = theme === "dark";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => setLoading(false), 1500);
  };

  return (
    <main
      suppressHydrationWarning
      className="h-screen overflow-hidden dark:bg-[#0F1117] bg-slate-50 flex transition-colors duration-300 relative"
    >
      {/* Shared site background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.03)_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none z-0" />
      <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none z-0" />
      <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl pointer-events-none z-0" />

      {/* ── LEFT PANEL ── */}
      <div className="hidden lg:flex flex-col flex-1 relative z-10 overflow-hidden">

        {/* Logo — top left */}
        <div className="p-8">
          <Link href="/" className="inline-flex items-center gap-2 font-bold text-lg">
            <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center text-white text-sm font-black">G</div>
            <span className="dark:text-white text-gray-900">Geo</span>
            <span className="text-indigo-400">SmartX</span>
          </Link>
        </div>

        {/* Center content */}
        <div className="flex-1 flex flex-col justify-center px-12 pb-12 gap-8">

          {/* Title row + diagram side by side */}
          <div className="flex items-center gap-8">
            {/* Text: 40% */}
            <div className="w-[40%] flex-shrink-0">
              <motion.h2
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-4xl font-black dark:text-white text-gray-900 leading-tight whitespace-pre-line mb-3"
              >
                {t.leftTitle}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="dark:text-gray-400 text-gray-500 text-sm leading-relaxed"
              >
                {t.leftSub}
              </motion.p>
            </div>

            {/* Diagram: 60% */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="w-[60%]"
            >
              <AnimatedMohr t={t} />
            </motion.div>
          </div>

          {/* Stats below both */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="grid grid-cols-3 gap-4"
          >
            {[
              { label: t.stat1Label, value: "18 kPa", color: "text-emerald-400" },
              { label: t.stat2Label, value: "32°",    color: "text-amber-400"   },
              { label: t.stat3Label, value: "97.4%",  color: "text-indigo-400"  },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border dark:border-white/10 border-gray-200 dark:bg-white/5 bg-white/60 backdrop-blur-sm px-5 py-5"
              >
                <p className="text-xs dark:text-gray-500 text-gray-400 mb-1">{stat.label}</p>
                <p className={`text-2xl font-black ${stat.color}`}>{stat.value}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ── RIGHT PANEL — frosted glass ── */}
      <div className="flex flex-col w-full lg:w-[420px] flex-shrink-0 relative z-10
        dark:bg-[#0F1117]/75 bg-white/75 backdrop-blur-xl
        border-l dark:border-white/10 border-gray-200
        overflow-y-auto shadow-2xl"
      >
        {/* Form — centered vertically */}
        <div className="flex-1 flex flex-col justify-center px-8 py-8">

          {/* Mobile logo */}
          <div className="flex lg:hidden items-center gap-2 font-bold text-lg mb-8">
            <div className="w-7 h-7 rounded-lg bg-indigo-500 flex items-center justify-center text-white text-xs font-black">G</div>
            <span className="dark:text-white text-gray-900">Geo</span>
            <span className="text-indigo-400">SmartX</span>
          </div>

          <motion.div {...fadeUp(0.05)} className="mb-6">
            <h1 className="text-2xl font-black dark:text-white text-gray-900 mb-1">
              {mode === "login" ? t.welcomeBack : t.welcomeNew}
            </h1>
            <p className="text-sm dark:text-gray-400 text-gray-500">
              {mode === "login" ? t.subtitleLogin : t.subtitleRegister}
            </p>
          </motion.div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-4">
            <motion.div {...fadeUp(0.1)} className="flex flex-col gap-1.5">
              <label className="text-xs font-medium dark:text-gray-400 text-gray-600">{t.email}</label>
              <div className="relative">
                <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 dark:text-gray-500 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t.emailPlaceholder}
                  required
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl border dark:border-white/10 border-gray-200 dark:bg-white/5 bg-white/80 dark:text-white text-gray-900 dark:placeholder-gray-600 placeholder-gray-400 text-sm focus:outline-none focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/20 transition-all"
                />
              </div>
            </motion.div>

            <motion.div {...fadeUp(0.15)} className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-medium dark:text-gray-400 text-gray-600">{t.password}</label>
                {mode === "login" && (
                  <button type="button" className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors">
                    {t.forgotPassword}
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 dark:text-gray-500 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={t.passwordPlaceholder}
                  required
                  className="w-full pl-9 pr-10 py-2.5 rounded-xl border dark:border-white/10 border-gray-200 dark:bg-white/5 bg-white/80 dark:text-white text-gray-900 dark:placeholder-gray-600 placeholder-gray-400 text-sm focus:outline-none focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/20 transition-all"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 dark:text-gray-500 text-gray-400 hover:text-indigo-400 transition-colors">
                  {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
            </motion.div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60 text-white font-semibold text-sm transition-all hover:shadow-lg hover:shadow-indigo-500/25"
            >
              {loading
                ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                : <>{mode === "login" ? t.loginBtn : t.registerBtn} <ArrowRight size={14} /></>
              }
            </button>
          </form>

          <div className="flex items-center gap-3 mb-4">
            <div className="flex-1 h-px dark:bg-white/10 bg-gray-200" />
            <span className="text-xs dark:text-gray-600 text-gray-400">{t.orWith}</span>
            <div className="flex-1 h-px dark:bg-white/10 bg-gray-200" />
          </div>

          <button
            onClick={() => signIn("google", { callbackUrl })}
            className="w-full flex items-center justify-center gap-3 px-4 py-2.5 rounded-xl border dark:border-white/10 border-gray-200 dark:bg-white/5 bg-white/80 dark:hover:bg-white/10 hover:bg-white dark:text-white text-gray-700 text-sm font-medium transition-all hover:shadow-sm mb-5"
          >
            <svg width="16" height="16" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
              <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853"/>
              <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
              <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
            </svg>
            {t.googleBtn}
          </button>

          {/* Switch mode */}
          <p className="text-xs dark:text-gray-500 text-gray-400 text-center mb-8">
            {mode === "login" ? t.noAccount : t.hasAccount}{" "}
            <button
              onClick={() => setMode(mode === "login" ? "register" : "login")}
              className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors"
            >
              {mode === "login" ? t.registerLink : t.loginLink}
            </button>
          </p>

          {/* Lang + theme at bottom */}
          <div className="flex items-center justify-center gap-3 pt-4 border-t dark:border-white/10 border-gray-100">
            <button
              onClick={() => setLang(lang === "fr" ? "en" : "fr")}
              className="flex items-center gap-1 text-xs dark:text-gray-500 text-gray-400 hover:text-indigo-400 px-2 py-1 rounded-lg dark:hover:bg-white/5 hover:bg-gray-100 transition-all"
            >
              <Globe size={13} />
              {lang.toUpperCase()}
            </button>
            <div className="w-px h-3 dark:bg-white/10 bg-gray-200" />
            {mounted && (
              <button
                onClick={() => setTheme(isDark ? "light" : "dark")}
                className="flex items-center gap-1 text-xs dark:text-gray-500 text-gray-400 hover:text-indigo-400 px-2 py-1 rounded-lg dark:hover:bg-white/5 hover:bg-gray-100 transition-all"
              >
                {isDark ? <Sun size={13} /> : <Moon size={13} />}
                {isDark ? "Light" : "Dark"}
              </button>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginContent />
    </Suspense>
  );
}