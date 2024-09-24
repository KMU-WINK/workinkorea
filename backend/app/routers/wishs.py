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

    spot_wish = db.query(Spot).filter(Spot.user_id == current_user.id).all()
    stay_wish = db.query(Stay).filter(Stay.user_id == current_user.id).all()
    job_wish = db.query(Job).filter(Job.user_id == current_user.id).all()

    result = []

    tmp = {}
    # id 필드를 제거
    for item in spot_wish:
        tmp["contenttypeid"] = item.content_type_id
        tmp["contentid"] = item.content_id
        tmp["type"] = "spot"
        result.append(tmp)
        tmp = {}
    for item in stay_wish:
        tmp["contenttypeid"] = item.content_type_id
        tmp["contentid"] = item.content_id
        tmp["type"] = "stay"
        result.append(tmp)
        tmp = {}
    for item in job_wish:
        tmp["contenttypeid"] = item.content_type_id
        tmp["contentid"] = item.content_id
        tmp["type"] = "job"
        result.append(tmp)
        tmp = {}

    return result


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
