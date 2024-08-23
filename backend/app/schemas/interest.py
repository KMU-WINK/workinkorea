from pydantic import BaseModel
from typing import List, Optional


class InterestBase(BaseModel):
    name: str
