from fastapi import APIRouter
from ..schemas.user import UserUpdate, UserCreate

router = APIRouter(
    prefix="/users",
    tags=["users"],
)


@router.get("")
async def read_users():
    return "user_list"


@router.get("/:id")
async def read_user(id: int):
    return "user_detail"


@router.post("")
async def update_user(User: UserCreate):
    return "create_user"


@router.patch("/:id")
async def update_user(id: int, User: UserUpdate):
    return "update_user"


@router.delete("/:id")
async def delete_user(id: int):
    return "delete_user"
