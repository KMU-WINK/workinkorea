from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import validates, relationship
from ..db.connection import Base
import re


class User(Base):
    __tablename__ = "User"

    id = Column(Integer, primary_key=True, index=True)
    login = Column(String)
    login_list = ["kakao", "naver", "google"]

    @validates("login")
    def validate_name(self, key, value):
        if value not in self.login_list:
            raise ValueError(f"{value} is no in login list : {self.login_list}")
        return value

    nickname = Column(String, index=True, unique=True)
    birth = Column(String)
    gender = Column(String)

    @validates("birth")
    def validate_birth(self, key, value):
        # 정규 표현식을 사용해 "YYYY-MM-DD" 형식인지 확인
        if re.match(r"^\d{4}-\d{2}-\d{2}$", value):
            return value
        raise ValueError("birth must be in 'YYYY-MM-DD' format")

    regions = relationship("UserRegion", back_populates="user")
    interests = relationship("UserInterest", back_populates="user")
    works = relationship("UserWork", back_populates="user")


# 다대다 관계 테이블 매핑


class UserRegion(Base):
    __tablename__ = "user_regions"

    user_id = Column(String, ForeignKey("user.id"), primary_key=True)
    id = Column(String, ForeignKey("region.id"), primary_key=True)

    user = relationship("User", back_populates="regions")
    region = relationship("Region", back_populates="users")


class UserInterest(Base):
    __tablename__ = "user_interests"

    user_id = Column(String, ForeignKey("user.id"), primary_key=True)
    id = Column(String, ForeignKey("interest.id"), primary_key=True)

    user = relationship("User", back_populates="interests")
    interest = relationship("Interest", back_populates="users")


class UserWork(Base):
    __tablename__ = "user_works"
    user_id = Column(String, ForeignKey("user.id"), primary_key=True)
    works = Column(String, primary_key=True)

    user = relationship("User", back_populates="works")


# 사용자 좋아요 : 다대다 테이블 매칭


class UserStay(Base):
    __tablename__ = "user_stays"
    user_id = Column(String, ForeignKey("user.id"), primary_key=True)
    content_id = Column(String, primary_key=True)

    user = relationship("User", back_populates="stays")


class UserSpot(Base):
    __tablename__ = "user_spots"
    user_id = Column(String, ForeignKey("user.id"), primary_key=True)
    content_id = Column(String, primary_key=True)

    user = relationship("User", back_populates="spots")


class UserJob(Base):
    __tablename__ = "user_jobs"
    user_id = Column(String, ForeignKey("user.id"), primary_key=True)
    content_id = Column(String, primary_key=True)

    user = relationship("User", back_populates="jobs")
