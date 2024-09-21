'use client';

import Input from '@/components/Input';
import React, { useState } from 'react';
import Badge from '@/app/onboarding/_components/Badge';
import Button from '@/components/Button';
import { useRouter, useSearchParams } from 'next/navigation';
import PublicAxiosInstance from '@/services/publicAxiosInstance';

export default function Step1() {
  const [nickname, setNickname] = useState('');
  const [isNicknameUnique, setIsNicknameUnique] = useState<boolean | null>(
    null,
  ); // 중복 여부 상태 추가
  const router = useRouter();

  // 서버에서 클라이언트로 전달하는 search param을 로컬 변수에 저장
  const searchParam = useSearchParams();
  const socialId = searchParam.get('social_id');
  const provider = searchParam.get('provider');

  const handleDuplicateCheck = async () => {
    try {
      await PublicAxiosInstance.patch('/users/nickname', {
        social_id: socialId,
        nickname: nickname,
      });
      setIsNicknameUnique(true);
    } catch (e) {
      console.error(e);
      setIsNicknameUnique(false);
      alert('중복된 닉네임입니다.');
    }
  };

  const handleNextClick = async () => {
    router.push(`/onboarding/step2?social_id=${socialId}&provider=${provider}`);
  };

  // 닉네임 입력 시 6글자 초과 방지
  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newNickname = e.target.value;
    if (newNickname.length <= 6) {
      setNickname(newNickname);
      // setIsNicknameUnique(null); // 닉네임이 변경되면 중복 검사 초기화
    }
  };

  return (
    <div className="flex justify-center min-h-screen">
      <div className="w-full max-w-[393px] flex flex-col items-start px-6 mb-[90px]">
        <div className="py-3 min-h-14"></div>
        <div className="flex gap-2">
          <Badge number={1} isSelected />
          <Badge number={2} isSelected={false} />
          <Badge number={3} isSelected={false} />
          <Badge number={4} isSelected={false} />
          <Badge number={5} isSelected={false} />
        </div>

        <div className="pt-6 w-full">
          <p className="font-light text-xl">반가워요! 뭐라고 불러드릴까요?</p>
          <p className="font-normal text-md text-gray-3 pt-3">
            6글자 이내로 한글만 입력 가능해요
          </p>
          <div className="pt-6 flex gap-1 items-center">
            <Input
              placeholder="여섯글자이름"
              value={nickname}
              onChange={handleNicknameChange} // 닉네임 변경 함수에 제한 적용
            />
            <div>
              <button
                onClick={handleDuplicateCheck}
                className="w-[80px] h-[53px] text-[14px] bg-main text-white rounded-lg"
              >
                중복확인
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-[393px] w-full fixed bottom-0 bg-white">
        <Button
          text="다음으로"
          isAllowed={nickname !== '' && isNicknameUnique == true} // 닉네임이 중복되지 않는 경우에만 버튼 활성화
          onClick={handleNextClick}
        />
      </div>
    </div>
  );
}
