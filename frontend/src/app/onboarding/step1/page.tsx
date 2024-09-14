'use client';

import Input from '@/components/Input';
import React, { useState } from 'react';
import Badge from '@/app/onboarding/_components/Badge';
import { useRouter, useSearchParams } from 'next/navigation';
import Button from '@/components/Button';

export default function Step1() {
  const [nickname, setNickname] = useState('');
  const router = useRouter();

  // 서버에서 클라이언트로 전달하는 search param을 로컬 변수에 저장
  const searchParam = useSearchParams();
  const socialId = searchParam.get('social_id');
  const provider = searchParam.get('provider');

  console.log(socialId);

  const handleNextClick = async () => {
    // 다음 페이지에서도 social id, provider 정보를 search param을 통하여 접근할 수 있도록 추가
    // props로 전달할 수도 있지만 서버에서 onboarding/step1 ~ /step5까지 search param을 통하여 정보를 전달하기 때문에 통일하기 위함
    router.push(`/onboarding/step2?social_id=${socialId}&provider=${provider}`);
  };

  return (
    <div className="bg-white min-h-screen flex flex-col justify-between">
      <div className="px-6">
        <div className="py-3 min-h-14">
          {/* 백 버튼이 필요하다면 여기에 추가할 수 있음 */}
        </div>
        <div className="flex gap-2">
          {/* Badge 컴포넌트 - 현재는 Step1이라 1만 선택된 상태 */}
          <Badge number={1} isSelected />
          <Badge number={2} isSelected={false} />
          <Badge number={3} isSelected={false} />
          <Badge number={4} isSelected={false} />
          <Badge number={5} isSelected={false} />
        </div>

        <div className="pt-6">
          <p className="font-light text-xl">반가워요! 뭐라고 불러드릴까요?</p>
          <p className="font-normal text-md text-gray-3 pt-3">
            6글자 이내로 한글만 입력 가능해요
          </p>
          <div className="pt-6">
            <Input
              placeholder="여섯글자이름"
              value={nickname}
              onChange={e => {
                setNickname(e.target.value);
              }}
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
