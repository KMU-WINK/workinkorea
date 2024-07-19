from pydantic import BaseModel
from typing import List, Optional


class TestBase(BaseModel):
    title: str
    description: str


class TestCreate(TestBase):
    pass


class Test(TestBase):
    pass
