from pydantic import BaseModel


class RegionBase(BaseModel):
    name: str
