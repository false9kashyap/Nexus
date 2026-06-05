from fastapi import APIRouter, HTTPException

from pydantic import BaseModel

from app.services.ai_services import (
    improve_blog_text,
    summarize_blog,
    answer_blog_question
)

from bson import ObjectId

from app.database import blogs_collection




router = APIRouter(
    prefix="/ai",
    tags=["AI"]
)



class AIRequest(BaseModel):

    content: str


class QuestionRequest(BaseModel):

    question: str



@router.post("/improve")
async def improve_text(
    data: AIRequest
):


    result = await improve_blog_text(
        data.content
    )


    return {

        "suggestion": result

    }





@router.get(
    "/summarize/{blog_id}"
)
async def summarize(
    blog_id: str
):


    blog = await blogs_collection.find_one(
        {
            "_id": ObjectId(blog_id)
        }
    )


    if not blog:

        raise HTTPException(
            status_code=404,
            detail="Blog not found"
        )


    summary = await summarize_blog(
        blog["content"]
    )


    return {

        "summary": summary

    }







@router.post(
    "/ask/{blog_id}"
)
async def ask_blog(
    blog_id: str,
    data: QuestionRequest
):


    blog = await blogs_collection.find_one(
        {
            "_id": ObjectId(blog_id)
        }
    )


    if not blog:

        raise HTTPException(
            status_code=404,
            detail="Blog not found"
        )



    answer = await answer_blog_question(
        blog["content"],
        data.question
    )


    return {

        "answer": answer

    }