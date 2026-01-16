from app.utils.file_utils import save_temp_file, delete_file
import pytesseract
from PIL import Image
import fitz  # PyMuPDF

async def parse_invoice(file):
    path = save_temp_file(file)
    text = ""

    if file.filename.endswith(".pdf"):
        doc = fitz.open(path)
        for page in doc:
            text += page.get_text()
    else:
        img = Image.open(path)
        text = pytesseract.image_to_string(img)

    delete_file(path)

    return text
