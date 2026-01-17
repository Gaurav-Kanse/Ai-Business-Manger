import { useState, useRef } from "react"
import { motion } from "framer-motion"
import TypingText from "./TypingText"

export default function MainChat() {
  const [stage, setStage] = useState("intro") // intro → final
  const [file, setFile] = useState(null)
  const fileInputRef = useRef(null)

  const handleFileSelect = (e) => {
    const selectedFile = e.target.files[0]
    if (selectedFile) {
      setFile(selectedFile)
    }
  }

  return (
    <div className="flex justify-center px-6">
      <div className="w-full max-w-3xl py-20 text-center">

        {/* ================= INTRO TYPING ================= */}
        {stage === "intro" && (
          <TypingText
            texts={["Hello, welcome to DukaanGPT"]}
            className="text-3xl font-semibold"
            allowDelete={true}
            onComplete={() => setStage("final")}
          />
        )}

        {/* ================= FINAL CONTENT ================= */}
        {stage === "final" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Final Title Typing (NO DELETE) */}
            <TypingText
              texts={["Smart Invoice & Inventory Assistant"]}
              className="text-4xl font-semibold"
              allowDelete={false}
            />

            <p className="text-gray-500 mt-3">
              Upload invoices. Inventory updates automatically.
            </p>

            {/* ================= UPLOAD BOX ================= */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="
                mt-10 p-6 rounded-xl shadow-md
                bg-white border border-gray-200
                text-left
              "
            >
              <p className="text-sm font-medium mb-2">
                Upload Invoice (Image / PDF)
              </p>

              {/* Clickable Upload Area */}
              <div
                onClick={() => fileInputRef.current.click()}
                className="
                  p-6 text-center cursor-pointer
                  border-2 border-dashed rounded-xl
                  border-gray-300 hover:border-emerald-500
                  transition
                "
              >
                <p className="text-sm text-gray-600">
                  Click to upload invoice
                </p>

                {file && (
                  <p className="mt-2 text-xs text-emerald-600">
                    Selected file: {file.name}
                  </p>
                )}
              </div>

              {/* Hidden File Input */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*,.pdf"
                hidden
                onChange={handleFileSelect}
              />
            </motion.div>

            {/* ================= MESSAGE INPUT ================= */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="
                mt-6 flex items-center gap-3 px-5 py-4
                bg-white border border-gray-200
                rounded-xl shadow
              "
            >
              <input
                className="flex-1 outline-none text-sm text-gray-800"
                placeholder="Ask something like: show inventory insights"
              />

              <button
                className="
                  px-5 py-2 rounded-lg text-white
                  bg-emerald-600 hover:bg-emerald-700
                "
              >
                Send →
              </button>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
