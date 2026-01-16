from dotenv import load_dotenv
load_dotenv()
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes.auth import router as auth_router
from app.routes.ai import router as ai_router

app = FastAPI(title="AI Business Manager")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # frontend localhost ok for dev
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "Backend is running 🚀"}

app.include_router(auth_router)
app.include_router(ai_router)
