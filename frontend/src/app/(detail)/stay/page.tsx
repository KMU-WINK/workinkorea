'use client';

import Image from 'next/image';
import Heart from '../../../../public/svgs/heart.svg';
import Location from '../../../../public/svgs/location.svg';
import GoColor from '../../../../public/svgs/go-color.svg';

export default function Stay() {
  return (
    <div className="flex flex-col justify-start items-center h-full w-screen bg-white text-black">
      <div
        className="flex flex-col justify-start items-center gap-3 w-full
        bg-white sm:max-w-sm"
      >
        <Image
          src="/svgs/stay-test.png"
          alt="Stay"
          layout="responsive"
          width="0"
          height="0"
        />
        <div className="w-full flex flex-col items-center gap-2 bg-gray-1 ">
          <div className="w-full flex flex-col gap-6 px-4 py-2 bg-white">
            <div className="w-full flex flex-col gap-1">
              <div className="w-full flex justify-between items-center">
                <span className="text-xl font-medium">
                  태안 하얀고래 풀빌라
                </span>
                <Heart />
              </div>
              <div className="w-full flex flex-col gap-2">
                <div className="w-full flex items-center">
                  <Location />
                  <span className="text-sm">
                    충청남도 태안군 고남면 대야로 202
                  </span>
                  <GoColor />
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
