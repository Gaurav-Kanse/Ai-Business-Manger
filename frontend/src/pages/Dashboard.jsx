import { motion } from "framer-motion";
import InventoryBarChart from "../components/charts/InventoryBarChart";
import SpendingLineChart from "../components/charts/SpendingLineChart";
import CategoryPieChart from "../components/charts/CategoryPieChart";

/* ---------- MOCK DATA (replace later with backend) ---------- */

const inventoryData = [
  { name: "Milk", qty: 10 },
  { name: "Sugar", qty: 3 },
  { name: "Tea", qty: 6 },
  { name: "Oil", qty: 2 },
];

const spendingData = [
  { date: "Jan", amount: 1200 },
  { date: "Feb", amount: 1800 },
  { date: "Mar", amount: 1400 },
  { date: "Apr", amount: 2200 },
];

const categoryData = [
  { name: "Groceries", value: 65 },
  { name: "Beverages", value: 20 },
  { name: "Others", value: 15 },
];

export default function Dashboard() {
  return (
    <div className="p-6 space-y-8">

      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h3 className="text-xl font-semibold">
          Dashboard Analytics
        </h3>
        <p className="text-sm text-gray-500">
          Business insights powered by AI
        </p>
      </motion.div>

      {/* STATS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
        <Stat title="Items" value="21" />
        <Stat title="Invoices" value="6" />
        <Stat title="Low Stock" value="2" danger />
        <Stat title="Monthly Spend" value="₹2,200" />
      </div>

      {/* CHARTS GRID */}
      <div className="grid md:grid-cols-2 gap-6">
        <InventoryBarChart data={inventoryData} />
        <SpendingLineChart data={spendingData} />
      </div>

      {/* PIE */}
      <CategoryPieChart data={categoryData} />
    </div>
  );
}

/* ---------- STAT CARD ---------- */

function Stat({ title, value, danger }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`
        rounded-2xl p-4 shadow bg-white
        ${danger ? "ring-1 ring-red-200" : ""}
      `}
    >
      <p className="text-xs text-gray-500">{title}</p>
      <p
        className={`text-2xl font-semibold mt-1 ${
          danger ? "text-red-500" : ""
        }`}
      >
        {value}
      </p>
    </motion.div>
  );
}
