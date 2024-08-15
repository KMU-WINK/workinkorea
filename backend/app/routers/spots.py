from fastapi import APIRouter
from ..external_services.areaBasedAPI import get_spots

router = APIRouter(
    prefix="/spots",
    tags=["spots"],
)


@router.get("")
async def read_spots():
    data = get_spots()
    return data


@router.get("/:id")
async def read_spot(id: int):
    return "spot_detail"
