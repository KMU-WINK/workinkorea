from pydantic import BaseModel
from typing import List, Optional


class UserBase(BaseModel):
    nick_name: str


class UserCreate(UserBase):
    pass


class UserUpdate(UserBase):
    pass


class Test(UserBase):
    pass
