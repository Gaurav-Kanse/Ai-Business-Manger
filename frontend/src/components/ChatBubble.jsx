export default function ChatBubble({ sender, text }) {
  const isUser = sender === "user"

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-md px-4 py-3 rounded-2xl text-sm shadow-sm ${
          isUser
            ? "bg-emerald-600 text-white rounded-br-md"
            : "bg-white text-gray-800 rounded-bl-md"
        }`}
      >
        {text}
      </div>
    </div>
  )
}
