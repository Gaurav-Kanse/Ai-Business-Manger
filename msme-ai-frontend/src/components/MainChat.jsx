export default function MainChat() {
  return (
    <div className="flex justify-center px-6">
      <div className="w-full max-w-3xl py-16">
        <h2 className="text-4xl font-semibold text-center text-gray-900">
          Welcome to DukaanGPT
        </h2>

        <p className="text-center text-gray-500 mt-2">
          Simple conversation. Smart business decisions.
        </p>

        {/* Suggestions */}
        <div className="grid grid-cols-2 text-gray-900 gap-4 mt-10">
          <Suggestion icon="💰" title="Add today’s sales" />
          <Suggestion icon="📊" title="View profit summary" />
          <Suggestion icon="📢" title="Create offers" />
          <Suggestion icon="📦" title="Check inventory" />
        </div>

        {/* Input */}
        <div className="mt-10 bg-white rounded-xl shadow flex items-center px-5 py-4 gap-3">
          <input
            className="flex-1 outline-none text-sm text-gray-800"
            placeholder="e.g. Aaj 12 chai, 8 samosa beche"
          />
          <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2 rounded-lg">
            Send →
          </button>
        </div>

        <p className="text-xs text-gray-400 mt-3 text-center">
          AI may generate incorrect business estimates.
        </p>
      </div>
    </div>
  )
}

function Suggestion({ icon, title }) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-4 flex gap-4 hover:shadow-md transition cursor-pointer">
      <span className="text-2xl">{icon}</span>
      <span className="text-sm font-medium">{title}</span>
    </div>
  )
}
