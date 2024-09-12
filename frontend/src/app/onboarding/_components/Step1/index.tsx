'use client';

import React from 'react';
import Input from '@/components/Input';

interface Step1Props {
  nickname: string;
  onNicknameChange: (nickname: string) => void;
}

export default function Step1({ nickname, onNicknameChange }: Step1Props) {
  const handleInputChange = (value: string) => {
    onNicknameChange(value);
  };

  return (
    <div className="pt-6">
      <p className="font-light text-xl">반가워요! 뭐라고 불러드릴까요?</p>
      <p className="font-normal text-md text-gray-3 pt-3">
        6글자 이내로 한글만 입력 가능해요
      </p>
      <div className="pt-6">
        <Input
          placeholder="여섯글자이름"
          value={nickname} // nickname 값을 전달
          onChange={handleInputChange} // 변경된 값을 부모 컴포넌트에 전달
        />
      </div>
    </div>
  );
}