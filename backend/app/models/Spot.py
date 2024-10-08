from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from ..db.connection import Base


class Spot(Base):
    __tablename__ = "spots"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    content_type_id = Column(String)
    content_id = Column(String)
    title = Column(String)
    addr1 = Column(String)
    addr2 = Column(String)
    firstimage = Column(String)
    firstimage2 = Column(String)

    # User와의 일대일 관계 설정
    user = relationship("User", back_populates="spots")
