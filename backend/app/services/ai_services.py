import google.generativeai as genai

from app.config import GEMINI_API_KEY


genai.configure(
    api_key=GEMINI_API_KEY
)


model = genai.GenerativeModel(
    "gemini-2.5-flash"
)



async def improve_blog_text(
    content: str
):

    prompt = f"""

    Improve the following technical blog.

    Only provide:
    - grammar corrections
    - readability improvements
    - better sentence structure

    Do NOT add new information.

    Blog:

    {content}

    """


    response = model.generate_content(
        prompt
    )


    return response.text




async def summarize_blog(
    content: str
):

    prompt = f"""

    Summarize this technical blog clearly.

    Provide:
    - short overview
    - important concepts
    - key takeaways

    Blog:

    {content}

    """


    response = model.generate_content(
        prompt
    )


    return response.text








async def answer_blog_question(
    content: str,
    question: str
):

    prompt = f"""

    You are an AI assistant for a technical blog platform.

    Answer the user's question using ONLY the blog content.

    If the answer is not present in the blog,
    say:
    "This information is not available in the blog."

    Blog Content:

    {content}


    User Question:

    {question}

    """


    response = model.generate_content(
        prompt
    )


    return response.text







def generate_embedding(text):

    result = genai.embed_content(
        model="models/gemini-embedding-001",
        content=text
    )

    return result["embedding"]