import { motion } from "framer-motion"
import TypingText from "./TypingText"

export default function Dashboard() {
  return (
    <div className="p-6 space-y-8">

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h3 className="text-xl font-semibold">
          Inventory Insights
        </h3>
        <p className="text-sm text-gray-500">
          Synced from latest invoice upload
        </p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
        <Stat title="Items Extracted" value="12" />
        <Stat title="Invoice Total" value="₹3,450" />
        <Stat title="Low Stock" value="2" danger />
        <Stat title="Vendors" value="1" />
      </div>

      {/* Main Grid */}
      <div className="grid md:grid-cols-3 gap-6">

        {/* Extracted Items */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:col-span-2 bg-white rounded-2xl shadow-lg p-5"
        >
          <p className="text-sm font-medium mb-4">
            Extracted Items
          </p>

          <div className="space-y-3">
            <Item name="Milk" qty="10" />
            <Item name="Sugar" qty="5" low />
            <Item name="Tea Powder" qty="3" />
          </div>
        </motion.div>

        {/* AI Insight */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="
            bg-gradient-to-br from-emerald-50 to-white
            border border-emerald-200
            rounded-2xl p-5
          "
        >
          <p className="text-sm font-medium text-emerald-700 mb-2">
            AI Insight
          </p>

          {/* KEEP TYPING ANIMATION */}
          <TypingText
            text="Sugar stock is running low. Based on recent usage patterns, consider restocking within the next 48 hours to avoid shortages."
            speed={25}
            className="text-sm text-emerald-700"
          />
        </motion.div>
      </div>

    </div>
  )
}

/* ---------- Components ---------- */

function Stat({ title, value, danger }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`
        rounded-2xl p-4 shadow
        bg-white
        ${danger ? "ring-1 ring-red-200" : ""}
      `}
    >
      <p className="text-xs text-gray-500">
        {title}
      </p>
      <p className={`text-2xl font-semibold mt-1 ${
        danger ? "text-red-500" : ""
      }`}>
        {value}
      </p>
    </motion.div>
  )
}

function Item({ name, qty, low }) {
  return (
    <div className="
      flex justify-between items-center
      px-4 py-3 rounded-xl
      bg-gray-50
    ">
      <span className="text-sm font-medium">
        {name}
      </span>

      <span className={`
        text-xs px-3 py-1 rounded-full font-medium
        ${low
          ? "bg-red-100 text-red-600"
          : "bg-gray-200 text-gray-700"}
      `}>
        Qty {qty}
      </span>
    </div>
  )
}
