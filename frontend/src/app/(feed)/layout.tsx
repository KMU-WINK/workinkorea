'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

import { parseUrl } from './_utils/stringUtils';
import Input from '@/components/Input';

import Back from 'public/svgs/back.svg';

interface Props {
  children: React.ReactNode;
}

export default function FeedLayout({ children }: Props) {
  const router = useRouter();
  const fullUrl = window.location.href;
  const [contentType, setContentType] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [keyword, setKeyword] = useState<string>('');

  const backClick = () => {
    router.back();
  };

  // 경로에 따라 mapClick 함수 다르게 설정
  useEffect(() => {
    const feedInfo = parseUrl(fullUrl);
    setContentType(feedInfo.type || '');
    setLocation(feedInfo.location || '');
    setKeyword(feedInfo.keyword || '');
  }, [fullUrl]);

  const mapClick = (type: string, location: string, keyword: string) => {
    router.push(`/map?type=${type}&location=${location}&keyword=${keyword}`);
  };

  return (
    <div className="flex flex-col justify-start items-center h-full bg-white relative ">
      <div className="w-full flex flex-col justify-center items-center fixed top-0 z-20 sm:max-w-sm ">
        <div className="w-full px-6 py-3.5 flex justify-center items-center bg-main">
          <Input
            leftIcon={<Back />}
            onClick={backClick}
            placeholder={keyword || location || '검색어'}
            readOnly
          />
        </div>
        {/*<div className="px-6 py-4 bg-white">*/}
        {/*  <div*/}
        {/*    className="w-full h-20 relative overflow-hidden rounded-xl"*/}
        {/*    onClick={() => mapClick(contentType, location, keyword)}*/}
        {/*    role="button"*/}
        {/*    tabIndex={0}*/}
        {/*  >*/}
        {/*    <Image*/}
        {/*      src="/svgs/feed-banner.svg"*/}
        {/*      alt="banner"*/}
        {/*      layout="responsive"*/}
        {/*      width={0}*/}
        {/*      height={0}*/}
        {/*    />*/}
        {/*    <span className="text-white">지도로 검색하기</span>*/}
        {/*  </div>*/}
        {/*</div>*/}
      </div>
      <div className="w-full max-w-sm px-6 mt-[86px]">{children}</div>
    </div>
  );
}
