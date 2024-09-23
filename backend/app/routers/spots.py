from fastapi import APIRouter, HTTPException
from ..external_services.areaBasedAPI import (
    get_spots,
    get_spots_by_region,
    get_spots_by_region_and_keyword,
)
from ..external_services.detailAPI import get_common, get_intro, get_info, get_image
from ..external_services.locationBaseAPI import get_location_based_list

# from datetime import datetime

# formatted_date = datetime.now().strftime("%Y-%m-%d")

router = APIRouter(
    prefix="/spots",
    tags=["spots"],
)


@router.get("")
async def read_stays(area: str = "", keyword: str = "", pageNo: int = 1):
    if len(area) == 0 and len(keyword) == 0:
        raise HTTPException(
            status_code=400, detail="Please provide either area or keyword"
        )
    try:
        if len(area) > 0 and len(keyword) == 0:
            data = get_spots_by_region(area, pageNo)
        elif len(area) == 0 and len(keyword) > 0:
            data = get_spots(keyword, pageNo)
        else:  # both area and keyword are provided
            data = get_spots_by_region_and_keyword(keyword, area, pageNo)
        return data
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.get("/detail")
async def spot_stay_detail(contentId: int, contentTypeId: int):
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
    print("common", common)
    combined_dict.update(common)
    print("intro", intro)
    combined_dict.update(intro)
    print("info", info)
    combined_dict.update(info)
    print("image", image)
    combined_dict.update(image)

    # 결과 확인
    # print(combined_dict)
    return combined_dict


@router.get("/location")
async def spot_stay_location(
    mapX: str,
    mapY: str,
    keyword: str = "",
    radius: int = 20000,
    numOfRows: int = 3000,
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
        if len(keyword) >= 1:
            data["items"]["item"] = list(
                filter(lambda x: keyword in x["title"], data["items"]["item"])
            )

        return data
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
