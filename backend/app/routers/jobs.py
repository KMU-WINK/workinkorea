from fastapi import APIRouter, HTTPException
from ..external_services.jobAPI import get_jobs, get_job

router = APIRouter(
    prefix="/jobs",
    tags=["jobs"],
)


@router.get("")
async def read_jobs(area: str = "", keyword: str = "", pageNo: int = 1):
    # have to connect API
    if len(area) == 0 and len(keyword) == 0:
        raise HTTPException(
            status_code=400, detail="Please provide either area or keyword"
        )

    try:
        data = get_jobs(area, keyword, pageNo)
        return data
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.get("/detail")
async def read_job(contentId: str, contentTypeId: str):
    try:
        data = get_job(contentId, contentTypeId)
        return data
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
