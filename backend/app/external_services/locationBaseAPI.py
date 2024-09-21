import requests, os
from dotenv import load_dotenv


load_dotenv()
API_KEY = os.getenv("API_KEY")


# 1	위치기반 관광정보조회
ENDPOINT_position = "http://apis.data.go.kr/B551011/KorService1/locationBasedList1"


# API 요청을 보내는 함수 정의
def get_location_based_list(
    mapX: str,
    mapY: str,
    radius: int = 20000,
    numOfRows: int = 3000,
    contentTypeId: int = 0,
):

    params = {
        "serviceKey": API_KEY,
        "numOfRows": numOfRows,
        "pageNo": "1",
        "MobileOS": "ETC",
        "MobileApp": "AppTest",
        "_type": "json",
        "listYN": "Y",
        "arrange": "A",
        "mapX": mapX,
        "mapY": mapY,
        "radius": radius,
    }
    if contentTypeId:
        params["contentTypeId"] = contentTypeId

    # API 요청
    response = requests.get(ENDPOINT_position, params=params)

    data = response.json()
    if data["response"]["body"]["items"]:
        return data["response"]["body"]
    else:
        raise ValueError("No data found")
