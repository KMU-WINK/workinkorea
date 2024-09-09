'use client';

import React, { useRef, useState } from 'react';
import Badge from '@/app/onboarding/_components/Badge';
import { useRouter } from 'next/navigation';
import SelectButton from '@/components//SelectButton';
import Button from '@/components/Button';
import Activity from '../../../../public/svgs/emoji/paragliding.svg';
import Rest from '../../../../public/svgs/emoji/sofa.svg';
import City from '../../../../public/svgs/emoji/coffee.svg';
import Leaf from '../../../../public/svgs/emoji/leaf.svg';
import Fire from '../../../../public/svgs/emoji/fire.svg';
import Moai from '../../../../public/svgs/emoji/moai.svg';
import Learning from '../../../../public/svgs/emoji/learning.svg';

export default function Step3() {
  const router = useRouter();

  const handleNextClick = () => {
    router.push('/onboarding/step1');
  };

  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const handleInputChange = (value: string) => {
    setSelectedOptions(prevState =>
      prevState.includes(value)
        ? prevState.filter(option => option !== value)
        : [...prevState, value],
    );
  };

  const options = [
    { text: '액티비티', icon: <Activity /> },
    { text: '휴식', icon: <Rest /> },
    { text: '도심', icon: <City /> },
    { text: '자연', icon: <Leaf /> },
    { text: '핫플', icon: <Fire /> },
    { text: '문화재', icon: <Moai /> },
    { text: '배움', icon: <Learning /> },
  ];

  return (
    <div className="bg-white min-h-screen flex flex-col justify-between">
      <div className="px-6">
        <div className="py-3 min-h-14">
          {/* 백 버튼이 필요하다면 여기에 추가할 수 있음 */}
        </div>
        <div className="flex gap-2">
          <Badge number={1} isSelected />
          <Badge number={2} isSelected />
          <Badge number={3} isSelected />
          <Badge number={4} isSelected />
          <Badge number={5} isSelected />
        </div>

        <div className="pt-6">
          <p className="font-light text-xl">어떤 일을 하고 싶으신가요?</p>
          <p className="font-normal text-md text-gray-3 pt-3">
            최대 0개까지 선택 가능하며 나중에 설정에서 변경할 수 있어요.
          </p>
          <div className="pt-5">
            {options.map(option => (
              <div className="pt-2">
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
      <div className="w-full fixed bottom-0 bg-white">
        <Button
          text="다음으로"
          isSelect
          onClick={handleNextClick} // 구문 수정: 함수 호출을 올바르게 처리
        />
      </div>
    </div>
  );
}
