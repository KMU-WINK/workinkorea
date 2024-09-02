'use client';

import Image from 'next/image';
import Heart from '../../../../../public/svgs/heart.svg';
import Location from '../../../../../public/svgs/location.svg';
import GoSmall from '../../../../../public/svgs/go-small.svg';
import { useState } from 'react';
import HeartColor from '../../../../../public/svgs/heart-color.svg';
import BackWhite from '../../../../../public/svgs/back-white.svg';

export default function Stay() {
  const [selected, setSelected] = useState<boolean>(false);
  const clickHeart = () => {
    setSelected(!selected);
    console.log('selected', selected);
  };
  return (
    <div className="flex flex-col justify-start items-center h-full w-screen bg-white text-black">
      <div
        className="flex flex-col justify-start items-center gap-3 w-full
        bg-white sm:max-w-sm"
      >
        <div className="relative w-full">
          <Image
            src="/images/stay-test.png"
            alt="Job"
            layout="responsive"
            width="0"
            height="0"
          />
          <BackWhite className="absolute top-4 left-4 z-10 cursor-pointer" />
          <div className="absolute inset-0 h-1/4 bg-gradient-to-b from-[#00000080] to-transparent"></div>
        </div>
        <div className="w-full flex flex-col items-center gap-2 bg-gray-1 ">
          <div className="w-full flex flex-col gap-6 px-4 py-2 bg-white">
            <div className="w-full flex flex-col gap-1">
              <div className="w-full flex justify-between items-center">
                <span className="text-xl font-medium">
                  태안 하얀고래 풀빌라
                </span>
                {selected ? (
                  <HeartColor className="cursor-pointer" onClick={clickHeart} />
                ) : (
                  <Heart className="cursor-pointer" onClick={clickHeart} />
                )}
              </div>
              <div className="w-full flex flex-col gap-2">
                <div className="w-fit flex items-center cursor-pointer">
                  <Location />
                  <span className="text-sm">
                    충청남도 태안군 고남면 대야로 202
                  </span>
                  <GoSmall />
                </div>
              </div>
            </div>
            <div className="w-full flex gap-4 text-xs">
              <div className="flex flex-col font-bold min-w-14">
                <span>운영 시간</span>
                <span>휴무일</span>
                <span>기간</span>
                <span>문의</span>
              </div>
              <div className="flex flex-col justify-center">
                <span>8:00 ~16:00</span>
                <span>매주 넷째주 월요일</span>
                <span>5월</span>
                <span>061-749-2728</span>
              </div>
            </div>
          </div>

          <div className="w-full flex flex-col gap-6 px-4 py-2 bg-white">
            <div className="w-full flex gap-4 text-xs">
              <div className="flex flex-col font-bold min-w-14">
                <span>운영 시간</span>
                <span>휴무일</span>
                <span>기간</span>
                <span>문의</span>
              </div>
              <div className="flex flex-col justify-center">
                <span>8:00 ~16:00</span>
                <span>매주 넷째주 월요일</span>
                <span>5월</span>
                <span>061-749-2728</span>
              </div>
            </div>
          </div>

          <div className="w-full flex flex-col gap-6 px-4 py-2 bg-white">
            <div className="w-full flex gap-4 text-xs">
              <div className="flex flex-col font-bold min-w-14">
                <span>운영 시간</span>
                <span>휴무일</span>
                <span>기간</span>
                <span>문의</span>
              </div>
              <div className="flex flex-col justify-center">
                <span>8:00 ~16:00</span>
                <span>매주 넷째주 월요일</span>
                <span>5월</span>
                <span>061-749-2728</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
