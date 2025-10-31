import "./globals.css";
import { Navbar } from "@/components/Navbar";

export const metadata = {
  title: "La Casa del Chef | SmartDine",
  description:
    "La experiencia gastronómica del futuro — pedidos inteligentes desde tu mesa.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-[#0f0f0f] text-gray-100 font-sans">
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
