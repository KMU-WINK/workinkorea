from fastapi import APIRouter

router = APIRouter(
    prefix="/items",
    tags=["items"],
)


@router.get("/", tags=["items"])
async def read_items():
    return [{"name": "Foo"}]
