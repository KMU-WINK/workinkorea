'use client';

import React, { useState } from 'react';
import SelectButton from '@/components/SelectButton/index';
import Marketing from '../../../../../public/svgs/emoji/marketing.svg';
import Sound from '../../../../../public/svgs/emoji/sound.svg';
import Greeting from '../../../../../public/svgs/emoji/greeting.svg';
import Egg from '../../../../../public/svgs/emoji/egg.svg';
import Hotel from '../../../../../public/svgs/emoji/hotel.svg';
import Dice from '../../../../../public/svgs/emoji/dice.svg';
import Sport from '../../../../../public/svgs/emoji/weight.svg';

export default function Step4() {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

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

  return (
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
  );
}
