export default function Chat() {
  return (
    <div className="w-full max-w-3xl">
      {/* Welcome */}
      <h1 className="text-3xl text-gray-900 font-semibold text-center">
        Welcome to DukaanGPT
      </h1>
      <p className="text-center text-gray-500 mt-2">
        Simple conversation. Smart business decisions.
      </p>

      {/* Suggestion Cards */}
      <div className="grid grid-cols-2 text-gray-900 gap-4 mt-8">
        <Suggestion icon="💰" text="Aaj ki sales add karo" />
        <Suggestion icon="📊" text="Weekly profit batao" />
        <Suggestion icon="📢" text="Offer message banao" />
        <Suggestion icon="📦" text="Low stock check karo" />
      </div>

      {/* Input */}
      <div className="mt-8 bg-white rounded-xl shadow flex items-center px-4 py-3 gap-3">
        <input
          className="flex-1 text-sm outline-none"
          placeholder="e.g. Aaj 12 chai, 8 samosa beche"
        />
        <button className="text-sm font-medium text-emerald-600">
          Send →
        </button>
      </div>

      <p className="text-xs text-gray-400 mt-2 text-center">
        AI may generate incorrect business estimates.
      </p>
    </div>
  )
}

function Suggestion({ icon, text }) {
  return (
    <div className="bg-white rounded-xl shadow-sm px-4 py-3 flex items-center gap-3 cursor-pointer hover:shadow transition">
      <span className="text-lg">{icon}</span>
      <span className="text-sm">{text}</span>
    </div>
  )
}
