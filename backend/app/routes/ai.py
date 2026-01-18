from fastapi import APIRouter, Depends, UploadFile, Form
from app.dependencies.auth import get_current_user
from app.services.invoice_parser import parse_invoice
from app.services.groq_service import extract_invoice_json, chat_with_groq
from app.services.inventory_service import update_inventory

router = APIRouter(prefix="/ai", tags=["AI"])


@router.post("/chat")
async def ai_chat(
    message: str = Form(...),
    invoice: UploadFile | None = None,
    user: str = Depends(get_current_user),
):
    invoice_data = None
    low_stock = []

    if invoice:
        ocr_text = await parse_invoice(invoice)

        invoice_data = extract_invoice_json(ocr_text)

        if invoice_data:
            low_stock = update_inventory(invoice_data)

        # 🔥 AI summary WITH invoice context
        reply = chat_with_groq(
            f"""
            You are a business assistant.
            Here is invoice data:
            {invoice_data}

            User request:
            {message}

            Summarize clearly and highlight important points.
            """
        )

    else:
        reply = chat_with_groq(message)

    return {
        "reply": reply,
        "invoice": invoice_data,
        "low_stock": low_stock,
        "user": user,
    }
