export default function Navbar({ onToggle }) {
  return (
    <header className="h-16 bg-white border-b flex items-center px-6 justify-between">
      <div className="flex items-center gap-3">
        {/* Sidebar Toggle Button */}
        <button
          onClick={onToggle}
          className="p-2 rounded-lg hover:bg-gray-100 transition"
        >
          ☰
        </button>

        {/* Brand */}
        <h1 className="text-xl font-bold text-emerald-600">
          DukaanGPT
        </h1>
      </div>

      <nav className="text-sm text-gray-600 hidden md:flex gap-6">
        <span className="cursor-pointer hover:text-gray-900">Chat</span>
        <span className="cursor-pointer hover:text-gray-900">Features</span>
        <span className="cursor-pointer hover:text-gray-900">About</span>
      </nav>
    </header>
  )
}
