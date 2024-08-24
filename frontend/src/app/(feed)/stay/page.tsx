'use client';

import { useEffect, useState } from 'react';
import Card from '@/components/Card';

import { FeedProps } from '@/types/type';

import PublicAxiosInstance from '@/services/publicAxiosInstance';

export default function Stay() {
  const [feedList, setFeedList] = useState<FeedProps[]>([]);
  const fetchData = async () => {
    try {
      const response = await PublicAxiosInstance.get('/stays');
      const data = response.data.data.map((item: any) => ({
        id: item.contentid,
        cardType: 'default',
        serviceType: 'default',
        title: item.title,
        location: `${item.addr1} ${item.addr2}`,
        // image: item.firstimage || '/svgs/feed-test.svg', // 이미지가 없을 경우 기본 이미지 사용
        image: '/svgs/feed-test.svg', // 이미지가 없을 경우 기본 이미지 사용
        price: 0, // 가격 정보가 없으므로 기본값 설정
        company: item.tel || '정보 없음', // 회사 또는 전화번호
        inWishlist: false,
      }));
      setFeedList(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  useEffect(() => {
    fetchData();

    // setFeedList([
    //   {
    //     id: 1,
    //     cardType: 'default',
    //     serviceType: 'default',
    //     title: '홍익돈까스 주6일 주방 정직원 모집 시간 협의 가능',
    //     location: '파주시 중앙로 70 A동',
    //     image: '/svgs/feed-test.svg',
    //     price: 10000,
    //     company: '홍익돈까스 파주금릉점',
    //     inWishlist: false,
    //   },
    //   {
    //     id: 2,
    //     cardType: 'default',
    //     serviceType: 'default',
    //     title: '홍익돈까스 주6일 주방 정직원 모집 시간 협의 가능',
    //     location: '파주시 중앙로 70 A동',
    //     image: '/svgs/feed-test.svg',
    //     price: 10000,
    //     company: '홍익돈까스 파주금릉점',
    //     inWishlist: true,
    //   },
    //   {
    //     id: 3,
    //     cardType: 'default',
    //     serviceType: 'default',
    //     title: '홍익돈까스 주6일 주방 정직원 모집 시간 협의 가능',
    //     location: '파주시 중앙로 70 A동',
    //     image: '/svgs/feed-test.svg',
    //     price: 10000,
    //     company: '홍익돈까스 파주금릉점',
    //     inWishlist: true,
    //   },
    //   {
    //     id: 4,
    //     cardType: 'default',
    //     serviceType: 'default',
    //     title: '홍익돈까스 주6일 주방 정직원 모집 시간 협의 가능',
    //     location: '파주시 중앙로 70 A동',
    //     image: '/svgs/feed-test.svg',
    //     price: 10000,
    //     company: '홍익돈까스 파주금릉점',
    //     inWishlist: true,
    //   },
    //   {
    //     id: 5,
    //     cardType: 'default',
    //     serviceType: 'default',
    //     title: '홍익돈까스 주6일 주방 정직원 모집 시간 협의 가능',
    //     location: '파주시 중앙로 70 A동',
    //     image: '/svgs/feed-test.svg',
    //     price: 10000,
    //     company: '홍익돈까스 파주금릉점',
    //     inWishlist: false,
    //   },
    //   {
    //     id: 6,
    //     cardType: 'default',
    //     serviceType: 'default',
    //     title: '홍익돈까스 주6일 주방 정직원 모집 시간 협의 가능',
    //     location: '파주시 중앙로 70 A동',
    //     image: '/svgs/feed-test.svg',
    //     price: 10000,
    //     company: '홍익돈까스 파주금릉점',
    //     inWishlist: true,
    //   },
    //   {
    //     id: 7,
    //     cardType: 'default',
    //     serviceType: 'default',
    //     title: '홍익돈까스 주6일 주방 정직원 모집 시간 협의 가능',
    //     location: '파주시 중앙로 70 A동',
    //     image: '/svgs/feed-test.svg',
    //     price: 10000,
    //     company: '홍익돈까스 파주금릉점',
    //     inWishlist: true,
    //   },
    //   {
    //     id: 8,
    //     cardType: 'default',
    //     serviceType: 'default',
    //     title: '홍익돈까스 주6일 주방 정직원 모집 시간 협의 가능',
    //     location: '파주시 중앙로 70 A동',
    //     image: '/svgs/feed-test.svg',
    //     price: 10000,
    //     company: '홍익돈까스 파주금릉점',
    //     inWishlist: true,
    //   },
    // ]);
  }, []);

  return (
    <div className="w-full flex flex-col items-center gap-5 text-black">
      <div className="flex flex-col gap-1 items-center">
        {feedList.map(item => (
          <Card
            cardType={item.cardType}
            serviceType={item.serviceType}
            title={item.title}
            location={item.location}
            image={item.image}
            price={item.price}
            company={item.company}
            inWishlist={item.inWishlist}
          />
        ))}
      </div>
    </div>
  );
}
