import asyncio, os, random, time, httpx
from dotenv import load_dotenv
from concurrent.futures import ProcessPoolExecutor
from sqlalchemy.orm import Session
from transformers import BertTokenizer, BertModel
from sklearn.metrics.pairwise import cosine_similarity
from fastapi import Request, APIRouter, Depends, HTTPException
from .auth import get_current_user
from ..models.User import User_Region, User_Interest
from ..models.Interest import Interest
from ..models.Region import Region
from ..db.session import get_db


# utility function
def get_regions_by_id(id: str, db: Session = Depends(get_db)):
    # 유저가 가지고 있는 region_id 리스트 가져오기
    region_ids = (
        db.query(User_Region.c.region_id).filter(User_Region.c.user_id == id).all()
    )

    # region_ids는 튜플 리스트로 반환되므로, 이를 리스트로 변환
    region_ids = [r[0] for r in region_ids]

    # Region 테이블에서 region_id에 해당하는 name 값 가져오기
    region_names = db.query(Region.name).filter(Region.id.in_(region_ids)).all()

    # region_names는 튜플 리스트로 반환되므로, 이를 리스트로 변환
    region_names = [r[0] for r in region_names]
    return region_names


def get_interests_by_id(id: str, db: Session = Depends(get_db)):
    # 유저가 가지고 있는 region_id 리스트 가져오기
    interest_ids = (
        db.query(User_Interest.c.interest_id)
        .filter(User_Interest.c.user_id == id)
        .all()
    )

    # region_ids는 튜플 리스트로 반환되므로, 이를 리스트로 변환
    interest_ids = [r[0] for r in interest_ids]

    # Region 테이블에서 region_id에 해당하는 name 값 가져오기
    interest_names = db.query(Interest.name).filter(Interest.id.in_(interest_ids)).all()

    # region_names는 튜플 리스트로 반환되므로, 이를 리스트로 변환
    interest_names = [r[0] for r in interest_names]
    return interest_names


load_dotenv()
API_KEY = os.getenv("API_KEY")

ENDPOINT = "http://apis.data.go.kr/B551011/KorService1/areaBasedList1"

AREA_CODE = {
    "강릉": [32, 1],
    "부산": [6],
    "제주": [39],
    "경주": [35, 2],
    "여수": [38, 13],
    "전주": [37, 12],
    "춘천": [32, 13],
}

router = APIRouter(
    prefix="/ai",
    tags=["ai"],
)
tokenizer = None
model = None

model_name = "distilbert-base-uncased"
# model_name = "bert-base-multilingual-cased"
# 모델은 프로세스 풀 외부에서 로드
tokenizer = BertTokenizer.from_pretrained(model_name)
model = BertModel.from_pretrained(model_name)


def bert_predict(text):
    global tokenizer, model
    inputs = tokenizer(text, return_tensors="pt", padding=True, truncation=True)
    outputs = model(**inputs)
    return outputs.last_hidden_state.mean(dim=1).detach()


# BERT 모델을 비동기 작업으로 처리하기 위한 별도의 프로세스 풀
pool = ProcessPoolExecutor(max_workers=4)


# 관광지 리스트를 비동기적으로 가져오는 함수
async def get_content(area):
    params = {
        "serviceKey": API_KEY,
        "numOfRows": "50",
        "pageNo": "1",
        "MobileOS": "ETC",
        "MobileApp": "AppTest",
        "arrange": random.choice(["O", "Q", "R"]),
        "contentTypeId": "12",
        "areaCode": AREA_CODE[area][0],
        "_type": "json",
    }
    if len(AREA_CODE[area]) > 1:
        params["sigunguCode"] = AREA_CODE[area][1]

    async with httpx.AsyncClient() as client:
        response = await client.get(ENDPOINT, params=params)

    if response.headers.get("Content-Type") == "application/json":
        data = response.json()

        if data["response"]["body"]["items"]:
            data = data["response"]["body"]["items"]["item"]
            random.shuffle(data)
            return data
    return []


# BERT 임베딩과 유사도 계산을 비동기로 실행하는 함수
async def calculate_similarity_bert(user_preferences, overviews):
    loop = asyncio.get_event_loop()

    # 유저 선호도 임베딩 생성
    user_pref_text = " ".join(user_preferences)
    user_pref_embedding = await loop.run_in_executor(pool, bert_predict, user_pref_text)

    # 관광지 개요 + 제목 임베딩 생성
    overview_embeddings = []
    for overview in overviews:
        overview_embedding = await loop.run_in_executor(pool, bert_predict, overview)
        overview_embeddings.append(overview_embedding)

    # 유사도 계산
    similarities = []
    for ov_embed in overview_embeddings:
        ov_embedding = cosine_similarity(user_pref_embedding, ov_embed)[0][0]
        similarities.append(ov_embedding)

    return similarities


# 전체 과정 실행 함수
@router.get("")
async def recommend_tourist_spots(request: Request, db: Session = Depends(get_db)):
    current_user = get_current_user(request, db)
    if current_user is None:
        raise HTTPException(
            status_code=400,
            detail=f"user not found. request.header.Authorization: {request.headers.get('Authorization')}",
        )
    regions = get_regions_by_id(current_user.id, db)
    interests = get_interests_by_id(current_user.id, db)
    ts = time.time()
    # 1. 관광지 리스트에서 contentId 가져오기
    contents = await get_content(regions[0])

    # 2. contentId로부터 개요와 제목 가져오기
    overviews = [content["title"] for content in contents]

    # 3. 유사도 계산
    similarities = await calculate_similarity_bert(interests, overviews)

    # 4. 유사도 높은 순으로 관광지 정렬 및 상위 20개 출력
    sorted_indices = sorted(
        range(len(similarities)), key=lambda i: similarities[i], reverse=True
    )
    top_20_indices = sorted_indices[:20]
    result = [contents[idx] for idx in top_20_indices]
    # for r in result:
    #     print(r)
    print(f"Total time: {int((time.time() - ts) * 1000)}ms")
    return result
