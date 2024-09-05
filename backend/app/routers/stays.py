from fastapi import APIRouter
from ..external_services.areaBasedAPI import get_stays

router = APIRouter(
    prefix="/stays",
    tags=["stays"],
)


@router.get("")
async def read_stays(area: str, keyword: str = "", pageNo: int = 1):
    data = get_stays(area, keyword, pageNo)
    return data


# @router.get("/:id")
# async def read_stay(id: int):
#     return "stay_detail"
