from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import insert, delete
from sqlalchemy.orm import Session
from ..schemas.user import (
    UserInfoUpdate,
    UserCreate,
    UserNicknameUpdate,
    UserRegionUpdate,
    UserInterestUpdate,
    UserWorkUpdate,
)
from ..models.Interest import Interest
from ..models.Region import Region
from ..models.Work import Work
from ..models.User import User, User_Region, User_Interest, User_Work
from ..db.session import get_db

router = APIRouter(
    prefix="/users",
    tags=["users"],
)


# utility function


def get_regions_by_id(id: str, db: Session = Depends(get_db)):
    # 유저가 가지고 있는 region_id 리스트 가져오기
    region_ids = (
        db.query(User_Region.c.region_id).filter(User_Region.c.user_id == id).all()
    )

    # region_ids는 튜플 리스트로 반환되므로, 이를 리스트로 변환
    region_ids = [r[0] for r in region_ids]

    # Region 테이블에서 region_id에 해당하는 name 값 가져오기
    region_names = db.query(Region.name).filter(Region.id.in_(region_ids)).all()

    # region_names는 튜플 리스트로 반환되므로, 이를 리스트로 변환
    region_names = [r[0] for r in region_names]
    return region_names


def get_interests_by_id(id: str, db: Session = Depends(get_db)):
    # 유저가 가지고 있는 region_id 리스트 가져오기
    interest_ids = (
        db.query(User_Interest.c.interest_id)
        .filter(User_Interest.c.user_id == id)
        .all()
    )

    # region_ids는 튜플 리스트로 반환되므로, 이를 리스트로 변환
    interest_ids = [r[0] for r in interest_ids]

    # Region 테이블에서 region_id에 해당하는 name 값 가져오기
    interest_names = db.query(Interest.name).filter(Interest.id.in_(interest_ids)).all()

    # region_names는 튜플 리스트로 반환되므로, 이를 리스트로 변환
    interest_names = [r[0] for r in interest_names]
    return interest_names


def get_works_by_id(id: str, db: Session = Depends(get_db)):
    # 유저가 가지고 있는 region_id 리스트 가져오기
    work_ids = db.query(User_Work.c.work_id).filter(User_Work.c.user_id == id).all()

    # region_ids는 튜플 리스트로 반환되므로, 이를 리스트로 변환
    work_ids = [r[0] for r in work_ids]

    # Region 테이블에서 region_id에 해당하는 name 값 가져오기
    work_names = db.query(Work.name).filter(Work.id.in_(work_ids)).all()

    # region_names는 튜플 리스트로 반환되므로, 이를 리스트로 변환
    work_names = [r[0] for r in work_names]
    return work_names


# root path


@router.get("")
async def read_users(db: Session = Depends(get_db)):
    return db.query(User).all()


@router.get("/id")
async def read_user(id: int, db: Session = Depends(get_db)):
    exist = db.query(User).filter(User.id == id).first()

    if exist is None:
        raise HTTPException(status_code=400, detail=f"user not found. id: {id}")

    region_names = get_regions_by_id(id, db)
    interest_names = get_interests_by_id(id, db)
    work_names = get_works_by_id(id, db)
    return {
        "user": exist,
        "regions": region_names,
        "interests": interest_names,
        "works": work_names,
    }


@router.post("")
async def create_user(user: UserCreate, db: Session = Depends(get_db)):
    # User 모델 인스턴스 생성 (id는 자동 생성)
    new_user = User(social_id=user.social_id, social=user.social)
    # 데이터베이스에 새로운 유저 추가
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user


@router.patch("/nickname")
async def update_user_nickname(user: UserNicknameUpdate, db: Session = Depends(get_db)):

    user_to_update = db.query(User).filter(User.id == user.id).first()

    # id 유효하지 않은 경우 에러
    if user_to_update is None:
        raise HTTPException(status_code=400, detail=f"user not found. id: {user.id}")

    else:
        exists = db.query(User).filter(User.nickname == user.nickname).first()
        if exists:  # 닉네임 중복 체크
            raise HTTPException(
                status_code=400,
                detail=f"nickname is already exist. id: {user.nickname}",
            )

        user_to_update = db.query(User).filter(User.id == user.id).first()

        # id 유효하지 않은 경우 에러
        if user_to_update is None:
            raise HTTPException(
                status_code=400, detail=f"user not found. id: {user.id}"
            )

        # 닉네임 업데이트
        user_to_update.nickname = user.nickname
        db.commit()
        db.refresh(user_to_update)

        return {"message": "Nickname updated successfully.", "user": user_to_update}


@router.patch("/info")
async def update_user_info(user: UserInfoUpdate, db: Session = Depends(get_db)):

    user_to_update = db.query(User).filter(User.id == user.id).first()

    # id 유효하지 않은 경우 에러
    if user_to_update is None:
        raise HTTPException(status_code=400, detail=f"user not found. id: {user.id}")

    else:
        # 유저 정보 업데이트
        try:
            user_to_update.birth = user.birth
            user_to_update.gender = user.gender
            db.commit()
            db.refresh(user_to_update)

            return {"message": "User updated successfully.", "user": user_to_update}
        except Exception as e:
            raise HTTPException(status_code=400, detail=str(e))


#### Region


@router.patch("/region")
async def update_user_region(user: UserRegionUpdate, db: Session = Depends(get_db)):

    user_to_update = db.query(User).filter(User.id == user.id).first()

    # id 유효하지 않은 경우 에러
    if user_to_update is None:
        raise HTTPException(status_code=400, detail=f"user not found. id: {user.id}")

    else:
        # 지역 예외처리
        for region in user.regions:
            if region not in ["강릉", "부산", "제주", "경주", "여수", "전주", "춘천"]:
                raise HTTPException(
                    status_code=400,
                    detail=f"region is not valid. {region} is not in selections",
                )

        # 기존의 User_Region 데이터를 삭제
        delete_stmt = delete(User_Region).where(User_Region.c.user_id == user.id)
        db.execute(delete_stmt)
        db.commit()

        # 유저 정보 업데이트
        for region in user.regions:
            region_id = db.query(Region).filter(Region.name == region).first().id
            stmt = insert(User_Region).values(user_id=user.id, region_id=region_id)
            # print(region_id)
            db.execute(stmt)
            db.commit()
        db.refresh(user_to_update)

        region_names = get_regions_by_id(user_to_update.id, db)

        return {
            "message": "User updated successfully.",
            "user": user_to_update,
            "region_names": region_names,
        }


#### Interest


@router.patch("/interest")
async def update_user_interest(user: UserInterestUpdate, db: Session = Depends(get_db)):

    user_to_update = db.query(User).filter(User.id == user.id).first()

    # id 유효하지 않은 경우 에러
    if user_to_update is None:
        raise HTTPException(status_code=400, detail=f"user not found. id: {user.id}")

    else:
        # 예외처리
        for interest in user.interests:
            if interest not in [
                "액티비티",
                "휴식",
                "도심",
                "자연",
                "핫플",
                "문화재",
                "배움",
            ]:
                raise HTTPException(
                    status_code=400,
                    detail=f"interest is not valid. {interest} is not in selections",
                )
        # 기존의 User_Interest 데이터를 삭제
        delete_stmt = delete(User_Interest).where(User_Interest.c.user_id == user.id)
        db.execute(delete_stmt)
        db.commit()

        # 유저 정보 업데이트
        for interest in user.interests:
            interest_id = (
                db.query(Interest).filter(Interest.name == interest).first().id
            )
            stmt = insert(User_Interest).values(
                user_id=user.id, interest_id=interest_id
            )
            # print(region_id)
            db.execute(stmt)
            db.commit()
        db.refresh(user_to_update)

        interest_names = get_interests_by_id(user_to_update.id, db)

        return {
            "message": "User updated successfully.",
            "user": user_to_update,
            "interests": interest_names,
        }


#### Work


@router.patch("/work")
async def update_user_work(user: UserWorkUpdate, db: Session = Depends(get_db)):

    user_to_update = db.query(User).filter(User.id == user.id).first()

    # id 유효하지 않은 경우 에러
    if user_to_update is None:
        raise HTTPException(status_code=400, detail=f"user not found. id: {user.id}")

    else:
        # 예외처리
        for work in user.works:
            if work not in [
                "마케팅",
                "홍보",
                "인사",
                "요식업",
                "숙박업",
                "오락",
                "스포츠",
            ]:
                raise HTTPException(
                    status_code=400,
                    detail=f"work is not valid. {work} is not in selections",
                )
        # 기존의 User_Work 데이터를 삭제
        delete_stmt = delete(User_Work).where(User_Work.c.user_id == user.id)
        db.execute(delete_stmt)
        db.commit()

        # 유저 정보 업데이트
        for work in user.works:
            work_id = db.query(Work).filter(Work.name == work).first().id
            stmt = insert(User_Work).values(user_id=user.id, work_id=work_id)
            print("work_id", work_id)
            print(stmt)
            db.execute(stmt)
            db.commit()
        db.refresh(user_to_update)

        work_names = get_works_by_id(user_to_update.id, db)

        return {
            "message": "User updated successfully.",
            "user": user_to_update,
            "works": work_names,
        }


@router.delete("/id")
async def delete_user(id: int):

    return "delete_user"
