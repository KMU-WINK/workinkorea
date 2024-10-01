from fastapi import Request, APIRouter, Depends, HTTPException
import requests, os
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


def get_additional_info(keyword):
    TOUR_URL = (
        "http://api.visitkorea.or.kr/openapi/service/rest/KorService/searchKeyword"
    )
    params = {
        "serviceKey": API_KEY,
        "contentTypeId": "12",
        "listYN": "Y",
        "arrange": "A",
        "numOfRows": "10",
        "MobileOS": "ETC",
        "MobileApp": "AppTest",
        "keyword": keyword,
    }
    response = requests.get(TOUR_URL, params=params)
    if response.status_code == 200:
        try:
            root = ET.fromstring(response.content)
            items = root.findall(".//item")
            results = []
            for item in items:
                title = (
                    item.find("title").text if item.find("title") is not None else None
                )
                addr1 = (
                    item.find("addr1").text if item.find("addr1") is not None else None
                )
                results.append({"title": title, "addr1": addr1})
            return results
        except ET.ParseError as e:
            print(f"ParseError: {e}")
            print("Response content:", response.text)
            return []
    else:
        print(f"Error: {response.status_code}")
        return []


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
            return []
    else:
        print(f"Error: {response.status_code}")
        return []


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
            return None, None
    else:
        print(f"Error: {response.status_code}")
        return None, None


# 리뷰많은 순 기준
# @router.get("/google")
def main(request: Request, service_key):
    query = input("검색할 지역을 입력하세요: ")  # 예: "부산 관광지"
    location = input("검색할 도시를 입력하세요: ")  # 예: "부산"
    radius = 10000  # 반경 10km

    # 도시 이름으로 위도와 경도 가져오기
    lat, lng = get_lat_lng(location)
    print(lat, lng)
    if lat is None or lng is None:
        print("위도와 경도를 가져올 수 없습니다.")
        return

    lat_lng = f"{lat},{lng}"

    # 관광지 검색
    places = get_places(query, location, radius)
    if not places:
        print("관광지 없음")
        return

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
    print(places_with_reviews)

    # 결과 출력 및 추가 정보 가져오기 (추가 정보가 없는 경우 제외)
    for place_name, reviews in places_with_reviews:
        additional_info = get_additional_info(service_key, place_name)
        if additional_info:
            print(f"{place_name}: 리뷰 수 {reviews}")
            for info in additional_info:
                print(info)
