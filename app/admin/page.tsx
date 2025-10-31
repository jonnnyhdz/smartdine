import { DashboardCard } from "@/components/DashboardCard";

export default function AdminPage() {
  const metrics = [
    { title: "Órdenes de hoy", value: "126" },
    { title: "Ticket promedio", value: "$185" },
    { title: "Tasa de error", value: "2%" },
  ];

  return (
    <section>
      <h1 className="text-3xl font-bold mb-8">Dashboard SmartDine</h1>
      <div className="grid md:grid-cols-3 gap-6">
        {metrics.map((m, i) => (
          <DashboardCard key={i} title={m.title} value={m.value} />
        ))}
      </div>
    </section>
  );
}
