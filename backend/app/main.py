from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes import auth, user, blog, ai, search


app = FastAPI(
    title="AI Knowledge Platform API"
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(auth.router)
app.include_router(user.router)
app.include_router(blog.router)
app.include_router(ai.router)
app.include_router(search.router)


@app.get("/")
async def home():
    return {
        "message": "Backend running successfully "
    }