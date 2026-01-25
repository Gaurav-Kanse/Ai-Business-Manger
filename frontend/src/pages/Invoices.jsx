import { motion } from "framer-motion";

export default function Invoices() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-xl font-semibold">Invoices</h2>
        <p className="text-sm text-gray-500">
          All processed invoices from uploads
        </p>
      </motion.div>

      {/* Invoice List */}
      <div className="bg-white rounded-2xl shadow border">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-500">
            <tr>
              <th className="text-left px-4 py-3">Invoice #</th>
              <th className="text-left px-4 py-3">Vendor</th>
              <th className="text-left px-4 py-3">Date</th>
              <th className="text-right px-4 py-3">Total</th>
            </tr>
          </thead>

          <tbody>
            {/* Replace later with real data */}
            <Row id="INV-001" vendor="Reliance" date="12 Jan 2026" total="₹3,450" />
            <Row id="INV-002" vendor="DMart" date="10 Jan 2026" total="₹2,180" />
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Row({ id, vendor, date, total }) {
  return (
    <tr className="border-t hover:bg-gray-50 cursor-pointer">
      <td className="px-4 py-3 font-medium">{id}</td>
      <td className="px-4 py-3">{vendor}</td>
      <td className="px-4 py-3">{date}</td>
      <td className="px-4 py-3 text-right font-semibold">{total}</td>
    </tr>
  );
}
