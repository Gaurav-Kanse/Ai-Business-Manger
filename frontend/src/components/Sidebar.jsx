import {
  ChatIcon,
  InvoiceIcon,
  InventoryIcon,
  SettingsIcon,
} from "./Icons";
import { NavLink } from "react-router-dom";

export default function Sidebar({ open, onClose }) {
  return (
    <aside
      className={`
        fixed top-16 left-0 z-40
        h-[calc(100vh-4rem)] w-64
        bg-white border-r border-gray-200
        transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"}
      `}
    >
      <nav className="p-4 space-y-2 text-sm">
        <Item to="/app/dashboard" icon={InventoryIcon} label="Dashboard" />
        <Item to="/app/chat" icon={ChatIcon} label="AI Chat" />
        <Item to="/app/invoices" icon={InvoiceIcon} label="Invoices" />
        <Item to="/app/settings" icon={SettingsIcon} label="Settings" />
      </nav>
    </aside>
  );
}

function Item({ icon: Icon, label, to }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `
        flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer
        ${
          isActive
            ? "bg-emerald-100 text-emerald-700 font-medium"
            : "hover:bg-gray-100 text-gray-700"
        }
      `
      }
    >
      <Icon className="w-5 h-5" />
      <span>{label}</span>
    </NavLink>
  );
}
