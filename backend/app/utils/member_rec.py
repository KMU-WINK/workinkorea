import requests, os, random
import torch
import xml.etree.ElementTree as ET
from transformers import BertTokenizer, BertModel
from sklearn.metrics.pairwise import cosine_similarity
from dotenv import load_dotenv


load_dotenv()
API_KEY = os.getenv("API_KEY")

ENDPOINT = "http://apis.data.go.kr/B551011/KorService1/areaBasedList1"


# 관광지 리스트를 가져오는 함수 (랜덤 순서로 섞음)
def get_content(areaCode):
    params = {
        "serviceKey": API_KEY,
        "numOfRows": "50",  # 가져올 관광지의 수
        "pageNo": "1",
        "MobileOS": "ETC",
        "MobileApp": "AppTest",
        "arrange": random.choice(
            ["O", "Q", "R"]
        ),  # 정렬 기준 (A: 제목 순, 나중에 섞을 예정)
        "contentTypeId": "12",  # 12는 관광지
        "areaCode": str(
            areaCode
        ),  # 지역 코드 (1: 서울특별시) -> 사용자 온보딩에서 받아서 넣기
        "_type": "json",
    }
    response = requests.get(ENDPOINT, params=params)

    # 응답 상태 코드 확인
    if response.headers.get("Content-Type") == "application/json":
        data = response.json()
        # print(data)

        if data["response"]["body"]["items"]:
            data = data["response"]["body"]["items"]["item"]
            # # contentId 리스트 추출
            # content_ids = [item.find('contentid').text for item in root.findall('.//item')]
            # print(data)
            # 리스트를 랜덤하게 섞음
            random.shuffle(data)

            return data
    else:
        print(f"Error Code: {response.status_code}, Message: {response.text}")
        return []


# BERT 임베딩을 생성하는 함수
def get_bert_embeddings(text, model, tokenizer):
    inputs = tokenizer(text, return_tensors="pt", padding=True, truncation=True)
    outputs = model(**inputs)
    return outputs.last_hidden_state.mean(dim=1).detach()


# 유사도 계산을 위한 BERT 및 코사인 유사도 함수
def calculate_similarity_bert(user_preferences, overviews, model, tokenizer):
    # 유저 선호도 임베딩 생성
    user_pref_text = " ".join(user_preferences)
    user_pref_embedding = get_bert_embeddings(user_pref_text, model, tokenizer)

    # 관광지 개요 + 제목 임베딩 생성
    overview_embeddings = []
    for overview in overviews:
        overview_embedding = get_bert_embeddings(overview, model, tokenizer)
        overview_embeddings.append(overview_embedding)

    # 유사도 계산
    similarities = [
        cosine_similarity(user_pref_embedding, ov_embed)[0][0]
        for ov_embed in overview_embeddings
    ]
    return similarities


# 전체 과정 실행 함수
def recommend_tourist_spots(user_preferences, areaCode):
    # 1. BERT 모델과 토크나이저 불러오기
    tokenizer = BertTokenizer.from_pretrained("bert-base-multilingual-cased")
    model = BertModel.from_pretrained("bert-base-multilingual-cased")

    # 2. 관광지 리스트에서 contentId 가져오기
    contents = get_content(areaCode)
    # 3. contentId로부터 개요와 제목 가져오기
    overviews = []
    titles = []

    for content in contents:
        # titles.append(content["title"])
        # 제목과 개요를 결합하여 유사도 계산 시 사용
        # combined_text = title + " " + overview  # 제목과 개요 결합
        # print(combined_text)
        overviews.append(content["title"])  # -> 여기서부터 진행

    # 4. 유사도 계산
    similarities = calculate_similarity_bert(
        user_preferences, overviews, model, tokenizer
    )

    # 5. 유사도 높은 순으로 관광지 정렬 및 상위 20개 출력
    sorted_indices = sorted(
        range(len(similarities)), key=lambda i: similarities[i], reverse=True
    )
    top_20_indices = sorted_indices[:20]  # 상위 20개 가져오기

    result = []
    for idx in top_20_indices:
        # print(f"Title: {overviews[idx]}, Similarity: {similarities[idx]:.2f}")
        result.append(contents[idx])

    return result


# # 예시: 유저가 선택한 선호도 (산, 바다, 휴식 선택)
# user_preferences = ["산책", "유명", "쉼터", "문화재"]
# user_region = "6"
# # 실행
# recommend_tourist_spots(user_preferences, user_region)
