'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Heart from '../../../../public/svgs/heart.svg';
import HeartColor from '../../../../public/svgs/heart-color.svg';
import Location from '../../../../public/svgs/location.svg';
import GoSmall from '../../../../public/svgs/go-small.svg';
import BackWhite from '../../../../public/svgs/back-white.svg';

interface JobInfo {
  title: string;
  location: string;
  companyName: string;
  date: string;
  startDate: string;
  endDate: string;
  pay: string;
  dueDate: string;
  intake: string;
  category: string;
  preferences: string;
  workDay: string;
  type: string;
}

export default function Job() {
  const [selected, setSelected] = useState<boolean>(false);
  const [jobInfo, setJobInfo] = useState<JobInfo>({
    title: '',
    location: '',
    companyName: '',
    date: '',
    startDate: '',
    endDate: '',
    pay: '',
    dueDate: '',
    intake: '',
    category: '',
    preferences: '',
    workDay: '',
    type: '',
  });

  const clickHeart = () => {
    setSelected(!selected);
    console.log('selected', selected);
  };

  useEffect(() => {
    setJobInfo(() => ({
      title: '상하농원 실외수영장 알바 대모집',
      location: '고창군 상하면 석남길 27',
      companyName: '(주)콜랩스',
      date: '2024.06.26 18:16',
      startDate: '1개월',
      endDate: '3개월',
      pay: '월 2,200,000 원',
      dueDate: '2024.06.30',
      intake: '00명(인원미정)',
      category: '인사',
      preferences:
        '업무 관련 자격증 소지, 유사업무 경험 우대, 인근 거주 우대, 대학 재학생 우대, 대학 휴학생 우대',
      workDay: '주5일',
      type: '알바, 정규직',
    }));
  }, []);

  return (
    <div className="flex flex-col justify-start items-center h-full w-screen bg-white text-black">
      <div
        className="flex flex-col justify-start items-center
        bg-white w-full sm:max-w-sm"
      >
        <div className="relative w-full">
          <Image
            src="/svgs/job-test.svg"
            alt="Job"
            layout="responsive"
            width="0"
            height="0"
          />
          <BackWhite className="absolute top-4 left-4 z-10" />
          <div className="absolute inset-0 h-1/2 bg-gradient-to-b from-gray-3 to-transparent"></div>
        </div>
        <div className="w-full flex flex-col items-center gap-2 bg-gray-1">
          <div className="w-full flex flex-col gap-2 px-4 py-2 bg-white">
            <div className="w-full flex justify-between items-center">
              <span className="text-xl font-medium">{jobInfo.title}</span>
              {selected ? (
                <HeartColor onClick={clickHeart} />
              ) : (
                <Heart onClick={clickHeart} />
              )}
            </div>
            <div className="w-full flex items-center">
              <Location />
              <span className="text-sm">{jobInfo.location}</span>
              <GoSmall />
            </div>
            <span className="text-sm">
              {jobInfo.companyName} {jobInfo.date}
            </span>
            <div className="w-full flex gap-4 text-xs">
              <div className="flex flex-col font-bold">
                <span>근무 기간</span>
                <span>근무 위치</span>
                <span>근로 수당</span>
                <span>모집 마감</span>
              </div>
              <div className="flex flex-col justify-center">
                <span>
                  {jobInfo.startDate} ~ {jobInfo.endDate}
                </span>
                <span>{jobInfo.location}</span>
                <span>{jobInfo.pay}</span>
                <span>{jobInfo.dueDate}</span>
              </div>
            </div>
          </div>
          <div className="w-full flex flex-col gap-1 px-4 py-2 bg-white">
            <span className="text-md font-bold">모집 조건</span>
            <div className="w-full flex gap-4 text-xs">
              <div className="flex flex-col font-bold whitespace-nowrap">
                <span>모집 마감</span>
                <span>모집 인원</span>
                <span>모집 분야</span>
                <span>우대 사항</span>
              </div>
              <div className="flex flex-col justify-center">
                <span>{jobInfo.dueDate}</span>
                <span>{jobInfo.intake}</span>
                <span>{jobInfo.category}</span>
                <span>{jobInfo.preferences}</span>
              </div>
            </div>
          </div>
          <div className="w-full flex flex-col gap-1 px-4 py-2 bg-white">
            <span className="text-md font-bold">근무 조건</span>
            <div className="w-full flex gap-4 text-xs">
              <div className="flex flex-col font-bold">
                <span>근무 수당</span>
                <span>근무 기간</span>
                <span>근로 요일</span>
                <span>고용형태</span>
              </div>
              <div className="flex flex-col justify-center">
                <span>{jobInfo.pay}</span>
                <span>
                  {jobInfo.startDate} ~ {jobInfo.endDate}
                </span>
                <span>{jobInfo.workDay}</span>
                <span>{jobInfo.type}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
