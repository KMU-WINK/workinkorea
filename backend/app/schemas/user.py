from pydantic import BaseModel, Field
from typing import List, Optional


class UserBase(BaseModel):
    login: Optional[str] = None  # 생성 시에는 필수


class UserCreate(UserBase):
    login: str  # 생성 시 필수 입력


class UserUpdate(UserBase):
    nickname: Optional[str] = None  # 선택적
    birth: Optional[str] = None  # 선택적
    gender: Optional[str] = None  # 선택적


class Test(UserBase):
    pass
