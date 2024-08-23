'use client';

import { useEffect, useState } from 'react';
import Card from '@/components/Card';

import { CardProps } from '@/types/type';

export default function Job() {
  const [feedList, setFeedList] = useState<CardProps[]>([]);
  useEffect(() => {
    setFeedList([
      {
        cardType: 'default',
        serviceType: 'work',
        title: '홍익돈까스 주6일 주방 정직원 모집 시간 협의 가능',
        location: '파주시 중앙로 70 A동',
        image: '/svgs/feed-test.svg',
        price: 10000,
        company: '홍익돈까스 파주금릉점',
        inWishlist: false,
      },
      {
        cardType: 'default',
        serviceType: 'work',
        title: '홍익돈까스 주6일 주방 정직원 모집 시간 협의 가능',
        location: '파주시 중앙로 70 A동',
        image: '/svgs/feed-test.svg',
        price: 10000,
        company: '홍익돈까스 파주금릉점',
        inWishlist: true,
      },
      {
        cardType: 'default',
        serviceType: 'work',
        title: '홍익돈까스 주6일 주방 정직원 모집 시간 협의 가능',
        location: '파주시 중앙로 70 A동',
        image: '/svgs/feed-test.svg',
        price: 10000,
        company: '홍익돈까스 파주금릉점',
        inWishlist: true,
      },
      {
        cardType: 'default',
        serviceType: 'work',
        title: '홍익돈까스 주6일 주방 정직원 모집 시간 협의 가능',
        location: '파주시 중앙로 70 A동',
        image: '/svgs/feed-test.svg',
        price: 10000,
        company: '홍익돈까스 파주금릉점',
        inWishlist: true,
      },
      {
        cardType: 'default',
        serviceType: 'work',
        title: '홍익돈까스 주6일 주방 정직원 모집 시간 협의 가능',
        location: '파주시 중앙로 70 A동',
        image: '/svgs/feed-test.svg',
        price: 10000,
        company: '홍익돈까스 파주금릉점',
        inWishlist: false,
      },
      {
        cardType: 'default',
        serviceType: 'work',
        title: '홍익돈까스 주6일 주방 정직원 모집 시간 협의 가능',
        location: '파주시 중앙로 70 A동',
        image: '/svgs/feed-test.svg',
        price: 10000,
        company: '홍익돈까스 파주금릉점',
        inWishlist: true,
      },
      {
        cardType: 'default',
        serviceType: 'work',
        title: '홍익돈까스 주6일 주방 정직원 모집 시간 협의 가능',
        location: '파주시 중앙로 70 A동',
        image: '/svgs/feed-test.svg',
        price: 10000,
        company: '홍익돈까스 파주금릉점',
        inWishlist: true,
      },
      {
        cardType: 'default',
        serviceType: 'work',
        title: '홍익돈까스 주6일 주방 정직원 모집 시간 협의 가능',
        location: '파주시 중앙로 70 A동',
        image: '/svgs/feed-test.svg',
        price: 10000,
        company: '홍익돈까스 파주금릉점',
        inWishlist: true,
      },
    ]);
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
