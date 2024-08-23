from pydantic import BaseModel, Field
from typing import List, Optional


class UserBase(BaseModel):
    social_id: str


class UserCreate(UserBase):
    social: str  # 생성 시 필수 입력


class UserInfoUpdate(BaseModel):
    id: int
    birth: Optional[str]
    gender: Optional[str]


class UserNicknameUpdate(BaseModel):
    id: int
    nickname: str


class UserRegionUpdate(BaseModel):
    id: int
    regions: List[str]


class UserInterestUpdate(BaseModel):
    id: int
    interests: List[str]


class UserWorkUpdate(BaseModel):
    id: int
    works: List[str]
