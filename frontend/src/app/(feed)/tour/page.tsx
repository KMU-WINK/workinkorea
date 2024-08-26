'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import Card from '@/components/Card';

import { FeedProps } from '@/types/type';

import PublicAxiosInstance from '@/services/publicAxiosInstance';

export default function Tour() {
  const [feedList, setFeedList] = useState<FeedProps[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const router = useRouter();

  const fetchData = async () => {
    if (loading || !hasMore) return;
    setLoading(true);

    try {
      const response = await PublicAxiosInstance.get(`/spots?page=${page}`);
      const data = response.data.data.map((item: FeedProps) => ({
        contentId: item.contentId,
        cardType: 'default',
        serviceType: 'default',
        title: item.title,
        addr1: item.addr1,
        addr2: item.addr2,
        image: item.firstimage || item.firstimage2 || '/svgs/feed-test.svg',
        inWishlist: false,
      }));

      setFeedList(prevList => [...prevList, ...data]);
      setHasMore(data.length > 0);
      setPage(prevPage => prevPage + 1);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
  }, [page, loading, hasMore]);

  const cardClick = (id: number) => {
    router.push(`/stay/${id}`);
  };

  const wishClick = () => {
    console.log('wishClick');
  };

  return (
    <div className="w-full flex flex-col items-center gap-5 text-black">
      <div className="flex flex-col gap-1 items-center w-full">
        {feedList.map((item: FeedProps) => (
          <Card
            id={item.contentId}
            key={item.contentId}
            cardType={item.cardType}
            serviceType={item.serviceType}
            title={item.title}
            location={`${item.addr1} ${item.addr2}`}
            image={item.image}
            inWishlist={item.inWishlist}
            onCardClick={() => cardClick(item.contentId)}
            onWishListClick={wishClick}
          />
        ))}
      </div>
    </div>
  );
}
