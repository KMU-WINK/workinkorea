from fastapi import APIRouter
from ..external_services.areaBasedAPI import get_spots

router = APIRouter(
    prefix="/spots",
    tags=["spots"],
)


@router.get("/")
async def read_items():
    data = get_spots()
    return data
