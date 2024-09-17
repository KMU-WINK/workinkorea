'use client';

import Header from '@/components/Header';
import Image from 'next/image';
import ProfileDefault from '../../../public/images/profile-default.jpg';
import Content from '@/components/Content';

export default function Setting() {
  const onBackButtonClick = () => {};
  const onLogoutClick = () => {};
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="max-w-sm h-full overflow-hidden relative w-full">
        <Header onLeftClick={onBackButtonClick} text="설정" rightText="수정" />
        <div className="mt-6 mb-[18px] mx-auto rounded-full overflow-hidden w-[50px] h-[50px] relative">
          {/*유저 이미지 받아오기*/}
          <Image src={ProfileDefault} alt="profile-image" fill />
        </div>
        <div className="px-6">
          <div className="flex justify-between py-4">
            <p className="font-medium">닉네임</p>
            <p>여섯글자 이름</p>
          </div>
          <div className="flex justify-between py-4">
            <p>생년월일</p>
            <p>2022.01.01</p>
          </div>
          <div className="flex justify-between py-4">
            <p>성별</p>
            <p>여자</p>
          </div>
        </div>
        <hr className="border-gray-1 my-3" />
        <div className="px-6">
          <div className="flex justify-between py-4">
            <p>하고 싶은 일</p>
            <p>인사</p>
          </div>
          <div className="flex justify-between py-4">
            <p>머무르고 싶은 지역</p>
            <p>부산</p>
          </div>
          <div className="flex justify-between py-4">
            <p>관심있는 관광</p>
            <p>액티비티, 자연, 문화재, 핫플</p>
          </div>
        </div>
        <hr className="border-gray-1 my-3 border-8" />
        <div className="mt-[10px] mx-6">
          <Content text="로그아웃" onClick={onLogoutClick} />
        </div>
      </div>
    </div>
  );
}
