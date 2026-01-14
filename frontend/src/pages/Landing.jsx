import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"

export default function Landing() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-emerald-50 to-white overflow-hidden">

      {/* NAVBAR */}
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="sticky top-0 z-50 backdrop-blur bg-white/70 border-b border-gray-200"
      >
        <div className="max-w-7xl mx-auto px-8 h-16 flex items-center justify-between">
          <h1 className="text-xl font-bold text-emerald-600">DukaanGPT</h1>
          <button
            onClick={() => navigate("/auth")}
            className="px-5 py-2 rounded-xl bg-black text-white hover:opacity-90 transition"
          >
            Login / Sign up
          </button>
        </div>
      </motion.nav>

      {/* HERO */}
      <section className="max-w-7xl mx-auto px-8 pt-24 pb-32 grid md:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block mb-4 px-4 py-1 rounded-full bg-emerald-100 text-emerald-700 text-sm font-medium">
            AI for Small Businesses
          </span>

          <h2 className="text-5xl font-extrabold leading-tight mb-6">
            Smart Invoice & <br />
            Inventory Assistant
          </h2>

          <p className="text-gray-600 text-lg mb-10 max-w-xl">
            Upload invoices, auto-update inventory, track expenses,
            and get AI-powered insights — built for MSMEs.
          </p>

          <div className="flex gap-4">
            <button
              onClick={() => navigate("/auth")}
              className="px-8 py-4 rounded-2xl bg-black text-white text-lg hover:scale-105 transition"
            >
              Get Started →
            </button>

            <button className="px-8 py-4 rounded-2xl border border-gray-300 text-lg hover:bg-gray-100 transition">
              Watch Demo
            </button>
          </div>
        </motion.div>

        {/* HERO VISUAL */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-emerald-200 blur-3xl opacity-40 rounded-full" />
          <div className="relative bg-white rounded-3xl shadow-2xl p-8 border">
            <h3 className="font-semibold text-lg mb-4">
              Invoice → Inventory → Insights
            </h3>
            <ul className="space-y-3 text-gray-600">
              <li>✔ Upload invoice (PDF / Image)</li>
              <li>✔ Auto-extract items</li>
              <li>✔ Update stock levels</li>
              <li>✔ Predict restocking</li>
              <li>✔ Visual business insights</li>
            </ul>
          </div>
        </motion.div>
      </section>

      {/* FEATURES */}
      <section className="max-w-7xl mx-auto px-8 pb-32">
        <motion.h3
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-center mb-16"
        >
          Built for real businesses
        </motion.h3>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Invoice Intelligence",
              desc: "AI reads invoices and extracts structured data instantly."
            },
            {
              title: "Inventory Automation",
              desc: "Stock updates automatically. No spreadsheets."
            },
            {
              title: "Business Insights",
              desc: "Know what to restock, when, and why — with AI."
            }
          ].map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-2xl p-8 shadow-lg border hover:shadow-xl transition"
            >
              <h4 className="text-xl font-semibold mb-3">{f.title}</h4>
              <p className="text-gray-600">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-black text-white py-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center px-8"
        >
          <h3 className="text-4xl font-bold mb-6">
            Ready to automate your business?
          </h3>
          <p className="text-gray-300 mb-10 text-lg">
            Join DukaanGPT and manage invoices, inventory, and insights
            in one intelligent dashboard.
          </p>
          <button
            onClick={() => navigate("/auth")}
            className="px-10 py-4 rounded-2xl bg-white text-black text-lg font-semibold hover:scale-105 transition"
          >
            Start Free →
          </button>
        </motion.div>
      </section>

      {/* FOOTER */}
      <footer className="py-10 text-center text-gray-500 text-sm">
        © 2026 DukaanGPT · Built for Google Lakecity Hackathon
      </footer>

    </div>
  )
}
