# main.py

import os
from typing import List, Literal

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from openai import (
    AsyncOpenAI,
    APIConnectionError,
    APIStatusError,
    APITimeoutError
)

from pydantic import BaseModel, Field

from prompts import SYSTEM_PROMPTS


# Load environment variables
load_dotenv()

# Create FastAPI app
app = FastAPI(
    title="Scaler Persona Bot Backend"
)


# Handle frontend CORS safely
def get_allowed_origins() -> List[str]:

    default_origin = "http://localhost:5173"

    raw_origins = os.environ.get(
        "FRONT_END_URL",
        default_origin
    )

    origins = []

    for origin in raw_origins.split(","):
        origin = origin.strip().rstrip("/")

        if origin:
            origins.append(origin)

    if default_origin not in origins:
        origins.append(default_origin)

    return origins


# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=get_allowed_origins(),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Chat message format
class Message(BaseModel):
    role: Literal["user", "assistant"]
    content: str = Field(min_length=1)


# Chat request format
class ChatRequest(BaseModel):

    persona_id: str = Field(min_length=1)

    message: str = Field(min_length=1)

    chat_history: List[Message] = Field(
        default_factory=list
    )


@app.get("/")
def home():

    return {
        "message": "Backend is running"
    }


@app.post("/api/chat")
async def chat_with_persona(request: ChatRequest):

    # Load API key
    api_key = (
        os.environ.get("HF_TOKEN")
        or os.environ.get("OPENAI_API_KEY")
    )

    model_name = os.environ.get("HF_MODEL")

    if not api_key:

        raise HTTPException(
            status_code=500,
            detail="API key is not configured."
        )

    if not model_name:

        raise HTTPException(
            status_code=500,
            detail="HF_MODEL not configured."
        )


    # Get correct persona prompt
    system_prompt = SYSTEM_PROMPTS.get(
        request.persona_id
    )

    if not system_prompt:

        raise HTTPException(
            status_code=400,
            detail="Invalid persona selected."
        )


    # Build conversation messages
    messages = []

    # System message
    messages.append({
        "role": "system",
        "content": system_prompt
    })


    # Add chat history
    for msg in request.chat_history:

        messages.append({
            "role": msg.role,
            "content": msg.content
        })


    # Add new user message
    messages.append({
        "role": "user",
        "content": request.message
    })


    # Create HuggingFace OpenAI-compatible client
    client = AsyncOpenAI(
        base_url="https://router.huggingface.co/v1",
        api_key=api_key,
        timeout=float(
            os.environ.get(
                "HF_TIMEOUT_SECONDS",
                "30"
            )
        ),
    )


    try:

        completion = await client.chat.completions.create(
            model=model_name,
            messages=messages,
            max_tokens=300,
        )

        reply = completion.choices[0].message.content

        if not reply:

            raise HTTPException(
                status_code=502,
                detail="Empty response from model."
            )


        return {
            "reply": reply
        }


    except APITimeoutError as exc:

        raise HTTPException(
            status_code=504,
            detail="AI provider timeout."
        ) from exc


    except APIConnectionError as exc:

        raise HTTPException(
            status_code=502,
            detail="AI provider unreachable."
        ) from exc


    except APIStatusError as exc:

        raise HTTPException(
        status_code=502,
        detail=str(exc)
    ) from exc


    except HTTPException:

        raise


    except Exception as exc:

        raise HTTPException(
            status_code=500,
            detail="Unexpected server error."
        ) from exc