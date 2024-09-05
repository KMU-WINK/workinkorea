from fastapi import APIRouter

router = APIRouter(
    prefix="/jobs",
    tags=["jobs"],
)


@router.get("")
async def read_jobs():
    # have to connect API
    return "job_list"


# @router.get("/:id")
# async def read_job(id: int):
#     return "job_detail"
