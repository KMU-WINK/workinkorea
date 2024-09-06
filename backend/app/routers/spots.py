from fastapi import APIRouter, HTTPException
from ..external_services.areaBasedAPI import get_spots, get_spots
from datetime import datetime

formatted_date = datetime.now().strftime("%Y-%m-%d")

router = APIRouter(
    prefix="/spots",
    tags=["spots"],
)


# 검색어 + 지역
# 두 개의 API 합치기
@router.get("")
async def read_spots(keyword: str, area: str = "", pageNo: int = 1):
    try:
        # data = get_spots()
        # return data
        data = get_spots(keyword, area, pageNo)
        return data
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


# @router.get("/:id")
# async def read_spot(id: int):
#     return "spot_detail"
