from fastapi import APIRouter, HTTPException

from app.schemas.user_schema import UserCreate, UserLogin
from app.database import users_collection
from app.services.auth_service import (
    hash_password,
    verify_password,
    create_access_token
)


router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)


@router.post("/register")
async def register(user: UserCreate):


    existing_user = await users_collection.find_one(
        {"email": user.email}
    )


    if existing_user:

        raise HTTPException(
            status_code=400,
            detail="Email already registered"
        )

    
    user_data = user.model_dump()


    user_data["password"] = hash_password(
        user.password
    )


    await users_collection.insert_one(
        user_data
    )


    return {
        "message": "User registered successfully"
    }



@router.post("/login")
async def login(user: UserLogin):


    db_user = await users_collection.find_one(
        {
            "email": user.email
        }
    )


    if not db_user:

        raise HTTPException(
            status_code=400,
            detail="Invalid email"
        )


    if not verify_password(
        user.password,
        db_user["password"]
    ):

        raise HTTPException(
            status_code=400,
            detail="Invalid password"
        )



    token = create_access_token(
        {
            "email": db_user["email"]
        }
    )


    return {
    "message": f"Welcome {db_user['name']}",
    "name": db_user["name"],
    "access_token": token,
    "token_type": "bearer"
}