from fastapi import APIRouter, Depends, UploadFile, Form
from app.dependencies.auth import get_current_user
from app.services.invoice_parser import parse_invoice
from app.services.groq_service import extract_invoice_json, chat_with_groq
from app.services.inventory_service import update_inventory
import json

router = APIRouter(prefix="/ai", tags=["AI"])


@router.post("/chat")
async def ai_chat(
    message: str = Form(...),
    invoice: UploadFile | None = None,
    user: str = Depends(get_current_user),
):
    invoice_data = None
    low_stock = []
    reply = ""

    try:
        # ---------- INVOICE FLOW ----------
        if invoice:
            ocr_text = await parse_invoice(invoice)

            # 🔍 DEBUG (important)
            print("===== OCR TEXT =====")
            print(ocr_text)
            print("====================")

            invoice_data = extract_invoice_json(ocr_text)

            # ✅ CASE 1: Structured invoice extracted
            if invoice_data:
                low_stock = update_inventory(invoice_data)

                reply = chat_with_groq(
                    f"""
You are a business assistant helping a small shop owner.

Here is structured invoice data:
{json.dumps(invoice_data, indent=2)}

User request:
{message}

Summarize the invoice clearly.
Highlight totals, important items, and low stock warnings.
"""
                )

            # ⚠️ CASE 2: OCR worked, but structured data failed
            else:
                reply = chat_with_groq(
                    f"""
You are a business assistant.

The following is raw OCR text from an invoice.
The structure could not be reliably extracted.

OCR TEXT:
{ocr_text}

User request:
{message}

Give a best-effort summary in simple bullet points.
"""
                )

        # ---------- NORMAL CHAT ----------
        else:
            reply = chat_with_groq(message)

    except Exception as e:
        print("AI route error:", e)
        reply = "Sorry, something went wrong while processing your request."

    return {
        "reply": reply or "No response generated.",
        "invoice": invoice_data,
        "low_stock": low_stock,
        "user": user,
    }
