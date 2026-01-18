export default function InvoiceCard({ data, lowStock = [] }) {
  if (!data) return null;

  return (
    <div className="bg-white border rounded-xl shadow p-4 max-w-sm">
      <h3 className="font-semibold text-sm mb-1">
        📄 {data.invoice_number}
      </h3>

      <p className="text-xs text-gray-500 mb-2">
        Vendor: {data.vendor}
      </p>

      <div className="space-y-1 text-sm">
        {data.items.map((item, i) => (
          <div key={i} className="flex justify-between">
            <span>
              {item.name} × {item.quantity}
            </span>
            <span>₹{item.price}</span>
          </div>
        ))}
      </div>

      <div className="border-t mt-2 pt-2 flex justify-between font-medium">
        <span>Total</span>
        <span>₹{data.total}</span>
      </div>

      {lowStock.length > 0 && (
        <div className="mt-3 text-xs text-red-600">
          ⚠️ Low stock: {lowStock.join(", ")}
        </div>
      )}
    </div>
  );
}
