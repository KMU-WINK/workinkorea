'use client';

import React, { useState } from 'react';
import ImageButton from '@/app/onboarding/_components/ImageButton';
// 각 지역에 대한 이미지를 import
import BusanImage from '../../../../../public/images/location/부산.png';
import GyeongjuImage from '../../../../../public/images/location/경주.png';
import GangneungImage from '../../../../../public/images/location/강릉.png';
import YeosuImage from '../../../../../public/images/location/여수.png';
import JeonjuImage from '../../../../../public/images/location/전주.png';
import JejuImage from '../../../../../public/images/location/제주.png';
import ChuncheonImage from '../../../../../public/images/location/춘천.png';

export default function Step3() {
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);

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
    <div className="pt-6">
      <p className="font-light text-xl">
        머무르고 싶은 장소 한 곳을 선택해주세요.
      </p>
      <p className="font-normal text-md text-gray-3 pt-3">
        1개만 선택할 수 있어요. 나중에 설정에서 변경할 수 있어요.
      </p>
      <div className="pt-5 grid grid-cols-2 gap-2">
        {locations.map(location => (
          <ImageButton
            key={location.name}
            image={
              <img
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
  );
}
