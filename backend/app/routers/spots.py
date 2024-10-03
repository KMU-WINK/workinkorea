from fastapi import APIRouter, HTTPException, Request, Depends
from ..external_services.areaBasedAPI import (
    get_spots,
    get_spots_by_region,
    get_spots_by_region_and_keyword,
)
from ..external_services.detailAPI import get_common, get_intro, get_info, get_image
from ..external_services.locationBaseAPI import get_location_based_list
from sqlalchemy.orm import Session

from ..db.session import get_db
from .auth import get_current_user
from ..models.Spot import Spot
from ..models.Stay import Stay

router = APIRouter(
    prefix="/spots",
    tags=["spots"],
)


@router.get("")
async def read_stays(
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
            stay_wish = db.query(Stay).filter(Stay.user_id == current_user.id).all()
            spot_wish = db.query(Spot).filter(Spot.user_id == current_user.id).all()
            wishs = [wish.content_id for wish in stay_wish + spot_wish]
        if len(area) > 0 and len(keyword) == 0:
            data = get_spots_by_region(area, pageNo, wishs)
        elif len(area) == 0 and len(keyword) > 0:
            data = get_spots(keyword, pageNo, wishs)
        else:  # both area and keyword are provided
            data = get_spots_by_region_and_keyword(keyword, area, pageNo, wishs)
        return data
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.get("/detail")
async def spot_stay_detail(
    request: Request,
    contentId: int,
    contentTypeId: int,
    db: Session = Depends(get_db),
):
    try:
        common = get_common(contentId, contentTypeId)
        intro = get_intro(contentId, contentTypeId)
        info = get_info(contentId, contentTypeId)
        image = get_image(contentId)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    # 빈 딕셔너리 생성
    combined_dict = {}

    # 딕셔너리들을 순차적으로 합치기
    combined_dict.update(common)
    combined_dict.update(intro)
    combined_dict.update(info)
    combined_dict.update(image)

    if request.cookies.get("accessToken"):
        current_user = get_current_user(request, db)
        if combined_dict["contenttypeid"] == "32":
            stay_wish = db.query(Stay).filter(Stay.user_id == current_user.id).all()
            wishs = [wish.content_id for wish in stay_wish]
            combined_dict["inWish"] = combined_dict["contentid"] in wishs
        else:
            spot_wish = db.query(Spot).filter(Spot.user_id == current_user.id).all()
            wishs = [wish.content_id for wish in spot_wish]
            combined_dict["inWish"] = combined_dict["contentid"] in wishs

    return combined_dict


@router.get("/location")
async def spot_stay_location(
    request: Request,
    mapX: str,
    mapY: str,
    keyword: str = "",
    radius: int = 20000,
    numOfRows: int = 3000,
    db: Session = Depends(get_db),
):
    if not (
        (33.100000 <= float(mapY) <= 38.620000)
        and (124.600000 <= float(mapX) <= 131.872000)
    ):
        raise HTTPException(
            status_code=400,
            detail=f"Please provide valid mapX(124.600000 ~ 131.872000) and mapY(33.100000 ~ 38.620000)",
        )

    try:

        data = get_location_based_list(mapX, mapY, radius, numOfRows)

        wishs = False
        if request.cookies.get("accessToken"):
            current_user = get_current_user(request, db)
            stay_wish = db.query(Stay).filter(Stay.user_id == current_user.id).all()
            spot_wish = db.query(Spot).filter(Spot.user_id == current_user.id).all()
            wishs = [wish.content_id for wish in stay_wish + spot_wish]

        if len(keyword) >= 1:
            data["items"]["item"] = list(
                filter(lambda x: keyword in x["title"], data["items"]["item"])
            )
        if wishs:
            for item in data["items"]["item"]:
                item["inWish"] = item["contentid"] in wishs

        return data
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
