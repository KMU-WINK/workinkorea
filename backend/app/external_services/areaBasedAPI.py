import requests
from dotenv import load_dotenv

import os

load_dotenv()
API_KEY = os.getenv("API_KEY")
print("API_KEY : ", API_KEY)


ENDPOINT = "http://apis.data.go.kr/B551011/KorService1/areaBasedList1"

AREA_CODE = {
    "서울": 1,
    "인천": 2,
    "대전": 3,
    "대구": 4,
    "광주": 5,
    "부산": 6,
    "울산": 7,
    "세종특별자치시": 8,
    "경기도": 31,
    "강원특별자치도": 32,
    "충청북도": 33,
    "충청남도": 34,
    "경상북도": 35,
    "경상남도": 36,
    "전북특별자치도": 37,
    "전라남도": 38,
    "제주도": 39,
}


def get_spots(area="서울", pageNo=1):
    params = {
        "serviceKey": API_KEY,  # **required**
        "MobileOS": "ETC",  # **required**
        "MobileApp": "AppTest",  # **required**
        "numOfRows": "10",
        "pageNo": pageNo,
        "_type": "json",  # type은 json으로 고정
        "contentTypeId": "12",  # **관광타입 = 관광지**
        "listYN": "Y",  # 목록구분(Y=목록, N=개수) -> ?뭔솔
        "arrange": "A",  # (A=제목순, C=수정일순 ,D=생성일순) | 대표이미지가반드시있는정렬(O=제목순, Q=수정일순, R=생성일순)
        "areaCode": AREA_CODE[area],
        # "sigunguCode" : 0     # 시군구코드 (areaCode 필수)
    }

    response = requests.get(ENDPOINT, params=params)
    data = response.json()
    return {
        "code": response.status_code,
        "data": data["response"]["body"]["items"]["item"],
    }


def get_stays(area="서울", pageNo=1):
    params = {
        "serviceKey": API_KEY,  # **required**
        "MobileOS": "ETC",  # **required**
        "MobileApp": "AppTest",  # **required**
        "numOfRows": "10",
        "pageNo": pageNo,
        "_type": "json",  # type은 json으로 고정
        "contentTypeId": "32",  # **관광타입 = 숙박**
        "listYN": "Y",  # 목록구분(Y=목록, N=개수) -> ?뭔솔
        "arrange": "A",  # (A=제목순, C=수정일순 ,D=생성일순) | 대표이미지가반드시있는정렬(O=제목순, Q=수정일순, R=생성일순)
        "areaCode": AREA_CODE[area],
        # "sigunguCode" : 0     # 시군구코드 (areaCode 필수)
    }

    response = requests.get(ENDPOINT, params=params)
    data = response.json()
    return {
        "code": response.status_code,
        "data": data["response"]["body"]["items"]["item"],
    }
