import { Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import Sidebar from "../components/Sidebar";
import { useAuth } from "../context/AuthContext";
import { Menu, LogOut } from "lucide-react";

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/auth");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ---------- TOP NAVBAR ---------- */}
      <header
        className="
          fixed top-0 left-0 right-0 z-50
          h-16 bg-white border-b
          flex items-center justify-between px-6
        "
      >
        <div className="flex items-center gap-3">
          {/* SIDEBAR TOGGLE */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            <Menu size={20} />
          </button>

          <h1 className="text-lg font-semibold text-gray-800">
            DukaanGPT
          </h1>
        </div>

        {/* LOGOUT */}
        <button
          onClick={handleLogout}
          className="
            flex items-center gap-2
            text-sm text-red-600
            hover:bg-red-50 px-3 py-2 rounded-lg
          "
        >
          <LogOut size={16} />
          Logout
        </button>
      </header>

      {/* ---------- SIDEBAR ---------- */}
      <Sidebar open={sidebarOpen} />

      {/* ---------- MAIN CONTENT ---------- */}
      <main
        className={`
          pt-20
          transition-all duration-300
          ${sidebarOpen ? "ml-64" : "ml-0"}
        `}
      >
        <Outlet />
      </main>
    </div>
  );
}
