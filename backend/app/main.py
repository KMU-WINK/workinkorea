from fastapi import FastAPI, Response
from fastapi.responses import HTMLResponse

from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from .db.connection import Base, engine
from .models import *  # 모든 모델을 import
from .routers import initial, spots, stays, jobs, users, auth, wishs, ai, google


load_dotenv()

app = FastAPI()

# Database Initialization
Base.metadata.create_all(bind=engine)

WHITE_LIST = [
    "http://localhost",
    "http://localhost:3000",
    "http://localhost:8000",
    "https://workinkorea.info",
    "http://workinkorea.info",
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=WHITE_LIST,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(initial.router)
app.include_router(spots.router)
app.include_router(stays.router)
app.include_router(jobs.router)
app.include_router(users.router)
app.include_router(wishs.router)
app.include_router(ai.router)
app.include_router(google.router)


@app.get("/favicon.ico", response_class=HTMLResponse)
async def favicon():
    return Response(content="", media_type="image/x-icon")


@app.get("/")
async def root():
    return {"message": "Hello World"}
