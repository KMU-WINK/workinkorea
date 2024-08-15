from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..models.User import User
from ..db.session import get_db
from fastapi_jwt_auth import AuthJWT
from fastapi.responses import RedirectResponse
import requests
import os

router = APIRouter(
    prefix="/auth",
    tags=["auth"]
)

@router.get("/kakao")
async def kakaoAuth(client_id: str, redirect_url: str, code: str):
    # grant_type    <String>: authorization_code로 고정
    # client_id     <String>: 앱 REST API 키
    # redirect_uri  <String>: 인가 코드가 리다이렉트된 URI
    # code          <String>: 인가 코드 받기 요청으로 얻은 인가 코드
    _url = f"https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id={client_id}&code={code}&redirect_uri={redirect_url}"
    _res = requests.post(_url)
    _result = _res.json()

    access_token = _result["access_token"]
    return login(access_token=access_token, provider="KAKAO")


@router.get('/naver')
async def naverAuth(state: str, code: str):
    client_id = os.getenv("NAVER_CLIENT_ID")
    client_secret = os.getenv("NAVER_CLIENT_SECRET")
    redirect_uri = os.getenv("NAVER_REDIRECT_URI")
    
    _url = f'https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id={client_id}&client_secret={client_secret}&redirect_uri={redirect_uri}&code={code}&state={state}'
    _res = requests.post(_url, headers={'X-Naver-Client-Id':client_id, 'X-Naver-Client-Secret': client_secret})
    _result = _res.json()

    if "access_token" not in _result:
        raise HTTPException(status_code=400, detail="Failed to get Naver access token")

    access_token = _result["access_token"]
    return login(access_token=access_token, provider="NAVER")


def get_user(id: str, provider: str, db: Session = Depends(get_db)):
    return db.query(User).filter(User.id == id and User.provider == provider).first()

def login(access_token: str, provider: str):
    db = next(get_db())
    Authorize = AuthJWT()
    # Access Token을 이용하여 각 소셜 서비스의 고유 id 값 조회
    if provider == 'KAKAO':
        user_info = requests.get(
            "https://kapi.kakao.com/v2/user/me",
            headers={"Authorization": f"Bearer {access_token}"}
        ).json()
        id = str(user_info.get("id"))
        
    if provider == 'NAVER':
        user_info = requests.get(
            "https://openapi.naver.com/v1/nid/me",
            headers={"Authorization": f"Bearer {access_token}"}
        ).json()
        id = user_info.get("response", {}).get("id")

    
    # 해당 id, provider를 통하여 db에 사용자 유무 판별
    user = get_user(id=id, provider=provider, db=db)
    
    # 신규 사용자의 경우, 회원가입 페이지로 redirect
    # 회원가입 시, 필요한 소셜 id와 provider를 search param에 포함 
    if not user:
        return RedirectResponse(url=f"{os.getenv("WINK_CLIENT_URI")}/signup?id={id}&provider={provider}")
    
    access_token = Authorize.create_access_token(subject=user.nickname)
    response = RedirectResponse(url="http://localhost:8000/")
    response.set_cookie(key="access_token", value=access_token, httponly=True, samesite="Strict")
    return response