'use client';

import { useEffect, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import Input from '@/components/Input';
import Banner from './_components/Banner';

import HeartColor from '../../../public/svgs/heart-color.svg';
import Search from '../../../public/svgs/search.svg';
import JobIcon from '../../../public/svgs/job-icon.svg';
import StayIcon from '../../../public/svgs/stay-icon.svg';
import TourIcon from '../../../public/svgs/tour-icon.svg';
import Go from '../../../public/svgs/go.svg';
import SettingColor from '../../../public/svgs/setting-color.svg';

interface BannerInfo {
  type:
    | 'white-filter-on'
    | 'white-filter-off'
    | 'black-filter-on'
    | 'black-filter-off';
  title: string;
  description: string;
  backgroundImage: string;
}
interface UserInfo {
  name: string;
  profile: string;
}
interface AdInfo {
  title: string;
  link: string;
}

export default function MainPage() {
  const [bannerInfo, setBannerInfo] = useState<BannerInfo[]>([]);
  const [userInfo, setUserInfo] = useState<UserInfo>({
    name: '',
    profile: '',
  });
  const [adInfo, setAdInfo] = useState<AdInfo>({
    title: '',
    link: '/',
  });

  useEffect(() => {
    setBannerInfo([
      {
        type: 'white-filter-on',
        title: '완전한 휴식이 필요할 때',
        description: '일에 지친 몸과 마음을 쉬어갈 만한 장소를 확인해보세요', // 여기에 콤마 추가
        backgroundImage: '/images/banner-test.jpg',
      },
      {
        type: 'white-filter-on',
        title: '완전한 휴식이 필요할 때',
        description: '일에 지친 몸과 마음을 쉬어갈 만한 장소를 확인해보세요', // 여기에 콤마 추가
        backgroundImage: '/images/banner-test.jpg',
      },
    ]);
    setUserInfo({
      name: '여섯글자이름',
      profile: '/images/profile-test.png',
    });
    setAdInfo({
      title: '내용',
      link: '/',
    });
  }, []);

  const gun = () => {
    console.log('hi');
  };

  return (
    <div className="h-full px-6 py-5 border-2 bg-white flex justify-center items-start text-black">
      <div
        className="flex flex-col justify-start items-center
        gap-9
        bg-white w-full sm:max-w-sm pb-20"
      >
        <div className="flex flex-col gap-3.5 w-full">
          <div className="flex justify-between">
            <div className="flex gap-1 items-center cursor-pointer">
              <Image
                src={
                  userInfo.profile ? userInfo.profile : '/pngs/profile-test.png'
                }
                alt="Profile"
                width={20}
                height={20}
                className="rounded-3xl "
              />
              <span className="text-sm font-medium">
                {userInfo.name ? userInfo.name : '사용자'}
              </span>
            </div>
            <div className="flex gap-2">
              <HeartColor className="cursor-pointer" />
              <SettingColor className="cursor-pointer" />
            </div>
          </div>
          <div className="border border-gray-2 rounded-lg flex flex-col items-center">
            <div className="p-6 w-full flex flex-col gap-7 justify-center items-center">
              <Input leftIcon={<Search />} disabled onClick={gun} />
              <div className="flex justify-center items-center gap-5 text-gray-4 text-xs">
                <div className="flex flex-col justify-center items-center gap-2 cursor-pointer">
                  <div className="border border-gray-2 rounded-full flex justify-center items-center p-3">
                    <JobIcon />
                  </div>
                  <span>채용</span>
                </div>
                <div className="flex flex-col justify-center items-center gap-2 cursor-pointer">
                  <div className="border border-gray-2 rounded-full flex justify-center items-center p-3">
                    <StayIcon />
                  </div>
                  <span>숙소</span>
                </div>
                <div className="flex flex-col justify-center items-center gap-2 cursor-pointer">
                  <div className="border border-gray-2 rounded-full flex justify-center items-center p-3">
                    <TourIcon />
                  </div>
                  <span>관광</span>
                </div>
              </div>
            </div>
            <div className="w-full bg-gray-2 h-[1px]" />
            <Link
              href={adInfo.link ? adInfo.link : '/main'}
              className="p-6 w-full flex gap-7 justify-between items-center"
            >
              <span>{adInfo.title ? adInfo.title : '광고'}</span>
              <Go />
            </Link>
          </div>
        </div>
        <div className="flex flex-col gap-5 w-full">
          <span className="text-xl font-medium">
            {userInfo.name ? userInfo.name : '사용자'}님을 위한 추천
          </span>
          {bannerInfo.map((info, index) => (
            <Banner
              key={`info-${index}`}
              type={info.type}
              title={info.title}
              description={info.description}
              backgroundImage={
                <Image
                  className="object-cover"
                  src={info.backgroundImage}
                  alt="Background"
                  fill={true}
                  quality={100}
                />
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
}
