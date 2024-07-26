from sqlalchemy import Column, Integer, String
from ..db.connection import Base


class User(Base):
    __tablename__ = "User"

    id = Column(Integer, primary_key=True, index=True)
    nick_name = Column(String, index=True)
