import { useEffect, useState } from "react";

export default function ChatBubble({ role, text = "", typing = false }) {
  const [displayText, setDisplayText] = useState("");

  /* ---------- TYPING EFFECT ---------- */
  useEffect(() => {
    if (!typing) {
      setDisplayText(text);
      return;
    }

    let i = 0;
    const interval = setInterval(() => {
      setDisplayText((prev) => prev + text.charAt(i));
      i++;
      if (i >= text.length) clearInterval(interval);
    }, 20);

    return () => clearInterval(interval);
  }, [text, typing]);

  return (
    <div
      className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm leading-relaxed
        ${role === "user"
          ? "ml-auto bg-emerald-600 text-white"
          : "mr-auto bg-gray-100 text-gray-800"
        }`}
    >
      {displayText || " "}
    </div>
  );
}
