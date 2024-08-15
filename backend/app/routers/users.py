from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..schemas.user import UserUpdate, UserCreate
from ..crud import user
from ..db.session import get_db

router = APIRouter(
    prefix="/users",
    tags=["users"],
)


@router.get("")
async def read_users(db: Session = Depends(get_db)):
    return user.get_all(db)


@router.get("/:id")
async def read_user(id: int, db: Session = Depends(get_db)):
    result = user.get(db, user_id=id)
    return result


@router.post("")
async def create_user(params: UserCreate, db: Session = Depends(get_db)):
    new_user = user.create(db, user=params)
    return new_user


@router.patch("")
async def update_user(user: UserUpdate, db: Session = Depends(get_db)):
    result = user.update(db, user=user)
    return result


@router.delete("/:id")
async def delete_user(id: int):
    return "delete_user"
