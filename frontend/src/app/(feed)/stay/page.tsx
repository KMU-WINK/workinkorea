'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { parseUrl } from '../_utils/stringUtils';
import Card from '@/components/Card';

import { FeedProps, JobProps } from '@/types/type';

import PublicAxiosInstance from '@/services/publicAxiosInstance';
import Image from 'next/image';
import useUserStore from '@/app/stores/loginStore';
import useModalStore from '@/app/stores/modalStore';

export default function Stay() {
  const [feedList, setFeedList] = useState<FeedProps[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [pageCount, setPageCount] = useState(1);
  const [area, setArea] = useState<string>('');
  const [keyword, setKeyword] = useState<string>('');
  const [type, setType] = useState<string>('');
  const { isLoggedIn } = useUserStore();
  const { openModal } = useModalStore();

  const router = useRouter();

  const fetchData = async () => {
    if (loading || pageCount < page) return;
    setLoading(true);

    try {
      const response = await PublicAxiosInstance.get(
        `/stays?area=${area}&keyword=${keyword}&pageNo=${page}`,
      );
      if (response.data.totalCount % 10 === 0) {
        setPageCount(response.data.totalCount / 10);
      } else {
        setPageCount(Math.floor(response.data.totalCount / 10) + 1);
      }

      const data = response.data.items.item.map((item: FeedProps) => ({
        contentid: item.contentid,
        cardType: 'default',
        serviceType: 'default',
        title: item.title,
        addr1: item.addr1,
        addr2: item.addr2,
        image: item.firstimage || item.firstimage2 || '/svgs/job-default.svg',
        inWishlist: false,
        contenttypeid: item.contenttypeid,
      }));

      setFeedList(prevList => {
        // 기존 데이터와 중복되지 않는 데이터만 필터링
        const newData = data.filter(
          (newItem: FeedProps) =>
            !prevList.some(
              prevItem => prevItem.contentid === newItem.contentid,
            ),
        );

        // 새로운 데이터가 있을 때만 페이지 증가
        if (newData.length > 0) {
          setPage(prevPage => prevPage + 1);
        }
        return [...prevList, ...newData];
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const mapClick = () => {
    router.push(`/map?type=${type}&location=${area}&keyword=${keyword}`);
  };

  useEffect(() => {
    const fullUrl = window.location.href;
    const feedInfo = parseUrl(fullUrl);
    // console.log('feedInfo : ', feedInfo.type);
    if (feedInfo.location) {
      setType(feedInfo.type);
      setArea(feedInfo.location);
      setKeyword(feedInfo.keyword || '');
    }
  }, [window.location.href]);

  useEffect(() => {
    if (area) fetchData();
  }, [area]);
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop + 50 >=
        document.documentElement.scrollHeight
      ) {
        fetchData();
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [page, loading]);

  const cardClick = (id: string) => {
    router.push(`/spot/${id}?contenttypeid=32`);
  };
  const wishClick = () => {
    if (!isLoggedIn) openModal();
    console.log('wishClick');
  };

  return (
    <div className="w-full flex flex-col items-center gap-5 text-black relative">
      {feedList.length > 0 ? (
        <>
          <div className="w-full pt-4 bg-white fixed z-20 flex items-center justify-center ">
            <div
              className="w-full h-20 relative rounded-xl px-6 max-w-sm"
              onClick={mapClick}
              role="button"
              tabIndex={0}
            >
              <Image
                src="/svgs/feed-banner.svg"
                alt="banner"
                layout="responsive"
                width={0}
                height={0}
              />
            </div>
          </div>
          <div className="flex flex-col gap-1 items-center w-full mb-10 mt-[120px]">
            {feedList.map((item: FeedProps) => (
              <Card
                id={item.contentid}
                key={item.contentid}
                cardType={item.cardType}
                serviceType={item.serviceType}
                title={item.title}
                location={`${item.addr1} ${item.addr2}`}
                image={item.image}
                inWishlist={item.inWishlist}
                onCardClick={() => cardClick(item.contentid)}
                onWishListClick={wishClick}
                contenttypeid={item.contenttypeid}
              />
            ))}
          </div>
        </>
      ) : (
        <div className="w-full flex flex-col items-center pt-20 gap-24">
          <span className="text-center">
            검색 결과가 없습니다.
            <br />
            다른 검색어를 입력해주세요.
          </span>
          <div className="w-full flex flex-col gap-2.5 items-center">
            <Image
              src="/svgs/no-feed-bubble.svg"
              alt="no-feed-bubble"
              width={50}
              height={0}
            />
            <Image
              src="/svgs/no-feed-logo.svg"
              alt="no-feed-logo"
              width={100}
              height={0}
            />
          </div>
        </div>
      )}
    </div>
  );
}
