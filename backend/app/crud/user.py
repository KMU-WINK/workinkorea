from sqlalchemy.orm import Session

from ..models.User import User
from ..schemas.user import UserCreate


def get_all(db: Session):
    return db.query(User).all()


def get(db: Session, user_id: int):
    return db.query(User).filter(User.id == user_id).first()


def create(db: Session, user: UserCreate):
    # User 모델 인스턴스 생성 (id는 자동 생성)
    new_user = User(login=user.login)
    # 데이터베이스에 새로운 유저 추가
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user


def update(db: Session, user: UserCreate, user_id: int):
    return "update user"


def delete(db: Session, user_id: int):
    return "delete user"
