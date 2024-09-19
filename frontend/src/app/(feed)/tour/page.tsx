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
  const [pageCount, setPageCount] = useState(1);
  const [area, setArea] = useState<string>('여수');
  const [keyword, setKeyword] = useState<string>('');

  const router = useRouter();

  const fetchData = async () => {
    if (loading || pageCount < page) return;
    setLoading(true);

    try {
      const response = await PublicAxiosInstance.get(
        `/spots?area=${area}&keyword=${keyword}&pageNo=${page}`,
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
        image: item.firstimage || item.firstimage2 || '/svgs/feed-test.svg',
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

  useEffect(() => {
    fetchData();
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

  const cardClick = (id: string, contenttypeid?: string) => {
    router.push(`/spot/${id}?contenttypeid=${contenttypeid}`);
  };
  const wishClick = () => {
    console.log('wishClick');
  };

  return (
    <div className="w-full flex flex-col items-center gap-5 text-black">
      <div className="flex flex-col gap-1 items-center w-full mb-10">
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
            onCardClick={() => cardClick(item.contentid, item.contenttypeid)}
            onWishListClick={wishClick}
            contenttypeid={item.contenttypeid}
          />
        ))}
      </div>
    </div>
  );
}
