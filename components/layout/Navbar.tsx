"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon, Globe } from "lucide-react";
import Link from "next/link";

const navLinks = {
  fr: [
    { label: "Fonctionnalités", href: "#features" },
    { label: "À Propos", href: "/about" },
    { label: "Documentation", href: "/docs" },
  ],
  en: [
    { label: "Features", href: "#features" },
    { label: "About", href: "/about" },
    { label: "Documentation", href: "/docs" },
  ],
};

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [lang, setLang] = useState<"fr" | "en">("fr");
  const [dark, setDark] = useState(true);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  const links = navLinks[lang];

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0F1117]/90 backdrop-blur-md border-b border-white/10 shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center text-white text-sm font-black">
            G
          </div>
          <span className="text-white">Geo</span>
          <span className="text-indigo-400">SmartX</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm text-gray-300 hover:text-white transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right controls */}
        <div className="hidden md:flex items-center gap-3">
          {/* Lang switcher */}
          <button
            onClick={() => setLang(lang === "fr" ? "en" : "fr")}
            className="flex items-center gap-1 text-xs text-gray-400 hover:text-white transition-colors px-2 py-1 rounded-md hover:bg-white/10"
          >
            <Globe size={14} />
            {lang.toUpperCase()}
          </button>

          {/* Theme toggle */}
          <button
            onClick={() => setDark(!dark)}
            className="p-2 rounded-md text-gray-400 hover:text-white hover:bg-white/10 transition-all"
          >
            {dark ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          {/* CTA */}
          <Link
            href="/simulator"
            className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition-all duration-200 hover:shadow-lg hover:shadow-indigo-500/25"
          >
            {lang === "fr" ? "Tester la Bêta" : "Try Beta"}
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-gray-300 hover:text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#0F1117]/95 backdrop-blur-md border-t border-white/10"
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {links.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex items-center gap-3 pt-2 border-t border-white/10">
                <button
                  onClick={() => setLang(lang === "fr" ? "en" : "fr")}
                  className="text-xs text-gray-400 hover:text-white flex items-center gap-1"
                >
                  <Globe size={14} /> {lang.toUpperCase()}
                </button>
                <button
                  onClick={() => setDark(!dark)}
                  className="text-gray-400 hover:text-white"
                >
                  {dark ? <Sun size={16} /> : <Moon size={16} />}
                </button>
              </div>
              <Link
                href="/simulator"
                className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium text-center"
              >
                {lang === "fr" ? "Tester la Bêta" : "Try Beta"}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}