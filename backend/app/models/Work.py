from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from ..db.connection import Base


class Work(Base):
    __tablename__ = "works"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(
        Integer, ForeignKey("users.id"), unique=True
    )  # 일대일 관계에서 unique=True 설정
    works = Column(String)

    # User와의 일대일 관계 설정
    user = relationship("User", back_populates="work")
