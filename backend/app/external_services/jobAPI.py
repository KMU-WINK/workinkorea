from fastapi import HTTPException
import requests
from dotenv import load_dotenv
from datetime import datetime
import os

load_dotenv()
API_KEY = os.getenv("API_KEY")

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

AREA_CODE_OPEN = {
    # "서울": "R3010",
    # "인천": "R3011",
    # "대전": "R3012",
    # "대구": "R3013",
    # "광주": "R3015",
    # "울산": "R3016",
    # "경기": "R3017",
    # "충남": "R3019",
    # "충북": "R3020",
    # "경북": "R3021",
    # "세종": "R3026",
    "강릉": "R3018",  # 강원도로 전환
    "부산": "R3014",
    "제주": "R3025",
    "경주": "R3022",  # 경남으로 전환
    "여수": "R3023",  # 전남으로 전환
    "전주": "R3024",  # 전북으로 전환
    "춘천": "R3018",  # 강원도로 전환
}


ENDPOINT_tour = "http://apis.data.go.kr/B551011/tursmService/empmnInfoList"
ENDPOINT_open = "http://apis.data.go.kr/1051000/recruitment/list"


# 현재 연도 및 오늘 날짜 설정
current_year = datetime.now().year
today = datetime.now().strftime("%Y-%m-%d")


def get_jobs(area: str, keyword: str, pageNo: int = 1, wishs=False):

    if len(area):
        white_list = ["강릉", "부산", "제주", "경주", "여수", "전주", "춘천"]
        if area not in white_list:
            raise ValueError(f"{area} is not in valid area list {white_list}")

    # 결과 생성
    result = {
        "items": {"item": []},
        "numOfRows": 0,
        "pageNo": 0,
        "totalCount": 0,
    }

    # 관광공사 채용정보 API, 5개 미만이기 때문에 첫 페이지에서만 호출
    if pageNo == 1:
        params = {
            "serviceKey": API_KEY,  # **required**
            "pageNo": pageNo,
            "numOfRows": "10",
            "MobileOS": "ETC",
            "MobileApp": "APP",
            "maxRegDt": today,  # 오늘 날짜
            "arrange": "A",
            "_type": "json",
            # "regnCd": AREA_CODE[area][0],
            # "empmnTitle": keyword,
        }
        if len(area):
            params["regnCd"] = AREA_CODE[area][0]
        # if len(AREA_CODE[area]) >= 2:
        #     params["signguCd"] = AREA_CODE[area][1]
        if len(keyword):
            params["empmnTitle"] = keyword
        # API 호출
        response = requests.get(ENDPOINT_tour, params=params)
        data = response.json()
        if data["response"]["body"]["items"]:
            data_rows = data["response"]["body"]["items"]["item"]
            for d in data_rows:
                tmp = dict()
                tmp["contenttypeid"] = "tour"  # 백엔드 확인용
                for key, value in d.items():
                    if key in [
                        "empmnInfoNo",
                        "corpoNm",
                        "corpoLogoFileUrl",
                        "empmnTtl",
                        "wageAmt",
                        "wrkpAdres",
                        "salStleCd",
                    ]:
                        if key == "empmnInfoNo":
                            tmp["contentid"] = value
                        elif key == "salStleCd":
                            tmp["salStle"] = TOUR_salStleCd[value] if value else ""
                        else:
                            tmp[key] = value
                # Wish 여부 추가
                if wishs:
                    tmp["inWish"] = True if tmp["contentid"] in wishs else False

                result["items"]["item"].append(tmp)
            result["numOfRows"] += data["response"]["body"]["numOfRows"]
            result["totalCount"] += data["response"]["body"]["totalCount"]

    # 공공기관 채용정보 API
    params = {
        "serviceKey": API_KEY,
        "numOfRows": "10",
        "pageNo": pageNo,
        "pbancBgngYmd": "2024-07-01",  # 시작 날짜
        "pbancEndYmd": today,  # 종료 날짜
        "resultType": "json",
    }
    if len(keyword):
        params["recrutPbancTtl"] = keyword
    if len(area):
        params["workRgnLst"] = AREA_CODE_OPEN[area]
    # API 호출
    response = requests.get(ENDPOINT_open, params=params)
    data = response.json()

    if data["resultCode"] == 200:
        data_rows = data["result"]
        for d in data_rows:
            # 아이템 가공
            tmp = dict()
            tmp["contenttypeid"] = "open"  # 백엔드 확인용
            for key, value in d.items():
                if key == "instNm":
                    tmp["corpoNm"] = value
                elif key == "recrutPbancTtl":
                    tmp["empmnTtl"] = value
                elif key == "workRgnNmLst":
                    tmp["wrkpAdres"] = value
                elif key == "recrutPblntSn":
                    tmp["contentid"] = str(value)
            # Wish 여부 추가
            if wishs:
                tmp["inWish"] = True if tmp["contentid"] in wishs else False
            # 아이템 추가
            result["items"]["item"].append(tmp)
        # 리스트 정보 갱신
        result["totalCount"] += data["totalCount"]
        result["numOfRows"] += len(data["result"])
        result["pageNo"] += data["totalCount"] // 10

    # 응답 처리
    if result["items"]["item"]:
        return result
    else:
        raise ValueError("No data found")


ENDPOINT_tour_datail = "http://apis.data.go.kr/B551011/tursmService/empmnInfoDetail"

ENDPOINT_open_detail = "http://apis.data.go.kr/1051000/recruitment/detail"

# Tour API 급여코드
TOUR_salStleCd = {
    "JC0601": "연봉",
    "JC0602": "월급",
    "JC0603": "일급",
    "JC0604": "시급",
    "JC0605": "회사내규에 따름",
    "JC0606": "면접 후 결정",
    "JC0607": "주급",
    "JC0608": "건별",
}

TOUR_eplmtStleCd = {
    "JC0201": "정규직",
    "JC0202": "계약직",
    "JC0203": "정규직/계약직",
    "JC0301": "시간(선택)제",
    "JC0303": "대체인력 채용",
    "JC0308": "연수생/교육생",
    "JC0309": "병역특례",
    "JC0310": "위촉직/개인사업자",
}


def get_job(contentId: str, contentTypeId: str, wishs=False):
    result = dict()
    # 관광공사 API
    if contentTypeId == "tour":
        params = {
            "serviceKey": API_KEY,
            "numOfRows": "10",
            "pageNo": "1",
            "MobileOS": "ETC",
            "MobileApp": "APP",
            "_type": "json",
            "empmnInfoNo": contentId,
        }
        # API 호출
        response = requests.get(ENDPOINT_tour_datail, params=params)
        data = response.json()
        if data["response"]["body"]["items"]:
            data_row = data["response"]["body"]["items"]["item"][0]

            result["contenttypeid"] = contentTypeId
            result["contentid"] = contentId
            for key, value in data_row.items():

                if key in [
                    "corpoNm",
                    "corpoLogoFileUrl",
                    "empmnTtl",
                    "dtyCn",
                    "rcritPnum",
                    "salStleCd",
                    "wageAmt",
                    "eplmtStleN1Cd",
                    "eplmtStleN2Cd",
                    "labrTimeCn",
                    "ordtmEmpmnYn",
                    "rcptDdlnDe",
                    "pvltrt",
                    "wrkpAdres",
                    "tursmEmpmnInfoURL",
                ]:
                    if key == "salStleCd":
                        result["salStle"] = TOUR_salStleCd[value] if value else ""
                    elif key == "eplmtStleN1Cd":
                        result["eplmtStleN1"] = TOUR_eplmtStleCd[value] if value else ""
                    elif key == "eplmtStleN2Cd":
                        result["eplmtStleN2"] = TOUR_eplmtStleCd[value] if value else ""
                    else:
                        result[key] = value
            # Wish 여부 추가
            if wishs:
                result["inWish"] = True if result["contentid"] in wishs else False
            print(result)
            return result
        else:
            raise ValueError("No data found")
    # 공공 API
    elif contentTypeId == "open":
        params = {
            "serviceKey": API_KEY,
            "resultType": "json",
            "sn": contentId,
        }
        response = requests.get(ENDPOINT_open_detail, params=params)
        data = response.json()
        if data["resultCode"] == 200:
            data_row = data["result"]
            result["contenttypeid"] = contentTypeId
            result["contentid"] = contentId
            for key, value in data_row.items():
                if key == "instNm":
                    result["corpoNm"] = value
                elif key == "recrutPbancTtl":
                    result["empmnTtl"] = value
                elif key == "ncsCdNmLst":
                    result["dtyCn"] = value
                elif key == "rcritPnum":
                    result["workRgnNmLst"] = value
                elif key == "pbancEndYmd":
                    result["rcptDdlnDe"] = value
                elif key == "aplyQlfcCn":
                    result["pvltrt"] = value
                elif key == "workRgnNmLst":
                    result["wrkpAdres"] = value
                elif key == "srcUrl":
                    result["tursmEmpmnInfoURL"] = value
            for key in [
                "corpoLogoFileUrl",
                "salStle",
                "wageAmt",
                "eplmtStleN1",
                "eplmtStleN2",
                "labrTimeCn",
                "ordtmEmpmnYn",
            ]:
                result[key] = ""
            # Wish 여부 추가
            if wishs:
                result["inWish"] = True if result["contentid"] in wishs else False
            return result
        else:
            raise ValueError("No data found")
    else:
        raise ValueError("contenttypeid is not in valid list [open, tour]")
