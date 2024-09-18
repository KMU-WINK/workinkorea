'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import Card from '@/components/Card';

import { FeedProps, JobProps } from '@/types/type';

import PublicAxiosInstance from '@/services/publicAxiosInstance';
import { formatSalary } from '../../utils/stringUtils';

export default function Job() {
  const [feedList, setFeedList] = useState<JobProps[]>([]);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [loading, setLoading] = useState(false);
  const [area, setArea] = useState<string>('강릉');
  const [keyword, setKeyword] = useState<string>('');

  const router = useRouter();

  const fetchData = async () => {
    if (loading || pageCount + 1 < page) return;
    setLoading(true);

    try {
      const response = await PublicAxiosInstance.get(
        `/jobs?area=${area}&keyword=${keyword}&pageNo=${page}`,
      );
      setPageCount(response.data.pageNo);

      const data = response.data.items.item.map((item: JobProps) => ({
        contentId: item.contentId,
        cardType: 'default',
        serviceType: 'work',
        title: item.empmnTtl,
        company: item.corpoNm,
        price: item.wageAmt,
        location: item.wrkpAdres,
        image: item.corpoLogoFileUrl || '/svgs/job-default.svg',
        inWishlist: false,
        contentTypeId: item.contentTypeId,
        workType: item.salStle,
      }));

      setFeedList(prevList => {
        // 기존 데이터와 중복되지 않는 데이터만 필터링
        const newData = data.filter(
          (newItem: JobProps) =>
            !prevList.some(
              prevItem => prevItem.contentId === newItem.contentId,
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

  const cardClick = (id: string, contentTypeId?: string, image?: string) => {
    const pushImage = image === '/svgs/job-default.svg' ? '' : image;
    router.push(
      `/job/${id}?contenttypeid=${contentTypeId}?thumbnail=${pushImage}`,
    );
  };
  const wishClick = () => {
    console.log('wishClick');
  };

  return (
    <div className="w-full flex flex-col items-center gap-5 text-black">
      <div className="flex flex-col gap-1 items-center w-full mb-10">
        {feedList.map((item: JobProps) => (
          <Card
            id={item.contentId}
            key={item.contentId}
            cardType={item.cardType}
            serviceType={item.serviceType}
            title={item.title}
            location={item.location}
            price={item.price}
            company={item.company}
            image={item.image}
            inWishlist={item.inWishlist}
            onCardClick={() =>
              cardClick(item.contentId, item.contentTypeId, item.image)
            }
            onWishListClick={wishClick}
            contenttypeid={item.contentTypeId}
            workType={formatSalary(item.workType)}
          />
        ))}
      </div>
    </div>
  );
}
