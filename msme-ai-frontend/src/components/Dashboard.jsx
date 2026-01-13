export default function Dashboard() {
  return (
    <aside className="p-6 bg-gray-50">
      <h2 className="text-xl font-semibold mb-4">
        📊 Business Overview
      </h2>

      <div className="grid grid-cols-2 gap-4">
        <Stat
          title="Today's Revenue"
          value="₹460"
          gradient="from-emerald-500 to-emerald-600"
        />
        <Stat
          title="Profit"
          value="₹210"
          gradient="from-green-500 to-green-600"
        />
        <Stat
          title="Items Sold"
          value="20"
          gradient="from-blue-500 to-blue-600"
        />
        <Stat
          title="Low Stock Alerts"
          value="2 ⚠️"
          gradient="from-red-500 to-red-600"
        />
      </div>
    </aside>
  )
}

function Stat({ title, value, gradient }) {
  return (
    <div
      className={`rounded-2xl p-5 text-white shadow-md bg-gradient-to-br ${gradient}`}
    >
      <p className="text-sm opacity-90">{title}</p>
      <p className="text-3xl font-bold mt-1">{value}</p>
    </div>
  )
}
