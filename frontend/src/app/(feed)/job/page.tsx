'use client';

import { useEffect, useState } from 'react';
import Card from '@/components/Card';

import { CardProps } from '@/types/type';

export default function Job() {
  const [feedList, setFeedList] = useState<CardProps[]>([]);
  useEffect(() => {
    setFeedList([
      {
        id: 1,
        onCardClick: () => {},
        onWishListClick: () => {},
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
        id: 2,
        onCardClick: () => {},
        onWishListClick: () => {},
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
        id: 3,
        onCardClick: () => {},
        onWishListClick: () => {},
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
        id: 4,
        onCardClick: () => {},
        onWishListClick: () => {},
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
        id: 5,
        onCardClick: () => {},
        onWishListClick: () => {},
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
        id: 6,
        onCardClick: () => {},
        onWishListClick: () => {},
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
        id: 7,
        onCardClick: () => {},
        onWishListClick: () => {},
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
        id: 8,
        onCardClick: () => {},
        onWishListClick: () => {},
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
      <div className="flex flex-col gap-1 items-center w-full">
        {feedList.map(item => (
          <Card
            id={item.id}
            key={item.id}
            cardType={item.cardType}
            serviceType={item.serviceType}
            title={item.title}
            location={item.location}
            image={item.image}
            price={item.price}
            company={item.company}
            inWishlist={item.inWishlist}
            onCardClick={item.onCardClick}
            onWishListClick={item.onWishListClick}
          />
        ))}
      </div>
    </div>
  );
}
