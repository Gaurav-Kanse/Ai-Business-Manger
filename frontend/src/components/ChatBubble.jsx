import { motion } from "framer-motion";

export default function ChatBubble({ role, content }) {
  const isUser = role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex ${isUser ? "justify-end" : "justify-start"} mb-3`}
    >
      <div
        className={`
          max-w-[75%] px-4 py-3 rounded-2xl text-sm leading-relaxed
          ${isUser
            ? "bg-emerald-600 text-white rounded-br-sm"
            : "bg-gray-100 text-gray-800 rounded-bl-sm"}
        `}
      >
        {content}
      </div>
    </motion.div>
  );
}

