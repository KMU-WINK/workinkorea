from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from ..db.session import get_db
from ..models.Region import Region
from ..models.Interest import Interest


router = APIRouter(
    prefix="/initial",
    tags=["INITIAL"],
)


# region을 사전에 만들어놓기 위한 코드입니다.
# @router.get("/store_region_to_db", include_in_schema=False) -> docs에서 사라집니다.
@router.get("/store_region_to_db", include_in_schema=False)
def store_region_to_db(db: Session = Depends(get_db)):
    regions = ["강릉", "부산", "제주", "경주", "여수", "전주", "춘천"]
    for region in regions:
        isntance = Region(name=region)
        db.add(isntance)
        db.commit()
        db.refresh(isntance)

    regions = db.query(Region).all()
    return regions


@router.get("/store_interest_to_db", include_in_schema=False)
def store_interest_to_db(db: Session = Depends(get_db)):
    interest_list = ["액티비티", "휴식", "도심", "자연", "핫플", "문화재", "배움"]
    for interest in interest_list:
        isntance = Interest(name=interest)
        db.add(isntance)
        db.commit()
        db.refresh(isntance)

    interests = db.query(Region).all()
    return interests
