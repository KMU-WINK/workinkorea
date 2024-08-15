from sqlalchemy.orm import Session
from sqlalchemy.orm.exc import NoResultFound
from ..models.User import User
from ..schemas.user import UserCreate, UserUpdate


def get_all(db: Session):
    return db.query(User).all()


def get(db: Session, user_id: int):
    return db.query(User).filter(User.id == user_id).first()


def create(db: Session, user: UserCreate):
    # User 모델 인스턴스 생성 (id는 자동 생성)
    new_user = User(social_id=user.social_id, social=user.social)
    # 데이터베이스에 새로운 유저 추가
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user


def update(db: Session, user: UserUpdate):
    try:
        exist = db.query(User).filter(User.id == user.id).one()
        return exist
    except NoResultFound:
        return f"user not found. id: {user.id} is not exist"


def delete(db: Session, user_id: int):
    return "delete user"
