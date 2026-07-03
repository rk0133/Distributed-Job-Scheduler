export default function MetricCard({ title, value, color }) {
  return (
    <div
      className="bg-white rounded-xl shadow p-6 border-l-4"
      style={{ borderColor: color }}
    >
      <h3 className="text-gray-500">{title}</h3>

      <h1
        className="text-4xl font-bold mt-3"
        style={{ color }}
      >
        {value}
      </h1>
    </div>
  );
}