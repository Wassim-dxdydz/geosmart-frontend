"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import Link from "next/link";
import { useLang } from "@/components/layout/LangContext";
import { Mail, ArrowUpRight } from "lucide-react";

const fadeUp = (delay = 0): HTMLMotionProps<"div"> => ({
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, delay, ease: "easeOut" as const },
});

const translations = {
  fr: {
    tagline: "La première plateforme d'intelligence prédictive dédiée au calcul des paramètres mécaniques du sol.",
    product: "Produit",
    productLinks: [
      { label: "Fonctionnalités", href: "/#features" },
      { label: "Simulateur",      href: "/simulator"  },
      { label: "Tarifs",          href: "/pricing"    },
      { label: "Documentation",   href: "/docs"       },
    ],
    company: "Entreprise",
    companyLinks: [
      { label: "À Propos",   href: "/about"   },
      { label: "Contact",    href: "/contact" },
      { label: "Blog",       href: "/blog"    },
    ],
    legal: "Légal",
    legalLinks: [
      { label: "Politique de confidentialité", href: "/privacy" },
      { label: "Conditions d'utilisation",     href: "/terms"   },
      { label: "Mentions légales",             href: "/legal"   },
    ],
    newsletter: "Restez informé",
    newsletterDesc: "Recevez les dernières mises à jour de GeoSmartX.",
    newsletterPlaceholder: "votre@email.com",
    newsletterBtn: "S'abonner",
    copyright: "Tous droits réservés.",
    madeWith: "Fait avec ❤️ par l'équipe GeoSmartX · Alger, Algérie",
    status: "Tous les systèmes opérationnels",
  },
  en: {
    tagline: "The first predictive intelligence platform dedicated to calculating soil mechanical parameters.",
    product: "Product",
    productLinks: [
      { label: "Features",      href: "/#features" },
      { label: "Simulator",     href: "/simulator"  },
      { label: "Pricing",       href: "/pricing"    },
      { label: "Documentation", href: "/docs"       },
    ],
    company: "Company",
    companyLinks: [
      { label: "About",   href: "/about"   },
      { label: "Contact", href: "/contact" },
      { label: "Blog",    href: "/blog"    },
    ],
    legal: "Legal",
    legalLinks: [
      { label: "Privacy policy",   href: "/privacy" },
      { label: "Terms of service", href: "/terms"   },
      { label: "Legal notice",     href: "/legal"   },
    ],
    newsletter: "Stay updated",
    newsletterDesc: "Get the latest updates from GeoSmartX.",
    newsletterPlaceholder: "your@email.com",
    newsletterBtn: "Subscribe",
    copyright: "All rights reserved.",
    madeWith: "Made with ❤️ by the GeoSmartX team · Algiers, Algeria",
    status: "All systems operational",
  },
};

function GithubIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

function LinkedinIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  );
}

function XIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.91-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export default function Footer() {
  const { lang } = useLang();
  const t = translations[lang];
  const year = new Date().getFullYear();

  return (
    <footer className="relative dark:bg-[#0F1117] bg-slate-50 border-t dark:border-white/10 border-gray-200 transition-colors duration-300 overflow-hidden">
      {/* Subtle top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-20 bg-gradient-to-b from-indigo-500/40 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">

        {/* ── Main grid ── */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">

          {/* Brand — takes 2 cols */}
          <motion.div {...fadeUp(0)} className="lg:col-span-2 flex flex-col gap-5">
            {/* Logo */}
            <Link href="/" className="inline-flex items-center gap-2 font-bold text-xl w-fit">
              <div className="w-9 h-9 rounded-xl bg-indigo-500 flex items-center justify-center text-white text-sm font-black shadow-lg shadow-indigo-500/25">
                G
              </div>
              <span className="dark:text-white text-gray-900">Geo</span>
              <span className="text-indigo-400">SmartX</span>
            </Link>

            {/* Tagline */}
            <p className="dark:text-gray-400 text-gray-600 text-sm leading-relaxed max-w-xs">
              {t.tagline}
            </p>

            {/* Social links */}
            <div className="flex items-center gap-3">
              {[
                { icon: GithubIcon,   href: "https://github.com",        label: "GitHub"   },
                { icon: LinkedinIcon, href: "https://linkedin.com",       label: "LinkedIn" },
                { icon: XIcon,        href: "https://x.com",              label: "X"        },
                { icon: Mail,         href: "mailto:contact@geosmart.dz", label: "Email"    },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-xl border dark:border-white/10 border-gray-200 dark:bg-white/5 bg-white flex items-center justify-center dark:text-gray-400 text-gray-500 hover:text-indigo-400 dark:hover:border-indigo-500/40 hover:border-indigo-300 hover:shadow-sm transition-all duration-200"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>

            {/* Status badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border dark:border-emerald-500/20 border-emerald-200 dark:bg-emerald-500/5 bg-emerald-50 w-fit">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs text-emerald-500 font-medium">{t.status}</span>
            </div>
          </motion.div>

          {/* Product links */}
          <motion.div {...fadeUp(0.1)}>
            <h4 className="text-xs font-bold dark:text-white text-gray-900 uppercase tracking-widest mb-4">
              {t.product}
            </h4>
            <ul className="flex flex-col gap-2.5">
              {t.productLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm dark:text-gray-400 text-gray-500 hover:text-indigo-400 transition-colors flex items-center gap-1 group"
                  >
                    {link.label}
                    {link.href.startsWith("http") && (
                      <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Company links */}
          <motion.div {...fadeUp(0.15)}>
            <h4 className="text-xs font-bold dark:text-white text-gray-900 uppercase tracking-widest mb-4">
              {t.company}
            </h4>
            <ul className="flex flex-col gap-2.5">
              {t.companyLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm dark:text-gray-400 text-gray-500 hover:text-indigo-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Newsletter */}
          <motion.div {...fadeUp(0.2)}>
            <h4 className="text-xs font-bold dark:text-white text-gray-900 uppercase tracking-widest mb-4">
              {t.newsletter}
            </h4>
            <p className="text-sm dark:text-gray-400 text-gray-500 mb-4 leading-relaxed">
              {t.newsletterDesc}
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-col gap-2"
            >
              <input
                type="email"
                placeholder={t.newsletterPlaceholder}
                className="w-full px-3 py-2.5 rounded-xl border dark:border-white/10 border-gray-200 dark:bg-white/5 bg-white dark:text-white text-gray-900 dark:placeholder-gray-600 placeholder-gray-400 text-sm focus:outline-none focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/20 transition-all"
              />
              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold transition-all hover:shadow-lg hover:shadow-indigo-500/20"
              >
                {t.newsletterBtn}
              </button>
            </form>
          </motion.div>
        </div>

        {/* ── Divider ── */}
        <div className="h-px dark:bg-white/10 bg-gray-200" />

        {/* ── Bottom bar ── */}
        <motion.div
          {...fadeUp(0.1)}
          className="py-6 flex flex-col sm:flex-row items-center justify-between gap-3"
        >
          <p className="text-xs dark:text-gray-500 text-gray-400">
            © {year} GeoSmartX. {t.copyright}
          </p>

          <p className="text-xs dark:text-gray-600 text-gray-400">
            {t.madeWith}
          </p>

          {/* Legal links */}
          <div className="flex items-center gap-4">
            {t.legalLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-xs dark:text-gray-500 text-gray-400 hover:text-indigo-400 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  );
}