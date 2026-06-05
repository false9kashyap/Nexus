from pydantic import BaseModel, EmailStr, Field
from typing import Optional


class UserCreate(BaseModel):

    name: str = Field(
        min_length=3,
        max_length=50
    )

    email: EmailStr

    password: str = Field(
        min_length=4
    )

    college: str

    profession: str

    interests: str

    bio: Optional[str] = None



class UserLogin(BaseModel):

    email: EmailStr

    password: str