from fastapi import FastAPI
from dotenv import load_dotenv
from .db.connection import Base, engine
from .routers import spots, stays, tests

load_dotenv()

app = FastAPI()

app.include_router(spots.router)
app.include_router(stays.router)
app.include_router(tests.router)

# Database Initialization
Base.metadata.create_all(bind=engine)


@app.get("/")
async def read_root():
    return {"message": "Hello World"}
