'use client';

import Input from '@/components/Input';
import React, { useRef, useState } from 'react';
import Badge from '@/app/onboarding/_components/Badge';
import { useRouter } from 'next/navigation';
import Button from '@/components/Button';
import CalendarIcon from '../../../../public/svgs/calender.svg';
import SelectButton from '@/components/SelectButton';
import styled from 'styled-components';

const StyledInput = styled(Input)`
  &::-webkit-calendar-picker-indicator {
    display: none;
    -webkit-appearance: none;
  }
  &::-webkit-clear-button,
  &::-webkit-inner-spin-button {
    display: none;
  }
`;

export default function Step2() {
  const router = useRouter();

  const handleNextClick = () => {
    router.push('/onboarding/step3');
  };

  const [gender, setGender] = useState('');
  const inputRef = useRef<HTMLInputElement>(null); // input 요소에 접근하기 위한 ref 생성

  // 성별 선택
  const handleGenderSelect = (selectedGender: string) => {
    setGender(selectedGender);
  };

  const handleInputChange = (value: string) => {
    console.log(value);
  };

  const handleCalendarIconClick = () => {
    if (inputRef.current) {
      inputRef.current.showPicker(); // input 요소를 클릭하여 날짜 선택 UI를 띄움
    }
  };

  return (
    <div className="bg-white min-h-screen flex flex-col justify-between">
      <div className="px-6">
        <div className="py-3 min-h-14">
          {/* 백 버튼이 필요하다면 여기에 추가할 수 있음 */}
        </div>
        <div className="flex gap-2">
          <Badge number={1} isSelected />
          <Badge number={2} isSelected />
          <Badge number={3} isSelected={false} />
          <Badge number={4} isSelected={false} />
          <Badge number={5} isSelected={false} />
        </div>

        <div className="pt-6">
          <p className="font-light text-xl">나이와 성별을 알려주세요</p>
          <p className="font-normal text-lg pt-4">생년월일</p>
          <div className="pt-4">
            <StyledInput
              // ref={inputRef}
              placeholder="생년월일"
              // type="date"
              onChange={handleInputChange}
              rightIcon={<CalendarIcon onClick={handleCalendarIconClick} />}
            />
          </div>
          <p className="font-normal text-lg pt-4">성별</p>
          <div className="pt-4 flex justify-between gap-2 w-full sm:w-auto flex-1 text-center">
            <SelectButton
              text="남자"
              isSelect={gender === '남자'}
              onClick={() => handleGenderSelect('남자')}
            />
            <SelectButton
              text="여자"
              isSelect={gender === '여자'}
              onClick={() => handleGenderSelect('여자')}
            />
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
