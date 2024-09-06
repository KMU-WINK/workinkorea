from fastapi import FastAPI, Response
from fastapi.responses import HTMLResponse

from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from .db.connection import Base, engine
from .models import *  # 모든 모델을 import
from .routers import initial, spots, stays, jobs, users
from .external_services.detailAPI import get_common, get_intro, get_info, get_image
from fastapi.responses import FileResponse


load_dotenv()

app = FastAPI()

# Database Initialization
Base.metadata.create_all(bind=engine)

WHITE_LIST = [
    "http://localhost",
    "http://localhost:3000",
    "https://workinkorea.vercel.app",
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=WHITE_LIST,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(initial.router)
app.include_router(spots.router)
app.include_router(stays.router)
app.include_router(jobs.router)
app.include_router(users.router)


@app.get("/favicon.ico", response_class=HTMLResponse)
async def favicon():
    return Response(content="", media_type="image/x-icon")


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.get("/stay_spot_detail")
async def spot_stay_detail(contentId: int, contentTypeId: int):
    common = get_common(contentId, contentTypeId)
    # print("common")
    # print(common)

    intro = get_intro(contentId, contentTypeId)
    # print("intro")
    # print(intro)

    info = get_info(contentId, contentTypeId)
    # print("info")
    # print(info)

    image = get_image(contentId)
    # print("image")
    # print(image)

    # 빈 딕셔너리 생성
    combined_dict = {}

    # 딕셔너리들을 순차적으로 합치기
    combined_dict.update(common)
    combined_dict.update(intro)
    combined_dict.update(info)
    combined_dict.update(image)

    # 결과 확인
    # print(combined_dict)
    return combined_dict
