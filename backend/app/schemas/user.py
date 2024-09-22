from pydantic import BaseModel, Field
from typing import List, Optional


class UserBase(BaseModel):
    social_id: str


class UserCreate(UserBase):
    social: str  # 생성 시 필수 입력


class InfoUpdate(BaseModel):
    birth: Optional[str]
    gender: Optional[str]


class NicknameUpdate(BaseModel):
    nickname: str


class RegionUpdate(BaseModel):
    regions: List[str]


class InterestUpdate(BaseModel):
    interests: List[str]


class WorkUpdate(BaseModel):
    works: List[str]
