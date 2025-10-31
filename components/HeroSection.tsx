"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function HeroSection() {
  return (
    <section
      className="relative flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=1600&q=80')",
      }}
    >
      <div className="absolute inset-0 bg-black/70" />
      <motion.div
        className="relative text-center text-white z-10 px-4"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6">
          La experiencia gastronómica del{" "}
          <span className="text-amber-500">futuro</span>
        </h1>
        <p className="max-w-2xl mx-auto text-lg md:text-xl mb-8 text-gray-300">
          Ordena tus platillos, personalízalos y paga directamente desde tu
          mesa.
        </p>
        <Link href="/menu">
          <Button className="bg-amber-500 hover:bg-amber-400 text-black text-lg px-8 py-6 rounded-full">
            Hacer pedido ahora
          </Button>
        </Link>
      </motion.div>
    </section>
  );
}
