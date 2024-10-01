import requests, os, jwt, httpx
from fastapi import APIRouter, Depends, HTTPException, status, Request, Response
from fastapi.responses import RedirectResponse, JSONResponse
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from datetime import datetime, timedelta, timezone
from ..models.User import User
from ..db.session import get_db
from ..schemas.user import UserCreate


SECRET_KEY = os.getenv("JWT_SECRET_KEY", "your-secret-key")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/token")
OPERATION_HOST_URL = "api.workinkorea.info"


def create_jwt_token(user_social_id: str):
    # JWT 토큰 생성
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode = {"social_id": user_social_id, "exp": expire}
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt if isinstance(encoded_jwt, str) else encoded_jwt.decode("utf-8")


router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/create_user_dev")
async def create_user(user: UserCreate, db: Session = Depends(get_db)):
    chk_user = db.query(User).filter(User.social_id == user.social_id).first()
    if chk_user:
        raise HTTPException(
            status_code=400,
            detail=f"User already exists with the same social_id : {user.social_id}",
        )
    try:
        # User 모델 인스턴스 생성 (id는 자동 생성)
        new_user = User(social_id=user.social_id, social=user.social)
        # 데이터베이스에 새로운 유저 추가
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
        return new_user
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail="Internal Server Error")


@router.get("/kakao")
async def kakaoAuth(code: str, request: Request, db: Session = Depends(get_db)):
    is_dev_mode = request.url.hostname != OPERATION_HOST_URL

    client_id = os.getenv("KAKAO_REST_API_KEY")
    redirect_uri = os.getenv("KAKAO_REDIRECT_URI")

    _url = f"https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id={client_id}&redirect_uri={redirect_uri}&code={code}"
    _headers = {"Content-Type": "application/x-www-form-urlencoded"}

    _res = requests.post(_url, headers=_headers)
    _result = _res.json()

    access_token = _result.get("access_token")
    if not access_token:
        raise ValueError("Access token not found in response")

    # login 호출 시 await 추가
    return await login(
        access_token=access_token, provider="kakao", db=db, is_dev_mode=is_dev_mode
    )


@router.get("/naver")
async def naverAuth(
    state: str, code: str, request: Request, db: Session = Depends(get_db)
):
    is_dev_mode = request.url.hostname != OPERATION_HOST_URL
    client_id = os.getenv("NAVER_CLIENT_ID")
    client_secret = os.getenv("NAVER_CLIENT_SECRET")
    redirect_uri = os.getenv("NAVER_REDIRECT_URI")

    _url = f"https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id={client_id}&client_secret={client_secret}&redirect_uri={redirect_uri}&code={code}&state={state}"
    _res = requests.post(
        _url,
        headers={
            "X-Naver-Client-Id": client_id,
            "X-Naver-Client-Secret": client_secret,
        },
    )
    _result = _res.json()

    access_token = _result.get("access_token")

    print(_result)
    if not access_token:
        raise ValueError("Access token not found in response")

    return await login(
        access_token=access_token, provider="naver", db=db, is_dev_mode=is_dev_mode
    )


@router.get("/google")
async def googleAuth(
    state: str, code: str, request: Request, db: Session = Depends(get_db)
):
    is_dev_mode = request.url.hostname != OPERATION_HOST_URL
    client_id = os.getenv("GOOGLE_CLIENT_ID")
    client_secret = os.getenv("GOOGLE_CLIENT_SECRET")
    redirect_uri = os.getenv("GOOGLE_REDIRECT_URI")

    token_url = "https://oauth2.googleapis.com/token"
    token_data = {
        "code": code,
        "client_id": client_id,
        "client_secret": client_secret,
        "redirect_uri": redirect_uri,
        "grant_type": "authorization_code",
        "state": state,
    }

    _result = requests.post(token_url, data=token_data).json()

    access_token = _result.get("access_token")
    if not access_token:
        raise ValueError("Access token not found in response")

    return await login(
        access_token=access_token, provider="google", db=db, is_dev_mode=is_dev_mode
    )


# get_user는 비동기가 아니므로 async나 await가 필요하지 않음.
def get_user(social_id: str, provider: str, db: Session):
    return (
        db.query(User)
        .filter(User.social_id == social_id, User.social == provider)
        .first()
    )


async def login(access_token: str, provider: str, db: Session, is_dev_mode: bool):
    async with httpx.AsyncClient() as client:
        if provider == "kakao":
            user_info = (
                await client.get(
                    "https://kapi.kakao.com/v2/user/me",
                    headers={"Authorization": f"Bearer {access_token}"},
                )
            ).json()
            social_id = str(user_info.get("id"))

        elif provider == "naver":
            user_info = (
                await client.get(
                    "https://openapi.naver.com/v1/nid/me",
                    headers={"Authorization": f"Bearer {access_token}"},
                )
            ).json()
            social_id = user_info.get("response", {}).get("id")

        elif provider == "google":
            user_info = (
                await client.get(
                    "https://www.googleapis.com/oauth2/v2/userinfo",
                    headers={"Authorization": f"Bearer {access_token}"},
                )
            ).json()
            social_id = user_info.get("id")

    # 해당 id, provider를 통하여 db에 사용자 유무 판별
    user = get_user(social_id=social_id, provider=provider, db=db)

    # 신규 사용자의 경우, 회원가입 페이지로 redirect
    client_url = os.getenv("WINK_CLIENT_URI")

    if is_dev_mode:
        client_url = "http://localhost:3000"

    # 회원 가입이 되어있지 않은 유저
    if not user:
        await create_user(UserCreate(social_id=social_id, social=provider), db=db)
        return RedirectResponse(
            url=f"{client_url}/onboarding/step1?social_id={social_id}&provider={provider}"
        )

    # 온보딩 과정을 모두 진행하지 않은 유저
    # 온보딩 Step 1을 수행하지 않은 유저
    if not user.nickname:
        return RedirectResponse(
            url=f"{client_url}/onboarding/step1?social_id={social_id}&provider={provider}"
        )

    # 온보딩 Step 2를 수행하지 않은 유저
    if not (user.birth and user.gender):
        return RedirectResponse(
            url=f"{client_url}/onboarding/step2?social_id={social_id}&provider={provider}"
        )

    # 온보딩 Step 3을 수행하지 않은 유저
    if not user.regions:
        return RedirectResponse(
            url=f"{client_url}/onboarding/step3?social_id={social_id}&provider={provider}"
        )

    # 온보딩 Step 4를 수행하지 않은 유저
    if not user.works:
        return RedirectResponse(
            url=f"{client_url}/onboarding/step4?social_id={social_id}&provider={provider}"
        )

    # 온보딩 Step 5를 수행하지 않은 유저
    if not user.interests:
        return RedirectResponse(
            url=f"{client_url}/onboarding/step5?social_id={social_id}&provider={provider}"
        )

    # 회원가입이 되어있는 유저
    return await get_access_token(user.social_id, is_dev_mode, db, True)


# social_id 기반 토큰 발급
@router.get("/token")
async def get_access_token(
    social_id: str,
    is_dev_mode: bool,
    db: Session = Depends(get_db),
    isLogin: bool = False,
):

    # 사용자가 DB에 있는지 확인
    user = db.query(User).filter(User.social_id == social_id).first()
    client_url = os.getenv("WINK_CLIENT_URI")

    if is_dev_mode:
        client_url = "http://localhost:3000"

    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="사용자가 존재하지 않습니다.",
        )

    # JWT 토큰 생성
    jwt_token = create_jwt_token(user.social_id)

    if isLogin:
        response = RedirectResponse(url=f"{client_url}/main")
    else:
        # RedirectResponse 사용 시, 클라이언트 측에서 CORS 에러가 발생하여 URL만 반환
        response = JSONResponse(content={"redirect_url": f"{client_url}/main"})

    if is_dev_mode:
        httponly = False
        samesite = "Lax"
        secure = False
    else:
        httponly = True
        samesite = "None"
        secure = True
        domain = ".workinkorea.info"

    response.set_cookie(
        key="accessToken",
        value=jwt_token,
        httponly=httponly,
        samesite=samesite,
        secure=secure,
        domain=domain if not is_dev_mode else None,
    )
    response.set_cookie(
        key="social_id",
        value=social_id,
        samesite=samesite,
        secure=secure,
        domain=domain if not is_dev_mode else None,
    )

    return response


def pad_base64_token(token: str) -> str:
    # Base64 패딩을 추가해 4의 배수로 만듦
    return token + "=" * (4 - len(token) % 4)


# access token(jwt token) 검증
def verify_jwt_token(token: str):
    try:
        # 쿠키에서 가져온 JWT가 base64 padding이 맞지 않을 수 있으니 패딩을 보정
        padded_token = pad_base64_token(token)
        # 디코드
        payload = jwt.decode(padded_token, SECRET_KEY, algorithms=[ALGORITHM])
        social_id = payload.get("social_id")

        if social_id is None:
            raise ValueError("social_id not found in token")
        return social_id

    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=400, detail="Token has expired")


def get_current_user(request: Request, db: Session = Depends(get_db)):
    # 쿠키에서 accessToken 가져오기
    print(request.cookies)
    token = request.cookies.get("accessToken")
    print(token)
    # 요청에서 Access token이 넘어오지 않았을 때
    if token is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Access token is missing",
            headers={"WWW-Authenticate": "Bearer"},
        )

    social_id: str = verify_jwt_token(token)

    # 사용자 조회 로직
    user = db.query(User).filter(User.social_id == social_id).first()

    if user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found",
            headers={"WWW-Authenticate": "Bearer"},
        )

    return user


@router.delete("/token")
async def delete_access_token(response: Response, request: Request):
    # is_dev_mode 체크
    is_dev_mode = request.url.hostname != OPERATION_HOST_URL

    # 쿠키 만료 시간을 과거로 설정
    expired_time = datetime.now(timezone.utc) - timedelta(days=1)

    if is_dev_mode:
        httponly = False
        samesite = "Lax"
        secure = False
    else:
        httponly = True
        samesite = "None"
        secure = True
        domain = ".workinkorea.info"

    # 쿠키 삭제
    response.set_cookie(
        key="accessToken",
        value="",
        httponly=httponly,
        samesite=samesite,
        secure=secure,
        expires=expired_time,
        domain=domain if not is_dev_mode else None,
    )
    response.set_cookie(
        key="social_id",
        value="",
        httponly=httponly,
        samesite=samesite,
        secure=secure,
        expires=expired_time,
        domain=domain if not is_dev_mode else None,
    )

    return {"message": "로그아웃이 완료되었습니다."}
