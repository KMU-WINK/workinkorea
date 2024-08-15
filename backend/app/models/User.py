from sqlalchemy import Column, String
from ..db.connection import Base

class User(Base):
    __tablename__   = "User"
    
    nickname        = Column(String, primary_key=True, index=True)
    birth           = Column(String, index=True)
    gender          = Column(String, index=True)
    # 소셜 로그인 식별 용도로 사용
    id              = Column(String, index=True)
    provider        = Column(String, index=True)
        