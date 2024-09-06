# 5)	[지역기반관광정보조회] 오퍼레이션명세	22
import requests
from dotenv import load_dotenv

import os

load_dotenv()
API_KEY = os.getenv("API_KEY")
print("API_KEY : ", API_KEY)


# 5)	[지역기반관광정보조회] 오퍼레이션명세	22
ENDPOINT = "http://apis.data.go.kr/B551011/KorService1/areaBasedList1"


AREA_CODE = {
    # "서울": 1,
    # "인천": 2,
    # "대전": 3,
    # "대구": 4,
    # "광주": 5,
    # "부산": 6,
    # "울산": 7,
    # "세종특별자치시": 8,
    # "경기도": 31,
    # "강원특별자치도": 32,
    # "충청북도": 33,
    # "충청남도": 34,
    # "경상북도": 35,
    # "경상남도": 36,
    # "전북특별자치도": 37,
    # "전라남도": 38,
    # "제주도": 39,
    "강릉": [32, 1],
    "부산": [6],
    "제주": [39],
    "경주": [35, 2],
    "여수": [38, 13],
    "전주": [37, 12],
    "춘천": [32, 13],
}


# 7)	[키워드검색조회] 오퍼레이션명세
def get_spots(keyword: str, area: str = "", pageNo: int = 1):
    if not len(area) and not len(keyword):
        raise ValueError("area or keyword is required")

    if len(area):
        white_list = ["강릉", "부산", "제주", "경주", "여수", "전주", "춘천"]
        if area not in white_list:
            raise ValueError(f"{area} is not in valid area list {white_list}")

    # API 엔드포인트 URL
    url = "https://apis.data.go.kr/B551011/KorService1/searchKeyword1"

    # API 요청 파라미터
    params = {
        "serviceKey": API_KEY,
        "numOfRows": "10",
        "pageNo": pageNo,
        "pageNo": "1",
        "MobileOS": "ETC",
        "MobileApp": "AppTest",
        "_type": "json",
        "listYN": "Y",
        "arrange": "A",
        "keyword": keyword,
        # 관광타입(12:관광지, 14:문화시설, 15:축제공연행사, 25:여행코스, 28:레포츠, 32:숙박, 38:쇼핑, 39:음식점) ID
        # "contentTypeId": "12", -> 일단 검색 개수 늘리기 위해 주석처리
        # 만약 문제가 생기면 루프로 돌리기
        # "areaCode": AREA_CODE[area][0],
    }
    # if len(keyword):
    #     params["keyword"] = keyword

    if len(area):
        params["areaCode"] = AREA_CODE[area][0]

        if len(AREA_CODE[area]) >= 2:
            params["sigunguCode"] = AREA_CODE[area][1]

    # API 호출
    response = requests.get(url, params=params)
    data = response.json()

    if data["response"]["body"]["items"]:
        return data["response"]["body"]
    else:
        raise ValueError("No data found")


def get_stays(keyword: str, area: str = "", pageNo: int = 1):
    if not len(area) and not len(keyword):
        raise ValueError("area or keyword is required")

    if len(area):
        white_list = ["강릉", "부산", "제주", "경주", "여수", "전주", "춘천"]
        if area not in white_list:
            raise ValueError(f"{area} is not in valid area list {white_list}")

    # API 엔드포인트 URL
    url = "https://apis.data.go.kr/B551011/KorService1/searchKeyword1"

    # API 요청 파라미터
    params = {
        "serviceKey": API_KEY,
        "numOfRows": "10",
        "pageNo": pageNo,
        "MobileOS": "ETC",
        "MobileApp": "AppTest",
        "_type": "json",
        "listYN": "Y",
        "arrange": "A",
        "keyword": keyword,
        "contentTypeId": 32,
        # "areaCode": AREA_CODE[area][0],
    }

    # if len(keyword):
    #     params["keyword"] = keyword

    if len(area):
        params["areaCode"] = AREA_CODE[area][0]

        if len(AREA_CODE[area]) >= 2:
            params["sigunguCode"] = AREA_CODE[area][1]

    # API 호출
    response = requests.get(url, params=params)

    data = response.json()

    if data["response"]["body"]["items"]:
        return data["response"]["body"]
    else:
        raise ValueError("No data found")
