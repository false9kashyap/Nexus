from fastapi.middleware.cors import CORSMiddleware

from fastapi import FastAPI

from app.routes import auth, user, blog, ai, search





app = FastAPI(
    title="AI Knowledge Platform API"
)




app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)




app.include_router(
    auth.router
)

app.include_router(
    user.router
)


app.include_router(
    blog.router
)


app.include_router(
    ai.router
)


app.include_router(
    search.router
)



@app.get("/")
async def home():

    return {
        "message":"Backend running successfully"
    }




