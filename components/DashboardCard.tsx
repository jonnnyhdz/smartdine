interface Props {
  title: string;
  value: string;
}

export function DashboardCard({ title, value }: Props) {
  return (
    <div className="bg-white rounded-xl shadow p-6 text-center hover:shadow-lg transition">
      <h3 className="text-gray-600">{title}</h3>
      <p className="text-3xl font-bold text-amber-600 mt-2">{value}</p>
    </div>
  );
}
