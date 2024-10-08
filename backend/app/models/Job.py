from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from ..db.connection import Base


class Job(Base):
    __tablename__ = "jobs"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    content_type_id = Column(String)
    content_id = Column(String)
    corpoNm = Column(String)
    empmnTtl = Column(String)
    wageAmt = Column(String)
    wrkpAdres = Column(String)
    corpoLogoFileUrl = Column(String)
    salStle = Column(String)
    # User와의 일대일 관계 설정
    user = relationship("User", back_populates="jobs")
