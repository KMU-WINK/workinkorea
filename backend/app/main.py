from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from .db.connection import Base, engine
from .routers import spots, stays, jobs, users

load_dotenv()

app = FastAPI()


WHITE_LIST = [
    "http://localhost",
    "http://localhost:3000",
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=WHITE_LIST,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(spots.router)
app.include_router(stays.router)
app.include_router(jobs.router)
app.include_router(users.router)

# Database Initialization
Base.metadata.create_all(bind=engine)


@app.get("/")
async def read_root():
    return {"message": "Hello World"}
