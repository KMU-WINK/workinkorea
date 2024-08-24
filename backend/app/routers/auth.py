from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..models.User import User
from ..db.session import get_db
from fastapi.responses import RedirectResponse
import requests
import os
import jwt
from datetime import datetime, timedelta

SECRET_KEY = os.getenv("JWT_SECRET_KEY", "your-secret-key")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30


def create_jwt_token(user_nickname: str):
    # JWT 토큰 생성
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode = {"sub": user_nickname, "exp": expire}
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


router = APIRouter(
    prefix="/auth",
    tags=["auth"]
)

@router.get("/kakao")
async def kakaoAuth(code: str):
    client_id = os.getenv('KAKAO_REST_API_KEY') 
    redirect_uri = os.getenv('KAKAO_REDIRECT_URI')

    _url = f"https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id={client_id}&redirect_uri={redirect_uri}&code={code}"
    _headers = {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
    
    _res = requests.post(_url, headers=_headers)
    _result = _res.json()
    
    access_token = _result["access_token"]
    return login(access_token=access_token, provider="kakao")


@router.get('/naver')
async def naverAuth(state: str, code: str):
    client_id = os.getenv("NAVER_CLIENT_ID")
    client_secret = os.getenv("NAVER_CLIENT_SECRET")
    redirect_uri = os.getenv("NAVER_REDIRECT_URI")
    
    _url = f'https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id={client_id}&client_secret={client_secret}&redirect_uri={redirect_uri}&code={code}&state={state}'
    _res = requests.post(_url, headers={'X-Naver-Client-Id':client_id, 'X-Naver-Client-Secret': client_secret})
    _result = _res.json()

    access_token = _result["access_token"]
    return login(access_token=access_token, provider="naver")

@router.get("/google")
async def googleAuth(state: str, code: str):
    client_id = os.getenv('GOOGLE_CLIENT_ID')
    client_secret = os.getenv('GOOGLE_CLIENT_SECRET')
    redirect_uri = os.getenv('GOOGLE_REDIRECT_URI')

    token_url = "https://oauth2.googleapis.com/token"
    token_data = {
        "code": code,
        "client_id": client_id,
        "client_secret": client_secret,
        "redirect_uri": redirect_uri,
        "grant_type": "authorization_code",
        "state": state
    }

    _result = requests.post(token_url, data=token_data).json()

    access_token = _result["access_token"]
    
    return login(access_token=access_token, provider="google")


def get_user(social_id: str, provider: str, db: Session = Depends(get_db)):
    return db.query(User).filter(User.social_id == social_id, User.social == provider).first()

def login(access_token: str, provider: str):
    db = next(get_db())
    # Access Token을 이용하여 각 소셜 서비스의 고유 id 값 조회
    if provider == 'kakao':
        user_info = requests.get(
            "https://kapi.kakao.com/v2/user/me",
            headers={"Authorization": f"Bearer {access_token}"}
        ).json()
        social_id = str(user_info.get("id"))
        
    if provider == 'naver':
        user_info = requests.get(
            "https://openapi.naver.com/v1/nid/me",
            headers={"Authorization": f"Bearer {access_token}"}
        ).json()
        social_id = user_info.get("response", {}).get("id")
    
    if provider == 'google':
        user_info = requests.get("https://www.googleapis.com/oauth2/v2/userinfo", headers={"Authorization": f"Bearer {access_token}"}).json()
        social_id = user_info["id"]
    
    # 해당 id, provider를 통하여 db에 사용자 유무 판별
    user = get_user(social_id=social_id, provider=provider, db=db)
    
    # 신규 사용자의 경우, 회원가입 페이지로 redirect
    # 회원가입 시, 필요한 소셜 id와 provider를 search param에 포함 
    client_url = os.getenv("WINK_CLIENT_URI")
    
    if not user:
        return RedirectResponse(url=f"{client_url}/onboarding?social_id={social_id}&provider={provider}")
    
    access_token = create_jwt_token(user.nickname)
    response = RedirectResponse(url=f"{client_url}")
    response.set_cookie(key="access_token", value=access_token, httponly=True, samesite="Strict")
    return response
