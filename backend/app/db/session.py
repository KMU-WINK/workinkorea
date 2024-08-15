# app/db/session.py
from .connection import SessionLocal


# 데이터베이스 세션을 가져오는 종속성 함수 정의
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
