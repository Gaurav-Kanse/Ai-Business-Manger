import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Paperclip, Send, X } from "lucide-react";
import TypingText from "./TypingText";
import { useAuth } from "../context/AuthContext";

/* ---------- Typing Effect for AI ---------- */
function TypingBubble({ text }) {
  const [displayed, setDisplayed] = useState("");

  useState(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed((prev) => prev + text[i]);
      i++;
      if (i >= text.length) clearInterval(interval);
    }, 18);

    return () => clearInterval(interval);
  }, [text]);

  return <span>{displayed}</span>;
}

export default function MainChat() {
  const { isAuth } = useAuth();

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const fileInputRef = useRef(null);

  const isChatStarted = messages.length > 0;

  /* ---------- SEND MESSAGE ---------- */
  const sendMessage = async () => {
    if (!input.trim() && !file) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    const formData = new FormData();
    formData.append("message", userMessage.content);
    if (file) formData.append("invoice", file);

    try {
      const res = await fetch("http://localhost:8000/ai/chat", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply },
      ]);

      setFile(null);
    } catch (err) {
      console.error(err);
      alert("AI error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex justify-center px-4">
      <motion.div
        layout
        className={`w-full max-w-4xl flex flex-col transition-all duration-700
          ${isChatStarted ? "justify-between py-20" : "justify-center"}
        `}
      >

        {/* INTRO */}
        {!isChatStarted && (
          <motion.div
            layout
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-10"
          >
            <TypingText
              texts={["Smart Invoice & Inventory Assistant"]}
              className="text-4xl font-semibold"
            />
            <p className="text-gray-500 mt-4">
              Upload invoices • Ask questions • Get insights
            </p>
          </motion.div>
        )}

        {/* CHAT AREA */}
        {isChatStarted && (
          <motion.div
            layout
            className="flex-1 space-y-4 overflow-y-auto mb-6 px-2"
          >
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`inline-block px-4 py-3 rounded-2xl text-sm leading-relaxed shadow max-w-[75%]
                    ${
                      msg.role === "user"
                        ? "bg-emerald-600 text-white rounded-br-sm"
                        : "bg-white text-gray-800 rounded-bl-sm"
                    }`}
                >
                  {msg.role === "assistant" ? (
                    <TypingBubble text={msg.content} />
                  ) : (
                    msg.content
                  )}
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {/* INPUT BAR */}
        <motion.div
          layout
          className="bg-white border rounded-2xl shadow-lg px-4 py-3 flex items-center gap-3"
        >
          {/* FILE BUTTON */}
          <button
            onClick={() => fileInputRef.current.click()}
            className="text-gray-400 hover:text-emerald-600"
          >
            <Paperclip size={18} />
          </button>

          {/* INPUT */}
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Ask anything about your business…"
            className="flex-1 outline-none text-sm"
          />

          {/* FILE PREVIEW */}
          {file && (
            <div className="flex items-center gap-1 text-xs bg-gray-100 px-2 py-1 rounded-lg">
              {file.name.slice(0, 12)}…
              <X
                size={12}
                className="cursor-pointer"
                onClick={() => setFile(null)}
              />
            </div>
          )}

          {/* SEND */}
          <button
            onClick={sendMessage}
            disabled={loading}
            className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl px-4 py-2 text-sm"
          >
            {loading ? "…" : <Send size={16} />}
          </button>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*,.pdf"
            hidden
            onChange={(e) => setFile(e.target.files[0])}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
