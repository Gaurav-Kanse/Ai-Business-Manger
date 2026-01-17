export default function Dashboard() {
  return (
    <div className="p-6 space-y-6">

      {/* Section Title */}
      <div>
        <h3 className="text-lg font-semibold">📊 Inventory Insights</h3>
        <p className="text-xs text-gray-500">
          Updated from latest invoice
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4">
        <Stat title="Items Extracted" value="12" />
        <Stat title="Total Invoice Amount" value="₹3,450" />
        <Stat title="Low Stock Alerts" value="2 ⚠️" />
        <Stat title="Vendors Detected" value="1" />
      </div>

      {/* Extracted Items */}
      <div className="bg-white rounded-xl shadow-md p-4">
        <p className="text-sm font-medium mb-3">
          🧾 Extracted Items
        </p>

        <div className="space-y-2 text-sm text-gray-700">
          <Item name="Milk" qty="10" />
          <Item name="Sugar" qty="5" low />
          <Item name="Tea Powder" qty="3" />
        </div>
      </div>

      {/* AI Insight */}
      <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
        <p className="text-sm font-medium text-emerald-700">
          🤖 AI Insight
        </p>
        <p className="text-xs text-emerald-600 mt-1">
          Sugar stock is low. Based on sales trend, restock within 2 days.
        </p>
      </div>
    </div>
  )
}

function Stat({ title, value }) {
  return (
    <div className="bg-white rounded-xl shadow p-4">
      <p className="text-xs text-gray-500">{title}</p>
      <p className="text-xl font-semibold mt-1">{value}</p>
    </div>
  )
}

function Item({ name, qty, low }) {
  return (
    <div className="flex justify-between items-center">
      <span>{name}</span>
      <span className={`text-xs px-2 py-1 rounded ${
        low
          ? "bg-red-100 text-red-600"
          : "bg-gray-100 text-gray-600"
      }`}>
        Qty: {qty}
      </span>
    </div>
  )
}
