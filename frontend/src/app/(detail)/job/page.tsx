'use client';

import Image from 'next/image';
import Heart from '../../../../public/svgs/heart.svg';
import Location from '../../../../public/svgs/location.svg';
import GoColor from '../../../../public/svgs/go-color.svg';
import { useEffect, useState } from 'react';
import HeartColor from '../../../../public/svgs/heart-color.svg';

interface JobInfo {
  title: string;
  location: string;
}

export default function Job() {
  const [selected, setSelected] = useState<boolean>(false);
  const [jobInfo, setJobInfo] = useState<JobInfo>({});

  const clickHeart = () => {
    setSelected(!selected);
    console.log('selected', selected);
  };

  return (
    <div className="flex flex-col justify-start items-center h-full w-screen bg-white text-black">
      <div
        className="flex flex-col justify-start items-center
        bg-white w-full sm:max-w-sm"
      >
        <Image
          src="/svgs/job-test.svg"
          alt="Job"
          layout="responsive"
          width="0"
          height="0"
        />
        <div className="w-full flex flex-col items-center gap-2 bg-gray-1">
          <div className="w-full flex flex-col gap-1 px-4 py-2 bg-white">
            <div className="w-full flex justify-between items-center">
              <span className="text-xl font-medium">
                상하농원 실외수영장 알바 대모집
              </span>
              {selected ? (
                <HeartColor onClick={clickHeart} />
              ) : (
                <Heart onClick={clickHeart} />
              )}
            </div>
            <div className="w-full flex flex-col gap-2">
              <div className="w-full flex items-center">
                <Location />
                <span className="text-sm">고창군 상하면 석남길 27</span>
                <GoColor />
              </div>
              <span className="text-sm">2024.06.26 18:16</span>
              <span className="text-sm">(주)콜랩스</span>
            </div>
            <div className="w-full flex gap-4 text-xs">
              <div className="flex flex-col font-bold min-w-14">
                <span>근무 기간</span>
                <span>근무 위치</span>
                <span>마감 일자</span>
                <span>급여</span>
              </div>
              <div className="flex flex-col justify-center">
                <span>8:00 ~16:00</span>
                <span>매주 넷째주 월요일</span>
                <span>5월</span>
                <span>061-749-2728</span>
              </div>
            </div>
          </div>
          <div className="w-full flex flex-col gap-1 px-4 py-2 bg-white">
            <span className="text-md font-bold">모집 조건</span>
            <div className="w-full flex gap-4 text-xs">
              <div className="flex flex-col font-bold whitespace-nowrap">
                <span>모집 마감일</span>
                <span>모집 인원</span>
                <span>모집 분야</span>
                <span>우대 사항</span>
              </div>
              <div className="flex flex-col justify-center">
                <span>2024.06.30</span>
                <span>00명(인원미정)</span>
                <span>5월</span>
                <span>
                  업무 관련 자격증 소지, 유사업무 경험 우대, 인근 거주 우대,
                  대학 재학생 우대, 대학 휴학생 우대
                </span>
              </div>
            </div>
          </div>
          <div className="w-full flex flex-col gap-1 px-4 py-2 bg-white">
            <span className="text-md font-bold">근무 지역</span>
            <div className="w-full flex gap-4 text-xs">
              <div className="flex flex-col font-bold whitespace-nowrap">
                <span>근무지 주소</span>
                <span>근무지 지도</span>
              </div>
              <div className="flex flex-col justify-center">
                <span>고창군 상하면 석남길 27</span>
                <div className="w-full flex items-center text-xs">
                  <Location />
                  <span>고창군 상하면 석남길 27</span>
                  <GoColor />
                </div>
              </div>
            </div>
          </div>
          <div className="w-full flex flex-col gap-1 px-4 py-2 bg-white">
            <span className="text-md font-bold">근무 조건</span>
            <div className="w-full flex gap-4 text-xs">
              <div className="flex flex-col font-bold whitespace-nowrap">
                <span>급여</span>
                <span>근무 기간</span>
                <span>근무 요일</span>
                <span>업직종</span>
                <span>고용 형태</span>
              </div>
              <div className="flex flex-col justify-center">
                <span>월 2,200,000 원</span>
                <span>1개월~3개월</span>
                <span>주 5일</span>
                <span>서빙, 테마파크, 여행, 레포츠, 캠프</span>
                <span>알바, 정규직</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
