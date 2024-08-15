from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from ..db.connection import Base


class Region(Base):
    __tablename__ = "regions"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)

    users = relationship("User", secondary="user_region", back_populates="regions")
