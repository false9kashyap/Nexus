from passlib.context import CryptContext
from jose import jwt
from datetime import datetime, timedelta


pwd_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto"
)


SECRET_KEY = "mysecretkey"
ALGORITHM = "HS256"


def fix_password(password: str):

    return password.encode("utf-8")[:72].decode(
        "utf-8",
        errors="ignore"
    )



def hash_password(password: str):

    password = fix_password(password)

    return pwd_context.hash(password)



def verify_password(
    plain_password,
    hashed_password
):

    plain_password = fix_password(plain_password)

    return pwd_context.verify(
        plain_password,
        hashed_password
    )



def create_access_token(data: dict):

    to_encode = data.copy()

    expire = datetime.utcnow() + timedelta(
        days=7
    )

    to_encode.update(
        {
            "exp": expire
        }
    )


    token = jwt.encode(
        to_encode,
        SECRET_KEY,
        algorithm=ALGORITHM
    )


    return token