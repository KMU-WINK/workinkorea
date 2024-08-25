'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import Card from '@/components/Card';

import { FeedProps } from '@/types/type';

import PublicAxiosInstance from '@/services/publicAxiosInstance';

export default function Stay() {
  const [feedList, setFeedList] = useState<FeedProps[]>([]);
  const router = useRouter();

  const fetchData = async () => {
    try {
      const response = await PublicAxiosInstance.get('/stays');
      console.log('response : ', response.data.data);
      const data = response.data.data.map((item: FeedProps) => ({
        id: item.contentid,
        cardType: 'default',
        serviceType: 'default',
        title: item.title,
        location: `${item.addr1} ${item.addr2}`,
        image: item.firstimage || item.firstimage2 || '/svgs/feed-test.svg', // 이미지가 없을 경우 기본 이미지 사용
        // image: '/svgs/feed-test.svg', // 이미지가 없을 경우 기본 이미지 사용
        inWishlist: false,
      }));
      setFeedList(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const cardClick = id => {
    router.push(`/stay/${id}`);
  };

  const wishClick = () => {
    console.log('wishClick');
  };

  return (
    <div className="w-full flex flex-col items-center gap-5 text-black">
      <div className="flex flex-col gap-1 items-center">
        {feedList.map(item => (
          <Card
            id={item.contentid}
            cardType={item.cardType}
            serviceType={item.serviceType}
            title={item.title}
            location={item.location}
            image={item.image}
            inWishlist={item.inWishlist}
            onCardClick={() => cardClick(item.contentid)}
            onWishListClick={wishClick}
          />
        ))}
      </div>
    </div>
  );
}
