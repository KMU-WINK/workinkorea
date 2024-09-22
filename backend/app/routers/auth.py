import requests, os, jwt, httpx
from fastapi import APIRouter, Depends, HTTPException, status, Request
from fastapi.responses import RedirectResponse, JSONResponse
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from datetime import datetime, timedelta
from ..models.User import User
from ..db.session import get_db
from ..schemas.user import UserCreate


SECRET_KEY = os.getenv("JWT_SECRET_KEY", "your-secret-key")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/token")


def create_jwt_token(user_social_id: str):
    # JWT 토큰 생성
    print("socail_id", user_social_id)
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode = {"socail_id": user_social_id, "exp": expire}
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


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
async def kakaoAuth(code: str, db: Session = Depends(get_db)):
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
    return await login(access_token=access_token, provider="kakao", db=db)


@router.get("/naver")
async def naverAuth(state: str, code: str, db: Session = Depends(get_db)):
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
    if not access_token:
        raise ValueError("Access token not found in response")

    return await login(access_token=access_token, provider="naver", db=db)


@router.get("/google")
async def googleAuth(state: str, code: str, db: Session = Depends(get_db)):
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

    return await login(access_token=access_token, provider="google", db=db)


# get_user는 비동기가 아니므로 async나 await가 필요하지 않음.
def get_user(social_id: str, provider: str, db: Session):
    return (
        db.query(User)
        .filter(User.social_id == social_id, User.social == provider)
        .first()
    )


async def login(access_token: str, provider: str, db: Session):
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
    return await get_access_token(user.social_id, db, True)


# social_id 기반 토큰 발급
@router.get("/token")
async def get_access_token(
    social_id: str, db: Session = Depends(get_db), isLogin: bool = False
):

    print(social_id)
    # 사용자가 DB에 있는지 확인
    user = db.query(User).filter(User.social_id == social_id).first()
    client_url = os.getenv("WINK_CLIENT_URI")

    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="사용자가 존재하지 않습니다.",
        )
    print(user.social_id)
    # JWT 토큰 생성
    jwt_token = create_jwt_token(user.social_id)

    if isLogin:
        response = RedirectResponse(url=f"{client_url}/main")
    else:
        # RedirectResponse 사용 시, 클라이언트 측에서 CORS 에러가 발생하여 URL만 반환
        response = JSONResponse(content={"redirect_url": f"{client_url}/main"})

    response.set_cookie(
        key="accessToken",
        value=jwt_token,
        httponly=True,
        samesite="none",
        secure=True,
        domain=".workinkorea.info",
    )
    response.set_cookie(
        key="social_id",
        value=social_id,
        samesite="none",
        secure=True,
        domain=".workinkorea.info",
    )

    return response


# access token(jwt token) 검증
def verify_jwt_token(token: str):
    try:
        # JWT 토큰을 검증하고 payload 반환
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        # payload에서 닉네임 추출
        print(payload)
        social_id = payload.get("social_id")
        print(token)
        print(social_id)
        if social_id is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid token: no subject",
                headers={"WWW-Authenticate": "Bearer"},
            )
        return social_id
    except jwt.ExpiredSignatureError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token has expired",
            headers={"WWW-Authenticate": "Bearer"},
        )
    except jwt.InvalidTokenError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token",
            headers={"WWW-Authenticate": "Bearer"},
        )


def get_current_user(request: Request, db: Session = Depends(get_db)):
    # Authorization 헤더에서 토큰 가져오기
    auth_header = request.headers.get("Authorization")

    if auth_header is None:
        # Authorization 헤더가 없을 때
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authorization header is missing",
            headers={"WWW-Authenticate": "Bearer"},
        )

    if not auth_header.startswith("Bearer "):
        # 올바른 토큰의 형태가 주어지지 않았을 때, 토큰이 존재하지 않을 때
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authorization format",
            headers={"WWW-Authenticate": "Bearer"},
        )

    token = auth_header.split(" ")[1]

    # 토큰 검증 로직 (verify_token 함수 호출 등)
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )

    social_id: str = verify_jwt_token(token)
    print(social_id)
    # 사용자 조회 로직
    user = db.query(User).filter(User.social_id == social_id).first()
    print(user)
    if user is None:
        raise credentials_exception

    return user
