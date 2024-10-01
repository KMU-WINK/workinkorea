'use client';

import Header from '@/components/Header';
import Image from 'next/image';
import ProfileDefault from '../../../public/images/profile-default.jpg';
import Content from '@/components/Content';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getUserDetail } from '@/services/users';
import { UserDetail } from '@/types/user';
import { formatDateWithDots } from '@/utils/dateUtils';
import PrivateAxiosInstance from '@/services/privateAxiosInstance';
import useUserStore from '../stores/loginStore';
import { AxiosError } from 'axios';
import { base64ToFile } from '@/utils/imageUtil';
import Spinner from '@/components/Spinner';
import useModalStore from '@/app/stores/modalStore';

export default function Setting() {
  const [userDetail, setUserDetail] = useState<UserDetail>();
  const [profileFile, setProfileFile] = useState<File | undefined>();
  const [loading, setLoading] = useState(true); // 로딩 상태 추가
  const router = useRouter();
  const { isLoggedIn, logout } = useUserStore();
  const { openModal } = useModalStore();

  const backButtonClick = () => {
    router.push('/main');
  };
  const modifyClick = () => {
    router.push('/setting/modify');
  };
  const logoutClick = async () => {
    try {
      await PrivateAxiosInstance.delete('/auth/token');
      logout();
      router.replace('/main');
    } catch (e) {
      console.error(e);
    }
  };

  const fetchUserInfo = async () => {
    try {
      const result = await getUserDetail();
      if (result instanceof AxiosError) {
        throw result;
      } else {
        setUserDetail(result);
        setProfileFile(
          base64ToFile({
            base64String: result?.user.profile_picture_base64,
            fileName: 'image',
          }),
        );
      }
    } catch (error) {
      console.error('Error fetching user details:', error);
    } finally {
      setLoading(false); // 로딩 완료
    }
  };

  useEffect(() => {
    console.log(isLoggedIn);
    if (isLoggedIn) {
      fetchUserInfo();
    } else {
      openModal();
    }
  }, [isLoggedIn]);

  if (loading) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  return (
    <div className="h-screen flex justify-center items-center">
      <Header
        onLeftClick={backButtonClick}
        text="설정"
        rightText="수정"
        onRightClick={modifyClick}
      />
      <div className="pt-[84px] max-w-sm h-full overflow-hidden relative w-full">
        <div className="mb-[18px] mx-auto rounded-full overflow-hidden w-[50px] h-[50px] relative">
          {/*유저 이미지 받아오기*/}
          <Image
            src={
              profileFile ? URL.createObjectURL(profileFile) : ProfileDefault
            }
            alt="profile-image"
            fill
          />
        </div>
        <div className="px-6">
          <div className="flex justify-between py-4">
            <p className="font-medium">닉네임</p>
            <p>{userDetail?.user.nickname}</p>
          </div>
          <div className="flex justify-between py-4">
            <p>생년월일</p>
            <p>{formatDateWithDots(userDetail?.user.birth || '')}</p>
          </div>
          <div className="flex justify-between py-4">
            <p>성별</p>
            <p>{userDetail?.user.gender}</p>
          </div>
        </div>
        <hr className="border-gray-1 my-3" />
        <div className="px-6">
          <div className="flex justify-between py-4">
            <p>하고 싶은 일</p>
            <p>{userDetail?.works && userDetail?.works[0]}</p>
          </div>
          <div className="flex justify-between py-4">
            <p>머무르고 싶은 지역</p>
            <p>{userDetail?.regions && userDetail.regions[0]}</p>
          </div>
          <div className="flex justify-between py-4">
            <p className="whitespace-nowrap">관심있는 관광</p>
            <p className="pl-4">{userDetail?.interests?.join(',')}</p>
          </div>
        </div>
        <hr className="border-gray-1 my-3 border-8" />
        <div className="mt-[10px] mx-6">
          <Content text="로그아웃" onClick={logoutClick} />
        </div>
      </div>
    </div>
  );
}
