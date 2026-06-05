from fastapi import APIRouter, Depends, HTTPException

from datetime import datetime

from app.schemas.blog_schema import (BlogCreate, CommentCreate, RatingCreate)

from app.database import blogs_collection

from app.utils.auth_dependency import get_current_user

from bson import ObjectId

from app.services.ai_services import generate_embedding


router = APIRouter(
    prefix="/blogs",
    tags=["Blogs"]
)


@router.post("/create")
async def create_blog(
    blog: BlogCreate,
    current_user = Depends(get_current_user)
):


    blog_data = blog.model_dump()

    embedding = generate_embedding(
    blog.title
    +
    " "
    +
    blog.content
)


    blog_data["author_id"] = str(
        current_user["_id"]
    )


    blog_data["author_name"] = current_user["name"]


    blog_data["created_at"] = datetime.utcnow()


    blog_data["embedding"] = embedding



    await blogs_collection.insert_one(
        blog_data
    )


    return {
        "message": "Blog created successfully"
    }



@router.get("/")
async def get_all_blogs():


    blogs = []


    async for blog in blogs_collection.find():


        blogs.append(
            {
                "id": str(blog["_id"]),

                "title": blog["title"],

                "content": blog["content"][:200],

                "tags": blog["tags"],

                "author_name": blog["author_name"],

                "created_at": blog["created_at"]
            }
        )


    return blogs







@router.get("/my")
async def get_my_blogs(
    current_user = Depends(get_current_user)
):


    blogs = []


    async for blog in blogs_collection.find(
        {
            "author_id": str(current_user["_id"])
        }
    ):


        blogs.append(
            {
                "id": str(blog["_id"]),

                "title": blog["title"],

                "content": blog["content"],

                "tags": blog["tags"],

                "created_at": blog["created_at"]
            }
        )


    return blogs









@router.get("/{blog_id}")
async def get_blog(
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


    ratings = blog.get(
        "ratings",
        []
    )


    average_rating = 0


    if ratings:

        average_rating = sum(
            r["rating"] for r in ratings
        ) / len(ratings)



    return {

        "id": str(blog["_id"]),

        "title": blog["title"],

        "content": blog["content"],

        "tags": blog["tags"],

        "author_id": blog["author_id"],

        "author_name": blog["author_name"],

        "created_at": blog["created_at"],

        "comments": blog.get(
            "comments",
            []
        ),

        "average_rating": average_rating

    }










@router.post("/{blog_id}/comment")
async def add_comment(

    blog_id: str,

    comment: CommentCreate,

    current_user = Depends(get_current_user)

):


    new_comment = {

        "user_id": str(current_user["_id"]),

        "user_name": current_user["name"],

        "text": comment.text,

        "created_at": datetime.utcnow()

    }



    result = await blogs_collection.update_one(

        {
            "_id": ObjectId(blog_id)
        },


        {
            "$push": {

                "comments": new_comment

            }
        }

    )



    if result.modified_count == 0:

        raise HTTPException(

            status_code=404,

            detail="Blog not found"

        )



    return {

        "message": "Comment added successfully"

    }








@router.delete("/{blog_id}/comment/{comment_index}")
async def delete_comment(

    blog_id: str,

    comment_index: int,

    current_user = Depends(get_current_user)

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



    comments = blog.get(
        "comments",
        []
    )



    if comment_index >= len(comments):

        raise HTTPException(
            status_code=404,
            detail="Comment not found"
        )



    comment = comments[comment_index]



    if comment["user_id"] != str(current_user["_id"]):

        raise HTTPException(
            status_code=403,
            detail="You cannot delete this comment"
        )



    comments.pop(comment_index)



    await blogs_collection.update_one(

        {
            "_id": ObjectId(blog_id)
        },


        {
            "$set": {

                "comments": comments

            }
        }

    )



    return {

        "message": "Comment deleted successfully"

    }

















@router.post("/{blog_id}/rate")
async def rate_blog(

    blog_id: str,

    rating_data: RatingCreate,

    current_user = Depends(get_current_user)

):


    new_rating = {

        "user_id": str(current_user["_id"]),

        "rating": rating_data.rating

    }


    result = await blogs_collection.update_one(

        {
            "_id": ObjectId(blog_id)
        },

        {
            "$push": {

                "ratings": new_rating

            }
        }

    )


    if result.modified_count == 0:

        raise HTTPException(
            status_code=404,
            detail="Blog not found"
        )


    return {

        "message": "Rating added successfully"

    }







@router.put("/{blog_id}")
async def update_blog(
    blog_id: str,
    data: BlogCreate,
    current_user = Depends(get_current_user)
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


    if blog["author_id"] != str(current_user["_id"]):

        raise HTTPException(
            status_code=403,
            detail="You cannot edit this blog"
        )


    blog_data = data.dict()


    # because content changed, embedding also changes
    embedding = generate_embedding(
        data.content
    )


    blog_data["embedding"] = embedding


    await blogs_collection.update_one(
        {
            "_id": ObjectId(blog_id)
        },
        {
            "$set": blog_data
        }
    )


    return {
        "message": "Blog updated successfully"
    }

















@router.delete("/{blog_id}")
async def delete_blog(
    blog_id: str,
    current_user = Depends(get_current_user)
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


    if blog["author_id"] != str(current_user["_id"]):

        raise HTTPException(
            status_code=403,
            detail="You cannot delete this blog"
        )


    await blogs_collection.delete_one(
        {
            "_id": ObjectId(blog_id)
        }
    )


    return {
        "message": "Blog deleted successfully"
    }