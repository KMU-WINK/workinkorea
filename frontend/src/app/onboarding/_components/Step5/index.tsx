'use client';

import React, { useState } from 'react';
import SelectButton from '@/components/SelectButton';
import Activity from '../../../../../public/svgs/emoji/paragliding.svg';
import Rest from '../../../../../public/svgs/emoji/sofa.svg';
import City from '../../../../../public/svgs/emoji/coffee.svg';
import Leaf from '../../../../../public/svgs/emoji/leaf.svg';
import Fire from '../../../../../public/svgs/emoji/fire.svg';
import Moai from '../../../../../public/svgs/emoji/moai.svg';
import Learning from '../../../../../public/svgs/emoji/learning.svg';

export default function Step5() {
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
