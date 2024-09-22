from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy import insert, delete
from sqlalchemy.orm import Session
from ..schemas.user import (
    InfoUpdate,
    UserRegionUpdate,
    UserInterestUpdate,
    UserWorkUpdate,
    NicknameUpdate
)
from ..models.Interest import Interest
from ..models.Region import Region
from ..models.Work import Work
from ..models.User import User, User_Region, User_Interest, User_Work
from ..db.session import get_db
from .auth import get_current_user

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


@router.get("/detail")
async def read_user(request: Request, db: Session = Depends(get_db)):
    current_user = get_current_user(request, db)

    if current_user is None:
        raise HTTPException(status_code=400, detail=f"user not found. request.header.Authorization: {request.headers.get("Authorization")}")

    region_names = get_regions_by_id(current_user.id, db)
    interest_names = get_interests_by_id(current_user.id, db)
    work_names = get_works_by_id(current_user.id, db)
    return {
        "user": current_user,
        "regions": region_names if region_names else None,
        "interests": interest_names if interest_names else None,
        "works": work_names if work_names else None,
    }


@router.patch("/nickname")
async def update_user_nickname(request: Request, payload:NicknameUpdate, db: Session = Depends(get_db)):
    user_to_update = get_current_user(request, db)
    nickname = payload.nickname

    exists = db.query(User).filter(User.nickname == nickname).first()
    if exists:  # 닉네임 중복 체크
        raise HTTPException(
            status_code=400,
            detail=f"nickname is already exist. {nickname}",
        )

    # 닉네임 업데이트
    user_to_update.nickname = nickname
    db.commit()
    db.refresh(user_to_update)

    return {"message": "Nickname updated successfully.", "user": user_to_update}


@router.patch("/info")
async def update_user_info(request: Request, payload: InfoUpdate, db: Session = Depends(get_db)):
    user_to_update = get_current_user(request, db)

    try:
        user_to_update.birth = payload.birth
        user_to_update.gender = payload.gender
        db.commit()
        db.refresh(user_to_update)

        return {"message": "User updated successfully.", "user": user_to_update}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


#### Region


@router.patch("/region")
async def update_user_region(user: UserRegionUpdate, db: Session = Depends(get_db)):

    user_to_update = db.query(User).filter(User.social_id == user.social_id).first()

    # id 유효하지 않은 경우 에러
    if user_to_update is None:
        raise HTTPException(
            status_code=400, detail=f"user not found. social_id: {user.social_id}"
        )

    else:
        white_list = ["강릉", "부산", "제주", "경주", "여수", "전주", "춘천"]
        # 지역 예외처리
        for region in user.regions:
            if region not in white_list:
                raise HTTPException(
                    status_code=400,
                    detail=f"region is not valid. {region} is not in selections {white_list}",
                )

        # 기존의 User_Region 데이터를 삭제
        delete_stmt = delete(User_Region).where(
            User_Region.c.user_id == user_to_update.id
        )
        db.execute(delete_stmt)
        db.commit()

        # 유저 정보 업데이트
        for region in user.regions:
            region_id = db.query(Region).filter(Region.name == region).first().id
            stmt = insert(User_Region).values(
                user_id=user_to_update.id, region_id=region_id
            )
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

    user_to_update = db.query(User).filter(User.social_id == user.social_id).first()

    # id 유효하지 않은 경우 에러
    if user_to_update is None:
        raise HTTPException(
            status_code=400, detail=f"user not found. social_id: {user.social_id}"
        )

    else:
        white_list = [
            "액티비티",
            "휴식",
            "도심",
            "자연",
            "핫플",
            "문화재",
            "배움",
        ]
        # 예외처리
        for interest in user.interests:
            if interest not in white_list:
                raise HTTPException(
                    status_code=400,
                    detail=f"interest is not valid. {interest} is not in selections {white_list}",
                )
        # 기존의 User_Interest 데이터를 삭제
        delete_stmt = delete(User_Interest).where(
            User_Interest.c.user_id == user_to_update.id
        )
        db.execute(delete_stmt)
        db.commit()

        # 유저 정보 업데이트
        for interest in user.interests:
            interest_id = (
                db.query(Interest).filter(Interest.name == interest).first().id
            )
            stmt = insert(User_Interest).values(
                user_id=user_to_update.id, interest_id=interest_id
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

    user_to_update = db.query(User).filter(User.social_id == user.social_id).first()

    # id 유효하지 않은 경우 에러
    if user_to_update is None:
        raise HTTPException(
            status_code=400, detail=f"user not found. social_id: {user.social_id}"
        )

    else:
        white_list = [
            "마케팅",
            "홍보",
            "인사",
            "요식업",
            "숙박업",
            "오락",
            "스포츠",
        ]
        # 예외처리
        for work in user.works:
            if work not in white_list:
                raise HTTPException(
                    status_code=400,
                    detail=f"work is not valid. {work} is not in selections {white_list}",
                )
        # 기존의 User_Work 데이터를 삭제
        delete_stmt = delete(User_Work).where(User_Work.c.user_id == user_to_update.id)
        db.execute(delete_stmt)
        db.commit()

        # 유저 정보 업데이트
        for work in user.works:
            work_id = db.query(Work).filter(Work.name == work).first().id
            stmt = insert(User_Work).values(user_id=user_to_update.id, work_id=work_id)
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


@router.delete("")
async def delete_user(id: int):

    return "delete_user"
