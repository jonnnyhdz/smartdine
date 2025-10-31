"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  CreditCard,
  Wallet,
  HandCoins,
  CheckCircle2,
  SmartphoneNfc,
  Loader2,
} from "lucide-react";

interface Item {
  id: number;
  name: string;
  price: number;
}

interface PaymentOptionsProps {
  onFinish: () => void;
  orderItems?: Item[];
}

export function PaymentOptions({ onFinish, orderItems = [] }: PaymentOptionsProps) {
  const [method, setMethod] = useState<"none" | "cash" | "card">("none");
  const [processing, setProcessing] = useState(false);
  const [done, setDone] = useState(false);

  const [askTip, setAskTip] = useState(false);
  const [addTip, setAddTip] = useState<boolean | null>(null);
  const [selectedTip, setSelectedTip] = useState<number | null>(null);
  const [customModal, setCustomModal] = useState(false);
  const [customValue, setCustomValue] = useState("");

  const subtotal = orderItems.reduce((sum, i) => sum + i.price, 0);
  const tipAmount = selectedTip ? (subtotal * selectedTip) / 100 : 0;
  const total = subtotal + tipAmount;

  const handlePay = (type: "cash" | "card") => {
    setMethod(type);
    if (type === "card" && (addTip === false || selectedTip !== null)) {
      setProcessing(true);
      setTimeout(() => {
        setProcessing(false);
        setDone(true);
      }, 3000);
    } else if (type === "cash") {
      setDone(true);
    }
  };

  return (
    <motion.div
      className="text-center max-w-3xl mx-auto bg-[#121212]/80 border border-gray-800 p-10 rounded-2xl mt-12 backdrop-blur-md shadow-xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h2 className="text-3xl font-bold text-amber-500 mb-6">
        Método de pago
      </h2>

      {/* === Etapa 1: Elegir método === */}
      {method === "none" && !done && (
        <>
          <p className="text-gray-300 mb-8 text-lg">
            Selecciona cómo deseas realizar tu pago:
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Button
              onClick={() => handlePay("cash")}
              className="flex items-center justify-center gap-3 bg-amber-500 text-black hover:bg-amber-400 text-lg px-8 py-4 rounded-xl transition"
            >
              <Wallet className="w-5 h-5" />
              Efectivo
            </Button>

            <Button
              onClick={() => setMethod("card")}
              className="flex items-center justify-center gap-3 bg-amber-500 text-black hover:bg-amber-400 text-lg px-8 py-4 rounded-xl transition"
            >
              <CreditCard className="w-5 h-5" />
              Tarjeta
            </Button>
          </div>
        </>
      )}

      {/* === Etapa 2: Pago en efectivo === */}
      {method === "cash" && !done && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-10 text-gray-300"
        >
          <Wallet className="w-12 h-12 text-amber-500 mx-auto mb-4" />
          <p className="text-lg">
            Por favor, dirígete a la caja para completar tu pago.
          </p>
          <p className="text-gray-400 mt-2">
            Nuestro personal te atenderá enseguida.
          </p>
          <Button
            onClick={() => setDone(true)}
            className="mt-8 bg-amber-500 text-black hover:bg-amber-400 px-8 py-4 rounded-xl"
          >
            Finalizar
          </Button>
        </motion.div>
      )}

      {/* === Etapa 3: Pago con tarjeta === */}
      {method === "card" && !processing && !done && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-gray-200"
        >
          <CreditCard className="w-10 h-10 text-amber-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-amber-400 mb-4">
            Resumen del pedido
          </h3>

          <ul className="text-left max-w-md mx-auto mb-6 divide-y divide-gray-800 bg-black/40 p-4 rounded-xl">
            {orderItems.map((item) => (
              <li key={item.id} className="flex justify-between py-2 text-sm sm:text-base">
                <span>{item.name}</span>
                <span className="text-gray-300">${item.price}</span>
              </li>
            ))}
          </ul>

          {/* === Pregunta propina === */}
          {!askTip && addTip === null && (
            <div className="mt-6">
              <HandCoins className="w-8 h-8 text-amber-400 mx-auto mb-2" />
              <p className="text-gray-300 mb-4">
                En base al servicio brindado, ¿deseas agregar propina a tu pedido?
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-6">
                <Button
                  onClick={() => {
                    setAskTip(true);
                    setAddTip(true);
                  }}
                  className="bg-amber-500 text-black hover:bg-amber-400 px-6 py-3 rounded-xl"
                >
                  Agregar propina
                </Button>
                <Button
                  onClick={() => setAddTip(false)}
                  className="bg-gray-700 text-white hover:bg-gray-600 px-6 py-3 rounded-xl"
                >
                  No agregar
                </Button>
              </div>
            </div>
          )}

          {/* === Selección de propina === */}
          {addTip && askTip && (
            <motion.div
              className="mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <h4 className="text-lg font-semibold text-amber-400 mb-3">
                Selecciona el porcentaje:
              </h4>
              <div className="flex justify-center gap-3 flex-wrap">
                {[10, 15, 20, 25].map((tip) => (
                  <Button
                    key={tip}
                    onClick={() => setSelectedTip(tip)}
                    className={`px-4 py-2 rounded-full transition ${
                      selectedTip === tip
                        ? "bg-amber-500 text-black"
                        : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                    }`}
                  >
                    {tip}%
                  </Button>
                ))}
                <Button
                  onClick={() => setCustomModal(true)}
                  className="bg-gray-800 text-gray-300 hover:bg-gray-700 px-4 py-2 rounded-full"
                >
                  Otro
                </Button>
              </div>
            </motion.div>
          )}

          {/* === Totales === */}
          {(addTip === false || selectedTip !== null) && (
            <motion.div
              className="mt-10 bg-[#1a1a1a]/70 border border-gray-700 rounded-xl py-5 px-6 text-gray-300 max-w-md mx-auto shadow-inner"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="flex justify-between mb-2">
                <span>Subtotal:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              {addTip && selectedTip !== null && (
                <div className="flex justify-between mb-2">
                  <span>Propina ({selectedTip}%):</span>
                  <span>${tipAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-lg font-bold border-t border-gray-700 pt-3">
                <span>Total:</span>
                <span className="text-amber-400">${total.toFixed(2)}</span>
              </div>

              <Button
                onClick={() => handlePay("card")}
                className="mt-6 bg-amber-500 text-black hover:bg-amber-400 w-full text-lg rounded-xl py-4"
              >
                <SmartphoneNfc className="w-5 h-5 mr-2 inline-block" />
                Pagar ahora
              </Button>
            </motion.div>
          )}
        </motion.div>
      )}

      {/* === Modal de propina personalizada === */}
      <AnimatePresence>
        {customModal && (
          <motion.div
            key="tipmodal"
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCustomModal(false)}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              className="bg-[#111] border border-amber-600 rounded-2xl p-8 w-[90%] max-w-md shadow-2xl text-center"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
            >
              <h3 className="text-2xl font-bold text-amber-500 mb-4">
                Propina personalizada
              </h3>
              <p className="text-gray-400 mb-4">
                Ingresa el porcentaje que deseas agregar:
              </p>
              <input
                type="number"
                min="0"
                max="100"
                placeholder="Ejemplo: 12"
                value={customValue}
                onChange={(e) => setCustomValue(e.target.value)}
                className="w-full text-center text-lg bg-black/30 border border-gray-700 text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              <div className="flex justify-center gap-4 mt-6">
                <Button
                  onClick={() => setCustomModal(false)}
                  className="bg-gray-700 text-gray-200 hover:bg-gray-600"
                >
                  Cancelar
                </Button>
                <Button
                  onClick={() => {
                    const val = Number(customValue);
                    if (!isNaN(val) && val > 0) {
                      setSelectedTip(val);
                      setCustomModal(false);
                    }
                  }}
                  className="bg-amber-500 text-black hover:bg-amber-400 font-semibold"
                >
                  Guardar
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* === Animación NFC === */}
      <AnimatePresence>
        {processing && (
          <motion.div
            key="nfc"
            className="flex flex-col items-center mt-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.div
              animate={{
                scale: [1, 1.15, 1],
                opacity: [0.6, 1, 0.6],
              }}
              transition={{
                duration: 1.3,
                repeat: Infinity,
              }}
              className="w-24 h-24 rounded-full border-4 border-amber-500 flex items-center justify-center mb-6"
            >
              <SmartphoneNfc className="w-8 h-8 text-amber-400" />
            </motion.div>
            <p className="text-gray-300 text-lg flex items-center gap-2">
              Procesando pago...
              <Loader2 className="animate-spin w-5 h-5 text-amber-400" />
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* === Pago completado === */}
      {done && (
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <CheckCircle2 className="w-14 h-14 text-green-500 mx-auto mb-4" />
          <p className="text-green-400 font-semibold text-lg mb-4">
            Pago completado exitosamente
          </p>
          <p className="text-gray-400 mb-6">
            ¡Gracias por elegir La Casa del Chef!
          </p>
          <Button
            onClick={onFinish}
            className="bg-amber-500 text-black hover:bg-amber-400 px-8 py-4 rounded-xl"
          >
            Finalizar
          </Button>
        </motion.div>
      )}
    </motion.div>
  );
}
