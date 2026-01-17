import { useRef, useState } from "react"

export default function InvoiceUpload() {
  const fileRef = useRef(null)
  const [file, setFile] = useState(null)

  const handleFile = (e) => {
    const selected = e.target.files[0]
    if (!selected) return
    setFile(selected)
  }

  return (
    <div className="mt-10 w-full max-w-2xl">
      <div
        onClick={() => fileRef.current.click()}
        className="bg-white rounded-xl border-2 border-dashed border-gray-200
        p-6 text-center cursor-pointer hover:border-emerald-400 transition"
      >
        <input
          ref={fileRef}
          type="file"
          accept="image/*,application/pdf"
          hidden
          onChange={handleFile}
        />

        {!file ? (
          <>
            <div className="text-3xl mb-2">🧾</div>
            <p className="text-sm font-medium text-gray-800">
              Upload Invoice (Image or PDF)
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Click or drag & drop your invoice here
            </p>
          </>
        ) : (
          <>
            <p className="text-sm font-medium text-emerald-600">
              ✅ {file.name}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Ready to process invoice
            </p>
          </>
        )}
      </div>
    </div>
  )
}
