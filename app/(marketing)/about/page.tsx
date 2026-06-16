"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin, Users, Target, Lightbulb } from "lucide-react";
import { useLang } from "@/components/layout/LangContext";

const fadeUp = (delay = 0): HTMLMotionProps<"div"> => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay, ease: "easeOut" as const },
});

const translations = {
  fr: {
    badge: "À Propos",
    title: "L'expertise géotechnique",
    titleAccent: "alliée au digital",
    description1:
      "GeoSmartX est une startup technologique spécialisée dans le génie civil et la géotechnique. Nous développons une plateforme web innovante qui utilise l'intelligence artificielle pour prédire instantanément les paramètres mécaniques du sol et tracer les graphiques de calcul pour les bureaux d'études et les ingénieurs.",
    description2:
      "Conçu par des ingénieurs géotechniciens, notre outil supprime les tâches répétitives de traitement des données d'essais - SPT, triaxiaux, cisaillement direct - pour que vous vous concentriez sur ce qui compte : l'interpretation et la decision.",
    missionBadge: "Notre Mission",
    missionTitle: "Démocratiser l'analyse géotechnique",
    missionText:
      "Rendre les outils d'analyse geotechnique accessibles, rapides et fiables pour tous les ingenieurs - des grandes ESN aux bureaux d'etudes independants.",
    values: [
      {
        icon: Target,
        title: "Précision avant tout",
        description: "Chaque algorithme est validé par des données terrain réelles et des publications académiques.",
      },
      {
        icon: Lightbulb,
        title: "Innovation continue",
        description: "Nous intégrons les dernières avancées en ML pour améliorer constamment nos modèles de prédiction.",
      },
      {
        icon: Users,
        title: "Pensé pour les ingénieurs",
        description: "Interface conçue avec des géotechniciens de terrain pour coller exactement aux workflows réels.",
      },
    ],
    teamBadge: "L'Équipe",
    teamTitle: "Des ingénieurs qui comprennent le terrain",
    teamText:
      "Notre équipe combine expertise en géotechnique, machine learning et développement produit pour créer la plateforme que les ingénieurs méritent.",
    cta: "Tester le Simulateur",
    ctaSub: "Accès anticipé · Gratuit",
    location: "Alger, Algérie",
    founded: "Fondée en 2024",
    statsItems: [
      { value: "500+", label: "Ingénieurs inscrits" },
      { value: "12k+", label: "Analyses effectuées" },
      { value: "98%",  label: "Taux de satisfaction" },
      { value: "3",    label: "Pays couverts" },
    ],
  },
  en: {
    badge: "About Us",
    title: "Geotechnical expertise",
    titleAccent: "meets digital innovation",
    description1:
      "GeoSmartX is a tech startup specializing in civil engineering and geotechnics. We develop an innovative web platform that uses artificial intelligence to instantly predict soil mechanical parameters and generate calculation diagrams for engineering firms and consultants.",
    description2:
      "Designed by geotechnical engineers, our tool eliminates repetitive test data processing tasks - SPT, triaxial, direct shear - so you can focus on what matters: interpretation and decision-making.",
    missionBadge: "Our Mission",
    missionTitle: "Democratizing geotechnical analysis",
    missionText:
      "Making geotechnical analysis tools accessible, fast and reliable for all engineers - from large ESNs to independent consultancies.",
    values: [
      {
        icon: Target,
        title: "Precision first",
        description: "Every algorithm is validated by real field data and academic publications.",
      },
      {
        icon: Lightbulb,
        title: "Continuous innovation",
        description: "We integrate the latest ML advances to constantly improve our prediction models.",
      },
      {
        icon: Users,
        title: "Built for engineers",
        description: "Interface designed with field geotechnicians to match real-world workflows exactly.",
      },
    ],
    teamBadge: "The Team",
    teamTitle: "Engineers who understand the field",
    teamText:
      "Our team combines geotechnical expertise, machine learning and product development to create the platform engineers deserve.",
    cta: "Try the Simulator",
    ctaSub: "Early access · Free",
    location: "Algiers, Algeria",
    founded: "Founded in 2024",
    statsItems: [
      { value: "500+", label: "Registered engineers" },
      { value: "12k+", label: "Analyses completed" },
      { value: "98%",  label: "Satisfaction rate" },
      { value: "3",    label: "Countries covered" },
    ],
  },
};

export default function AboutPage() {
  const { lang } = useLang();
  const t = translations[lang];

  return (
    <main suppressHydrationWarning className="dark:bg-[#0F1117] bg-slate-50 min-h-screen transition-colors duration-300">

      {/* Background grid */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(99,102,241,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.03)_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none" />

      {/* ── Hero section ── */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute top-1/3 right-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">

          {/* Left: Text */}
          <div className="flex flex-col gap-6">
            <motion.div {...fadeUp(0.1)}>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 text-xs font-medium tracking-wide uppercase">
                {t.badge}
              </span>
            </motion.div>

            <motion.h1 {...fadeUp(0.2)} className="text-4xl md:text-5xl font-black leading-tight">
              <span className="dark:text-white text-gray-900">{t.title}</span>
              <span className="block text-indigo-400">{t.titleAccent}</span>
            </motion.h1>

            <motion.p {...fadeUp(0.3)} className="dark:text-gray-400 text-gray-600 leading-relaxed">
              {t.description1}
            </motion.p>

            <motion.p {...fadeUp(0.4)} className="dark:text-gray-400 text-gray-600 leading-relaxed">
              {t.description2}
            </motion.p>

            <motion.div {...fadeUp(0.5)} className="flex items-center gap-4 text-sm dark:text-gray-500 text-gray-400">
              <span className="flex items-center gap-1.5">
                <MapPin size={14} className="text-indigo-400" />
                {t.location}
              </span>
              <span className="w-1 h-1 rounded-full bg-gray-600" />
              <span>{t.founded}</span>
            </motion.div>
          </div>

          {/* Right: Image card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" as const }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden border dark:border-white/10 border-gray-200 shadow-2xl aspect-[4/3]">
              {/* Placeholder image — replace with real photo */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/80 via-slate-900/60 to-amber-900/40" />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                <div className="w-16 h-16 rounded-2xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center">
                  <span className="text-3xl font-black text-indigo-400">G</span>
                </div>
                <p className="text-white/60 text-sm">ESSAI EN COURS · SPT N=12</p>
                {/* Mini result card */}
                <div className="mt-2 bg-white/10 backdrop-blur-sm rounded-xl px-6 py-3 border border-white/10 flex gap-6">
                  <div className="text-center">
                    <p className="text-xs text-white/50 mb-0.5">φ</p>
                    <p className="text-amber-400 font-bold">28.4°</p>
                  </div>
                  <div className="w-px bg-white/10" />
                  <div className="text-center">
                    <p className="text-xs text-white/50 mb-0.5">c</p>
                    <p className="text-indigo-400 font-bold">12 kPa</p>
                  </div>
                  <div className="w-px bg-white/10" />
                  <div className="text-center">
                    <p className="text-xs text-white/50 mb-0.5">conf.</p>
                    <p className="text-emerald-400 font-bold">96%</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -inset-4 bg-indigo-600/5 rounded-3xl blur-2xl -z-10" />
          </motion.div>
        </div>
      </section>

      {/* ── Stats bar ── */}
      <section className="py-8 border-y dark:border-white/10 border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px dark:bg-white/10 bg-gray-200 rounded-2xl overflow-hidden">
            {t.statsItems.map((stat) => (
              <motion.div
                key={stat.value}
                {...fadeUp(0)}
                className="dark:bg-[#0F1117] bg-white px-6 py-8 text-center"
              >
                <div className="text-3xl font-black text-indigo-400 mb-1">{stat.value}</div>
                <div className="text-xs dark:text-gray-500 text-gray-500">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Mission & Values ── */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">

          <motion.div {...fadeUp(0)} className="text-center mb-14">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-400 text-xs font-medium tracking-wide uppercase mb-4">
              {t.missionBadge}
            </span>
            <h2 className="text-3xl md:text-4xl font-black dark:text-white text-gray-900 mb-4">
              {t.missionTitle}
            </h2>
            <p className="dark:text-gray-400 text-gray-600 max-w-2xl mx-auto leading-relaxed">
              {t.missionText}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {t.values.map((val, i) => {
              const Icon = val.icon;
              return (
                <motion.div
                  key={val.title}
                  {...fadeUp(i * 0.1)}
                  className="group p-6 rounded-2xl border dark:border-white/10 border-gray-200 dark:bg-white/5 bg-white hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="w-11 h-11 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-4">
                    <Icon size={20} />
                  </div>
                  <h3 className="font-bold dark:text-white text-gray-900 mb-2">{val.title}</h3>
                  <p className="text-sm dark:text-gray-400 text-gray-600 leading-relaxed">{val.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Team section ── */}
      <section className="py-20 border-t dark:border-white/10 border-gray-200">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.div {...fadeUp(0)} className="mb-12">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 text-xs font-medium tracking-wide uppercase mb-4">
              {t.teamBadge}
            </span>
            <h2 className="text-3xl md:text-4xl font-black dark:text-white text-gray-900 mb-4">
              {t.teamTitle}
            </h2>
            <p className="dark:text-gray-400 text-gray-600 max-w-xl mx-auto leading-relaxed">
              {t.teamText}
            </p>
          </motion.div>

          {/* Team member placeholders */}
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 mb-16">
            {[
              { name: "Membre 1", role: lang === "fr" ? "Fondateur & Ingénieur Géotechnicien" : "Founder & Geotechnical Engineer", initials: "M1" },
              { name: "Membre 2", role: lang === "fr" ? "Lead Développeur & ML Engineer" : "Lead Developer & ML Engineer", initials: "M2" },
              { name: "Membre 3", role: lang === "fr" ? "Ingénieur Géotechnicien Senior" : "Senior Geotechnical Engineer", initials: "M3" },
            ].map((member, i) => (
              <motion.div
                key={member.name}
                {...fadeUp(i * 0.1)}
                className="p-6 rounded-2xl border dark:border-white/10 border-gray-200 dark:bg-white/5 bg-white text-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 font-bold text-lg mx-auto mb-4">
                  {member.initials}
                </div>
                <h4 className="font-bold dark:text-white text-gray-900 mb-1">{member.name}</h4>
                <p className="text-xs dark:text-gray-500 text-gray-500">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 border-t dark:border-white/10 border-gray-200">
        <motion.div {...fadeUp(0)} className="max-w-2xl mx-auto px-6 text-center">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-400 text-xs font-medium tracking-wide uppercase mb-6">
            {t.ctaSub}
          </span>
          <h2 className="text-3xl md:text-4xl font-black dark:text-white text-gray-900 mb-8">
            {lang === "fr" ? "Prêt à optimiser vos calculs de sol ?" : "Ready to optimize your soil calculations?"}
          </h2>
          <Link
            href="/simulator"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition-all duration-200 hover:shadow-xl hover:shadow-indigo-500/30 hover:-translate-y-0.5"
          >
            {t.cta} <ArrowRight size={18} />
          </Link>
        </motion.div>
      </section>
    </main>
  );
}