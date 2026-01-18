import pdfplumber
import pytesseract
from PIL import Image
from fastapi import UploadFile

async def extract_text_from_file(file: UploadFile) -> str:
    filename = file.filename.lower()

    if filename.endswith(".pdf"):
        return await extract_from_pdf(file)

    if filename.endswith((".png", ".jpg", ".jpeg")):
        return await extract_from_image(file)

    return ""


async def extract_from_pdf(file: UploadFile) -> str:
    text = ""
    with pdfplumber.open(file.file) as pdf:
        for page in pdf.pages:
            page_text = page.extract_text()
            if page_text:
                text += page_text + "\n"
    return text


async def extract_from_image(file: UploadFile) -> str:
    image = Image.open(file.file)
    return pytesseract.image_to_string(image)
