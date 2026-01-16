from fastapi import APIRouter, Depends, UploadFile, File, Form
from app.core.security import get_current_user
from app.services.groq_service import chat_with_groq

router = APIRouter(prefix="/ai", tags=["AI"])


@router.post("/chat")
def ai_chat(
    message: str = Form(...),
    invoice: UploadFile | None = File(None),
    user=Depends(get_current_user)   # 🔐 THIS IS REQUIRED
):
    reply = chat_with_groq(message)
    return {"reply": reply}
