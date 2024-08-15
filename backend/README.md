# WorkINKorea Backend

## 프로젝트 소개

이 백엔드 레포지토리는 API 서버와 데이터 처리 로직을 포함하고 있습니다.

## 기능

-

## 기술 스택

- FASTAPI
- SQL

## 디렉토리 구조 : File-Type Structure

- example
  ```
  .
  ├── app # Contains the main application files.
  │ ├── **init**.py # this file makes "app" a "Python package"
  │ ├── main.py # Initializes the FastAPI application.
  │ ├── dependencies.py # Defines dependencies used by the routers
  │ ├── routers
  │ │ ├── **init**.py
  │ │ ├── items.py # Defines routes and endpoints related to items.
  │ │ └── users.py # Defines routes and endpoints related to users.
  │ ├── crud
  │ │ ├── **init**.py
  │ │ ├── item.py # Defines CRUD operations for items.
  │ │ └── user.py # Defines CRUD operations for users.
  │ ├── db
  │ │ ├── **init**.py
  │ │ ├── connection.py # Connect to DB server.
  │ │ └── session.py    # Session management file.
  │ ├── schemas
  │ │ ├── **init**.py
  │ │ ├── item.py # Defines schemas for items.
  │ │ └── user.py # Defines schemas for users.
  │ ├── models
  │ │ ├── **init**.py
  │ │ ├── item.py # Defines database models for items.
  │ │ └── user.py # Defines database models for users.
  │ ├── external_services
  │ │ ├── **init**.py
  │ │ ├── email.py # Defines functions for sending emails.
  │ │ └── notification.py # Defines functions for sending notifications
  │ └── utils
  │ ├── **init**.py
  │ ├── authentication.py # Defines functions for authentication.
  │ └── validation.py # Defines functions for validation.
  ├── tests
  │ ├── **init**.py
  │ ├── test_main.py
  │ ├── test_items.py # Tests for the items module.
  │ └── test_users.py # Tests for the users module.
  ├── requirements.txt
  ├── .gitignore
  └── README.md
  ```
- app/: Contains the main application files.
- main.py: Initializes the FastAPI application.
- dependencies.py: Defines dependencies used by the routers.
- routers/: Contains router modules.
- crud/: Contains CRUD (Create, Read, Update, Delete) operation modules.
- schemas/: Contains Pydantic schema modules.
- models/: Contains database model modules.
- external_services/: Contains modules for interacting with external services. **(API is here)**
- utils/: Contains utility modules.
- tests/: Contains test modules.

## 설치 방법

1. **레포지토리 클론하기**
2. **의존성 설치하기**

- pip install -r requirements.txt

3. **환경 변수 설정하기**

- slack 통해서 .env 받으시면 됩니다.

4. **실행하기**

- uvicorn app.main:app --reload

## Push 전 참고사항

- 설치한 라이브러리가 있다면, Requirements에 반영 후 올려주세요
  - pip freeze > requirements.txt

## API 문서

API의 상세한 사용 방법은 `/docs` 경로에서 Swagger를 참고하세요.

## 사용하는 Open API

- **일반 인증키는 decoding된 값을 사용한다.**
- 한국관광공사 국문 관광정보 서비스 GW
  - endpoint : http://apis.data.go.kr/B551011/KorService1
  - 사용하는 세부 서비스마다 endpoint가 달라집니다. 위 url에 추가하여 사용해야합니다.
    - /areaCode1 : 지역코드조회
    - /categoryCode1 : 서비스분류코드조회
    - /areaBasedList1 : 지역기반관광정보조회
    - /locationBasedList1 : 위치기반관광정보조회
    - /searchKeyword1 : 키워드검색조회
    - /searchFestival1 : 행사정보조회
    - /searchStay1 : 숙박정보조회
    - /detailCommon1 : 공통정보조회 (상세정보1)
    - /detailIntro1 : 소개정보조회 (상세정보2)
    - /detailInfo1 : 반복정보조회 (상세정보3)
    - /detailImage1 : 이미지정보조회 (상세정보4)
    - /areaBasedSyncList1 : 국문관광정보 동기화목록조회
  - 관광 타입을 넣어주어야 하는 경우도 있다. **(ContentTypeId)**
    - 관광지: 12
    - 문화시설: 14
    - 행사/공연/축제: 15
    - 여행코스: 25
    - 레포츠: 28
    - 숙박: 32
    - 쇼핑: 38
    - 음식점: 39
