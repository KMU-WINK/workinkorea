from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import validates, relationship
from ..db.connection import Base
import re


class Interest(Base):
    __tablename__ = "Interest"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)

    interest_list = ["액티비티", "휴식", "도심", "자연", "핫플", "문화재", "배움"]

    @validates("name")
    def validate_name(self, key, value):
        if value not in self.interest_list:
            raise ValueError(f"{value} is not in interest list : {self.interest_list}")
        return value

    users = relationship("UserInterest", back_populates="interest")
