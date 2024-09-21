'use client';

import React, { useEffect, useState } from 'react';
import Badge from '@/app/onboarding/_components/Badge';
import { useRouter, useSearchParams } from 'next/navigation';
import Button from '@/components/Button';
import SelectButton from '@/components/SelectButton';
import Marketing from 'public/svgs/emoji/marketing.svg';
import Sound from 'public/svgs/emoji/sound.svg';
import Greeting from 'public/svgs/emoji/greeting.svg';
import Egg from 'public/svgs/emoji/egg.svg';
import Hotel from 'public/svgs/emoji/hotel.svg';
import Dice from 'public/svgs/emoji/dice.svg';
import Sport from 'public/svgs/emoji/weight.svg';
import PublicAxiosInstance from '@/services/publicAxiosInstance';

export default function Step4() {
  const router = useRouter();
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const searchParam = useSearchParams();
  const socialId = searchParam.get('social_id');
  const provider = searchParam.get('provider');

  const handleNextClick = async () => {
    try {
      await PublicAxiosInstance.patch('/users/work', {
        social_id: socialId,
        works: selectedOptions,
      });
      router.push(
        `/onboarding/step5?social_id=${socialId}&provider=${provider}`,
      );
    } catch (e) {
      console.error(e);
    }
  };

  const handleInputChange = (value: string) => {
    setSelectedOptions(prevState =>
      prevState.includes(value)
        ? prevState.filter(option => option !== value)
        : [...prevState, value],
    );
  };

  const options = [
    { text: '마케팅', icon: <Marketing /> },
    { text: '홍보', icon: <Sound /> },
    { text: '인사', icon: <Greeting /> },
    { text: '요식업', icon: <Egg /> },
    { text: '숙박업', icon: <Hotel /> },
    { text: '오락', icon: <Dice /> },
    { text: '스포츠', icon: <Sport /> },
  ];

  // 상태 확인
  useEffect(() => {
    console.log(selectedOptions);
  }, [selectedOptions]);

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
          <Badge number={4} isSelected />
          <Badge number={5} isSelected={false} />
        </div>

        <div className="pt-6 w-full">
          <p className="font-light text-xl">어떤 일을 하고 싶으신가요?</p>
          <div className="pt-5">
            {options.map((option, index) => (
              <div className="pt-2" key={index}>
                <SelectButton
                  key={option.text}
                  text={option.text}
                  isSelect={selectedOptions.includes(option.text)}
                  onClick={() => handleInputChange(option.text)}
                  leftIcon={option.icon}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="max-w-[393px] w-full fixed bottom-0 bg-white">
        <Button
          text="다음으로"
          isAllowed={selectedOptions.length > 0}
          onClick={handleNextClick} // 구문 수정: 함수 호출을 올바르게 처리
        />
      </div>
    </div>
  );
}
