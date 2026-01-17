import os

APP_NAME = os.getenv("AI Business Manager")
ENV = os.getenv("ENV")

JWT_SECRET = os.getenv("supersecretkey123")
JWT_ALGORITHM = os.getenv("HS256")
JWT_EXPIRE_MINUTES = int(os.getenv("JWT_EXPIRE_MINUTES", 60))

GROQ_API_KEY = os.getenv("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")


