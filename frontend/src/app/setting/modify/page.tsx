'use client';

import Input from '@/components/Input';
import SelectButton from '@/components/SelectButton';
import { useState } from 'react';
import { UserInfo } from '@/types/user';
import Header from '@/components/Header';
import Image from 'next/image';
import ProfileDefault from '../../../../public/images/profile-default.jpg';
import Camera from '../../../../public/svgs/camera.svg';
import SmallButton from '@/components/SmallButton';

export default function SettingModify() {
  const [userInfo, setUserInfo] = useState<UserInfo>({
    social_id: '',
    birth: '',
    gender: '',
  });
  const profileClick = () => {};
  const duplicateCheck = () => {};
  const genderSelectClick = () => {};

  const submitClick = () => {};
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="max-w-sm h-full overflow-hidden relative w-full">
        <Header text="설정" rightText="완료" onRightClick={submitClick} />
        {/*프로필 사진*/}
        <div className="relative cursor-pointer" onClick={profileClick}>
          <div className="mt-6 mb-[18px] mx-auto rounded-full overflow-hidden w-[50px] h-[50px] relative">
            <Image src={ProfileDefault} alt="profile-image" fill />
          </div>
          <span className="relative bottom-[38px] left-[201px] w-fit rounded-full flex justify-center items-center px-[3.5px] py-[2.8px] bg-gray-1">
            <Camera />
          </span>
        </div>
        {/*유저 정보*/}
        <div className="px-6 flex flex-col gap-4">
          <div>
            <p className="pb-2">닉네임</p>
            <div className="flex gap-1">
              <Input placeholder="닉네임" />
              <SmallButton text="중복확인" onClick={duplicateCheck} />
            </div>
          </div>
          <div>
            <p className="pb-2">생년월일</p>
            {/*생년월일 input 추가*/}
          </div>
          <div>
            <p className="pb-2">성별</p>
            <SelectButton text="남자" isSelect onClick={genderSelectClick} />
          </div>
        </div>
      </div>
    </div>
  );
}
