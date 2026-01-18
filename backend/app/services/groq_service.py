import os
from groq import Groq
import json

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

MODEL = "llama-3.1-8b-instant"


def chat_with_groq(prompt: str) -> str:
    """
    Generic chat function for normal messages or
    invoice + question combined prompts.
    """
    response = client.chat.completions.create(
        model=MODEL,
        messages=[
            {
                "role": "system",
                "content": "You are a helpful business assistant.",
            },
            {
                "role": "user",
                "content": prompt,
            },
        ],
        temperature=0.3,
        max_tokens=600,
    )

    return response.choices[0].message.content.strip()


def extract_invoice_json(ocr_text: str) -> dict:
    """
    Convert raw OCR text into structured invoice JSON.
    """
    prompt = f"""
    Extract invoice data from the text below and return ONLY valid JSON.

    Fields required:
    - vendor
    - invoice_number
    - date
    - items (list of {{ name, quantity, price }})
    - total_amount

    OCR TEXT:
    {ocr_text}
    """

    response = client.chat.completions.create(
        model=MODEL,
        messages=[
            {
                "role": "system",
                "content": "You extract structured invoice data.",
            },
            {
                "role": "user",
                "content": prompt,
            },
        ],
        temperature=0,
        max_tokens=800,
    )

    raw = response.choices[0].message.content.strip()

    try:
        return json.loads(raw)
    except json.JSONDecodeError:
        return {}
