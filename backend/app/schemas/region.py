from pydantic import BaseModel
from typing import List, Optional


class RegionBase(BaseModel):
    name: str
