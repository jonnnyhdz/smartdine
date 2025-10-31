"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { PlusCircle, MinusCircle } from "lucide-react";

interface Extra {
  id: number;
  name: string;
  price: number;
  selected: boolean;
}

interface CustomizeModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (customizedItem: any) => void;
  item: {
    id: number;
    name: string;
    price: number;
    description: string;
  };
}

export function CustomizeModal({ open, onClose, onConfirm, item }: CustomizeModalProps) {
  const [step, setStep] = useState<"choice" | "customize">("choice");

  const [extras, setExtras] = useState<Extra[]>([
    { id: 1, name: "Queso extra", price: 15, selected: false },
    { id: 2, name: "Tocino", price: 20, selected: false },
    { id: 3, name: "Sin cebolla", price: 0, selected: false },
    { id: 4, name: "Salsa picante", price: 10, selected: false },
  ]);

  const [comment, setComment] = useState("");

  const handleToggleExtra = (id: number) => {
    setExtras((prev) =>
      prev.map((extra) =>
        extra.id === id ? { ...extra, selected: !extra.selected } : extra
      )
    );
  };

  const totalExtras = extras
    .filter((e) => e.selected)
    .reduce((sum, e) => sum + e.price, 0);

  const total = item.price + totalExtras;

  if (!open) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="customize-overlay"
        className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          key="customize-modal"
          className="bg-[#111] border border-gray-800 rounded-2xl p-8 w-[90%] max-w-lg shadow-2xl text-gray-100 relative"
          onClick={(e) => e.stopPropagation()}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
        >
          <h2 className="text-2xl font-bold text-amber-500 mb-4 text-center">
            {item.name}
          </h2>

          {step === "choice" && (
            <motion.div
              className="text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p className="text-gray-300 mb-6">
                ¿Deseas agregar este platillo así como está o personalizarlo?
              </p>
              <div className="flex justify-center gap-4">
                <Button
                  onClick={() => {
                    onConfirm({ ...item, extras: [], comment });
                    onClose();
                  }}
                  className="bg-amber-500 text-black hover:bg-amber-400 px-6 py-3"
                >
                  Agregar así como está
                </Button>
                <Button
                  onClick={() => setStep("customize")}
                  className="bg-gray-800 text-gray-200 hover:bg-gray-700 px-6 py-3"
                >
                  Personalizar
                </Button>
              </div>
            </motion.div>
          )}

          {step === "customize" && (
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div>
                <h3 className="text-lg font-semibold text-amber-400 mb-3">
                  Extras disponibles
                </h3>
                <ul className="divide-y divide-gray-800">
                  {extras.map((extra) => (
                    <li
                      key={extra.id}
                      className="flex justify-between items-center py-3"
                    >
                      <span className="text-gray-300">
                        {extra.name}
                        {extra.price > 0 && (
                          <span className="text-gray-500 ml-1">
                            (+${extra.price})
                          </span>
                        )}
                      </span>
                      <button
                        onClick={() => handleToggleExtra(extra.id)}
                        className={`rounded-full p-2 border ${
                          extra.selected
                            ? "bg-amber-500 border-amber-400"
                            : "bg-transparent border-gray-700 hover:border-gray-500"
                        }`}
                      >
                        {extra.selected ? (
                          <MinusCircle className="w-5 h-5 text-black" />
                        ) : (
                          <PlusCircle className="w-5 h-5 text-amber-400" />
                        )}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-amber-400 mb-2">
                  Comentarios del cliente
                </h3>
                <textarea
                  placeholder="Ej. sin ajo, poco picante..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full bg-black/40 border border-gray-700 rounded-lg p-3 text-gray-200 placeholder-gray-500 focus:ring-2 focus:ring-amber-500 focus:outline-none resize-none"
                  rows={3}
                />
              </div>

              <div className="flex justify-between items-center border-t border-gray-700 pt-4">
                <span className="text-lg font-semibold">
                  Total:{" "}
                  <span className="text-amber-400">${total.toFixed(2)}</span>
                </span>
                <Button
                  onClick={() => {
                    const selectedExtras = extras.filter((e) => e.selected);
                    onConfirm({ ...item, extras: selectedExtras, comment, total });
                    onClose();
                  }}
                  className="bg-amber-500 text-black hover:bg-amber-400 px-6 py-3 font-semibold"
                >
                  Guardar y agregar
                </Button>
              </div>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
