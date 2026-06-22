"use client";

import { useState } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { Check, X, Zap, Building2, GraduationCap } from "lucide-react";
import Link from "next/link";
import { useLang } from "@/components/layout/LangContext";

const fadeUp = (delay = 0): HTMLMotionProps<"div"> => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, delay, ease: "easeOut" as const },
});

const translations = {
  fr: {
    badge: "Tarifs",
    title: "Simple, transparent,",
    titleAccent: "sans surprise",
    subtitle: "Commencez gratuitement pendant 1 mois. Aucune carte bancaire requise.",
    monthly: "Mensuel",
    yearly: "Annuel",
    yearlyDiscount: "-20%",
    popular: "Le plus populaire",
    getStarted: "Commencer gratuitement",
    subscribe: "S'abonner",
    contactUs: "Nous contacter",
    perMonth: "/ mois",
    perYear: "/ an",
    freeMonth: "1 mois gratuit inclus",
    plans: [
      {
        id: "starter",
        icon: GraduationCap,
        name: "Starter",
        desc: "Pour les étudiants et les essais personnels.",
        monthlyPrice: 0,
        yearlyPrice: 0,
        color: "indigo",
        popular: false,
        cta: "Commencer gratuitement",
        features: [
          { text: "10 analyses / mois",           included: true  },
          { text: "Essais UU uniquement",          included: true  },
          { text: "Export PDF basique",            included: true  },
          { text: "Diagramme Mohr-Coulomb",        included: true  },
          { text: "Essais CU et CD",               included: false },
          { text: "Export Excel",                  included: false },
          { text: "Historique des projets",        included: false },
          { text: "Support prioritaire",           included: false },
        ],
      },
      {
        id: "pro",
        icon: Zap,
        name: "Pro",
        desc: "Pour les bureaux d'études et ingénieurs indépendants.",
        monthlyPrice: 2900,
        yearlyPrice: 27840,
        color: "indigo",
        popular: true,
        cta: "S'abonner",
        features: [
          { text: "Analyses illimitées",           included: true  },
          { text: "Tous les types d'essais",       included: true  },
          { text: "Export PDF & Excel natif",      included: true  },
          { text: "Diagramme Mohr-Coulomb",        included: true  },
          { text: "Essais CU et CD",               included: true  },
          { text: "Historique des projets",        included: true  },
          { text: "Export Excel",                  included: true  },
          { text: "Support prioritaire",           included: false },
        ],
      },
      {
        id: "enterprise",
        icon: Building2,
        name: "Entreprise",
        desc: "Pour les grandes ESN et laboratoires géotechniques.",
        monthlyPrice: null,
        yearlyPrice: null,
        color: "amber",
        popular: false,
        cta: "Nous contacter",
        features: [
          { text: "Tout du plan Pro",              included: true  },
          { text: "Utilisateurs illimités",        included: true  },
          { text: "API REST dédiée",               included: true  },
          { text: "Intégration sur mesure",        included: true  },
          { text: "SLA garanti 99.9%",             included: true  },
          { text: "Support dédié 24/7",            included: true  },
          { text: "Formation équipe",              included: true  },
          { text: "Facturation personnalisée",     included: true  },
        ],
      },
    ],
    faqTitle: "Questions fréquentes",
    faqs: [
      {
        q: "Est-ce que le mois gratuit nécessite une carte bancaire ?",
        a: "Non. Vous pouvez utiliser GeoSmartX gratuitement pendant 1 mois complet sans renseigner aucune information de paiement.",
      },
      {
        q: "Puis-je changer de plan à tout moment ?",
        a: "Oui. Vous pouvez upgrader ou downgrader votre plan à tout moment. Le changement prend effet immédiatement.",
      },
      {
        q: "Les prix sont-ils en DZD ?",
        a: "Oui, tous les prix sont en Dinars Algériens (DZD). Des options de paiement international seront disponibles prochainement.",
      },
      {
        q: "Que se passe-t-il après le mois gratuit ?",
        a: "Votre compte passe automatiquement en plan Starter (gratuit limité). Vous choisissez ensuite si vous souhaitez passer au plan Pro.",
      },
    ],
    currency: "DZD",
  },
  en: {
    badge: "Pricing",
    title: "Simple, transparent,",
    titleAccent: "no surprises",
    subtitle: "Start free for 1 month. No credit card required.",
    monthly: "Monthly",
    yearly: "Yearly",
    yearlyDiscount: "-20%",
    popular: "Most popular",
    getStarted: "Get started free",
    subscribe: "Subscribe",
    contactUs: "Contact us",
    perMonth: "/ month",
    perYear: "/ year",
    freeMonth: "1 free month included",
    plans: [
      {
        id: "starter",
        icon: GraduationCap,
        name: "Starter",
        desc: "For students and personal use.",
        monthlyPrice: 0,
        yearlyPrice: 0,
        color: "indigo",
        popular: false,
        cta: "Get started free",
        features: [
          { text: "10 analyses / month",           included: true  },
          { text: "UU tests only",                 included: true  },
          { text: "Basic PDF export",              included: true  },
          { text: "Mohr-Coulomb diagram",          included: true  },
          { text: "CU and CD tests",               included: false },
          { text: "Excel export",                  included: false },
          { text: "Project history",               included: false },
          { text: "Priority support",              included: false },
        ],
      },
      {
        id: "pro",
        icon: Zap,
        name: "Pro",
        desc: "For engineering firms and independent consultants.",
        monthlyPrice: 2900,
        yearlyPrice: 27840,
        color: "indigo",
        popular: true,
        cta: "Subscribe",
        features: [
          { text: "Unlimited analyses",            included: true  },
          { text: "All test types",                included: true  },
          { text: "Native PDF & Excel export",     included: true  },
          { text: "Mohr-Coulomb diagram",          included: true  },
          { text: "CU and CD tests",               included: true  },
          { text: "Project history",               included: true  },
          { text: "Excel export",                  included: true  },
          { text: "Priority support",              included: false },
        ],
      },
      {
        id: "enterprise",
        icon: Building2,
        name: "Enterprise",
        desc: "For large engineering firms and geotechnical labs.",
        monthlyPrice: null,
        yearlyPrice: null,
        color: "amber",
        popular: false,
        cta: "Contact us",
        features: [
          { text: "Everything in Pro",             included: true  },
          { text: "Unlimited users",               included: true  },
          { text: "Dedicated REST API",            included: true  },
          { text: "Custom integration",            included: true  },
          { text: "99.9% SLA guarantee",           included: true  },
          { text: "24/7 dedicated support",        included: true  },
          { text: "Team training",                 included: true  },
          { text: "Custom billing",                included: true  },
        ],
      },
    ],
    faqTitle: "Frequently asked questions",
    faqs: [
      {
        q: "Does the free month require a credit card?",
        a: "No. You can use GeoSmartX free for a full month without entering any payment information.",
      },
      {
        q: "Can I change my plan at any time?",
        a: "Yes. You can upgrade or downgrade your plan at any time. The change takes effect immediately.",
      },
      {
        q: "What currency are prices in?",
        a: "Prices are in Algerian Dinars (DZD). International payment options will be available soon.",
      },
      {
        q: "What happens after the free month?",
        a: "Your account automatically switches to the free Starter plan. You then choose whether to upgrade to Pro.",
      },
    ],
    currency: "DZD",
  },
};

const colorMap = {
  indigo: {
    icon: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
    badge: "bg-indigo-500 text-white",
    ring: "ring-2 ring-indigo-500/50",
    btn: "bg-indigo-600 hover:bg-indigo-500 text-white hover:shadow-lg hover:shadow-indigo-500/25",
    price: "text-indigo-400",
  },
  amber: {
    icon: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    badge: "bg-amber-500 text-white",
    ring: "ring-2 ring-amber-500/30",
    btn: "bg-amber-500 hover:bg-amber-400 text-white hover:shadow-lg hover:shadow-amber-500/25",
    price: "text-amber-400",
  },
};

export default function Pricing({ standalone = false }: { standalone?: boolean }) {
  const { lang } = useLang();
  const t = translations[lang];
  const [yearly, setYearly] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const formatPrice = (price: number | null) => {
    if (price === null) return lang === "fr" ? "Sur devis" : "Custom";
    if (price === 0) return lang === "fr" ? "Gratuit" : "Free";
    return `${price.toLocaleString()} ${t.currency}`;
  };

  return (
    <section
      id="pricing"
      className={`relative py-24 dark:bg-[#0F1117] bg-slate-50 transition-colors duration-300 overflow-hidden ${standalone ? "min-h-screen pt-32" : ""}`}
    >
      <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-indigo-600/8 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6">

        {/* ── Header ── */}
        <motion.div {...fadeUp(0)} className="text-center mb-12">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 text-xs font-medium tracking-wide uppercase mb-4">
            {t.badge}
          </span>
          <h2 className="text-4xl md:text-5xl font-black dark:text-white text-gray-900 mb-4">
            {t.title}{" "}
            <span className="text-indigo-400">{t.titleAccent}</span>
          </h2>
          <p className="dark:text-gray-400 text-gray-600 max-w-xl mx-auto text-base">
            {t.subtitle}
          </p>

          {/* Toggle */}
          <div className="flex items-center justify-center gap-3 mt-6">
            <span className={`text-sm font-medium transition-colors ${!yearly ? "dark:text-white text-gray-900" : "dark:text-gray-500 text-gray-400"}`}>
              {t.monthly}
            </span>
            <button
              onClick={() => setYearly(!yearly)}
              title={yearly ? t.monthly : t.yearly}
              aria-label={yearly ? t.monthly : t.yearly}
              className={`relative w-12 h-6 rounded-full transition-all duration-300 ${yearly ? "bg-indigo-600" : "dark:bg-white/10 bg-gray-200"}`}
            >
              <span className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all duration-300 ${yearly ? "left-7" : "left-1"}`} />
            </button>
            <span className={`text-sm font-medium transition-colors ${yearly ? "dark:text-white text-gray-900" : "dark:text-gray-500 text-gray-400"}`}>
              {t.yearly}
            </span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold">
              {t.yearlyDiscount}
            </span>
          </div>
        </motion.div>

        {/* ── Plans ── */}
        <div className="grid md:grid-cols-3 gap-6 mb-20">
          {t.plans.map((plan, i) => {
            const Icon = plan.icon;
            const colors = colorMap[plan.color as keyof typeof colorMap];
            const price = yearly ? plan.yearlyPrice : plan.monthlyPrice;

            return (
              <motion.div
                key={plan.id}
                {...fadeUp(i * 0.1)}
                className={`relative rounded-2xl border dark:border-white/10 border-gray-200 dark:bg-white/5 bg-white p-6 flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${plan.popular ? colors.ring : ""}`}
              >
                {/* Popular badge */}
                {plan.popular && (
                  <div className={`absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-bold ${colors.badge}`}>
                    {t.popular}
                  </div>
                )}

                {/* Plan header */}
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-10 h-10 rounded-xl border flex items-center justify-center ${colors.icon}`}>
                    <Icon size={18} />
                  </div>
                </div>

                <h3 className="text-lg font-black dark:text-white text-gray-900 mb-1">{plan.name}</h3>
                <p className="text-xs dark:text-gray-500 text-gray-400 mb-5 leading-relaxed">{plan.desc}</p>

                {/* Price */}
                <div className="mb-5">
                  <div className={`text-3xl font-black mb-0.5 ${price === 0 ? "text-emerald-400" : price === null ? colors.price : "dark:text-white text-gray-900"}`}>
                    {formatPrice(price)}
                  </div>
                  {price !== null && price !== 0 && (
                    <p className="text-xs dark:text-gray-500 text-gray-400">
                      {yearly ? t.perYear : t.perMonth}
                    </p>
                  )}
                  {price === 0 && (
                    <p className="text-xs text-emerald-500 mt-0.5">{t.freeMonth}</p>
                  )}
                </div>

                {/* CTA */}
                <Link
                  href={plan.id === "enterprise" ? "/contact" : plan.id === "starter" ? "/login" : "/login"}
                  className={`w-full py-2.5 rounded-xl text-sm font-semibold text-center transition-all duration-200 mb-6 block ${colors.btn}`}
                >
                  {plan.cta}
                </Link>

                {/* Divider */}
                <div className="h-px dark:bg-white/10 bg-gray-100 mb-5" />

                {/* Features */}
                <ul className="flex flex-col gap-2.5 flex-1">
                  {plan.features.map((f) => (
                    <li key={f.text} className="flex items-center gap-2.5 text-sm">
                      {f.included
                        ? <Check size={15} className="text-emerald-400 flex-shrink-0" />
                        : <X size={15} className="dark:text-gray-600 text-gray-300 flex-shrink-0" />
                      }
                      <span className={f.included ? "dark:text-gray-300 text-gray-700" : "dark:text-gray-600 text-gray-400"}>
                        {f.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>

        {/* ── FAQ ── */}
        <motion.div {...fadeUp(0.2)} className="max-w-2xl mx-auto">
          <h3 className="text-2xl font-black dark:text-white text-gray-900 text-center mb-8">
            {t.faqTitle}
          </h3>
          <div className="flex flex-col gap-3">
            {t.faqs.map((faq, i) => (
              <div
                key={i}
                className="rounded-xl border dark:border-white/10 border-gray-200 dark:bg-white/5 bg-white overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left"
                >
                  <span className="text-sm font-semibold dark:text-white text-gray-900 pr-4">{faq.q}</span>
                  <span className={`text-lg dark:text-gray-400 text-gray-500 flex-shrink-0 transition-transform duration-200 ${openFaq === i ? "rotate-45" : ""}`}>
                    +
                  </span>
                </button>
                {openFaq === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="px-5 pb-4"
                  >
                    <p className="text-sm dark:text-gray-400 text-gray-600 leading-relaxed">{faq.a}</p>
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}