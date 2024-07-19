from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..crud.test import get_test, create_test
from ..schemas.test import Test, TestCreate
from ..db.session import get_db

router = APIRouter(
    prefix="/tests",
    tags=["tests"],
)


@router.get("/")
async def get_tests(db: Session = Depends(get_db)):
    print("get test in router")
    data = get_test(db)
    print(data)
    return data


# user: UserCreate, db: Session = Depends(get_db)
@router.post("/")
async def post_test(test: TestCreate, db: Session = Depends(get_db)):
    print(test)
    data = create_test(db, test)
    print(data)
    return data
