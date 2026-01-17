import { useEffect, useState } from "react"

export default function TypingText({
  texts,
  speed = 80,
  deleteSpeed = 50,
  delayBeforeDelete = 800,
  onComplete,
  allowDelete = false,   // 👈 NEW FLAG
  className = "",
}) {
  const [charIndex, setCharIndex] = useState(0)
  const [displayText, setDisplayText] = useState("")
  const [deleting, setDeleting] = useState(false)
  const fullText = texts[0]

  useEffect(() => {
    let timer

    // TYPING
    if (!deleting && charIndex < fullText.length) {
      timer = setTimeout(() => {
        setDisplayText(fullText.slice(0, charIndex + 1))
        setCharIndex(charIndex + 1)
      }, speed)
    }

    // WAIT BEFORE DELETE
    else if (!deleting && charIndex === fullText.length && allowDelete) {
      timer = setTimeout(() => {
        setDeleting(true)
      }, delayBeforeDelete)
    }

    // DELETING
    else if (deleting && charIndex > 0) {
      timer = setTimeout(() => {
        setDisplayText(fullText.slice(0, charIndex - 1))
        setCharIndex(charIndex - 1)
      }, deleteSpeed)
    }

    // DONE
    else if (deleting && charIndex === 0) {
      onComplete?.()
    }

    // NO DELETE MODE (FINAL TITLE)
    else if (!allowDelete && charIndex === fullText.length) {
      onComplete?.()
    }

    return () => clearTimeout(timer)
  }, [charIndex, deleting])

  return (
    <h2 className={className}>
      {displayText}
      <span className="opacity-50 animate-pulse">|</span>
    </h2>
  )
}
