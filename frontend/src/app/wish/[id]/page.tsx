'use client';

import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

import Card from '@/components/Card';

import { CardType, LocationInfo, ServiceType, WishInfo } from '@/types/type';

import Back from 'public/svgs/back.svg';
import { getWishFeed, getWishFeeds } from '@/services/wishs';
import Image from 'next/image';
import { it } from 'node:test';

interface WishType {
  id: number;
  location: string;
  count: number;
}

const wishData: WishType[] = [
  {
    id: 0,
    location: '전체',
    count: 11,
  },
  {
    id: 1,
    location: '강릉',
    count: 0,
  },
  {
    id: 2,
    location: '경주',
    count: 0,
  },
  {
    id: 3,
    location: '부산',
    count: 0,
  },
  { id: 4, location: '여수', count: 0 },
  {
    id: 5,
    location: '전주',
    count: 0,
  },
  {
    id: 6,
    location: '제주',
    count: 0,
  },
  {
    id: 7,
    location: '춘천',
    count: 0,
  },
];

export default function WishDetail() {
  const router = useRouter();
  const pathname = usePathname();
  const [locationId, setLocationId] = useState<number>();
  const [feedList, setFeedList] = useState<WishInfo[]>([]);

  const cardClick = (
    type: string,
    id: string,
    contentTypeId?: string,
    image?: string,
  ) => {
    if (contentTypeId === 'open' || contentTypeId === 'tour') {
      router.push(
        `/${type}/${id}?contenttypeid=${contentTypeId}?thumbnail=${image}`,
      );
    } else {
      router.push(`/spot/${id}?contenttypeid=${contentTypeId}?type=${type}`);
    }
  };

  const wishClick = async (item: WishInfo) => {
    console.log('wishClick', item);
  };

  const fetchData = async () => {
    if (locationId === undefined || locationId === null) return;

    try {
      const response = await getWishFeeds();
      console.log('response : ', response);

      if (locationId === 0) {
        // locationId가 0이면 모든 데이터를 feedList에 넣기
        const allData: WishInfo[] = Object.values(response)
          .flatMap(location => Object.values(location))
          .flat();
        console.log(allData);
        setFeedList(allData);
      } else {
        // 특정 지역의 데이터를 feedList에 넣기
        // const selectedKey = Object.keys(response)[locationId - 1]; // locationId가 1부터 시작하는 가정
        // const selectedData = response[selectedKey];
        // setFeedList(data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [locationId]);

  // useEffect(() => {
  //   setLocationId(
  //     pathname ? parseInt(pathname.split('/').pop() || '', 10) : '',
  //   );
  //
  // if (locationId !== null) {
  //   const item = wishData.find(wish => wish.id === id);
  //   setWishItem(item);
  // }
  // }, [pathname]);

  useEffect(() => {
    const lastSegment = pathname ? pathname.split('/').pop() : '';
    setLocationId(lastSegment ? parseInt(lastSegment, 10) : undefined);
  }, [pathname]);
  useEffect(() => {
    console.log('feedList : ', feedList);
  }, [feedList]);

  return (
    <div className="w-screen h-full flex justify-center text-black bg-white">
      <div className="max-w-sm w-full h-full flex flex-col items-center relative py-16">
        <div className="max-w-sm w-full text-center pt-6 pb-2 px-5 flex items-center gap-3 fixed top-0 left-1/2	-translate-x-2/4 bg-white z-10">
          <Link href="/wish">
            <Back className="cursor-pointer" />
          </Link>
          <span>location</span>
        </div>
        <div className="w-full flex flex-col px-6 items-center gap-2">
          {feedList.length > 0 ? (
            <>
              {feedList.map(item => (
                <Card
                  id={item.contentid}
                  key={item.contentid}
                  cardType={'default'}
                  serviceType={'default'}
                  title={item.title || item.empmnTtl || ''}
                  location={`${item.addr1} ${item.addr2}`}
                  image={
                    item.firstimage ||
                    item.firstimage2 ||
                    '/svgs/job-default.svg'
                  }
                  inWishlist={item.inWish}
                  onCardClick={() =>
                    cardClick(
                      item.type,
                      item.contentid,
                      item.contenttypeid,
                      item.firstimage || item.firstimage2,
                    )
                  }
                  onWishListClick={() => wishClick(item)}
                />
              ))}
            </>
          ) : (
            <div className="w-full flex flex-col items-center pt-20 gap-24">
              <span className="text-center">결과가 없습니다.</span>
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
      </div>
    </div>
  );
}
