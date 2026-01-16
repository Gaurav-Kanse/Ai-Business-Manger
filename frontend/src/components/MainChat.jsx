import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TypingText from "./TypingText";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function MainChat() {
  const { isAuth } = useAuth();

  const [stage, setStage] = useState("intro");

  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const fileInputRef = useRef(null);

  /* ---------- FILE HANDLING ---------- */

  const handleFileSelect = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    setUploading(true);

    setTimeout(() => {
      setFile(selectedFile);
      setUploading(false);
    }, 1200);
  };

  const removeFile = () => {
    setFile(null);
    fileInputRef.current.value = "";
  };

  const addMoreFile = () => {
    fileInputRef.current.click();
  };

  /* ---------- CHAT (STREAMING) ---------- */

  const sendMessage = async () => {
    if (!input.trim() && !file) return;

    const userMessage = {
      role: "user",
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    const formData = new FormData();
    formData.append("message", userMessage.content);
    if (file) formData.append("invoice", file);

    try {
      const response = await fetch("http://localhost:8000/ai/chat", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      let assistantText = "";

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "" },
      ]);

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split("\n");

        for (let line of lines) {
          if (line.startsWith("data: ")) {
            const token = line.replace("data: ", "");
            if (token === "[DONE]") break;

            assistantText += token;

            setMessages((msgs) => {
              const updated = [...msgs];
              updated[updated.length - 1].content = assistantText;
              return updated;
            });
          }
        }
      }

      setFile(null);
    } catch (err) {
      console.error(err);
      alert("AI error");
    } finally {
      setLoading(false);
    }
  };

  /* ---------- UI ---------- */

  return (
    <div className="relative flex justify-center px-6 overflow-hidden">
      <div className="relative w-full max-w-4xl py-28 text-center">

        {/* INTRO */}
        {stage === "intro" && (
          <TypingText
            texts={["Hello, welcome to DukaanGPT"]}
            className="text-5xl font-semibold tracking-tight"
            allowDelete
            onComplete={() => setStage("final")}
          />
        )}

        {/* FINAL */}
        {stage === "final" && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <TypingText
              texts={["Smart Invoice & Inventory Assistant"]}
              className="text-5xl font-semibold tracking-tight"
              allowDelete={false}
            />

            <p className="text-gray-500 mt-4 text-lg">
              Automate invoices, inventory & insights in one flow
            </p>

            {/* CHAT MESSAGES */}
            <div className="mt-12 space-y-4 max-h-[55vh] overflow-y-auto px-2 text-left">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm leading-relaxed
                    ${msg.role === "user"
                      ? "ml-auto bg-emerald-600 text-white"
                      : "mr-auto bg-gray-100 text-gray-800"
                    }`}
                >
                  {msg.content}
                </div>
              ))}
            </div>

            {/* UPLOAD CARD */}
            <div className="mt-10 p-8 rounded-3xl bg-white/80 backdrop-blur border shadow-2xl">
              <div
                onClick={() => !file && !uploading && fileInputRef.current.click()}
                className={`cursor-pointer p-8 rounded-2xl border-2 border-dashed transition
                  ${uploading
                    ? "border-emerald-400"
                    : "border-gray-300 hover:border-emerald-500"}`}
              >
                {!file && !uploading && (
                  <p className="text-gray-600">
                    Click to upload invoice (Image / PDF)
                  </p>
                )}

                {uploading && (
                  <div className="flex flex-col items-center gap-3">
                    <Spinner />
                    <p className="text-sm text-emerald-600">
                      Uploading invoice…
                    </p>
                  </div>
                )}

                <AnimatePresence>
                  {file && !uploading && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex justify-between items-center gap-4"
                    >
                      <p className="text-sm text-emerald-600 truncate">
                        {file.name}
                      </p>

                      <div className="flex gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            addMoreFile();
                          }}
                          className="px-3 py-1 text-xs rounded-md text-emerald-600 bg-emerald-50"
                        >
                          Add more
                        </button>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            removeFile();
                          }}
                          className="px-3 py-1 text-xs rounded-md text-gray-500 hover:text-red-600"
                        >
                          Remove
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*,.pdf"
                hidden
                onChange={handleFileSelect}
              />
            </div>

            {/* INPUT */}
            <div className="mt-8 flex items-center gap-4 px-6 py-4 bg-white/90 backdrop-blur border rounded-2xl shadow-xl">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                className="flex-1 bg-transparent outline-none text-sm"
                placeholder="Ask: show inventory insights"
              />

              <button
                onClick={sendMessage}
                disabled={loading}
                className="px-6 py-2 rounded-xl bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-700 disabled:opacity-50"
              >
                {loading ? "Thinking…" : "Send"}
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

/* ---------- Spinner ---------- */

function Spinner() {
  return (
    <div className="w-6 h-6 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
  );
}
