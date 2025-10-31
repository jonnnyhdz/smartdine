"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { motion } from "framer-motion";

interface Item {
  id: number;
  name: string;
  price: number;
  time: number;
}

interface OrderSummaryProps {
  items: Item[];
  onFinishMeal: () => void;
}

export function OrderSummary({ items, onFinishMeal }: OrderSummaryProps) {
  const [confirmed, setConfirmed] = useState(false);
  const total = items.reduce((sum, i) => sum + i.price, 0);
  const totalTime = items.reduce((sum, i) => sum + i.time, 0);

  const handleConfirm = () => {
    if (items.length === 0) {
      alert("Selecciona al menos un platillo antes de continuar 🍽️");
      return;
    }
    setConfirmed(true);
  };

  if (confirmed) {
    return (
      <motion.div
        className="bg-black/60 rounded-xl shadow-lg border border-gray-800 p-8 mt-10 max-w-3xl mx-auto text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <h2 className="text-3xl font-bold text-amber-500 mb-4">
          ¡Pedido confirmado! 🍽️
        </h2>
        <p className="text-gray-300 mb-4">
          Tu pedido llegará en aproximadamente{" "}
          <span className="font-semibold text-white">{totalTime} minutos</span>,
          considerando los tiempos de preparación de tus platillos.
        </p>
        <p className="text-gray-400 mb-8">
          Disfruta de tu comida. Cuando termines, podrás proceder con el pago.
        </p>
        <Button
          className="bg-amber-500 text-black hover:bg-amber-400 text-lg px-8 py-4 rounded-full"
          onClick={onFinishMeal}
        >
          Terminé de comer, proceder al pago
        </Button>
      </motion.div>
    );
  }

  return (
    <div className="bg-black/60 rounded-xl shadow-lg border border-gray-800 p-6 mt-10 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-amber-500 text-center">
        Resumen del pedido
      </h2>

      {items.length === 0 ? (
        <p className="text-gray-400 text-center">
          Aún no has agregado platillos a tu pedido.
        </p>
      ) : (
        <>
          <ul className="divide-y divide-gray-800 mb-4">
            {items.map((item) => (
              <li
                key={item.id}
                className="flex justify-between py-3 text-gray-200"
              >
                <span>{item.name}</span>
                <span className="font-semibold">${item.price}</span>
              </li>
            ))}
          </ul>

          <div className="flex justify-between text-lg font-semibold text-white border-t border-gray-700 pt-4">
            <span>Total</span>
            <span>${total}</span>
          </div>

          <div className="text-center mt-8">
            <Button
              onClick={handleConfirm}
              className="bg-amber-500 text-black hover:bg-amber-400 text-lg px-8 py-6 rounded-full"
            >
              Confirmar pedido
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
