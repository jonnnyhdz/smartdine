import { Star, Timer, Smartphone } from "lucide-react";

export function WhyChooseUs() {
  const features = [
    {
      icon: <Timer className="w-10 h-10 text-amber-500" />,
      title: "Servicio rápido",
      desc: "Pedidos directos a cocina en segundos, sin errores.",
    },
    {
      icon: <Smartphone className="w-10 h-10 text-amber-500" />,
      title: "Tecnología SmartDine",
      desc: "Tablets premium que digitalizan tu experiencia sin apps.",
    },
    {
      icon: <Star className="w-10 h-10 text-amber-500" />,
      title: "Experiencia premium",
      desc: "Diseño elegante y moderno para tu comodidad.",
    },
  ];

  return (
    <section id="about" className="py-24 bg-[#141414] text-center">
      <h2 className="text-4xl font-bold mb-12 text-amber-500">
        ¿Por qué elegirnos?
      </h2>
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto px-6">
        {features.map((f, i) => (
          <div
            key={i}
            className="bg-black/60 rounded-xl p-8 border border-gray-800 hover:scale-105 transition"
          >
            <div className="flex justify-center mb-4">{f.icon}</div>
            <h3 className="text-2xl font-semibold mb-3">{f.title}</h3>
            <p className="text-gray-400">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
