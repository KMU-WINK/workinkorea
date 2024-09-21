from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..models.User import User
from ..models.Spot import Spot
from ..models.Stay import Stay
from ..models.Job import Job
from ..db.session import get_db

router = APIRouter(
    prefix="/wishs",
    tags=["wishs"],
)


@router.get("")
async def get_spot_wish(
    social_id: str,
    db: Session = Depends(get_db),
):
    current_user = db.query(User.id).filter(User.social_id == social_id).first()
    if not current_user:
        raise HTTPException(
            status_code=400, detail=f"user does not exist. social_id : {social_id}"
        )
    spot_wish = db.query(Spot).filter(Spot.user_id == current_user.id).all()
    stay_wish = db.query(Stay).filter(Stay.user_id == current_user.id).all()
    job_wish = db.query(Job).filter(Job.user_id == current_user.id).all()

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


@router.post("")
async def add_spot_wish(
    type: str,
    social_id: str,
    contentTypeId: str,
    contentId: str,
    db: Session = Depends(get_db),
):
    if type not in ["spot", "stay", "job"]:
        raise HTTPException(
            status_code=400, detail="type must be in [ spot, stay, job ]"
        )
    current_user = db.query(User.id).filter(User.social_id == social_id).first()

    if not current_user:
        raise HTTPException(
            status_code=400, detail=f"user does not exist. social_id : {social_id}"
        )

    if type == "spot":
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
    elif type == "stay":
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
    elif type == "job":
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
async def delete_spot_wish(
    type: str,
    social_id: str,
    contentTypeId: str,
    contentId: str,
    db: Session = Depends(get_db),
):
    if type not in ["spot", "stay", "job"]:
        raise HTTPException(
            status_code=400, detail="type must be in [ spot, stay, job ]"
        )

    current_user = db.query(User.id).filter(User.social_id == social_id).first()
    if not current_user:
        raise HTTPException(
            status_code=400, detail=f"user does not exist. social_id : {social_id}"
        )
    if type == "spot":
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
    elif type == "stay":
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
    elif type == "job":
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
            "type": type,
            "social_id": social_id,
            "contentTypeId": contentTypeId,
            "contentId": contentId,
        },
    }
