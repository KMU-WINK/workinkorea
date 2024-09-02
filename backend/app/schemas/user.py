from pydantic import BaseModel, Field
from typing import List, Optional


class UserBase(BaseModel):
    social_id: str


class UserCreate(UserBase):
    social: str  # 생성 시 필수 입력


class UserInfoUpdate(UserBase):
    birth: Optional[str]
    gender: Optional[str]


class UserNicknameUpdate(UserBase):
    nickname: str


class UserRegionUpdate(UserBase):
    regions: List[str]


class UserInterestUpdate(UserBase):
    interests: List[str]


class UserWorkUpdate(UserBase):
    works: List[str]
