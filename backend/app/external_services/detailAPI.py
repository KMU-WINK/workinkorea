# 10) [공통정보조회] 오퍼레이션명세	42
# 11) [소개정보조회] 오퍼레이션명세	47
# 12) [반복정보조회] 오퍼레이션조회	54
# 13) [이미지정보조회] 오퍼레이션명세	61

import requests
from dotenv import load_dotenv

import os

load_dotenv()
API_KEY = os.getenv("API_KEY")
print("API_KEY : ", API_KEY)


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

    # {
    #     "response": {
    #         "header": {"resultCode": "0000", "resultMsg": "OK"},
    #         "body": {
    #             "items": {
    #                 "item": [
    #                     {
    #                         "contentid": "126508",
    #                         "contenttypeid": "12",
    #                         "title": "경복궁",
    #                         "createdtime": "20041230090000",
    #                         "modifiedtime": "20240724145559",
    #                         "tel": "",
    #                         "telname": "",
    #                         "homepage": '<a href="https://royal.khs.go.kr/ROYAL/contents/menuInfo-gbg.do?grpCode=gbg" target="_blank" title="새창 : 경복궁 홈페이지로 이동">https://royal.khs.go.kr/</a>',
    #                         "booktour": "1",
    #                         "firstimage": "http://tong.visitkorea.or.kr/cms/resource/33/2678633_image2_1.jpg",
    #                         "firstimage2": "http://tong.visitkorea.or.kr/cms/resource/33/2678633_image3_1.jpg",
    #                         "cpyrhtDivCd": "Type3",
    #                         "areacode": "1",
    #                         "sigungucode": "23",
    #                         "cat1": "A02",
    #                         "cat2": "A0201",
    #                         "cat3": "A02010100",
    #                         "addr1": "서울특별시 종로구 사직로 161",
    #                         "addr2": "",
    #                         "zipcode": "03045",
    #                         "mapx": "126.9769930325",
    #                         "mapy": "37.5788222356",
    #                         "mlevel": "6",
    #                         "overview": "경복궁은 1395년 태조 이성계에 의해서 새로운 조선왕조의 법궁으로 지어졌다. 경복궁은 동궐(창덕궁)이나 서궐(경희궁)에 비해 위치가 북쪽에 있어 ‘북궐’이라 불리기도 했다. 경복궁은 5대 궁궐 가운데 으뜸의 규모와 건축미를 자랑한다. 경복궁 근정전에서 즉위식을 가진 왕들을 보면 제2대 정종, 제4대 세종, 제6대 단종, 제7대 세조, 제9대 성종, 제11대 중종, 제13대 명종 등이다. 경복궁은 임진왜란 때 상당수의 건물이 불타 없어진 아픔을 갖고 있으며, 고종 때에 흥선대원군의 주도 아래 7,700여 칸에 이르는 건물들을 다시 세웠다. 그러나 또다시 명성황후 시해사건이 일어나면서 왕조의 몰락과 함께 경복궁도 왕궁으로서의 기능을 상실하고 말았다. 경복궁에는 조선시대의 대표적인 건축물인 경회루와 향원정의 연못이 원형대로 남아 있으며, 근정전의 월대와 조각상들은 당시의 조각미술을 대표한다. 현재 흥례문 밖 서편에는 국립고궁 박물관이 위치하고 있고, 경복궁 내 향원정의 동편에는 국립민속 박물관이 위치하고 있다.\n\n* 주요 문화재\n1) 사적 경복궁\n2) 국보 경복궁 근정전\n3) 국보 경복궁 경회루\n4) 보물 경복궁 자경전\n5) 보물 경복궁 자경전 십장생 굴뚝\n6) 보물 경복궁 아미산굴뚝\n7) 보물 경복궁 근정문 및 행각\n8) 보물 경복궁 풍기대\n\n◎ 한류의 매력을 만나는 여행 정보\n미국의 국민 TV 쇼 ‘더 투나잇 쇼 스타링 지미 팰런’에서는 ‘BTS위크’라는 이름을 붙여 닷새간 BTS 특별 방송을 진행했는데, 그중 BTS가 ‘맵 오브 더 솔 : 페르소나’ 미니앨범 수록곡 ‘소우주’와 ‘IDOL’을 부른 장소가 화제다. 그 장소는 바로 조선시대의 궁궐 중 하나인 ‘경복궁’의 경회루와 근정전이다. 보랏빛 조명에 아름답게 빛나던 경복궁에서 한국의 과거를 체험해 보길 추천한다.",
    #                     }
    #                 ]
    #             },
    #             "numOfRows": 1,
    #             "pageNo": 1,
    #             "totalCount": 1,
    #         },
    #     }
    # }
    data = response.json()
    return (
        data["response"]["body"]["items"]["item"][0]
        if data["response"]["body"]["items"]
        else None
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

    # {
    #     "data": {
    #         "response": {
    #             "header": {"resultCode": "0000", "resultMsg": "OK"},
    #             "body": {
    #                 "items": {
    #                     "item": [
    #                         {
    #                             "contentid": "126508",
    #                             "contenttypeid": "12",
    #                             "heritage1": "0",
    #                             "heritage2": "0",
    #                             "heritage3": "0",
    #                             "infocenter": "경복궁 관리소 02-3700-3900",
    #                             "opendate": "",
    #                             "restdate": "매주 화요일 <br>※ 단, 정기휴일이 공휴일 및 대체공휴일과 겹칠 경우에는 개방하며, 그 다음의 첫 번째 비공휴일이 정기휴일임",
    #                             "expguide": "",
    #                             "expagerange": "",
    #                             "accomcount": "",
    #                             "useseason": "",
    #                             "usetime": "- 1월~2월, 11월~12월 09:00~17:00 (입장마감 16:00)<br>\n- 3월~5월, 9월~10월 09:00~18:00 (입장마감 17:00)<br>\n- 6월~8월 09:00~18:30 (입장마감 17:30)",
    #                             "parking": "가능",
    #                             "chkbabycarriage": "없음",
    #                             "chkpet": "",
    #                             "chkcreditcard": "가능",
    #                         }
    #                     ]
    #                 },
    #                 "numOfRows": 1,
    #                 "pageNo": 1,
    #                 "totalCount": 1,
    #             },
    #         }
    #     }
    # }

    data = response.json()
    return (
        data["response"]["body"]["items"]["item"][0]
        if data["response"]["body"]["items"]
        else None
    )


# 12) [반복정보조회] 오퍼레이션조회	54
info_ENDPOINT = "https://apis.data.go.kr/B551011/KorService1/detailInfo1"


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
    # {
    #     "data": {
    #         "response": {
    #             "header": {"resultCode": "0000", "resultMsg": "OK"},
    #             "body": {
    #                 "items": {
    #                     "item": [
    #                         {
    #                             "contentid": "126508",
    #                             "contenttypeid": "12",
    #                             "serialnum": "0",
    #                             "infoname": "입 장 료",
    #                             "infotext": "개인 3,000원<br>\n단체 2,400원<br>\n※ 단체 10인 이상<br>\n※ 자세한 사항은 홈페이지 참조 요망",
    #                             "fldgubun": "3",
    #                         },
    #                         {
    #                             "contentid": "126508",
    #                             "contenttypeid": "12",
    #                             "serialnum": "1",
    #                             "infoname": "화장실",
    #                             "infotext": "있음(경회루, 곡수지, 태원전, 사무실옆, 주차장)",
    #                             "fldgubun": "3",
    #                         },
    #                         {
    #                             "contentid": "126508",
    #                             "contenttypeid": "12",
    #                             "serialnum": "2",
    #                             "infoname": "주차요금",
    #                             "infotext": "[소형]<br>\n- 기본 1시간 3,000원<br>\n- 초과요금(매 10분) 800원<br>\n- 회전시간(10분) 무료<br>\n[중/대형]<br>\n- 기본 1시간 5,000원<br>\n- 초과요금(매 10분) 800원<br>\n- 회전시간(10분) 무료<br>\n※ 자세한 사항은 전화문의 요망 (02-736-9536)",
    #                             "fldgubun": "3",
    #                         },
    #                         {
    #                             "contentid": "126508",
    #                             "contenttypeid": "12",
    #                             "serialnum": "3",
    #                             "infoname": "내국인 예약안내",
    #                             "infotext": "홈페이지 예약 가능",
    #                             "fldgubun": "4",
    #                         },
    #                         {
    #                             "contentid": "126508",
    #                             "contenttypeid": "12",
    #                             "serialnum": "4",
    #                             "infoname": "한국어 안내서비스",
    #                             "infotext": "* 월, 수, 목 : 10:00, 10:30, 11:00, 13:00, 13:30, 14:00, 14:30, 15:00, 16:00 (11~2월 16:00->15:30) <br />\n* 금, 토, 일 : 10:00, 10:30, 11:00, 11:30, 12:00, 12:30, 13:00, 13:30, 14:00, 14:30, 15:00, 16:00 (11~2월 16:00->15:30)<br />\n※ 시작하는 곳 : 경복궁 안내실 앞(흥례문 안쪽)<br />\n※ 소요시간 : 1시간~1시간 30분<br />\n<br />\n[경회루 특별관람(4월~10월)]<br />\n10:00, 11:00, 14:00, 16:00 (휴궁일 화요일 제외)<br />\n※ 전원 선착순 예약제 회당 20명까지 (한국인 15명, 외국인 5명) / 1인당 2명까지 예약 가능<br />\n※ 시작하는 곳 : 경회루 옆 함홍문<br />\n※ 소요시간 : 40분",
    #                             "fldgubun": "4",
    #                         },
    #                         {
    #                             "contentid": "126508",
    #                             "contenttypeid": "12",
    #                             "serialnum": "5",
    #                             "infoname": "외국어 안내서비스",
    #                             "infotext": "※ 시작하는 곳 : 경복궁 안내실 앞(흥례문 안쪽)<br />\n※ 소요시간 : 1시간~1시간 30분<br>\n- 영어 (수~월요일) : 11:00, 13:30, 15:30<br />\n- 일본어 (수~월요일) : 10:00, 14:30<br />\n- 중국어 (수~월요일) : 10:30, 15:00<br />\n- 스페인어 (금~토요일)  : 10:30, 15:00",
    #                             "fldgubun": "4",
    #                         },
    #                     ]
    #                 },
    #                 "numOfRows": 6,
    #                 "pageNo": 1,
    #                 "totalCount": 6,
    #             },
    #         }
    #     }
    # }

    data = response.json()

    return {
        "info": (
            data["response"]["body"]["items"]["item"]
            if data["response"]["body"]["items"]
            else None
        ),
    }


# 13) [이미지정보조회] 오퍼레이션명세	61
image_ENDPOINT = "https://apis.data.go.kr/B551011/KorService1/detailImage1"


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

    # {
    #     "data": {
    #         "response": {
    #             "header": {"resultCode": "0000", "resultMsg": "OK"},
    #             "body": {
    #                 "items": {
    #                     "item": [
    #                         {
    #                             "contentid": "126508",
    #                             "originimgurl": "http://tong.visitkorea.or.kr/cms/resource/37/1568037_image2_1.jpg",
    #                             "imgname": "경복궁",
    #                             "smallimageurl": "http://tong.visitkorea.or.kr/cms/resource/37/1568037_image3_1.jpg",
    #                             "cpyrhtDivCd": "Type3",
    #                             "serialnum": "1568037_8",
    #                         },
    #                         {
    #                             "contentid": "126508",
    #                             "originimgurl": "http://tong.visitkorea.or.kr/cms/resource/22/2678622_image2_1.jpg",
    #                             "imgname": "경복궁_사진갤러리",
    #                             "smallimageurl": "http://tong.visitkorea.or.kr/cms/resource/22/2678622_image3_1.jpg",
    #                             "cpyrhtDivCd": "Type3",
    #                             "serialnum": "2678622_6",
    #                         },
    #                         {
    #                             "contentid": "126508",
    #                             "originimgurl": "http://tong.visitkorea.or.kr/cms/resource/27/2678627_image2_1.jpg",
    #                             "imgname": "경복궁_사진갤러리",
    #                             "smallimageurl": "http://tong.visitkorea.or.kr/cms/resource/27/2678627_image3_1.jpg",
    #                             "cpyrhtDivCd": "Type3",
    #                             "serialnum": "2678627_2",
    #                         },
    #                         {
    #                             "contentid": "126508",
    #                             "originimgurl": "http://tong.visitkorea.or.kr/cms/resource/28/2678628_image2_1.jpg",
    #                             "imgname": "경복궁_사진갤러리",
    #                             "smallimageurl": "http://tong.visitkorea.or.kr/cms/resource/28/2678628_image3_1.jpg",
    #                             "cpyrhtDivCd": "Type3",
    #                             "serialnum": "2678628_4",
    #                         },
    #                         {
    #                             "contentid": "126508",
    #                             "originimgurl": "http://tong.visitkorea.or.kr/cms/resource/29/2678629_image2_1.jpg",
    #                             "imgname": "경복궁_사진갤러리",
    #                             "smallimageurl": "http://tong.visitkorea.or.kr/cms/resource/29/2678629_image3_1.jpg",
    #                             "cpyrhtDivCd": "Type3",
    #                             "serialnum": "2678629_9",
    #                         },
    #                         {
    #                             "contentid": "126508",
    #                             "originimgurl": "http://tong.visitkorea.or.kr/cms/resource/32/2678632_image2_1.jpg",
    #                             "imgname": "경복궁_사진갤러리",
    #                             "smallimageurl": "http://tong.visitkorea.or.kr/cms/resource/32/2678632_image3_1.jpg",
    #                             "cpyrhtDivCd": "Type3",
    #                             "serialnum": "2678632_1",
    #                         },
    #                         {
    #                             "contentid": "126508",
    #                             "originimgurl": "http://tong.visitkorea.or.kr/cms/resource/39/2932639_image2_1.bmp",
    #                             "imgname": "경복궁 (1)",
    #                             "smallimageurl": "http://tong.visitkorea.or.kr/cms/resource/39/2932639_image3_1.bmp",
    #                             "cpyrhtDivCd": "Type1",
    #                             "serialnum": "2932639_5",
    #                         },
    #                         {
    #                             "contentid": "126508",
    #                             "originimgurl": "http://tong.visitkorea.or.kr/cms/resource/46/3083546_image2_1.JPG",
    #                             "imgname": "경복궁 (7)",
    #                             "smallimageurl": "http://tong.visitkorea.or.kr/cms/resource/46/3083546_image3_1.JPG",
    #                             "cpyrhtDivCd": "Type3",
    #                             "serialnum": "3083546_3",
    #                         },
    #                         {
    #                             "contentid": "126508",
    #                             "originimgurl": "http://tong.visitkorea.or.kr/cms/resource/34/1994234_image2_1.jpg",
    #                             "imgname": "서울_기타_5대 궁궐 주변 맛집02",
    #                             "smallimageurl": "http://tong.visitkorea.or.kr/cms/resource/34/1994234_image3_1.jpg",
    #                             "cpyrhtDivCd": "Type3",
    #                             "serialnum": "1994234_11",
    #                         },
    #                         {
    #                             "contentid": "126508",
    #                             "originimgurl": "http://tong.visitkorea.or.kr/cms/resource/73/2005773_image2_1.jpg",
    #                             "imgname": "서울_경복궁16",
    #                             "smallimageurl": "http://tong.visitkorea.or.kr/cms/resource/73/2005773_image3_1.jpg",
    #                             "cpyrhtDivCd": "Type3",
    #                             "serialnum": "2005773_12",
    #                         },
    #                     ]
    #                 },
    #                 "numOfRows": 10,
    #                 "pageNo": 1,
    #                 "totalCount": 11,
    #             },
    #         }
    #     }
    # }
    data = response.json()
    print(data)
    return {
        "images": (
            data["response"]["body"]["items"]["item"]
            if data["response"]["body"]["items"]
            else None
        ),
    }
