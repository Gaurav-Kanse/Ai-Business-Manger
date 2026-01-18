import { useEffect, useState } from "react";

function TypingBubble({ text = "" }) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    if (!text) return;

    let i = 0;
    setDisplayed("");

    const interval = setInterval(() => {
      setDisplayed((prev) => prev + text[i]);
      i++;
      if (i >= text.length) clearInterval(interval);
    }, 18);

    return () => clearInterval(interval);
  }, [text]);

  return <span>{displayed}</span>;
}
