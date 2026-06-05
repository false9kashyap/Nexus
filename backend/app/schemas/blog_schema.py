from pydantic import BaseModel, Field
from typing import List


class BlogCreate(BaseModel):

    title: str = Field(
        min_length=5,
        max_length=100
    )

    content: str = Field(
        min_length=20
    )

    tags: List[str]



class CommentCreate(BaseModel):

    text: str = Field(
        min_length=1,
        max_length=500
    )



class RatingCreate(BaseModel):

    rating: int = Field(
        ge=1,
        le=5
    )