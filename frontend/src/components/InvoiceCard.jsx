export default function InvoiceCard({ data = {}, lowStock = [] }) {
  if (!data || !Array.isArray(data.items)) {
    return (
      <div className="mt-3 p-4 rounded-xl bg-yellow-50 text-yellow-700 text-sm">
        ⚠ Invoice uploaded, but structured data could not be extracted.
      </div>
    );
  }

  return (
    <div className="mt-3 bg-gray-50 rounded-xl p-4 space-y-3">
      <h4 className="text-sm font-semibold text-gray-700">
        Invoice Summary
      </h4>

      <p className="text-xs text-gray-500">
        Vendor: {data.vendor || "Unknown"} <br />
        Invoice No: {data.invoice_number || "-"} <br />
        Date: {data.date || "-"}
      </p>

      <div className="space-y-2">
        {data.items.map((item, i) => (
          <div
            key={i}
            className="flex justify-between text-sm bg-white px-3 py-2 rounded-lg"
          >
            <span>{item.name}</span>
            <span className="text-gray-600">
              {item.quantity} × ₹{item.price}
            </span>
          </div>
        ))}
      </div>

      <p className="text-sm font-medium text-right">
        Total: ₹{data.total_amount || "-"}
      </p>

      {lowStock.length > 0 && (
        <div className="mt-2 text-xs text-red-600">
          ⚠ Low stock: {lowStock.join(", ")}
        </div>
      )}
    </div>
  );
}
