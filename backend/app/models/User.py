from sqlalchemy import Column, Integer, String, ForeignKey, Table
from sqlalchemy.orm import validates, relationship
from ..db.connection import Base
import re
from .Region import Region  # Region 모델을 임포트
from .Interest import Interest  # Interest 모델을 임포트
from .Work import Work  # Work 모델을 임포트
from .Stay import Stay  # Stay 모델을 임포트
from .Spot import Spot  # Spot 모델을 임포트
from .Job import Job  # Job 모델을 임포트
from sqlalchemy.ext.declarative import declarative_base

# 다대다 관계 테이블 매핑
User_Region = Table(
    "user_region",
    Base.metadata,
    Column("user_id", Integer, ForeignKey("users.id"), primary_key=True),
    Column("region_id", Integer, ForeignKey("regions.id"), primary_key=True),
)

User_Interest = Table(
    "user_interest",
    Base.metadata,
    Column("user_id", Integer, ForeignKey("users.id"), primary_key=True),
    Column("interest_id", Integer, ForeignKey("interests.id"), primary_key=True),
)


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    login = Column(String, nullable=False)

    nickname = Column(String, index=True, unique=True)
    birth = Column(String)
    gender = Column(String)

    # on Boarding
    regions = relationship("Region", secondary=User_Region, back_populates="users")
    interests = relationship(
        "Interest", secondary=User_Interest, back_populates="users"
    )
    work = relationship("Work", back_populates="user", uselist=False)

    # wishlist
    stays = relationship("Stay", back_populates="user")
    spots = relationship("Spot", back_populates="user")
    jobs = relationship("Job", back_populates="user")

    # column validation
    @validates("login")
    def validate_name(self, key, value):
        login_list = ["kakao", "naver", "google"]
        if value not in login_list:
            raise ValueError(f"{value} is no in login list : {login_list}")
        return value

    @validates("birth")
    def validate_birth(self, key, value):
        # 정규 표현식을 사용해 "YYYY-MM-DD" 형식인지 확인
        if re.match(r"^\d{4}-\d{2}-\d{2}$", value):
            return value
        raise ValueError("birth must be in 'YYYY-MM-DD' format")
