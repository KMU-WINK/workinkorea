from fastapi import Request, APIRouter, Depends, HTTPException
import requests, os, random
import xml.etree.ElementTree as ET
import googlemaps
from dotenv import load_dotenv

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
    print("api", location, query)
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
            print(f"JSONDecodeError: {e}")
            print("Response content:", response.text)
            raise e
    else:
        print(f"Error: {response.status_code}")
        raise HTTPException(status_code=400, detail="No data found in get_places")


def get_lat_lng(location):
    GOOGLE_URL = "https://maps.googleapis.com/maps/api/geocode/json"
    params = {"address": location, "key": GOOGLE_MAP_API_KEY}
    response = requests.get(GOOGLE_URL, params=params)
    if response.status_code == 200:
        data = response.json()
        # print("Geocoding API response:", data)
        if data["results"]:
            location = data["results"][0]["geometry"]["location"]
            return location["lat"], location["lng"]
        else:
            print("No results found for the location.")
            raise ValueError("No results found for the location.")
    else:
        print(f"Error: {response.status_code}")
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
async def main(request: Request, region_idx: int, keyword_idx: int):
    if region_idx < 0 or region_idx >= len(keys):
        raise HTTPException(status_code=400, detail="Invalid region index")
    if keyword_idx < 0 or keyword_idx >= len(LOCATION_QUERY[keys[region_idx]]):
        raise HTTPException(status_code=400, detail="Invalid keyword index")
    location = keys[region_idx]  # 예: "부산"
    query = LOCATION_QUERY[location][keyword_idx]  # 예: "부산 관광지"
    # print(location, query)
    radius = 10000  # 반경 10km
    # 도시 이름으로 위도와 경도 가져오기
    lat, lng = get_lat_lng(location)
    # if lat is None or lng is None:
    #     print("위도와 경도를 가져올 수 없습니다.")
    #     return

    lat_lng = f"{lat},{lng}"

    # 관광지 검색
    places = get_places(location + query, location, radius)
    # if not places:
    #     print("관광지 없음")
    #     return

    # 각 관광지의 리뷰 수와 이름 가져오기
    places_with_reviews = []
    for place in places:
        place_id = place["place_id"]
        place_name = place["name"]
        reviews = place.get("user_ratings_total")  # 리뷰 수
        if reviews is not None:
            places_with_reviews.append((place_name, reviews))

    # 리뷰 수로 정렬 (내림차순: 리뷰가 많은 순)
    places_with_reviews.sort(key=lambda x: x[1], reverse=True)
    # print(places_with_reviews)

    tour_result = get_additional_info(location, query)
    # print(tour_result)
    titles = [item["title"] for item in tour_result]
    result = []
    # # 결과 출력 및 추가 정보 가져오기 (추가 정보가 없는 경우 제외)
    for place_name, reviews in places_with_reviews:
        for idx in range(len(titles)):
            if place_name in titles[idx]:
                result.append(tour_result[idx])

    if len(result):
        return result
    else:
        raise HTTPException(status_code=500, detail="No data found in google reccomend")
