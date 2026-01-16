from groq import Groq
import os

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

print("GROQ KEY LOADED:", bool(os.getenv("GROQ_API_KEY")))

def chat_with_groq(message: str) -> str:
    response = client.chat.completions.create(
        model="llama-3.1-8b-instant",  # CURRENT SUPPORTED MODEL
        messages=[
            {"role": "system", "content": "You are a helpful business assistant."},
            {"role": "user", "content": message}
        ],
        temperature=0.5,
        max_tokens=500,
    )

    return response.choices[0].message.content
