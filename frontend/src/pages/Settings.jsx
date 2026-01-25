import { motion } from "framer-motion";

export default function Settings() {
  return (
    <div className="p-6 space-y-8 max-w-3xl">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-xl font-semibold">Settings</h2>
        <p className="text-sm text-gray-500">
          Manage your account and preferences
        </p>
      </motion.div>

      {/* Account */}
      <Section title="Account">
        <Setting label="Email" value="user@email.com" />
        <Setting label="Plan" value="Free" />
      </Section>

      {/* AI Preferences */}
      <Section title="AI Preferences">
        <Toggle label="Auto-summarize invoices" />
        <Toggle label="Low stock alerts" />
      </Section>

      {/* Danger Zone */}
      <Section title="Danger Zone">
        <button className="text-sm text-red-600 hover:underline">
          Logout
        </button>
      </Section>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div className="bg-white rounded-2xl shadow p-5 space-y-4 border">
      <p className="text-sm font-medium">{title}</p>
      {children}
    </div>
  );
}

function Setting({ label, value }) {
  return (
    <div className="flex justify-between text-sm">
      <span className="text-gray-500">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}

function Toggle({ label }) {
  return (
    <label className="flex items-center justify-between text-sm cursor-pointer">
      <span>{label}</span>
      <input type="checkbox" className="accent-emerald-600" />
    </label>
  );
}
