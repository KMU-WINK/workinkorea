from sqlalchemy.orm import Session
from ..models.Test import Test
from ..schemas.test import TestCreate


def get_test(db: Session):
    print("get test in crud")
    data = db.query(Test).all()
    print("data : ", data)
    return data


def create_test(db: Session, test: TestCreate):
    db_test = Test(**test.dict())
    db.add(db_test)
    db.commit()
    db.refresh(db_test)
    return db_test
