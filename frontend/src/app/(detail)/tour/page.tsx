'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Heart from '../../../../public/svgs/heart.svg';
import HeartColor from '../../../../public/svgs/heart-color.svg';
import Location from '../../../../public/svgs/location.svg';
import GoSmall from '../../../../public/svgs/go-small.svg';
import BackWhite from '../../../../public/svgs/back-white.svg';

interface TourInfo {
  name: string;
  location: string;
  startTime: string;
  endTime: string;
  closed: string;
  period: string;
  number: string;
  description: string;
}

export default function Tour() {
  const [selected, setSelected] = useState<boolean>(false);

  const [tourInfo, setTourInfo] = useState<TourInfo>({
    name: '',
    location: '',
    startTime: '',
    endTime: '',
    closed: '',
    period: '',
    number: '',
    description: '',
  });

  const clickHeart = () => {
    setSelected(!selected);
    console.log('selected', selected);
  };

  useEffect(() => {
    setTourInfo(() => ({
      name: '순천만국가정원',
      location: '전라남도 순천시 국가정원1호길 47',
      startTime: '08:00',
      endTime: '08:00',
      closed: '매주 넷째주 월요일',
      period: '5월',
      number: '061-749-2728',
      description:
        '순천만을 보호하기 위하여 조성한 순천만국가정원은 순천 도사동 일대 정원부지 112만㎡(34만 평)에는 나무 505종 79만 주와 꽃 113종 315만 본이 식재됐다. 튤립과 철쭉 등이 꽃망울을 터뜨려 장관을 이루고 있다. 나눔의 숲 주변 3만㎡는 유채꽃 단지로 조성했는데, 5월 중순 일제히 만개해 ‘노란 물결’을 이룰 예정이다.',
    }));
  }, []);

  return (
    <div className="flex flex-col justify-start items-center h-full w-screen bg-white text-black">
      <div
        className="flex flex-col justify-start items-center gap-3 w-full
        bg-white sm:max-w-sm"
      >
        <div className="relative w-full">
          <Image
            src="/svgs/tour-test.png"
            alt="Tour"
            layout="responsive"
            width="0"
            height="0"
          />
          <BackWhite className="absolute top-4 left-4 z-10" />

          <div className="absolute inset-0 h-1/4 bg-gradient-to-b from-[#00000080] to-transparent"></div>
        </div>
        <div className="w-full flex flex-col items-center gap-2 bg-gray-1 ">
          <div className="w-full flex flex-col gap-5 px-4 py-2 bg-white">
            <div className="w-full flex justify-between items-center">
              <span className="text-xl font-medium">{tourInfo.name}</span>
              {selected ? (
                <HeartColor onClick={clickHeart} />
              ) : (
                <Heart onClick={clickHeart} />
              )}
            </div>
            <div className="w-full flex flex-col gap-2">
              <div className="w-full flex items-center">
                <Location />
                <span className="text-sm">{tourInfo.location}</span>
                <GoSmall />
              </div>
            </div>
            <div className="w-full flex gap-4 text-xs">
              <div className="flex flex-col font-bold gap-2">
                <span>운영 시간</span>
                <span>휴무</span>
                <span>기간</span>
                <span>문의</span>
              </div>
              <div className="flex flex-col gap-2">
                <span>
                  {tourInfo.startTime} ~ {tourInfo.endTime}
                </span>
                <span>{tourInfo.closed}</span>
                <span>{tourInfo.period}</span>
                <span>{tourInfo.number}</span>
              </div>
            </div>
          </div>

          <div className="w-full flex flex-col gap-2 px-4 py-2 bg-white text-xs">
            <span className="font-bold">소개</span>
            <span>{tourInfo.description}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
