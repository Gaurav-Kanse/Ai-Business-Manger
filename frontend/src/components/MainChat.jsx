import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Paperclip, Send } from "lucide-react";
import TypingText from "./TypingText";
import InvoiceCard from "./InvoiceCard";

/* ---------- SAFE AI Typing Bubble (NO BUGS) ---------- */
function TypingBubble({ text = "" }) {
  const [shown, setShown] = useState("");
  const hasTyped = useRef(false);

  useEffect(() => {
    if (!text) return;

    // already animated → show instantly
    if (hasTyped.current) {
      setShown(text);
      return;
    }

    hasTyped.current = true;
    let i = 0;
    setShown("");

    const interval = setInterval(() => {
      setShown((prev) => {
        if (i >= text.length) {
          clearInterval(interval);
          return prev;
        }
        const next = prev + text[i];
        i++;
        return next;
      });
    }, 15);

    return () => clearInterval(interval);
  }, [text]);

  return <span>{shown}</span>;
}

export default function MainChat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  /* introStage:
     0 → first typing
     1 → final typing (stays)
  */
  const [introStage, setIntroStage] = useState(0);

  const fileInputRef = useRef(null);
  const chatRef = useRef(null);

  const chatStarted = messages.length > 0;

  /* ---------- AUTO SCROLL ---------- */
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  /* ---------- SEND MESSAGE ---------- */
  const sendMessage = async () => {
    if (!input.trim() && !file) return;

    const userText = input;

    setMessages((prev) => [
      ...prev,
      { role: "user", content: userText },
    ]);

    const formData = new FormData();
    formData.append("message", userText);
    if (file) formData.append("invoice", file);

    setInput("");
    setLoading(true);

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
        {
          role: "assistant",
          content: String(data.reply || ""),
          invoice: data.invoice || null,
          lowStock: data.low_stock || [],
        },
      ]);

      setFile(null);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Something went wrong." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex justify-center px-4">
      <motion.div
        layout
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className={`w-full max-w-4xl flex flex-col ${
          chatStarted ? "py-16" : "justify-center"
        }`}
      >
        {/* ---------- INTRO ---------- */}
        {!chatStarted && (
          <div className="text-center mb-14 min-h-[150px] flex flex-col items-center justify-center">
            {introStage === 0 && (
              <TypingText
                texts={["Hello, welcome to DukaanGPT"]}
                allowDelete
                onComplete={() => setIntroStage(1)}
                className="text-4xl font-semibold"
              />
            )}

            {introStage === 1 && (
              <TypingText
                texts={["Smart Invoice & Inventory Assistant"]}
                allowDelete={false}
                className="text-4xl font-semibold"
              />
            )}

            <p className="text-gray-500 mt-4">
              Upload invoices • Ask questions • Get insights
            </p>
          </div>
        )}

        {/* ---------- CHAT AREA ---------- */}
        {chatStarted && (
          <div
            ref={chatRef}
            className="flex-1 space-y-4 overflow-y-auto mb-10 pr-1"
          >
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`px-4 py-3 rounded-2xl shadow text-sm max-w-[75%]
                    ${
                      msg.role === "user"
                        ? "bg-emerald-600 text-white rounded-br-sm"
                        : "bg-white text-gray-800 rounded-bl-sm"
                    }`}
                >
                  {msg.role === "assistant" ? (
                    <>
                      <TypingBubble text={msg.content} />

                      {msg.invoice && (
                        <div className="mt-3">
                          <InvoiceCard
                            data={msg.invoice}
                            lowStock={msg.lowStock}
                          />
                        </div>
                      )}
                    </>
                  ) : (
                    msg.content
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ---------- INPUT BAR ---------- */}
        <motion.div
          layout
          transition={{ duration: 0.5 }}
          className={`bg-white border rounded-2xl shadow-lg px-4 py-3 flex items-center gap-3
            ${chatStarted ? "" : "mx-auto w-full max-w-xl"}
          `}
        >
          <button
            onClick={() => fileInputRef.current.click()}
            className="text-gray-400 hover:text-emerald-600"
          >
            <Paperclip size={18} />
          </button>

          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Ask about inventory, invoices, insights…"
            className="flex-1 outline-none text-sm"
          />

          <button
            onClick={sendMessage}
            disabled={loading}
            className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl px-4 py-2"
          >
            <Send size={16} />
          </button>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*,.pdf,.txt"
            hidden
            onChange={(e) => setFile(e.target.files[0])}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
