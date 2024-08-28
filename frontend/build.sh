#!/bin/sh
cd ../frontend  # frontend 디렉토리로 이동

# 의존성 설치 및 빌드
npm install
npm run build   # Next.js 빌드 실행

# 빌드된 내용을 output 디렉토리로 복사
mkdir -p ../output
cp -R .next ../output  # .next 디렉토리를 output으로 복사

# output 디렉토리 전체를 workinkorea 디렉토리로 복사
cp -R ../output ../workinkorea/
