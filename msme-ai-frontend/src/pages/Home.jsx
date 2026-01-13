import { useState } from "react"
import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"
import MainChat from "../components/MainChat"

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen w-screen overflow-hidden
bg-gradient-to-br from-[#f8fafc] via-[#f1f5f9] to-[#ecfdf5]">
      <Navbar onToggle={() => setSidebarOpen(!sidebarOpen)} />

      <div className="flex">
        <Sidebar open={sidebarOpen} />

        <main
          className={`flex-1 transition-all duration-300 ${
            sidebarOpen ? "ml-64" : "ml-0"
          }`}
        >
          <MainChat />
        </main>
      </div>
    </div>
  )
}
