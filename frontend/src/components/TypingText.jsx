import { useEffect, useState } from "react";

export default function TypingText({
  texts = [],
  speed = 80,
  deleteSpeed = 50,
  delayBeforeDelete = 800,
  allowDelete = false,
  onComplete,
  className = "",
}) {
  // SAFETY: normalize texts
  const sequence = Array.isArray(texts) ? texts : [];

  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [deleting, setDeleting] = useState(false);

  const currentText = sequence[textIndex] || "";

  useEffect(() => {
    if (!currentText) return;

    let timer;

    // ---------- TYPING ----------
    if (!deleting && charIndex < currentText.length) {
      timer = setTimeout(() => {
        setDisplayText(currentText.slice(0, charIndex + 1));
        setCharIndex((c) => c + 1);
      }, speed);
    }

    // ---------- WAIT THEN DELETE ----------
    else if (
      !deleting &&
      charIndex === currentText.length &&
      allowDelete &&
      textIndex < sequence.length - 1
    ) {
      timer = setTimeout(() => {
        setDeleting(true);
      }, delayBeforeDelete);
    }

    // ---------- DELETING ----------
    else if (deleting && charIndex > 0) {
      timer = setTimeout(() => {
        setDisplayText(currentText.slice(0, charIndex - 1));
        setCharIndex((c) => c - 1);
      }, deleteSpeed);
    }

    // ---------- MOVE TO NEXT TEXT ----------
    else if (deleting && charIndex === 0) {
      setDeleting(false);
      setTextIndex((i) => i + 1);
    }

    // ---------- FINAL TEXT DONE ----------
    else if (
      !allowDelete &&
      charIndex === currentText.length
    ) {
      onComplete?.();
    }

    return () => clearTimeout(timer);
  }, [charIndex, deleting, currentText, textIndex]);

  return (
    <h2 className={className}>
      {displayText}
      <span className="opacity-40 animate-pulse">|</span>
    </h2>
  );
}
