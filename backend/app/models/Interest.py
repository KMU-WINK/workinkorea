from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from ..db.connection import Base


class Interest(Base):
    __tablename__ = "interests"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)

    users = relationship("User", secondary="user_interest", back_populates="interests")
