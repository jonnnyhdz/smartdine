"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

interface Extra {
  id: number;
  name: string;
  price: number;
}

interface Item {
  id: number;
  name: string;
  price: number;
  time: number;
  extras?: Extra[];
  comment?: string;
}

interface OrderModalProps {
  open: boolean;
  onClose: () => void;
  items: Item[];
  onConfirm: () => void;
}

export function OrderModal({ open, onClose, items, onConfirm }: OrderModalProps) {
  if (!open) return null;

  // Calcular total de cada platillo con sus extras
  const calculateItemTotal = (item: Item) => {
    const extrasTotal = item.extras?.reduce((sum, ex) => sum + ex.price, 0) || 0;
    return item.price + extrasTotal;
  };

  const total = items.reduce((sum, i) => sum + calculateItemTotal(i), 0);
  const totalTime = items.reduce((sum, i) => sum + (i.time || 10), 0);

  return (
    <AnimatePresence>
      <motion.div
        key="overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          key="modal"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", stiffness: 120 }}
          className="bg-[#111] text-gray-100 rounded-2xl p-8 w-full max-w-lg mx-4 shadow-2xl border border-gray-800 relative"
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="text-3xl font-bold text-amber-500 mb-4 text-center">
            Resumen del pedido
          </h2>

          {items.length === 0 ? (
            <p className="text-center text-gray-400">Aún no has agregado nada 🍽️</p>
          ) : (
            <>
              <ul className="divide-y divide-gray-800 mb-4 max-h-64 overflow-y-auto pr-1">
                {items.map((item, index) => (
                  <li key={index} className="py-3 text-gray-300">
                    <div className="flex justify-between">
                      <div>
                        <p className="font-semibold text-white">{item.name}</p>
                        <p className="text-sm text-gray-500">
                          ⏱️ {item.time || 10} min
                        </p>
                      </div>
                      <span className="font-semibold text-amber-400">
                        ${calculateItemTotal(item).toFixed(2)}
                      </span>
                    </div>

                    {/* Extras */}
                    {item.extras && item.extras.length > 0 && (
                      <ul className="ml-4 mt-2 text-gray-400 text-sm list-disc space-y-1">
                        {item.extras.map((ex) => (
                          <li key={ex.id}>
                            {ex.name}{" "}
                            {ex.price > 0 && (
                              <span className="text-amber-400">
                                (+${ex.price})
                              </span>
                            )}
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Comentarios */}
                    {item.comment && (
                      <p className="ml-4 mt-1 text-xs italic text-gray-500">
                        “{item.comment}”
                      </p>
                    )}
                  </li>
                ))}
              </ul>

              <div className="flex justify-between text-lg font-semibold border-t border-gray-700 pt-3 mb-6">
                <span>Total</span>
                <span className="text-amber-400">${total.toFixed(2)}</span>
              </div>

              <p className="text-sm text-gray-400 text-center mb-6">
                Tiempo estimado total:{" "}
                <span className="text-white">{totalTime} minutos</span>
              </p>

              <div className="flex justify-center gap-4">
                <Button
                  onClick={onClose}
                  variant="secondary"
                  className="bg-gray-800 text-gray-200 hover:bg-gray-700"
                >
                  Cancelar
                </Button>
                <Button
                  onClick={() => {
                    onConfirm();
                    onClose();
                  }}
                  className="bg-amber-500 text-black hover:bg-amber-400 font-semibold"
                >
                  Confirmar pedido
                </Button>
              </div>
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
