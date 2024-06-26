from fastapi import FastAPI

from .routers import items

app = FastAPI()

app.include_router(items.router)


@app.get("/")
async def read_root():
    return {"message": "Hello World"}
