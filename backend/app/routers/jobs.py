from fastapi import APIRouter, HTTPException, Request, Depends
from sqlalchemy.orm import Session
from ..external_services.jobAPI import get_jobs, get_job
from ..models.Job import Job
from ..db.session import get_db
from .auth import get_current_user

router = APIRouter(
    prefix="/jobs",
    tags=["jobs"],
)


@router.get("")
async def read_jobs(
    request: Request,
    area: str = "",
    keyword: str = "",
    pageNo: int = 1,
    db: Session = Depends(get_db),
):

    if len(area) == 0 and len(keyword) == 0:
        raise HTTPException(
            status_code=400, detail="Please provide either area or keyword"
        )

    try:
        wishs = False
        if request.cookies.get("accessToken"):
            current_user = get_current_user(request, db)
            job_wish = db.query(Job).filter(Job.user_id == current_user.id).all()
            wishs = [wish.content_id for wish in job_wish]
        data = get_jobs(area, keyword, pageNo, wishs)
        return data
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.get("/detail")
async def read_job(
    request: Request,
    contentId: str,
    contentTypeId: str,
    db: Session = Depends(get_db),
):
    try:
        wishs = False
        if request.cookies.get("accessToken"):
            current_user = get_current_user(request, db)
            job_wish = db.query(Job).filter(Job.user_id == current_user.id).all()
            wishs = [wish.content_id for wish in job_wish]
        data = get_job(contentId, contentTypeId, wishs)
        return data
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
