from fastapi import APIRouter
from ..external_services.areaBasedAPI import get_stays

router = APIRouter(
    prefix="/stays",
    tags=["stays"],
)


@router.get("/")
async def read_items():
    data = get_stays()
    return data
