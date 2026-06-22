"use client";

import { useSession, signOut } from "next-auth/react";
import { LogIn, LogOut } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function AuthButton({ lang = "fr" }: { lang?: "fr" | "en" }) {
  const { data: session, status } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);

  if (status === "loading") {
    return <div className="w-8 h-8 rounded-full dark:bg-white/10 bg-gray-200 animate-pulse" />;
  }

  if (session?.user) {
    return (
      <div className="relative">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex items-center gap-2 p-1 rounded-full hover:ring-2 hover:ring-indigo-500/50 transition-all"
        >
          {session.user.image ? (
            <Image
              src={session.user.image}
              alt={session.user.name ?? "User"}
              width={32}
              height={32}
              className="rounded-full"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white text-xs font-bold">
              {session.user.name?.[0]?.toUpperCase() ?? "U"}
            </div>
          )}
        </button>

        {menuOpen && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setMenuOpen(false)} />
            <div className="absolute right-0 top-10 z-50 w-56 rounded-xl border dark:border-white/10 border-gray-200 dark:bg-[#0F1117] bg-white shadow-xl overflow-hidden">
              <div className="px-4 py-3 border-b dark:border-white/10 border-gray-100">
                <p className="text-sm font-semibold dark:text-white text-gray-900 truncate">
                  {session.user.name}
                </p>
                <p className="text-xs dark:text-gray-500 text-gray-400 truncate">
                  {session.user.email}
                </p>
              </div>
              <Link
                href="/simulator"
                onClick={() => setMenuOpen(false)}
                className="w-full flex items-center gap-2 px-4 py-3 text-sm dark:text-gray-300 text-gray-600 dark:hover:bg-white/5 hover:bg-gray-50 transition-colors"
              >
                {lang === "fr" ? "Aller au simulateur" : "Go to simulator"}
              </Link>
              <button
                onClick={() => { setMenuOpen(false); signOut({ callbackUrl: "/" }); }}
                className="w-full flex items-center gap-2 px-4 py-3 text-sm text-rose-400 dark:hover:bg-white/5 hover:bg-gray-50 transition-colors border-t dark:border-white/10 border-gray-100"
              >
                <LogOut size={15} />
                {lang === "fr" ? "Se déconnecter" : "Sign out"}
              </button>
            </div>
          </>
        )}
      </div>
    );
  }

  // Not logged in — go to /login page
  return (
    <Link
      href="/login"
      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition-all duration-200 hover:shadow-lg hover:shadow-indigo-500/25"
    >
      <LogIn size={15} />
      {lang === "fr" ? "Connexion" : "Sign in"}
    </Link>
  );
}