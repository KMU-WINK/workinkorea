'use client';

import Input from '@/components/Input';
import SelectButton from '@/components/SelectButton';
import React, { ChangeEvent, useRef, useState } from 'react';
import { UserInfo } from '@/types/user';
import Header from '@/components/Header';
import Image from 'next/image';
import ProfileDefault from '../../../../public/images/profile-default.jpg';
import Camera from '../../../../public/svgs/camera.svg';
import SmallButton from '@/components/SmallButton';
import DatePicker from '@/components/DatePicker';
import Arrow from '../.././../../public/svgs/dropdown.svg';
import Back from '../../../../public/svgs/back.svg';

export default function SettingModify() {
  const [profileImg, setProfileImg] = useState<File | null>();
  const [userInfo, setUserInfo] = useState<UserInfo>({
    social_id: '',
    gender: '남자',
  });
  const [birth, setBirth] = useState<string>('');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const imageRef = useRef<HTMLInputElement>(null);
  const profileClick = () => {
    imageRef.current?.click();
  };

  const profileImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target?.files) {
      setProfileImg(e.target?.files[0]);
      console.log(e.target.files[0]);
    }
  };
  const duplicateCheck = () => {};
  const genderSelectClick = (gender: string) => {
    setUserInfo({ ...userInfo, gender });
  };

  const submitClick = () => {};
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="max-w-sm h-full overflow-hidden relative w-full">
        <Header text="설정" rightText="완료" onRightClick={submitClick} />
        {/*프로필 사진*/}
        <input
          type="file"
          accept="image/*"
          className="hidden"
          ref={imageRef}
          onChange={profileImageChange}
        />
        <div className="relative cursor-pointer" onClick={profileClick}>
          <div className="mt-6 mb-[18px] mx-auto rounded-full overflow-hidden w-[50px] h-[50px] relative">
            <Image
              src={
                profileImg ? URL.createObjectURL(profileImg) : ProfileDefault
              }
              alt="profile-image"
              fill
              style={{ objectFit: 'cover' }}
            />
          </div>
          <span className="relative bottom-[38px] left-[201px] w-fit rounded-full flex justify-center items-center px-[3.5px] py-[2.8px] bg-gray-1">
            <Camera />
          </span>
        </div>
        {/*유저 정보*/}
        <div className="px-6 flex flex-col gap-4">
          <div>
            <p className="pb-4">닉네임</p>
            <div className="flex gap-1">
              <Input placeholder="닉네임" />
              <SmallButton text="중복확인" onClick={duplicateCheck} />
            </div>
          </div>
          <div>
            <p className="pb-4">생년월일</p>
            <DatePicker state={birth} setState={setBirth} />
          </div>
          <div>
            <p className="pb-4">성별</p>
            <div className="flex justify-between gap-2">
              <SelectButton
                text="남자"
                isSelect={userInfo.gender === '남자'}
                onClick={() => genderSelectClick('남자')}
              />
              <SelectButton
                text="여자"
                isSelect={userInfo.gender === '여자'}
                onClick={() => genderSelectClick('여자')}
              />
            </div>
          </div>
        </div>
        <hr className="mt-8 border-gray-2" />
        {/*추가 정보*/}
        <div className="flex flex-col gap-7 p-6 font-light">
          <div>
            <p>하고 싶은 일</p>
            {/*드롭다운 컴포넌트 추가*/}
          </div>
          <div className="flex justify-between">
            <p>관심있는 관광</p>
            <div className="flex gap-2.5 items-center">
              <p>액티비티</p>
              <div className="-rotate-90 flex h-3">
                <Arrow />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
