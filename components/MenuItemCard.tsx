"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ShoppingCart, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { CustomizeModal } from "@/components/CustomizeModal";

interface MenuItemCardProps {
  id: number;
  name: string;
  description: string;
  price: number;
  img: string;
  inCart: boolean;
  onToggle: (id: number) => void;
  onAddCustom: (customizedItem: any) => void;
}

export function MenuItemCard({
  id,
  name,
  description,
  price,
  img,
  inCart,
  onToggle,
  onAddCustom,
}: MenuItemCardProps) {
  const [showCustomizeModal, setShowCustomizeModal] = useState(false);

  return (
    <>
      <motion.div
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
        className="bg-[#1b1b1b]/80 border border-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-amber-500/10 transition-all flex flex-col"
      >
        <div className="relative">
          <Image
            src={img}
            alt={name}
            width={400}
            height={250}
            className="object-cover w-full h-56"
          />
          {inCart && (
            <div className="absolute top-3 right-3 bg-amber-500 text-black rounded-full p-2 shadow">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          )}
        </div>

        <div className="p-6 flex flex-col flex-1">
          <h3 className="text-xl font-bold text-amber-400 mb-1">{name}</h3>
          <p className="text-gray-400 text-sm mb-3 line-clamp-2">{description}</p>

          <div className="mt-auto flex justify-between items-center">
            <span className="text-lg font-semibold text-white">${price}</span>
            <Button
              onClick={() => setShowCustomizeModal(true)}
              className={`flex items-center gap-2 ${
                inCart
                  ? "bg-gray-800 text-gray-200 hover:bg-gray-700"
                  : "bg-amber-500 text-black hover:bg-amber-400"
              } px-4 py-2 rounded-full transition`}
            >
              {inCart ? (
                <CheckCircle2 className="w-4 h-4" />
              ) : (
                <ShoppingCart className="w-4 h-4" />
              )}
              {inCart ? "Agregado" : "Agregar"}
            </Button>
          </div>
        </div>
      </motion.div>

      <CustomizeModal
        open={showCustomizeModal}
        onClose={() => setShowCustomizeModal(false)}
        onConfirm={(customizedItem) => {
          onAddCustom(customizedItem);
          onToggle(id);
        }}
        item={{ id, name, price, description }}
      />
    </>
  );
}
