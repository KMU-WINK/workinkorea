import requests
from dotenv import load_dotenv

import os

load_dotenv()
API_KEY = os.getenv("API_KEY")
print("API_KEY : ", API_KEY)


ENDPOINT = "http://apis.data.go.kr/B551011/tursmService"


def get_jobs():
    params = {
        "serviceKey": API_KEY,  # **required**
        "MobileOS": "ETC",  # **required**
        "MobileApp": "AppTest",  # **required**
        "numOfRows": "10",
        "pageNo": "1",
        "_type": "json",  # type은 json으로 고정
    }

    return "job_list"


def get_job(id):

    return "job_Detail"
