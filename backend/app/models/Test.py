from sqlalchemy import Column, Integer, String
from ..db.connection import Base


class Test(Base):
    __tablename__ = "Test"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    description = Column(String, index=True)
