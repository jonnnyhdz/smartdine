import Image from "next/image";
import Link from "next/link";

export function FeaturedMenu() {
  const dishes = [
    {
      name: "Filete al vino tinto",
      img: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=800&q=80",
      price: 320,
    },
    {
      name: "Risotto de hongos",
      img: "https://images.unsplash.com/photo-1601924582971-3b37da4f0e00?auto=format&fit=crop&w=800&q=80",
      price: 250,
    },
    {
      name: "Salmón glaseado",
      img: "https://images.unsplash.com/photo-1617196034796-69b9f0f4e68c?auto=format&fit=crop&w=800&q=80",
      price: 310,
    },
  ];

  return (
    <section id="menu" className="py-24 bg-[#0f0f0f] text-center">
      <h2 className="text-4xl font-bold mb-12 text-amber-500">
        Platillos destacados
      </h2>
      <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto px-6">
        {dishes.map((dish, i) => (
          <div
            key={i}
            className="bg-black/50 border border-gray-800 rounded-xl overflow-hidden hover:scale-105 transition"
          >
            <Image
              src={dish.img}
              alt={dish.name}
              width={400}
              height={250}
              className="object-cover w-full h-56"
            />
            <div className="p-6">
              <h3 className="text-2xl font-semibold mb-2">{dish.name}</h3>
              <p className="text-gray-400 mb-3">${dish.price}</p>
            </div>
          </div>
        ))}
      </div>

      <Link
        href="/menu"
        className="inline-block mt-12 bg-amber-500 text-black font-semibold px-8 py-4 rounded-full hover:bg-amber-400"
      >
        Ver menú completo
      </Link>
    </section>
  );
}
