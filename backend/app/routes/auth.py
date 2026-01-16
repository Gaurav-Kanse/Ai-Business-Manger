# app/routes/auth.py
from fastapi import APIRouter, HTTPException, status, Depends
from app.models.user import UserCreate, UserLogin
from app.utils.security import hash_password, verify_password
from app.dependencies.auth import create_access_token
from app.core.security import get_current_user

router = APIRouter(prefix="/auth", tags=["Auth"])

# TEMP user store
fake_users_db = {}

@router.post("/signup")
def signup(user: UserCreate):
    if user.email in fake_users_db:
        raise HTTPException(
            status_code=400,
            detail="User already exists"
        )

    fake_users_db[user.email] = {
        "email": user.email,
        "password": hash_password(user.password)
    }

    return {"message": "User created successfully"}

@router.post("/login")
def login(user: UserLogin):
    db_user = fake_users_db.get(user.email)

    if not db_user or not verify_password(user.password, db_user["password"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )

    token = create_access_token({"sub": user.email})

    return {
        "access_token": token,
        "token_type": "bearer"
    }

@router.get("/me")
def get_me(current_user: str = Depends(get_current_user)):
    return {
        "email": current_user,
        "message": "You are authenticated ✅"
    }
