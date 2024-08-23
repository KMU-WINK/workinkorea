from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from ..db.connection import Base


class Work(Base):
    __tablename__ = "works"

    id = Column(Integer, primary_key=True, index=True)
    code = Column(String)
    name = Column(String)

    # User와의 일대일 관계 설정
    users = relationship("User", secondary="user_work", back_populates="works")
