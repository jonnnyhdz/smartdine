"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu } from "lucide-react";

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full bg-black/60 backdrop-blur-md border-b border-gray-800 z-50">
      <nav className="flex justify-between items-center px-6 py-4 max-w-6xl mx-auto">
        <Link href="/" className="text-2xl font-bold text-amber-500">
          La Casa del Chef
        </Link>

        <button className="md:hidden" onClick={() => setOpen(!open)}>
          <Menu className="text-white" />
        </button>

        <ul
          className={`md:flex gap-8 text-gray-300 ${
            open ? "block mt-4 space-y-4" : "hidden md:block"
          }`}
        >
          <li>
            <Link href="#menu" className="hover:text-amber-400">
              Menú
            </Link>
          </li>
          <li>
            <Link href="#about" className="hover:text-amber-400">
              Nosotros
            </Link>
          </li>
          <li>
            <Link href="#contact" className="hover:text-amber-400">
              Contacto
            </Link>
          </li>
          <li>
            <Link
              href="/menu"
              className="bg-amber-500 px-5 py-2 rounded-md text-black font-semibold hover:bg-amber-400"
            >
              Hacer Pedido
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
