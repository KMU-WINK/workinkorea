# 10) [공통정보조회] 오퍼레이션명세	42
# 11) [소개정보조회] 오퍼레이션명세	47
# 12) [반복정보조회] 오퍼레이션조회	54
# 13) [이미지정보조회] 오퍼레이션명세	61

import requests, os
from dotenv import load_dotenv

load_dotenv()
API_KEY = os.getenv("API_KEY")


# 10) [공통정보조회] 오퍼레이션명세	42
common_ENDPOINT = "http://apis.data.go.kr/B551011/KorService1/detailCommon1"


def get_common(contentId, contentTypeId):
    # contentTypeId => 관광타입(12:관광지, 14:문화시설, 15:축제공연행사, 25:여행코스, 28:레포츠, 32:숙박, 38:쇼핑, 39:음식점) ID
    params = {
        "serviceKey": API_KEY,  # **required**
        "MobileOS": "ETC",
        "MobileApp": "AppTest",
        "_type": "json",
        "contentId": contentId,
        "contentTypeId": contentTypeId,
        "defaultYN": "Y",
        "firstImageYN": "Y",
        "areacodeYN": "Y",
        "catcodeYN": "Y",
        "addrinfoYN": "Y",
        "mapinfoYN": "Y",
        "overviewYN": "Y",
        "numOfRows": "10",
        "pageNo": "1",
    }
    response = requests.get(common_ENDPOINT, params=params)

    if response.headers.get("Content-Type") == "application/json":
        data = response.json()
        return (
            data["response"]["body"]["items"]["item"][0]
            if data["response"]["body"]["items"]
            else None
        )
    else:
        raise Exception(
            "TOUR API ERROR : Limited number of service requests exceeds error in GET_COMMON"
        )


# 11) [소개정보조회] 오퍼레이션명세	47
intro_ENDPOINT = "http://apis.data.go.kr/B551011/KorService1/detailIntro1"


def get_intro(contentId, contentTypeId):
    # contentTypeId => 관광타입(12:관광지, 14:문화시설, 15:축제공연행사, 25:여행코스, 28:레포츠, 32:숙박, 38:쇼핑, 39:음식점) ID
    params = {
        "serviceKey": API_KEY,  # **required**
        "MobileOS": "ETC",
        "MobileApp": "AppTest",
        "_type": "json",
        "contentId": contentId,
        "contentTypeId": contentTypeId,
        "numOfRows": "10",
        "pageNo": "1",
    }
    response = requests.get(intro_ENDPOINT, params=params)

    if response.headers.get("Content-Type") == "application/json":
        data = response.json()
        return (
            data["response"]["body"]["items"]["item"][0]
            if data["response"]["body"]["items"]
            else None
        )
    else:
        raise Exception(
            "TOUR API ERROR : Limited number of service requests exceeds error in GET_INTRO"
        )


# 12) [반복정보조회] 오퍼레이션조회	54
info_ENDPOINT = "http://apis.data.go.kr/B551011/KorService1/detailInfo1"


def get_info(contentId, contentTypeId):
    # contentTypeId => 관광타입(12:관광지, 14:문화시설, 15:축제공연행사, 25:여행코스, 28:레포츠, 32:숙박, 38:쇼핑, 39:음식점) ID
    params = {
        "serviceKey": API_KEY,  # **required**
        "MobileOS": "ETC",
        "MobileApp": "AppTest",
        "_type": "json",
        "contentId": contentId,
        "contentTypeId": contentTypeId,
        "numOfRows": "10",
        "pageNo": "1",
    }
    response = requests.get(info_ENDPOINT, params=params)

    if response.headers.get("Content-Type") == "application/json":
        data = response.json()
        return (
            data["response"]["body"]["items"]["item"]
            if data["response"]["body"]["items"]
            else None
        )
    else:
        raise Exception(
            "TOUR API ERROR : Limited number of service requests exceeds error in GET_INFO"
        )


# 13) [이미지정보조회] 오퍼레이션명세	61
image_ENDPOINT = "http://apis.data.go.kr/B551011/KorService1/detailImage1"


def get_image(contentId):
    params = {
        "serviceKey": API_KEY,  # **required**
        "MobileOS": "ETC",
        "MobileApp": "AppTest",
        "_type": "json",
        "contentId": contentId,
        "imageYN": "Y",
        "subImageYN": "Y",
        "numOfRows": "10",
        "pageNo": "1",
    }
    response = requests.get(image_ENDPOINT, params=params)

    if response.headers.get("Content-Type") == "application/json":
        data = response.json()
        return (
            data["response"]["body"]["items"]["item"]
            if data["response"]["body"]["items"]
            else None
        )
    else:
        raise Exception(
            "TOUR API ERROR : Limited number of service requests exceeds error in GET_IMAGE"
        )
