from pydantic import BaseModel
from typing import List, Optional


class UserBase(BaseModel):
    social_id: str


class UserCreate(UserBase):
    social: str  # 생성 시 필수 입력


class InfoUpdate(UserBase):
    birth: Optional[str]
    gender: Optional[str]


class NicknameUpdate(UserBase):
    nickname: str


class RegionUpdate(UserBase):
    regions: List[str]


class InterestUpdate(UserBase):
    interests: List[str]


class WorkUpdate(UserBase):
    works: List[str]
