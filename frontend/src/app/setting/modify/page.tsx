'use client';

import Input from '@/components/Input';
import SelectButton from '@/components/SelectButton';
import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import Header from '@/components/Header';
import Image from 'next/image';
import ProfileDefault from '../../../../public/images/profile-default.jpg';
import Camera from '../../../../public/svgs/camera.svg';
import SmallButton from '@/components/SmallButton';
import DatePicker from '@/components/DatePicker';
import Arrow from '../../../../public/svgs/dropdown.svg';
import { useRouter } from 'next/navigation';
import DropDown from '@/components/DropDown';
import {
  createUserInfo,
  createUserNickname,
  createUserProfile,
  createUserRegion,
  createUserWork,
  getUserDetail,
} from '@/services/users';
import axios from 'axios';
import { UserDetail } from '@/types/user';
import useUserStore from '@/app/stores/loginStore';
import { base64ToFile } from '@/utils/imageUtil';
import useUserInfoStore from '@/app/stores/userInfoStore';
import Spinner from '@/components/Spinner';
import useModalStore from '@/app/stores/modalStore';

interface UserInfo {
  profileImg?: File;
  nickname: string;
  gender: string;
  work: string;
  region: string;
}

export default function SettingModify() {
  const [userInfo, setUserInfo] = useState<UserInfo>({
    nickname: '',
    gender: '',
    work: '',
    region: '부산',
  });
  const [birth, setBirth] = useState<string>('');
  const [loading, setLoading] = useState(true); // 로딩 상태 추가
  const { interests, setInterests } = useUserInfoStore();
  const imageRef = useRef<HTMLInputElement>(null);
  const [nicknameCheckMessage, setNicknameCheckMessage] = useState('');
  const nicknameRef = useRef('');
  const isProfileChangeRef = useRef(false);
  const router = useRouter();
  const formdata = new FormData();
  const { socialId } = useUserStore();
  const { isLoggedIn } = useUserStore();
  const { openModal } = useModalStore();

  const additionalItems = [
    {
      title: '하고 싶은 일',
      options: ['마케팅', '홍보', '인사', '요식업', '숙박업', '오락', '스포츠'],
      state: userInfo.work,
      setState: (option: string) => {
        setUserInfo({ ...userInfo, work: option });
      },
    },
    {
      title: '머무르고 싶은 지역',
      options: ['부산', '경주', '강릉', '여수', '전주', '제주', '춘천'],
      state: userInfo.region,
      setState: (option: string) => {
        setUserInfo({ ...userInfo, region: option });
      },
    },
  ];

  const profileClick = () => {
    imageRef.current?.click();
  };

  const profileImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target?.files) {
      setUserInfo({
        ...userInfo,
        profileImg: e.target?.files[0],
      });
      isProfileChangeRef.current = true;
    }
  };

  const nickNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserInfo({ ...userInfo, nickname: e.target.value });
  };

  const duplicateCheck = async () => {
    try {
      await createUserNickname({
        social_id: socialId,
        nickname: userInfo.nickname,
      });
      setNicknameCheckMessage('사용 가능한 닉네임 입니다.');
    } catch (e) {
      if (axios.isAxiosError(e) && e.response?.status === 400) {
        alert('이미 존재하는 닉네임 입니다.');
      }
      console.log(e);
    }
  };

  const genderSelectClick = (gender: string) => {
    setUserInfo({ ...userInfo, gender });
  };

  const gotoTourPageClick = () => {
    router.push('/setting/modify/tour');
  };

  const submitClick = async () => {
    try {
      setLoading(true);
      if (isProfileChangeRef.current && userInfo.profileImg) {
        formdata.append('profile', userInfo.profileImg);
        await createUserProfile(formdata);
      }
      await createUserInfo({
        social_id: socialId,
        birth,
        gender: userInfo.gender,
      });
      await createUserRegion({
        social_id: socialId,
        regions: [userInfo.region],
      });
      await createUserWork({
        social_id: socialId,
        works: [userInfo.work],
      });
      router.push('/setting');
    } catch (e) {
      if (axios.isAxiosError(e) && e.response?.status === 400) {
        // 예외 처리 로직 추가 가능
      }
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserInfo = async () => {
    try {
      const result: UserDetail = await getUserDetail();
      setUserInfo({
        profileImg: base64ToFile({
          base64String: result.user.profile_picture_base64,
          fileName: 'profile',
        }),
        nickname: result.user.nickname,
        gender: result.user.gender,
        region: (result.regions && result.regions[0]) || '부산',
        work: (result.works && result.works[0]) || '마케팅',
      });
      setInterests(result.interests || []);
      setBirth(result.user.birth);
      nicknameRef.current = result.user.nickname;
    } catch (error) {
      console.error('Error fetching user details:', error);
    } finally {
      setLoading(false); // 로딩 완료
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchUserInfo();
    } else {
      setLoading(false);
      openModal();
    }
  }, [isLoggedIn]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="h-screen flex justify-center items-center">
      <Header text="설정" rightText="완료" onRightClick={submitClick} />
      <div className="pt-[60px] max-w-sm h-full relative w-full">
        {/* 프로필 사진 */}
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
                userInfo.profileImg
                  ? URL.createObjectURL(userInfo.profileImg)
                  : ProfileDefault
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
        {/* 유저 정보 */}
        <div className="px-6 flex flex-col gap-4">
          <div>
            <p className="pb-4">닉네임</p>
            <div>
              <div className="flex gap-1">
                <Input
                  placeholder="닉네임"
                  value={userInfo.nickname}
                  onChange={nickNameChange}
                />
                <SmallButton
                  text="중복확인"
                  onClick={duplicateCheck}
                  isAllowed={userInfo.nickname !== nicknameRef.current}
                />
              </div>
              <p className="text-[#0000FF] text-sm">{nicknameCheckMessage}</p>
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
        {/* 추가 정보 */}
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
            <p className="whitespace-nowrap">관심있는 관광</p>
            <div className="flex gap-2.5 items-center pl-4">
              <p>{interests.join(', ')}</p>
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
