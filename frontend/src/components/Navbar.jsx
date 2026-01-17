import { useState } from "react"
import { motion } from "framer-motion"
import { MenuIcon, UserIcon, LogoutIcon, SettingsIcon } from "./Icons"
import { useAuth } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"

export default function Navbar({ onToggleSidebar }) {
  const [open, setOpen] = useState(false)
  const { logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/")
  }

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="
        h-16 px-6 flex items-center justify-between
        bg-white/80 backdrop-blur
        border-b border-gray-200
        transition-ui
      "
    >
      {/* Left side */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="p-2 rounded-lg hover:bg-gray-100"
        >
          <MenuIcon />
        </button>

        <h1 className="text-xl font-bold text-emerald-600">
          DukaanGPT
        </h1>
      </div>

      {/* Right side – User menu */}
      <div className="relative">
        <button
          onClick={() => setOpen(!open)}
          className="
            w-9 h-9 rounded-full
            flex items-center justify-center
            border border-gray-300
            hover:bg-gray-100
          "
        >
          <UserIcon />
        </button>

        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="
              absolute right-0 mt-2 w-44
              bg-white rounded-xl shadow-lg
              border border-gray-200
              overflow-hidden
            "
          >
            <button
              className="w-full px-4 py-3 flex items-center gap-2 text-sm hover:bg-gray-100"
            >
              <SettingsIcon />
              Settings
            </button>

            <button
              onClick={handleLogout}
              className="w-full px-4 py-3 flex items-center gap-2 text-sm text-red-500 hover:bg-gray-100"
            >
              <LogoutIcon />
              Logout
            </button>
          </motion.div>
        )}
      </div>
    </motion.header>
  )
}
