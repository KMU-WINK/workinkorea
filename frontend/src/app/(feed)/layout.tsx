'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { parseUrl } from './_utils/stringUtils';
import Input from '@/components/Input';
import Spinner from '@/components/Spinner'; // 로딩 스피너 컴포넌트 추가

import Back from 'public/svgs/back.svg';

interface Props {
  children: React.ReactNode;
}

export default function FeedLayout({ children }: Props) {
  const router = useRouter();
  const [location, setLocation] = useState<string>('');
  const [keyword, setKeyword] = useState<string>('');

  const backClick = () => {
    router.back();
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const fullUrl = window.location.href; // window는 클라이언트에서만 사용
      const feedInfo = parseUrl(fullUrl);
      setLocation(feedInfo.location || '');
      setKeyword(feedInfo.keyword || '');
    }
  }, []);

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
      </div>

      {/* Suspense 적용하여 children 로딩 중 스피너 보여줌 */}
      <div className="w-full max-w-sm px-6 mt-[86px]">
        <Suspense fallback={<Spinner />}>{children}</Suspense>
      </div>
    </div>
  );
}
