'use client';

import React, { useState } from 'react';
import SelectButton from '@/components/SelectButton/index';
import Heart from '../../../../../public/svgs/heart.svg';

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
    { text: '마케팅', icon: <Heart /> },
    { text: '홍보', icon: <Heart /> },
    { text: '인사', icon: <Heart /> },
    { text: '요식업', icon: <Heart /> },
    { text: '숙박업', icon: <Heart /> },
    { text: '오락', icon: <Heart /> },
    { text: '스포츠', icon: <Heart /> },
  ];

  return (
    <div className="pt-6">
      <p className="font-light text-xl">어떤 일을 하고 싶으신가요?</p>
      <p className="font-normal text-md text-gray-3 pt-3">
        최대 0개까지 선택 가능하며 나중에 설정에서 변경할 수 있어요.
      </p>
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
  );
}
