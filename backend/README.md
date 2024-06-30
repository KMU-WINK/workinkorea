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
- app/: Contains the main application files.
- main.py: Initializes the FastAPI application.
- dependencies.py: Defines dependencies used by the routers.
- routers/: Contains router modules.
- crud/: Contains CRUD (Create, Read, Update, Delete) operation modules.
- schemas/: Contains Pydantic schema modules.
- models/: Contains database model modules.
- external_services/: Contains modules for interacting with external services.
- utils/: Contains utility modules.
- tests/: Contains test modules.

## 설치 방법

1. **레포지토리 클론하기**
2. **의존성 설치하기**

- pip install -r requirements.txt

3. **환경 변수 설정하기**

- 아직 환경변수는 없습니다.

4. **실행하기**

- uvicorn app.main:app --reload

## Push 전 참고사항

- 설치한 라이브러리가 있다면, Requirements에 반영 후 올려주세요
  - pip freeze > requirements.txt

## API 문서

API의 상세한 사용 방법은 `/docs` 경로에서 Swagger를 참고하세요.
