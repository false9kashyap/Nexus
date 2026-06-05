from bson import ObjectId

from app.database import blogs_collection, users_collection

from fastapi import APIRouter, Depends, HTTPException

from app.utils.auth_dependency import get_current_user

from pydantic import BaseModel




router = APIRouter(
    prefix="/users",
    tags=["Users"]
)







class UpdateProfile(BaseModel):

    education: str

    designation: str

    interests: list[str]

    bio: str










@router.get("/me")
async def get_profile(

    current_user = Depends(get_current_user)

):


    return {

        "name": current_user["name"],

        "email": current_user["email"],

        "education": current_user.get(
            "education",
            ""
        ),

        "designation": current_user.get(
            "designation",
            ""
        ),

        "interests": current_user.get(
            "interests",
            []
        ),

        "bio": current_user.get(
            "bio",
            ""
        )

    }









@router.put("/me")
async def update_profile(

    data: UpdateProfile,

    current_user = Depends(get_current_user)

):


    await users_collection.update_one(

        {
            "_id": current_user["_id"]
        },


        {
            "$set": {

                "education": data.education,

                "designation": data.designation,

                "interests": data.interests,

                "bio": data.bio

            }
        }

    )



    return {

        "message": "Profile updated successfully"

    }












@router.get("/{user_id}")
async def get_user_profile(

    user_id: str

):


    user = await users_collection.find_one(

        {
            "_id": ObjectId(user_id)
        }

    )



    if not user:


        raise HTTPException(

            status_code=404,

            detail="User not found"

        )







    blogs = []



    async for blog in blogs_collection.find(

        {
            "author_id": user_id
        }

    ):


        blogs.append(

            {

                "id": str(blog["_id"]),

                "title": blog["title"],

                "content": blog["content"][:150],

                "tags": blog.get(
                    "tags",
                    []
                )

            }

        )









    return {

        "name": user["name"],

        "education": user.get(
            "education",
            ""
        ),

        "designation": user.get(
            "designation",
            ""
        ),

        "interests": user.get(
            "interests",
            []
        ),

        "bio": user.get(
            "bio",
            ""
        ),

        "blogs": blogs

    }