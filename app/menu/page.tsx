"use client";

import { useState } from "react";
import { mockMenu } from "@/lib/data";
import { MenuItemCard } from "@/components/MenuItemCard";
import { OrderModal } from "@/components/OrderModal";
import { PaymentOptions } from "@/components/PaymentOptions";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Utensils } from "lucide-react";

export default function MenuPage() {
  const [cart, setCart] = useState<number[]>([]);
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [finished, setFinished] = useState(false);

  const toggleItem = (id: number) => {
    setCart((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleAddCustom = (customizedItem: any) => {
    setCartItems((prev) => [...prev, customizedItem]);
  };

  const selectedItems =
    cartItems.length > 0
      ? cartItems
      : mockMenu.filter((i) => cart.includes(i.id));

  const totalTime = selectedItems.reduce(
    (sum, i) => sum + (i.time || 10),
    0
  );

  const handleConfirm = () => setConfirmed(true);

  return (
    <section className="pt-28 pb-16 px-6 bg-[#0f0f0f] min-h-screen overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-5xl font-bold mb-4 text-amber-500 flex justify-center items-center gap-3">
          <Utensils className="w-10 h-10 text-amber-400" /> Menú Interactivo
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Explora nuestras especialidades y realiza tu pedido directamente desde la mesa.
        </p>
      </motion.div>

      {/* === FASE 1: SELECCIÓN DE MENÚ === */}
      {!confirmed && !showPayment && !finished && (
        <>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {mockMenu.map((item) => (
              <MenuItemCard
                key={item.id}
                id={item.id}
                name={item.name}
                description={item.description}
                price={item.price}
                img={item.img}
                inCart={cart.includes(item.id)}
                onToggle={toggleItem}
                onAddCustom={handleAddCustom}
              />
            ))}
          </div>

          <div className="flex justify-center mt-12">
            <Button
              onClick={() => setShowModal(true)}
              disabled={cart.length === 0 && cartItems.length === 0}
              className={`text-lg px-10 py-5 rounded-full font-semibold transition ${
                cart.length === 0 && cartItems.length === 0
                  ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                  : "bg-amber-500 text-black hover:bg-amber-400"
              }`}
            >
              Realizar pedido
            </Button>
          </div>

          <OrderModal
            open={showModal}
            onClose={() => setShowModal(false)}
            items={selectedItems}
            onConfirm={handleConfirm}
          />
        </>
      )}

      {/* === FASE 2: PEDIDO CONFIRMADO === */}
      {confirmed && !showPayment && (
        <motion.div
          className="text-center max-w-3xl mx-auto bg-black/50 border border-gray-800 p-10 rounded-2xl mt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <h2 className="text-3xl font-bold text-amber-500 mb-4">
            ¡Pedido confirmado!
          </h2>
          <p className="text-gray-300 mb-6">
            Tu pedido llegará en aproximadamente{" "}
            <span className="font-semibold text-white">
              {totalTime} minutos
            </span>.
          </p>

          <div className="text-left max-w-md mx-auto bg-black/30 p-6 rounded-lg border border-gray-800">
            <h3 className="text-lg font-semibold text-amber-400 mb-2">
              Detalles del pedido:
            </h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              {selectedItems.map((item, index) => (
                <li key={index}>
                  <span className="font-semibold text-white">
                    {item.name}
                  </span>{" "}
                  — <span>{item.time || 10} min de preparación</span>
                  {item.extras?.length > 0 && (
                    <ul className="ml-4 mt-1 text-gray-400 text-xs list-disc">
                      {item.extras.map((ex: any) => (
                        <li key={ex.id}>
                          {ex.name} {ex.price > 0 && `(+${ex.price})`}
                        </li>
                      ))}
                    </ul>
                  )}
                  {item.comment && (
                    <p className="ml-4 text-xs italic text-gray-500">
                      “{item.comment}”
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <p className="text-gray-400 mt-6 mb-8">
            Disfruta tu comida — cuando termines podrás proceder con el pago.
          </p>

          <Button
            onClick={() => setShowPayment(true)}
            className="bg-amber-500 text-black hover:bg-amber-400 text-lg px-8 py-4 rounded-full"
          >
            Proceder al pago
          </Button>
        </motion.div>
      )}

      {/* === FASE 3: PAGO === */}
      {showPayment && !finished && (
        <PaymentOptions
          orderItems={selectedItems}
          onFinish={() => setFinished(true)}
        />
      )}

      {/* === FASE 4: AGRADECIMIENTO === */}
      {finished && (
        <motion.div
          className="text-center mt-20 text-gray-200 px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <h2 className="text-4xl font-bold text-amber-500 mb-4">
            ¡Gracias por visitar La Casa del Chef!
          </h2>
          <p className="text-gray-400 max-w-lg mx-auto">
            Esperamos verte pronto. Tu satisfacción es nuestro mejor ingrediente.
          </p>
        </motion.div>
      )}
    </section>
  );
}
