from fastapi import FastAPI
from dotenv import load_dotenv
from .routers import spots, stays

load_dotenv()

app = FastAPI()

app.include_router(spots.router)
app.include_router(stays.router)


@app.get("/")
async def read_root():
    return {"message": "Hello World"}
