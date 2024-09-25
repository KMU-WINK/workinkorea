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
import { useRouter } from 'next/navigation';
import { createUserInterest } from '@/services/users';
import axios from 'axios';

export default function ModifyTour() {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const router = useRouter();
  const options = [
    { text: '액티비티', icon: <Activity /> },
    { text: '휴식', icon: <Rest /> },
    { text: '도심', icon: <City /> },
    { text: '자연', icon: <Leaf /> },
    { text: '핫플', icon: <Fire /> },
    { text: '문화재', icon: <Moai /> },
    { text: '배움', icon: <Learning /> },
  ];

  // todo : 전역 변수로 저장되어있는 social_id 가져오기
  const socialId = '3715601705';
  const backClick = () => {
    router.back();
  };
  const selectButtonClick = async () => {
    try {
      await createUserInterest({
        social_id: socialId,
        interests: selectedOptions,
      });
      router.push('/setting/modify');
    } catch (e) {
      if (axios.isAxiosError(e)) {
        if (e.response?.status === 400) {
          // todo: social_id가 없을 경우 예외처리
        }
      }
      console.log(e);
    }
  };
  const handleInputChange = (value: string) => {
    setSelectedOptions(prevState =>
      prevState.includes(value)
        ? prevState.filter(option => option !== value)
        : [...prevState, value],
    );
  };
  return (
    <div className="h-screen flex justify-center items-center">
      <Header onLeftClick={backClick} />
      <div className="pt-[60px] max-w-sm h-full overflow-hidden relative w-full">
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
      <Button
        text="완료하기"
        isAllowed={selectedOptions.length > 0}
        onClick={selectButtonClick}
      />
    </div>
  );
}
