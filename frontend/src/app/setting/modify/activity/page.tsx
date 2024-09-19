'use client';

import Header from '@/components/Header';
import SelectButton from '@/components/SelectButton';
import Activity from 'public/svgs/emoji/paragliding.svg';
import Rest from 'public/svgs/emoji/sofa.svg';
import City from 'public/svgs/emoji/coffee.svg';
import Leaf from 'public/svgs/emoji/leaf.svg';
import Fire from 'public/svgs/emoji/fire.svg';
import Moai from 'public/svgs/emoji/moai.svg';
import Learning from 'public/svgs/emoji/learning.svg';
import React, { useState } from 'react';
import Button from '@/components/Button';

export default function ModifyActivity() {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const options = [
    { text: '액티비티', icon: <Activity /> },
    { text: '휴식', icon: <Rest /> },
    { text: '도심', icon: <City /> },
    { text: '자연', icon: <Leaf /> },
    { text: '핫플', icon: <Fire /> },
    { text: '문화재', icon: <Moai /> },
    { text: '배움', icon: <Learning /> },
  ];
  const backClick = () => {};
  const selectButtonClick = () => {};
  const handleInputChange = (value: string) => {
    setSelectedOptions(prevState =>
      prevState.includes(value)
        ? prevState.filter(option => option !== value)
        : [...prevState, value],
    );
  };
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="max-w-sm h-full overflow-hidden relative w-full">
        <Header onLeftClick={backClick} />
        <div className="mt-4 mx-6">
          <p className="font-light text-xl">무엇을 하며 지내고 싶으신가요?</p>
          <div className="mt-4">
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
      <div className="fixed bottom-0 bg-white max-w-sm">
        <Button
          text="완료하기"
          isAllowed={selectedOptions.length > 0}
          onClick={selectButtonClick} // 구문 수정: 함수 호출을 올바르게 처리
        />
      </div>
    </div>
  );
}
