"use client";

import { signIn } from "next-auth/react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { useLang } from "@/components/layout/LangContext";
import { Suspense } from "react";

const fadeUp = (delay = 0): HTMLMotionProps<"div"> => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: "easeOut" as const },
});

function LoginContent() {
  const { lang } = useLang();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/simulator";

  const t = {
    fr: {
      badge: "Accès Sécurisé",
      title: "Connectez-vous à",
      subtitle: "Accédez au simulateur géotechnique le plus avancé d'Algérie.",
      google: "Continuer avec Google",
      terms: "En vous connectant, vous acceptez nos",
      termsLink: "conditions d'utilisation",
      free: "1 mois gratuit · Aucune carte requise",
    },
    en: {
      badge: "Secure Access",
      title: "Sign in to",
      subtitle: "Access the most advanced geotechnical simulator.",
      google: "Continue with Google",
      terms: "By signing in, you agree to our",
      termsLink: "terms of service",
      free: "1 month free · No card required",
    },
  }[lang];

  return (
    <main className="min-h-screen dark:bg-[#0F1117] bg-slate-50 flex items-center justify-center px-4 transition-colors duration-300">
      {/* Background grid */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(99,102,241,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.03)_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none" />
      <div className="fixed top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      <motion.div {...fadeUp(0.1)} className="relative w-full max-w-md">
        <div className="rounded-2xl border dark:border-white/10 border-gray-200 dark:bg-white/5 bg-white backdrop-blur-sm p-8 shadow-2xl">

          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-indigo-500 flex items-center justify-center text-white text-2xl font-black mb-4 shadow-lg shadow-indigo-500/25">
              G
            </div>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 text-xs font-medium tracking-wide uppercase mb-3">
              {t.badge}
            </span>
            <h1 className="text-2xl font-black dark:text-white text-gray-900 text-center">
              {t.title}{" "}
              <span className="text-indigo-400">GeoSmartX</span>
            </h1>
            <p className="text-sm dark:text-gray-400 text-gray-600 text-center mt-2 leading-relaxed">
              {t.subtitle}
            </p>
          </div>

          {/* Free trial badge */}
          <div className="flex items-center justify-center gap-2 mb-6 px-4 py-2 rounded-xl dark:bg-emerald-500/10 bg-emerald-50 border dark:border-emerald-500/20 border-emerald-200">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs text-emerald-500 font-medium">{t.free}</span>
          </div>

          {/* Google sign in button */}
          <button
            onClick={() => signIn("google", { callbackUrl })}
            className="w-full flex items-center justify-center gap-3 px-6 py-3.5 rounded-xl border dark:border-white/10 border-gray-200 dark:bg-white/5 bg-white dark:hover:bg-white/10 hover:bg-gray-50 dark:text-white text-gray-900 font-semibold text-sm transition-all duration-200 hover:shadow-md group"
          >
            {/* Google SVG icon */}
            <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
              <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853"/>
              <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
              <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
            </svg>
            {t.google}
          </button>

          {/* Terms */}
          <p className="text-xs dark:text-gray-600 text-gray-400 text-center mt-4">
            {t.terms}{" "}
            <span className="dark:text-gray-400 text-gray-600 underline cursor-pointer hover:text-indigo-400 transition-colors">
              {t.termsLink}
            </span>
          </p>
        </div>

        <div className="absolute -inset-4 bg-indigo-600/5 rounded-3xl blur-2xl -z-10" />
      </motion.div>
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