from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os

from app.routes.health import router as health_router
from app.routes.auth import router as auth_router

# Load environment variables
load_dotenv()

# Create FastAPI app FIRST
app = FastAPI(
    title=os.getenv("APP_NAME", "AI Business Manager"),
    version="1.0.0"
)

# CORS (allow frontend)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routes AFTER app is defined
app.include_router(health_router)
app.include_router(auth_router)

@app.get("/")
def root():
    return {"message": "Backend is running 🚀"}
