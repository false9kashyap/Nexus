from fastapi import APIRouter
from pydantic import BaseModel

from app.database import blogs_collection

from app.services.ai_services import generate_embedding

import numpy as np



router = APIRouter(
    prefix="/search",
    tags=["Search"]
)


class SearchRequest(BaseModel):

    query: str



def cosine_similarity(
    a,
    b
):

    return np.dot(
        a,
        b
    ) / (

        np.linalg.norm(a)
        *
        np.linalg.norm(b)

    )



@router.post("/")
async def search_blogs(
    data: SearchRequest
):


    query = data.query

    query_embedding = generate_embedding(
        query
    )


    results = []


    async for blog in blogs_collection.find():


        if "embedding" not in blog:

            continue


        score = cosine_similarity(

            query_embedding,

            blog["embedding"]

        )


        results.append(

            {

                "id": str(blog["_id"]),

                "title": blog["title"],

                "content": blog["content"],

                "author": blog["author_name"],

                "score": float(score)

            }

        )



    results.sort(

        key=lambda x: x["score"],

        reverse=True

    )


    return results[:5]