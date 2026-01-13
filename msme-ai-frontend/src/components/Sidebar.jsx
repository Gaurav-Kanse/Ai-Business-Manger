export default function Sidebar({ open }) {
  return (
    <aside
      className={`fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-white border-r
      transform transition-transform duration-300 z-40
      ${open ? "translate-x-0" : "-translate-x-full"}`}
    >
      <nav className="p-4 space-y-2 text-sm">
        <SidebarItem icon="💬" label="AI Chat" active />
        <SidebarItem icon="📊" label="Dashboard" />
        <SidebarItem icon="📦" label="Inventory" />
        <SidebarItem icon="⚙️" label="Settings" />
      </nav>
    </aside>
  )
}

function SidebarItem({ icon, label, active }) {
  return (
    <div
      className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition
      ${
        active
          ? "bg-emerald-100 text-emerald-700 font-medium"
          : "hover:bg-gray-100 text-gray-700"
      }`}
    >
      <span className="text-lg">{icon}</span>
      {label}
    </div>
  )
}
