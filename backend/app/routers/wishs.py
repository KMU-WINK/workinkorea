from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy.orm import Session
from ..db.session import get_db
from ..models.Spot import Spot
from ..models.Stay import Stay
from ..models.Job import Job
from ..models.Wish import WishBase
from .auth import get_current_user
from .spots import spot_stay_detail
from .jobs import read_job

router = APIRouter(
    prefix="/wishs",
    tags=["wishs"],
)


AREA_SCALE_UP = {
    "강원": ["강릉", "춘천"],
    "부산": ["부산"],
    "제주": ["제주"],
    "경남": ["경주"],
    "전남": ["여수"],
    "전북": ["전주"],
}


def object_to_dict(obj, fields):
    """Convert SQLAlchemy object to dictionary."""
    result = {}
    for field in fields:
        result[field] = getattr(obj, field)
    return result


@router.get("")
async def get_wish(
    request: Request,
    db: Session = Depends(get_db),
):
    current_user = get_current_user(request, db)

    spot_wish = db.query(Spot).filter(Spot.user_id == current_user.id).all()
    stay_wish = db.query(Stay).filter(Stay.user_id == current_user.id).all()
    job_wish = db.query(Job).filter(Job.user_id == current_user.id).all()

    result = {
        "강릉": [],
        "경주": [],
        "부산": [],
        "여수": [],
        "전주": [],
        "제주": [],
        "춘천": [],
    }
    try:
        # id 필드를 제거
        for item in spot_wish:
            tmp = object_to_dict(
                item,
                [
                    "content_type_id",
                    "content_id",
                    "title",
                    "addr1",
                    "addr2",
                    "firstimage",
                    "firstimage2",
                ],
            )
            tmp["type"] = "spot"
            tmp["contenttypeid"] = tmp.pop("content_type_id")
            tmp["contentid"] = tmp.pop("content_id")
            tmp["inWish"] = True

            # 지역 분류
            for key in result.keys():
                if key in tmp["addr1"]:
                    result[key].append(tmp)
                    continue

        for item in stay_wish:
            tmp = object_to_dict(
                item,
                [
                    "content_type_id",
                    "content_id",
                    "title",
                    "addr1",
                    "addr2",
                    "firstimage",
                    "firstimage2",
                ],
            )
            tmp["type"] = "stay"
            tmp["contenttypeid"] = tmp.pop("content_type_id")
            tmp["contentid"] = tmp.pop("content_id")
            tmp["inWish"] = True

            # 지역 분류
            for key in result.keys():
                if key in tmp["addr1"]:
                    result[key].append(tmp)
                    continue

        for item in job_wish:
            tmp = object_to_dict(
                item,
                [
                    "content_type_id",
                    "content_id",
                    "corpoNm",
                    "empmnTtl",
                    "wageAmt",
                    "wrkpAdres",
                    "corpoLogoFileUrl",
                    "salStle",
                ],
            )
            tmp["type"] = "job"
            tmp["contenttypeid"] = tmp.pop("content_type_id")
            tmp["contentid"] = tmp.pop("content_id")
            tmp["inWish"] = True

            # 지역 분류
            if tmp["contenttypeid"] == "open":
                for key in AREA_SCALE_UP.keys():
                    if key in tmp["wrkpAdres"]:
                        if len(AREA_SCALE_UP[key]) > 1:
                            for area in AREA_SCALE_UP[key]:
                                result[area].append(tmp)
                        else:
                            result[AREA_SCALE_UP[key][0]].append(tmp)
            else:  # is tour
                for key in result.keys():
                    if key in tmp["wrkpAdres"]:
                        result[key].append(tmp)
                        continue

        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


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
            detail=f"type은 [ spot, stay, job ] 중 하나여야합니다. 요청하신 파라미터 type : {typeOfWish}",
        )
    else:  # typeOfWish in ["spot", "stay", "job"]
        if contentTypeId == "32":
            if typeOfWish not in ["stay", "spot"]:
                raise HTTPException(
                    status_code=400,
                    detail=f"contentTypeId 32은 type가 [ stay, spot ] 중 하나여야합니다. 요청하신 파라미터 type : {typeOfWish}, contentTypeId {contentTypeId}",
                )
        elif contentTypeId in ["12", "14", "15", "25", "28", "38", "39"]:
            if typeOfWish != "spot":
                raise HTTPException(
                    status_code=400,
                    detail=f"contentTypeId가 [ 12, 14, 15, 25, 28, 38, 39 ]인 경우, typeh는 spot이어야 합니다. 요청하신 파라미터 type : {typeOfWish}, contentTypeId {contentTypeId}",
                )
        elif contentTypeId in ["open", "tour"]:
            if typeOfWish != "job":
                raise HTTPException(
                    status_code=400,
                    detail=f"contentTypeId가 [ open, tour ] 인 경우, type는 job이어야 합니다. 요청하신 파라미터 type : {typeOfWish}, contentTypeId {contentTypeId}",
                )
        else:
            raise HTTPException(
                status_code=400,
                detail=f"contentTypeId는 [ 12, 14, 15, 25, 28, 32, 38, 39, open, tour ] 중 하나여야합니다. 요청하신 파라미터 contentTypeId : {contentTypeId}",
            )

    current_user = get_current_user(request, db)

    if contentTypeId == "32":
        tmp = {}
        tmp["contenttypeid"] = contentTypeId
        tmp["contentid"] = contentId
        tmp["type"] = "stay"

        data = await spot_stay_detail(
            request=request,
            contentId=contentId,
            contentTypeId=contentTypeId,
            db=db,
        )
        field_list = [
            "title",
            "addr1",
            "addr2",
            "firstimage",
            "firstimage2",
        ]

        # 필드 선별
        for field in field_list:
            if field in data.keys():
                tmp[field] = data[field]
        chk_wish = (
            db.query(Stay)
            .filter(
                Stay.user_id == current_user.id,
                Stay.content_type_id == tmp["contenttypeid"],
                Stay.content_id == tmp["contentid"],
            )
            .first()
        )
        if chk_wish:
            raise HTTPException(status_code=400, detail=f"already exist in wish list.")
        new_wish = Stay(
            user_id=current_user.id,
            content_type_id=tmp["contenttypeid"],
            content_id=tmp["contentid"],
            title=tmp["title"] if "title" in tmp.keys() else None,
            addr1=tmp["addr1"] if "addr1" in tmp.keys() else None,
            addr2=tmp["addr2"] if "addr2" in tmp.keys() else None,
            firstimage=tmp["firstimage"] if "firstimage" in tmp.keys() else None,
            firstimage2=tmp["firstimage2"] if "firstimage2" in tmp.keys() else None,
        )

    elif contentTypeId in ["12", "14", "15", "25", "28", "38", "39"]:

        tmp = {}
        tmp["contenttypeid"] = contentTypeId
        tmp["contentid"] = contentId
        tmp["type"] = "spot"
        data = await spot_stay_detail(
            request=request,
            contentId=contentId,
            contentTypeId=contentTypeId,
            db=db,
        )

        field_list = [
            "title",
            "addr1",
            "addr2",
            "firstimage",
            "firstimage2",
            "inWish",
        ]
        # 필드 선별
        for field in field_list:
            if field in data.keys():
                tmp[field] = data[field]

        chk_wish = (
            db.query(Spot)
            .filter(
                Spot.user_id == current_user.id,
                Spot.content_type_id == tmp["contenttypeid"],
                Spot.content_id == tmp["contentid"],
            )
            .first()
        )
        if chk_wish:
            raise HTTPException(status_code=400, detail=f"already exist in wish list.")
        new_wish = Spot(
            user_id=current_user.id,
            content_type_id=tmp["contenttypeid"],
            content_id=tmp["contentid"],
            title=tmp["title"] if "title" in tmp.keys() else None,
            addr1=tmp["addr1"] if "addr1" in tmp.keys() else None,
            addr2=tmp["addr2"] if "addr2" in tmp.keys() else None,
            firstimage=tmp["firstimage"] if "firstimage" in tmp.keys() else None,
            firstimage2=tmp["firstimage2"] if "firstimage2" in tmp.keys() else None,
        )
    elif contentTypeId in ["open", "tour"]:
        tmp = {}
        tmp["contenttypeid"] = contentTypeId
        tmp["contentid"] = contentId
        tmp["type"] = "job"
        data = await read_job(
            request=request,
            contentId=contentId,
            contentTypeId=contentTypeId,
            db=db,
        )

        field_list = [
            "corpoNm",
            "empmnTtl",
            "wageAmt",
            "wrkpAdres",
            "corpoLogoFileUrl",
            "salStle",
        ]
        # 필드 선별
        for field in field_list:
            if field in data.keys():
                tmp[field] = data[field]

        chk_wish = (
            db.query(Job)
            .filter(
                Job.user_id == current_user.id,
                Job.content_type_id == tmp["contenttypeid"],
                Job.content_id == tmp["contentid"],
            )
            .first()
        )
        if chk_wish:
            raise HTTPException(status_code=400, detail=f"already exist in wish list.")
        new_wish = Job(
            user_id=current_user.id,
            content_type_id=tmp["contenttypeid"],
            content_id=tmp["contentid"],
            corpoNm=(
                tmp["corpoNm"]
                if "corpoNm" in tmp.keys()
                else tmp["empmnTtl"].split(" ")[0]
            ),
            empmnTtl=tmp["empmnTtl"] if "empmnTtl" in tmp.keys() else None,
            wageAmt=tmp["wageAmt"] if "wageAmt" in tmp.keys() else None,
            wrkpAdres=tmp["wrkpAdres"] if "wrkpAdres" in tmp.keys() else None,
            corpoLogoFileUrl=(
                tmp["corpoLogoFileUrl"] if "corpoLogoFileUrl" in tmp.keys() else None
            ),
            salStle=tmp["salStle"] if "salStle" in tmp.keys() else None,
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
            detail=f"type은 [ spot, stay, job ] 중 하나여야합니다. 요청하신 파라미터 typeOfWish : {typeOfWish}",
        )
    else:  # typeOfWish in ["spot", "stay", "job"]
        if contentTypeId == "32":
            if typeOfWish not in ["stay", "spot"]:
                raise HTTPException(
                    status_code=400,
                    detail=f"contentTypeId 32은 tyopeOfWish가 [ stay, spot ] 중 하나여야합니다. 요청하신 파라미터 typeOfWish : {typeOfWish}, contentTypeId {contentTypeId}",
                )
        elif contentTypeId in ["12", "14", "15", "25", "28", "38", "39"]:
            if typeOfWish != "spot":
                raise HTTPException(
                    status_code=400,
                    detail=f"contentTypeId가 [ 12, 14, 15, 25, 28, 38, 39 ]인 경우, typeOfWish는 spot이어야 합니다. 요청하신 파라미터 typeOfWish : {typeOfWish}, contentTypeId {contentTypeId}",
                )
        elif contentTypeId in ["open", "tour"]:
            if typeOfWish != "job":
                raise HTTPException(
                    status_code=400,
                    detail=f"contentTypeId가 [ open, tour ] 인 경우, typeOfWish는 job이어야 합니다. 요청하신 파라미터 typeOfWish : {typeOfWish}, contentTypeId {contentTypeId}",
                )
        else:
            raise HTTPException(
                status_code=400,
                detail=f"contentTypeId는 [ 12, 14, 15, 25, 28, 32, 38, 39, open, tour ] 중 하나여야합니다. 요청하신 파라미터 contentTypeId : {contentTypeId}",
            )

    current_user = get_current_user(request, db)

    if contentTypeId == "32":
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

    elif contentTypeId in ["12", "14", "15", "25", "28", "38", "39"]:
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

    elif contentTypeId in ["open", "tour"]:
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

    try:
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
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
