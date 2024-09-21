'use client';

import React, { useState } from 'react';
import Badge from '@/app/onboarding/_components/Badge';
import { useRouter, useSearchParams } from 'next/navigation';
import Button from '@/components/Button';
import SelectButton from '@/components/SelectButton';
import PublicAxiosInstance from '@/services/publicAxiosInstance';
import DatePicker from '@/components/DatePicker';

export default function Step2() {
  const router = useRouter();
  const [gender, setGender] = useState('');
  const [birth, setBirth] = useState<string>(''); // YYYY-MM-DD

  // 서버에서 클라이언트로 전달하는 search param을 로컬 변수에 저장
  const searchParam = useSearchParams();
  const socialId = searchParam.get('social_id');
  const provider = searchParam.get('provider');

  const handleNextClick = async () => {
    try {
      await PublicAxiosInstance.patch('/users/info', {
        social_id: socialId,
        birth: birth,
        gender: gender,
      });
      router.push(
        `/onboarding/step3?social_id=${socialId}&provider=${provider}`,
      );
    } catch (e) {
      console.error(e);
    }
  };

  // 성별 선택
  const handleGenderSelect = (selectedGender: string) => {
    setGender(selectedGender);
  };

  return (
    <div className="flex justify-center min-h-screen">
      <div className="w-full max-w-[393px] flex flex-col items-start px-6">
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

        <div className="pt-6 w-full">
          <p className="font-light text-xl">나이와 성별을 알려주세요</p>
          <p className="font-normal text-lg pt-4">생년월일</p>
          <div className="pt-4">
            <DatePicker state={birth} setState={setBirth} />
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
      <div className="max-w-[393px] w-full fixed bottom-0 bg-white">
        <Button
          text="다음으로"
          isAllowed={gender !== '' && birth !== ''}
          onClick={handleNextClick} // 구문 수정: 함수 호출을 올바르게 처리
        />
      </div>
    </div>
  );
}
