from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import validates, relationship
from ..db.connection import Base
import re


class Region(Base):
    __tablename__ = "Region"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)

    region_list = ["강릉", "부산", "제주", "경주", "여수", "전주", "춘천"]

    @validates("name")
    def validate_name(self, key, value):
        if value not in self.region_list:
            raise ValueError(f"{value} is not in region list : {self.region_list}")
        return value

    users = relationship("UserRegion", back_populates="region")
