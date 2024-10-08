'use client';

import Input from '@/components/Input';
import React, { useState } from 'react';
import Badge from '@/app/onboarding/_components/Badge';
import Button from '@/components/Button';
import { useRouter, useSearchParams } from 'next/navigation';
import { createUserNickname } from '@/services/users';
import axios from 'axios';

export default function Step1() {
  const [nickname, setNickname] = useState('');
  const [isNicknameUnique, setIsNicknameUnique] = useState<boolean | null>(
    null,
  );
  const [errorMessage, setErrorMessage] = useState('');
  const [messageColor, setMessageColor] = useState('red');
  const router = useRouter();

  const searchParam = useSearchParams();
  const socialId = searchParam.get('social_id');
  const provider = searchParam.get('provider');

  const handleDuplicateCheck = async () => {
    if (nickname.length === 1) {
      setErrorMessage('닉네임은 최소 두 글자여야 합니다.');
      setMessageColor('red');
      return;
    }

    try {
      await createUserNickname({
        social_id: socialId,
        nickname,
      });
      setIsNicknameUnique(true);
      setErrorMessage('사용 가능한 닉네임입니다.');
      setMessageColor('blue');
    } catch (e) {
      if (axios.isAxiosError(e)) {
        if (e.response?.status === 400) {
          setIsNicknameUnique(false);
          setErrorMessage('중복된 닉네임입니다.');
          setMessageColor('red');
        } else {
          console.error(e);
          setErrorMessage('닉네임 확인 중 오류가 발생했습니다.');
          setMessageColor('red');
        }
      }
    }
  };

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newNickname = e.target.value;

    const koreanRegex = /^[ㄱ-ㅎ|가-힣]+$/;

    if (newNickname.length === 0) {
      setErrorMessage('');
      setMessageColor('');
      setNickname(newNickname);
      return;
    }

    if (!koreanRegex.test(newNickname)) {
      setErrorMessage('닉네임은 한글만 입력할 수 있습니다.');
      setMessageColor('red');
    } else if (newNickname.length > 6) {
      setErrorMessage('닉네임은 6글자를 넘을 수 없습니다.');
      setMessageColor('red');
    } else {
      setErrorMessage('');
      setMessageColor('');
      setNickname(newNickname);
    }
  };

  const handleNextClick = async () => {
    router.push(`/onboarding/step2?social_id=${socialId}&provider=${provider}`);
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
              onChange={handleNicknameChange}
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
          {errorMessage && (
            <p
              style={{
                color: messageColor,
                fontSize: '12px',
                marginTop: '5px',
              }}
            >
              {errorMessage}
            </p>
          )}
        </div>
      </div>
      <div className="max-w-[393px] w-full fixed bottom-0 bg-white">
        <Button
          text="다음으로"
          isAllowed={nickname !== '' && isNicknameUnique === true}
          onClick={handleNextClick}
        />
      </div>
    </div>
  );
}
