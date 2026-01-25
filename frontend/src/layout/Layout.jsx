// src/layout/Layout.jsx
import { useState } from "react"
import Sidebar from "../components/Sidebar"

export default function Layout({ children }) {
  const [open, setOpen] = useState(true)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b z-50 flex items-center px-6">
        <button
          onClick={() => setOpen(!open)}
          className="mr-4 text-gray-600"
        >
          ☰
        </button>
        <h1 className="font-semibold text-lg">DukaanGPT</h1>
      </header>

      <Sidebar open={open} />

      {/* Content */}
      <main
        className={`
          pt-20 transition-all
          ${open ? "ml-64" : "ml-0"}
        `}
      >
        {children}
      </main>
    </div>
  )
}
