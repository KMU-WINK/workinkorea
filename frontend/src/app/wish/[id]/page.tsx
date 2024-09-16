'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';

import Card from '@/components/Card';

import { CardProps } from '@/types/type';

import Back from 'public/svgs/back.svg';

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
  const pathname = usePathname();

  const [wishItem, setWishItem] = useState<WishType>();

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

  useEffect(() => {
    const id = pathname ? parseInt(pathname.split('/').pop() || '', 10) : null;

    if (id !== null) {
      const item = wishData.find(wish => wish.id === id);
      setWishItem(item);
    }
  }, [pathname]);

  return (
    <div className="w-screen h-full flex justify-center text-black bg-white">
      {wishItem && (
        <div className="max-w-sm w-full h-full flex flex-col items-center relative py-16">
          <div className="max-w-sm w-full text-center pt-6 pb-2 px-5 flex items-center gap-3 fixed top-0 left-1/2	-translate-x-2/4 bg-white z-10">
            <Link href="/wish">
              <Back className="cursor-pointer" />
            </Link>
            <span>{wishItem.location}</span>
          </div>
          <div className="w-full flex flex-col px-6 items-center gap-2">
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
      )}
    </div>
  );
}
