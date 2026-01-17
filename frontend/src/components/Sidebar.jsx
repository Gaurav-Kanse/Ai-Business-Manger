import { ChatIcon, InvoiceIcon, InventoryIcon, SettingsIcon } from "./Icons"

export default function Sidebar({ open }) {
  return (
    <aside
      className={`
        fixed top-16 left-0 z-40
        h-[calc(100vh-4rem)] w-64
        bg-white border-r border-gray-200
        transform transition-ui
        ${open ? "translate-x-0" : "-translate-x-full"}
      `}
    >
      <nav className="p-4 space-y-2 text-sm">
        <Item icon={ChatIcon} label="AI Chat" active />
        <Item icon={InvoiceIcon} label="Invoices" />
        <Item icon={InventoryIcon} label="Inventory" />
        <Item icon={SettingsIcon} label="Settings" />
      </nav>
    </aside>
  )
}

function Item({ icon: Icon, label, active }) {
  return (
    <div
      className={`
        flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer
        ${
          active
            ? "bg-emerald-100 text-emerald-700 font-medium"
            : "hover:bg-gray-100 text-gray-700"
        }
      `}
    >
      <Icon className="w-5 h-5" />
      <span>{label}</span>
    </div>
  )
}
