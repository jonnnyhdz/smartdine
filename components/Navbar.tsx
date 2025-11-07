"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const [open, setOpen] = useState(false);

  const toggleMenu = () => setOpen((prev) => !prev);

  const navLinks = [
    { href: "#menu", label: "Menú" },
  //  { href: "#about", label: "Nosotros" },
  // { href: "#contact", label: "Contacto" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full bg-black/60 backdrop-blur-lg border-b border-gray-800 z-50">
      <nav className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        {/* === LOGO === */}
        <Link
          href="/"
          className="text-2xl font-bold text-amber-500 tracking-wide hover:text-amber-400 transition"
        >
          La Casa del Chef
        </Link>

        {/* === LINKS DESKTOP === */}
        <ul className="hidden md:flex items-center gap-10 text-gray-300">
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className="hover:text-amber-400 transition-colors duration-200"
              >
                {label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/menu"
              className="bg-amber-500 text-black font-semibold px-5 py-2.5 rounded-full hover:bg-amber-400 transition"
            >
              Hacer Pedido
            </Link>
          </li>
        </ul>

        {/* === BOTÓN HAMBURGUESA (MÓVIL) === */}
        <button
          className="md:hidden relative z-50 p-2 text-gray-200"
          onClick={toggleMenu}
          aria-label="Abrir menú"
        >
          <motion.div
            key={open ? "x" : "menu"}
            initial={{ rotate: 0, opacity: 0 }}
            animate={{ rotate: open ? 180 : 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {open ? (
              <X className="w-7 h-7 text-amber-500" />
            ) : (
              <Menu className="w-7 h-7 text-amber-500" />
            )}
          </motion.div>
        </button>
      </nav>

      {/* === MENÚ MÓVIL DESLIZANTE === */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="absolute top-full left-0 w-full bg-[#0f0f0f]/95 backdrop-blur-xl border-t border-gray-800 md:hidden"
          >
            <ul className="flex flex-col items-center gap-6 py-8 text-gray-300 text-lg font-medium">
              {navLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="hover:text-amber-400 transition-colors"
                    onClick={() => setOpen(false)}
                  >
                    {label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/menu"
                  onClick={() => setOpen(false)}
                  className="bg-amber-500 text-black font-semibold px-6 py-3 rounded-full hover:bg-amber-400 transition"
                >
                  Hacer Pedido
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
