from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from ..db.session import get_db
from ..models.Region import Region
from ..models.Interest import Interest
from ..models.Work import Work

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


@router.get("/store_work_to_db", include_in_schema=False)
def store_work_to_db(db: Session = Depends(get_db)):
    work_dict = {
        "J10101": "마케팅",
        "J10102": "홍보",
        "J10103": "인사",
        "J10104": "요식업",
        # "J10105": "숙박·여행·오락 및 스포츠 관련 관리자",
        # -> J10106, J10107, J10108 데이터 출력 시 포함해서 출력
        "J10106": "숙박업",
        "J10107": "오락",
        "J10108": "스포츠",
    }
    for code in work_dict.keys():
        instance = Work(code=code, name=work_dict[code])
        db.add(instance)
        db.commit()
        db.refresh(instance)
    works = db.query(Work).all()
    return works
