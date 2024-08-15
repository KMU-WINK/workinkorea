from pydantic import BaseModel, Field
from typing import List, Optional


class UserBase(BaseModel):
    social_id: str


class UserCreate(UserBase):
    social: str  # 생성 시 필수 입력


class UserUpdate(BaseModel):
    id: Optional[str] = None  # 선택적
    nickname: Optional[str] = None  # 선택적
    birth: Optional[str] = None  # 선택적
    gender: Optional[str] = None  # 선택적


class Test(UserBase):
    pass
