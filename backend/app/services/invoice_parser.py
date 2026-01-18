from app.utils.file_utils import save_temp_file, delete_file
from fastapi import UploadFile, HTTPException
import pytesseract
from PIL import Image
import fitz  # PyMuPDF
import os


async def parse_invoice(file: UploadFile) -> str:
    """
    Extract raw text from invoice (PDF or Image).
    """
    if not file:
        raise HTTPException(status_code=400, detail="No invoice file provided")

    path = save_temp_file(file)
    extracted_text = ""

    try:
        ext = os.path.splitext(file.filename)[1].lower()

        # ---------- PDF ----------
        if ext == ".pdf":
            doc = fitz.open(path)

            for page in doc:
                text = page.get_text().strip()

                # If text-based PDF
                if text:
                    extracted_text += text + "\n"
                else:
                    # Scanned PDF → OCR
                    pix = page.get_pixmap(dpi=300)
                    img = Image.frombytes("RGB", [pix.width, pix.height], pix.samples)
                    extracted_text += pytesseract.image_to_string(img) + "\n"

            doc.close()

        # ---------- IMAGE ----------
        elif ext in [".png", ".jpg", ".jpeg", ".webp"]:
            img = Image.open(path)
            extracted_text = pytesseract.image_to_string(img)

        else:
            raise HTTPException(
                status_code=400,
                detail="Unsupported file format. Upload PDF or image."
            )

        if not extracted_text.strip():
            raise HTTPException(
                status_code=422,
                detail="Could not extract text from invoice"
            )

        return extracted_text.strip()

    finally:
        delete_file(path)
