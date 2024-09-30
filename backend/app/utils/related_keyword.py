import fasttext
from konlpy.tag import Okt

# KoNLPy 형태소 분석기
okt = Okt()

# FastText 모델 로드 (다운로드한 모델 경로 지정)
model = fasttext.load_model("cc.ko.300.bin")


# 명사 필터링 함수: 형태소 분석을 통해 명사만 추출
def filter_nouns(word):
    nouns = okt.nouns(word)  # 명사만 추출
    return nouns


# 입력된 단어와 유사한 명사 찾기 (유사도 임계값 적용)
def find_similar_words(word, topn=10, similarity_threshold=0.5):
    try:
        similar_words = model.get_nearest_neighbors(word, k=topn)
        # 연관 단어 중 유사도와 명사 필터링
        filtered_words = set()
        for similarity, similar_word in similar_words:
            if similarity >= similarity_threshold:  # 유사도 임계값 적용
                nouns = filter_nouns(similar_word)
                if nouns:  # 명사만 남김
                    filtered_words.add(nouns[0])  # 첫 번째 명사만 사용
        return filtered_words
    except KeyError:
        return [f"'{word}'에 대한 유사 단어를 찾을 수 없습니다."]
