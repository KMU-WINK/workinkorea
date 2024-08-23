'use client';

import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import Input from '@/components/Input';
import SelectButton from '@/components/SelectButton';
import CalendarIcon from '../../../../../public/svgs/calender.svg';

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
  );
}
