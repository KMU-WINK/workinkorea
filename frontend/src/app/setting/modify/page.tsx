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
import { useRouter } from 'next/navigation';
import DropDown from '@/components/DropDown';
import Marketing from 'public/svgs/emoji/marketing.svg';
import Sound from 'public/svgs/emoji/sound.svg';
import Greeting from 'public/svgs/emoji/greeting.svg';
import Egg from 'public/svgs/emoji/egg.svg';
import Hotel from 'public/svgs/emoji/hotel.svg';
import Dice from 'public/svgs/emoji/dice.svg';
import Sport from 'public/svgs/emoji/weight.svg';
import BusanImage from 'public/images/location/부산.png';
import GyeongjuImage from 'public/images/location/경주.png';
import GangneungImage from 'public/images/location/강릉.png';
import YeosuImage from 'public/images/location/여수.png';
import JeonjuImage from 'public/images/location/전주.png';
import JejuImage from 'public/images/location/제주.png';
import ChuncheonImage from 'public/images/location/춘천.png';
import { state } from 'sucrase/dist/types/parser/traverser/base';

const locations = [
  { name: '부산', image: BusanImage },
  { name: '경주', image: GyeongjuImage },
  { name: '강릉', image: GangneungImage },
  { name: '여수', image: YeosuImage },
  { name: '전주', image: JeonjuImage },
  { name: '제주', image: JejuImage },
  { name: '춘천', image: ChuncheonImage },
];

export default function SettingModify() {
  const [profileImg, setProfileImg] = useState<File | null>();
  const [userInfo, setUserInfo] = useState<UserInfo>({
    social_id: '',
    gender: '남자',
  });
  const [birth, setBirth] = useState<string>('');
  const [work, setWork] = useState('마케팅');
  const [region, setRegion] = useState('부산');
  const imageRef = useRef<HTMLInputElement>(null);

  const additionalItems = [
    {
      title: '하고 싶은 일',
      options: ['마케팅', '홍보', '인사', '요식업', '숙박업', '오락', '스포츠'],
      state: work,
      setState: setWork,
    },
    {
      title: '머무르고 싶은 지역',
      options: ['부산', '경주', '강릉', '여수', '전주', '제주', '춘천'],
      state: region,
      setState: setRegion,
    },
  ];

  const router = useRouter();
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

  const gotoTourPageClick = () => {
    router.push('/setting/modify/tour');
  };

  const submitClick = () => {
    router.push('/setting');
  };
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
        <div className="relative">
          <div
            className="mt-6 mb-[18px] mx-auto rounded-full overflow-hidden w-[50px] h-[50px] relative cursor-pointer"
            onClick={profileClick}
          >
            <Image
              src={
                profileImg ? URL.createObjectURL(profileImg) : ProfileDefault
              }
              alt="profile-image"
              fill
              style={{ objectFit: 'cover' }}
            />
          </div>
          <span
            className="relative bottom-[38px] left-[201px] w-fit rounded-full flex justify-center items-center px-[3.5px] py-[2.8px] bg-gray-1 cursor-pointer"
            onClick={profileClick}
          >
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
          {additionalItems.map((item, index) => (
            <div key={index} className="flex justify-between items-center">
              <p className="flex-1">{item.title}</p>
              <DropDown
                options={item.options}
                selectedOption={item.state}
                setSelectedOption={item.setState}
              />
            </div>
          ))}
          <div
            className="flex justify-between cursor-pointer"
            onClick={gotoTourPageClick}
          >
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
