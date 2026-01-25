function TypingBubble({ text }) {
  const safeText = typeof text === "string" ? text : "";

  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    setDisplayed("");
    if (!safeText) return;

    let index = 0;
    let cancelled = false;

    const type = () => {
      if (cancelled) return;
      if (index >= safeText.length) return;

      setDisplayed((prev) => prev + safeText.charAt(index));
      index++;

      setTimeout(type, 15);
    };

    type();

    return () => {
      cancelled = true;
    };
  }, [safeText]);

  return <span>{displayed}</span>;
}
