from pydantic import BaseModel, Field
from typing import List, Optional


class UserBase(BaseModel):
    nickname: str
    birth: Optional[str] = Field(None, pattern=r"\d{4}-\d{2}-\d{2}$")
    gender: str


class UserCreate(UserBase):
    pass


class UserUpdate(UserBase):
    pass


class Test(UserBase):
    pass
