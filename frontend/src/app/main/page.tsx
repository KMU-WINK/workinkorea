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
import useUserStore from '../stores/loginStore';
import useModalStore from '../stores/modalStore';
import { useRouter } from 'next/navigation';
import { getUserDetail } from '@/services/users';
import { base64ToFile } from '@/utils/imageUtil';
import { UserDetail } from '@/types/user';
import ProfileDefault from '../../../public/images/profile-default.jpg';
import { bannerList } from '@/constants/bannerInfo';
import { getGoogleSentence } from '@/services/google';

interface BannerType {
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
  profile?: string;
}
interface AdInfo {
  title: string;
  link: string;
}

export default function MainPage() {
  const router = useRouter();
  const [bannerInfo, setBannerInfo] = useState<BannerType>();
  const [userInfo, setUserInfo] = useState<UserInfo>({
    name: '',
    profile: '',
  });
  const [adInfo, setAdInfo] = useState<AdInfo>({
    title: '',
    link: '/',
  });
  const [loading, setLoading] = useState(true);

  const [location, setLocation] = useState<keyof typeof bannerList>('부산');
  const [bannerText, setBannerText] = useState<string>();
  const [googleLocation, setGoogleLocation] =
    useState<keyof typeof bannerList>('부산');
  const [googleImage, setGoogleImage] = useState();
  const { openModal } = useModalStore();
  const { isLoggedIn, login, logout } = useUserStore();

  useEffect(() => {
    const checkIsLoggedIn = () => {
      const cookies = document.cookie.split('; ');
      const socialIdCookie = cookies.find(cookie =>
        cookie.startsWith('social_id='),
      );

      if (socialIdCookie) {
        const socialId = socialIdCookie.split('=')[1];
        login(socialId);
        fetchUserInfo();
      } else {
        setLoading(false);
        logout();
      }
    };
    getGoogleInfo();

    checkIsLoggedIn();
    setAdInfo({
      title: '워크인코리아 공식 노션 바로가기',
      link: 'https://possible-rowboat-b63.notion.site/111170be5ff980418c37e6aea0d0f1c8',
    });
  }, []);

  const inputClick = () => {
    router.push('/search');
  };

  const tagClick = (type: string) => {
    router.push(`/${type}?location=${location}&keyword=`);
  };

  const wishClick = () => {
    router.push('/wish');
  };

  const settingClick = () => {
    router.push('/setting');
  };

  const bannerClick = () => {
    router.push(`/recommend?location=${location}&type=recommend`);
  };

  const fetchUserInfo = async () => {
    const result: UserDetail = await getUserDetail();
    setLoading(false);
    const profileFile = base64ToFile({
      base64String: result.user.profile_picture_base64,
      fileName: 'profile',
    });
    setUserInfo({
      name: result.user.nickname,
      profile: profileFile ? URL.createObjectURL(profileFile) : '',
    });

    if (
      result.regions &&
      result.regions.length > 0 &&
      result.regions[0] in bannerList
    ) {
      setLocation(result.regions[0] as keyof typeof bannerList);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchUserInfo();
    }
  }, [isLoggedIn]);

  const getGoogleInfo = async () => {
    const gun = await getGoogleSentence();
    // const gugu = gun.sentence.split(' ')[0];
    // console.log('gugu : ', gugu);
    setGoogleLocation(gun.sentence.split(' ')[0]);
    // console.log('gun : ', gun);
    setBannerText(gun.sentence);
    // @ts-ignore
    setGoogleImage(bannerList[googleLocation].imagePath2);
  };

  useEffect(() => {
    console.log('googleLocation : ', googleLocation);
  }, [googleLocation]);

  useEffect(() => {
    if (location) {
      setBannerInfo({
        type: 'white-filter-on',
        title: bannerList[location].title,
        description: '일에 지친 몸과 마음을 쉬어갈 만한 장소를 확인해보세요',
        backgroundImage: bannerList[location].imagePath,
      });
      // console.log(
      //   'bannerList[location].imagePath : ',
      //   bannerList[location].imagePath2,
      // );
    }
  }, [location]);

  return (
    <div className="h-full px-6 py-5 bg-white flex justify-center items-start text-black">
      <div
        className="flex flex-col justify-start items-center
        gap-9
        bg-white w-full sm:max-w-sm pb-20"
      >
        <div className="flex flex-col gap-3.5 w-full">
          <div className="flex justify-between">
            <div className="flex gap-1 items-center cursor-pointer">
              {isLoggedIn ? (
                <>
                  <div className="rounded-full overflow-hidden w-[20px] h-[20px] relative">
                    {!loading && (
                      <Image
                        src={
                          userInfo.profile ? userInfo.profile : ProfileDefault
                        }
                        alt="Profile"
                        fill
                      />
                    )}
                  </div>
                  <span className="text-sm font-medium">
                    {userInfo.name ? userInfo.name : ''}
                  </span>
                </>
              ) : (
                !loading && (
                  <span className="text-sm font-medium ml-6">워크인코리아</span>
                )
              )}
            </div>
            {!loading &&
              (isLoggedIn ? (
                <div className="flex gap-2">
                  <HeartColor className="cursor-pointer" onClick={wishClick} />
                  <SettingColor
                    className="cursor-pointer"
                    onClick={settingClick}
                  />
                </div>
              ) : (
                <button
                  onClick={openModal}
                  className="text-black underline-offset-1 text-xs font-semibold"
                  type="button"
                >
                  회원가입/로그인
                </button>
              ))}
          </div>
          <div className="border border-gray-2 rounded-lg flex flex-col items-center">
            <div className="p-6 w-full flex flex-col gap-7 justify-center items-center">
              <Input leftIcon={<Search />} disabled onClick={inputClick} />
              <div className="flex justify-center items-center gap-5 text-gray-4 text-xs">
                <div
                  className="flex flex-col justify-center items-center gap-2 cursor-pointer"
                  onClick={() => {
                    tagClick('job');
                  }}
                >
                  <div className="border border-gray-2 rounded-full flex justify-center items-center p-3">
                    <JobIcon />
                  </div>
                  <span>채용</span>
                </div>
                <div
                  className="flex flex-col justify-center items-center gap-2 cursor-pointer"
                  onClick={() => {
                    tagClick('stay');
                  }}
                >
                  <div className="border border-gray-2 rounded-full flex justify-center items-center p-3">
                    <StayIcon />
                  </div>
                  <span>숙소</span>
                </div>
                <div
                  className="flex flex-col justify-center items-center gap-2 cursor-pointer"
                  onClick={() => {
                    tagClick('tour');
                  }}
                >
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
              <span>{adInfo.title ? adInfo.title : ''}</span>
              <Go />
            </Link>
          </div>
        </div>
        <div className="flex flex-col gap-5 w-full">
          <span className="text-xl font-medium">
            {isLoggedIn && userInfo.name
              ? `${userInfo.name}님을 위한 추천`
              : '이런 건 어떠세요 ?'}
          </span>
          <Banner
            type={'white-filter-on'}
            title={'리뷰가 가장 많은 \n' + `${googleLocation} 관광지 추천`}
            description={bannerText || ''}
            onClick={bannerClick}
            backgroundImage={
              <Image
                src={googleImage || ''}
                alt="Background"
                layout="fill"
                objectFit="cover"
                quality={100}
              />
            }
          />
          {isLoggedIn && (
            <Banner
              type={'white-filter-on'}
              title={bannerInfo?.title || bannerList[location].title}
              description={
                bannerInfo?.description || bannerList[location].content
              }
              onClick={bannerClick}
              backgroundImage={
                <Image
                  src={bannerList[location].imagePath}
                  alt="Background"
                  layout="fill"
                  objectFit="cover"
                  quality={100}
                />
              }
            />
          )}
        </div>
      </div>
    </div>
  );
}
