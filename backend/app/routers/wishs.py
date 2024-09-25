from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy.orm import Session
from ..db.session import get_db
from ..models.User import User
from ..models.Spot import Spot
from ..models.Stay import Stay
from ..models.Job import Job
from ..models.Wish import WishBase
from .auth import get_current_user

router = APIRouter(
    prefix="/wishs",
    tags=["wishs"],
)


@router.get("")
async def get_wish(
    request: Request,
    db: Session = Depends(get_db),
):
    current_user = get_current_user(request, db)

    spot_wish = await db.query(Spot).filter(Spot.user_id == current_user.id).all()
    stay_wish = await db.query(Stay).filter(Stay.user_id == current_user.id).all()
    job_wish = await db.query(Job).filter(Job.user_id == current_user.id).all()

    # id 필드를 제거
    for item in spot_wish:
        del item.id
        del item.user_id
        item.type = "spot"
    for item in stay_wish:
        del item.id
        del item.user_id
        item.type = "stay"
    for item in job_wish:
        del item.id
        del item.user_id
        item.type = "job"

    return spot_wish + stay_wish + job_wish


# check is in wish list
async def get_spot_wish_by_type(
    request: Request,
    api_type: str,
    db: Session = Depends(get_db),
):
    is_user = request.headers.get("Authorization")

    if not is_user:
        return False
    else:
        current_user = get_current_user(request, db)

    if api_type == "job":
        job_wish = await db.query(Job).filter(Job.user_id == current_user.id).all()
        for item in job_wish:
            del item.id
            del item.user_id
            item.type = "job"
        return job_wish
    elif api_type == "stay":
        stay_wish = await db.query(Stay).filter(Stay.user_id == current_user.id).all()
        for item in stay_wish:
            del item.id
            del item.user_id
            item.type = "stay"
        return stay_wish
    elif api_type == "spot":
        spot_wish = await db.query(Spot).filter(Spot.user_id == current_user.id).all()
        for item in spot_wish:
            del item.id
            del item.user_id
            item.type = "spot"
        return spot_wish


@router.post("")
async def add_wish(
    request: Request,
    payload: WishBase,
    db: Session = Depends(get_db),
):
    typeOfWish = payload.type
    contentTypeId = payload.contentTypeId
    contentId = payload.contentId
    if typeOfWish not in ["spot", "stay", "job"]:
        raise HTTPException(
            status_code=400,
            detail=f"type must be in [ spot, stay, job ]. you sent {typeOfWish}",
        )

    current_user = get_current_user(request, db)

    if typeOfWish == "spot":
        if contentTypeId not in ["12", "14", "15", "25", "28", "32", "38", "39"]:
            raise HTTPException(
                status_code=400,
                detail=f"It's not a spot content. spot contentTypeId must be in [ 12, 14, 15, 25, 28, 32, 38, 39 ]. you sent {contentTypeId}",
            )
        chk_wish = (
            db.query(Spot)
            .filter(
                Spot.user_id == current_user.id,
                Spot.content_type_id == contentTypeId,
                Spot.content_id == contentId,
            )
            .first()
        )
        if chk_wish:
            raise HTTPException(status_code=400, detail=f"already exist in wish list.")
        new_wish = Spot(
            user_id=current_user.id,
            content_type_id=contentTypeId,
            content_id=contentId,
        )
    elif typeOfWish == "stay":
        if contentTypeId != "32":
            raise HTTPException(
                status_code=400,
                detail=f"It's not a stay content. stay contentTypeId must be in 32. you sent {contentTypeId}",
            )
        chk_wish = (
            db.query(Stay)
            .filter(
                Stay.user_id == current_user.id,
                Stay.content_type_id == contentTypeId,
                Stay.content_id == contentId,
            )
            .first()
        )
        if chk_wish:
            raise HTTPException(status_code=400, detail=f"already exist in wish list.")
        new_wish = Stay(
            user_id=current_user.id,
            content_type_id=contentTypeId,
            content_id=contentId,
        )
    elif typeOfWish == "job":
        if contentTypeId not in ["open", "tour"]:
            raise HTTPException(
                status_code=400,
                detail=f"It's not a job content. job contentTypeId must be in [ open, tour ]. you sent {contentTypeId}",
            )
        chk_wish = (
            db.query(Job)
            .filter(
                Job.user_id == current_user.id,
                Job.content_type_id == contentTypeId,
                Job.content_id == contentId,
            )
            .first()
        )
        if chk_wish:
            raise HTTPException(status_code=400, detail=f"already exist in wish list.")
        new_wish = Job(
            user_id=current_user.id,
            content_type_id=contentTypeId,
            content_id=contentId,
        )
    try:
        db.add(new_wish)
        db.commit()
        db.refresh(new_wish)
        return {"message": "success", "item": new_wish}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.delete("")
async def delete_wish(
    request: Request,
    payload: WishBase,
    db: Session = Depends(get_db),
):
    typeOfWish = payload.type
    contentTypeId = payload.contentTypeId
    contentId = payload.contentId
    if typeOfWish not in ["spot", "stay", "job"]:
        raise HTTPException(
            status_code=400,
            detail=f"type must be in [ spot, stay, job ]. you sent {typeOfWish}",
        )

    current_user = get_current_user(request, db)

    if typeOfWish == "spot":
        if contentTypeId not in ["12", "14", "15", "25", "28", "32", "38", "39"]:
            raise HTTPException(
                status_code=400,
                detail=f"It's not a spot content. spot contentTypeId must be in [ 12, 14, 15, 25, 28, 32, 38, 39 ]. you sent {contentTypeId}",
            )
        chk_wish = (
            db.query(Spot)
            .filter(
                Spot.user_id == current_user.id,
                Spot.content_type_id == contentTypeId,
                Spot.content_id == contentId,
            )
            .first()
        )
        if not chk_wish:
            raise HTTPException(status_code=400, detail=f"not exist in wish list.")
        db.query(Spot).filter(
            Spot.user_id == current_user.id,
            Spot.content_type_id == contentTypeId,
            Spot.content_id == contentId,
        ).delete()
    elif typeOfWish == "stay":
        if contentTypeId != "32":
            raise HTTPException(
                status_code=400,
                detail=f"It's not a stay content. stay contentTypeId must be in 32. you sent {contentTypeId}",
            )
        chk_wish = (
            db.query(Stay)
            .filter(
                Stay.user_id == current_user.id,
                Stay.content_type_id == contentTypeId,
                Stay.content_id == contentId,
            )
            .first()
        )
        if not chk_wish:
            raise HTTPException(status_code=400, detail=f"not exist in wish list.")
        db.query(Stay).filter(
            Stay.user_id == current_user.id,
            Stay.content_type_id == contentTypeId,
            Stay.content_id == contentId,
        ).delete()
    elif typeOfWish == "job":
        if contentTypeId not in ["open", "tour"]:
            raise HTTPException(
                status_code=400,
                detail=f"It's not a job content. job contentTypeId must be in [ open, tour ]. you sent {contentTypeId}",
            )
        chk_wish = (
            db.query(Job)
            .filter(
                Job.user_id == current_user.id,
                Job.content_type_id == contentTypeId,
                Job.content_id == contentId,
            )
            .first()
        )
        if not chk_wish:
            raise HTTPException(status_code=400, detail=f"not exist in wish list.")
        db.query(Job).filter(
            Job.user_id == current_user.id,
            Job.content_type_id == contentTypeId,
            Job.content_id == contentId,
        ).delete()

    db.commit()

    return {
        "result": "delete success",
        "data": {
            "target_user_nickname": current_user.nickname,
            "deleted_wish_item": {
                "type": typeOfWish,
                "contentTypeId": contentTypeId,
                "contentId": contentId,
            },
        },
    }
