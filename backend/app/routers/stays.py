from fastapi import APIRouter, HTTPException
from ..external_services.areaBasedAPI import get_stays

router = APIRouter(
    prefix="/stays",
    tags=["stays"],
)


@router.get("")
async def read_stays(keyword: str, area: str = "", pageNo: int = 1):
    try:
        data = get_stays(keyword, area, pageNo)
        return data
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


# @router.get("/:id")
# async def read_stay(id: int):
#     return "stay_detail"
