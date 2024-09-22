'use client';

import React, { useState } from 'react';
import Badge from '@/app/onboarding/_components/Badge';
import { useRouter, useSearchParams } from 'next/navigation';
import Button from '@/components/Button';
import BusanImage from 'public/images/location/부산.png';
import GyeongjuImage from 'public/images/location/경주.png';
import GangneungImage from 'public/images/location/강릉.png';
import YeosuImage from 'public/images/location/여수.png';
import JeonjuImage from 'public/images/location/전주.png';
import JejuImage from 'public/images/location/제주.png';
import ChuncheonImage from 'public/images/location/춘천.png';
import ImageButton from '@/app/onboarding/_components/ImageButton';
import PublicAxiosInstance from '@/services/publicAxiosInstance';
import Image from 'next/image';

export default function Step3() {
  const router = useRouter();
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);

  // 서버에서 클라이언트로 전달하는 search param 을 로컬 변수에 저장
  const searchParam = useSearchParams();
  const socialId = searchParam.get('social_id');
  const provider = searchParam.get('provider');

  const handleNextClick = async () => {
    try {
      await PublicAxiosInstance.patch('/users/region', {
        social_id: socialId,
        regions: [selectedLocation],
      });
      router.push(
        `/onboarding/step4?social_id=${socialId}&provider=${provider}`,
      );
    } catch (e) {
      console.error(e);
    }
  };

  const locations = [
    { name: '부산', image: BusanImage },
    { name: '경주', image: GyeongjuImage },
    { name: '강릉', image: GangneungImage },
    { name: '여수', image: YeosuImage },
    { name: '전주', image: JeonjuImage },
    { name: '제주', image: JejuImage },
    { name: '춘천', image: ChuncheonImage },
  ];

  const handleToggleSelect = (location: string) => {
    setSelectedLocation(location);
  };

  return (
    <div className="flex justify-center min-h-screen">
      <div className="w-full max-w-[393px] flex flex-col items-start px-6 mb-[90px]">
        <div className="py-3 min-h-14">
          {/* 백 버튼이 필요하다면 여기에 추가할 수 있음 */}
        </div>
        <div className="flex gap-2">
          <Badge number={1} isSelected />
          <Badge number={2} isSelected />
          <Badge number={3} isSelected />
          <Badge number={4} isSelected={false} />
          <Badge number={5} isSelected={false} />
        </div>

        <div className="pt-6">
          <p className="font-light text-xl">
            머무르고 싶은 장소 한 곳을 선택해주세요.
          </p>
          <p className="font-normal text-[14px] text-gray-3 pt-3">
            1개만 선택할 수 있어요. 나중에 설정에서 변경할 수 있어요.
          </p>
          <div className="pt-5 grid grid-cols-2 gap-2 overflow-y-auto">
            {locations.map(location => (
              <ImageButton
                key={location.name}
                image={
                  <Image
                    width={170}
                    height={120}
                    src={location.image.src}
                    alt={location.name}
                    className="w-full h-full object-cover"
                  />
                }
                locationName={location.name}
                onToggleSelect={() => handleToggleSelect(location.name)}
                isSelected={selectedLocation === location.name}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="max-w-[393px] w-full fixed bottom-0 bg-white">
        <Button
          text="다음으로"
          isAllowed={typeof selectedLocation === 'string'}
          onClick={handleNextClick} // 구문 수정: 함수 호출을 올바르게 처리
        />
      </div>
    </div>
  );
}
