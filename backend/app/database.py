from motor.motor_asyncio import AsyncIOMotorClient
from app.config import MONGO_URL, DATABASE_NAME
import certifi


client = AsyncIOMotorClient(
    MONGO_URL,
    tls=True,
    tlsCAFile=certifi.where()
)


database = client[DATABASE_NAME]


users_collection = database["users"]
blogs_collection = database["blogs"]