import re
from sqlalchemy import Column, Integer, String, ForeignKey, Table, Text
from sqlalchemy.orm import validates, relationship
from ..db.connection import Base

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

User_Work = Table(
    "user_work",
    Base.metadata,
    Column("user_id", Integer, ForeignKey("users.id"), primary_key=True),
    Column("work_id", Integer, ForeignKey("works.id"), primary_key=True),
)


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    social_id = Column(String, nullable=False, unique=True)
    social = Column(String, nullable=False)

    nickname = Column(String, index=True, unique=True)
    birth = Column(String)
    gender = Column(String)

    # 프로필 사진 Base64 필드 추가
    profile_picture_base64 = Column(Text, nullable=True)

    # on Boarding
    regions = relationship("Region", secondary=User_Region, back_populates="users")
    interests = relationship(
        "Interest", secondary=User_Interest, back_populates="users"
    )
    works = relationship("Work", secondary=User_Work, back_populates="users")

    # wishlist
    stays = relationship("Stay", back_populates="user")
    spots = relationship("Spot", back_populates="user")
    jobs = relationship("Job", back_populates="user")

    # column validation
    @validates("nickname")
    def validate_nickname(self, key, value):
        if len(value) > 6:
            raise ValueError("nickname must be less than 6 characters")
        return value

    @validates("social")
    def validate_name(self, key, value):
        login_list = ["kakao", "naver", "google"]
        if value not in login_list:
            raise ValueError(f"{value} is no in social list : {login_list}")
        return value

    @validates("birth")
    def validate_birth(self, key, value):
        # 정규 표현식을 사용해 "YYYY-MM-DD" 형식인지 확인
        if not re.match(r"^\d{4}-\d{2}-\d{2}$", value):
            raise ValueError(
                f"birth must be in 'YYYY-MM-DD' format, your input : {value}"
            )
        return value

    @validates("gender")
    def validate_gender(self, key, value):
        genders = ["남자", "여자"]
        if value not in genders:
            raise ValueError(f"{value} is not in valid gender :{genders}")
        return value
