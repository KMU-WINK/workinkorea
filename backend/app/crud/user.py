from sqlalchemy.orm import Session
from ..models.User import User
from ..schemas.user import UserCreate


def get_users(db: Session):
    return db.query(User).all()


def get_user(db: Session, user_id: int):
    return db.query(User).filter(User.id == user_id).first()


def create_user(db: Session, user: UserCreate):
    return "create user"


def update_user(db: Session, user: UserCreate, user_id: int):
    return "update user"


def delete_user(db: Session, user_id: int):
    return "delete user"
