from fastapi import Request, APIRouter, Depends, HTTPException
import requests, os, random
from sqlalchemy.orm import Session
from .auth import get_current_user
from ..db.session import get_db
from dotenv import load_dotenv
from ..models.Spot import Spot
from ..models.Stay import Stay

load_dotenv()
API_KEY = os.getenv("API_KEY")
GOOGLE_MAP_API_KEY = os.getenv("GOOGLE_MAP_API_KEY")

router = APIRouter(
    prefix="/google",
    tags=["google"],
)

AREA_CODE = {
    "강릉": [32, 1],
    "부산": [6],
    "제주": [39],
    "경주": [35, 2],
    "여수": [38, 13],
    "전주": [37, 12],
    "춘천": [32, 13],
}


def get_additional_info(location, query):
    url = "http://apis.data.go.kr/B551011/KorService1/searchKeyword1"
    params = {
        "serviceKey": API_KEY,
        # 'contentTypeId': '12',
        "listYN": "Y",
        "arrange": "A",
        "numOfRows": "10",
        "_type": "json",
        "MobileOS": "ETC",
        "MobileApp": "AppTest",
        "keyword": query,
        "areaCode": AREA_CODE[location][0],
    }
    if len(AREA_CODE[location]) >= 2:
        params["sigunguCode"] = AREA_CODE[location][1]
    response = requests.get(url, params=params)
    data = response.json()
    if data["response"]["body"]["items"]:
        return data["response"]["body"]["items"]["item"]
    else:
        raise ValueError("No data found")


def get_places(query, location, radius):
    GOOGLE_URL = "https://maps.googleapis.com/maps/api/place/textsearch/json"
    params = {
        "query": query,
        "location": location,
        "radius": radius,
        "language": "ko",
        "key": GOOGLE_MAP_API_KEY,
    }
    response = requests.get(GOOGLE_URL, params=params)
    if response.status_code == 200:
        try:
            data = response.json()
            return data["results"]
        except requests.exceptions.JSONDecodeError as e:
            raise e
    else:
        raise HTTPException(status_code=400, detail="No data found in get_places")


def get_lat_lng(location):
    GOOGLE_URL = "https://maps.googleapis.com/maps/api/geocode/json"
    params = {"address": location, "key": GOOGLE_MAP_API_KEY}
    response = requests.get(GOOGLE_URL, params=params)
    if response.status_code == 200:
        data = response.json()
        if data["results"]:
            location = data["results"][0]["geometry"]["location"]
            return location["lat"], location["lng"]
        else:
            raise ValueError("No results found for the location.")
    else:
        raise HTTPException(status_code=400, detail="No data found in get_lat_lng")


LOCATION_QUERY = {
    "강릉": ["바다", "시장"],
    "부산": ["해수욕장", "바다", "시장"],
    "제주": ["바다", "시장", "귤", "해수욕장", "폭포", "한라산"],
    "경주": ["불국사", "첨성대", "빵", "시장", "월드"],
    "여수": ["바다", "회", "시장", "해수욕장", "밤바다"],
    "전주": ["비빔밥", "영화", "한지"],
    "춘천": ["남이섬"],
}
keys = list(LOCATION_QUERY.keys())
# -> 강릉 바다 어때요?
# -> 경주 불국사 어때요?


@router.get("/sentence")
def sentence(request: Request):
    region_idx = random.randint(0, len(keys) - 1)
    region = keys[region_idx]
    keyword_idx = random.randint(0, len(LOCATION_QUERY[region]) - 1)
    keyword = LOCATION_QUERY[region][keyword_idx]

    return {
        "region_idx": region_idx,
        "keyword_idx": keyword_idx,
        "sentence": f"{region} {keyword} 어때요?",
    }


# 1. 문장 먼저 주기
@router.get("/list")
async def main(
    request: Request, region_idx: int, keyword_idx: int, db: Session = Depends(get_db)
):
    current_user = get_current_user(request, db)
    if current_user is None:
        raise HTTPException(
            status_code=400,
            detail=f"user not found. request.header.Authorization: {request.headers.get('Authorization')}",
        )
    else:
        stay_wish = db.query(Stay).filter(Stay.user_id == current_user.id).all()
        spot_wish = db.query(Spot).filter(Spot.user_id == current_user.id).all()
        wishs = [wish.content_id for wish in stay_wish + spot_wish]

    if region_idx < 0 or region_idx >= len(keys):
        raise HTTPException(status_code=400, detail="Invalid region index")
    if keyword_idx < 0 or keyword_idx >= len(LOCATION_QUERY[keys[region_idx]]):
        raise HTTPException(status_code=400, detail="Invalid keyword index")
    location = keys[region_idx]  # 예: "부산"
    query = LOCATION_QUERY[location][keyword_idx]  # 예: "부산 관광지"
    radius = 10000  # 반경 10km

    # 관광지 검색
    places = get_places(location + query, location, radius)

    # 각 관광지의 리뷰 수와 이름 가져오기
    places_with_reviews = []
    for place in places:
        place_name = place["name"]
        reviews = place.get("user_ratings_total")  # 리뷰 수
        if reviews is not None:
            places_with_reviews.append((place_name, reviews))

    # 리뷰 수로 정렬 (내림차순: 리뷰가 많은 순)
    places_with_reviews.sort(key=lambda x: x[1], reverse=True)

    tour_result = get_additional_info(location, query)

    titles = [item["title"] for item in tour_result]
    result = []
    # # 결과 출력 및 추가 정보 가져오기 (추가 정보가 없는 경우 제외)
    for place_name, reviews in places_with_reviews:
        for idx in range(len(titles)):
            if place_name in titles[idx]:
                result.append(tour_result[idx])

    if len(result):
        if wishs:
            for item in result:
                item["inWish"] = item["contentid"] in wishs
        return result
    else:
        raise HTTPException(status_code=500, detail="No data found in google reccomend")
