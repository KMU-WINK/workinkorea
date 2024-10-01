'use client';

import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

import Card from '@/components/Card';

import { WishInfo, WishItem } from '@/types/type';

import Back from 'public/svgs/back.svg';
import { deleteWishItem, getWishFeeds, postWishItem } from '@/services/wishs';
import Image from 'next/image';
import Spinner from '@/components/Spinner';
import useUserStore from '@/app/stores/loginStore';
import useModalStore from '@/app/stores/modalStore';

interface WishType {
  id: number;
  location: string;
  count: number;
}

const wishData: WishType[] = [
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
  const [location, setLocation] = useState('location');
  const [locationId, setLocationId] = useState<number>();
  const [feedList, setFeedList] = useState<WishInfo[]>([]);
  const [loading, setLoading] = useState(true);

  const { isLoggedIn } = useUserStore();
  const { openModal } = useModalStore();

  const cardClick = (
    type: string,
    id: string,
    contentTypeId?: string,
    image?: string,
  ) => {
    if (contentTypeId === 'open' || contentTypeId === 'tour') {
      router.push(
        `/${type}/${id}?contenttypeid=${contentTypeId}?thumbnail=${image ? image : ''}`,
      );
    } else {
      router.push(`/spot/${id}?contenttypeid=${contentTypeId}?type=${type}`);
    }
  };

  const wishClick = async (item: WishInfo) => {
    const originState = item.inWish;
    setFeedList(prevList =>
      prevList.map(feedItem =>
        feedItem.contentid === item.contentid
          ? { ...feedItem, inWish: !feedItem.inWish }
          : feedItem,
      ),
    );

    try {
      const data: WishItem = {
        type: item.type,
        contentTypeId: item.contenttypeid || '',
        contentId: item.contentid || '',
      };

      if (originState) {
        await deleteWishItem(data);
      } else {
        await postWishItem(data);
      }
    } catch (error) {
      console.error('Error in wishClick:', error);
      setFeedList(prevList =>
        prevList.map(feedItem =>
          feedItem.contentid === item.contentid
            ? { ...feedItem, inWish: originState }
            : feedItem,
        ),
      );
    }
  };

  const fetchData = async () => {
    if (locationId === undefined || locationId === null) return;

    try {
      const response = await getWishFeeds();
      const selectedKey = Object.keys(response)[locationId - 1]; // locationId가 1부터 시작하는 가정

      // @ts-ignore
      const selectedData = response[selectedKey];
      setFeedList(selectedData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const lastSegment = pathname ? pathname.split('/').pop() : '';
    setLocationId(lastSegment ? parseInt(lastSegment, 10) : undefined);
  }, [pathname]);

  useEffect(() => {
    if (isLoggedIn) {
      fetchData();
      wishData.map(item => {
        if (item.id === locationId) {
          setLocation(item.location);
        }
      });
    } else {
      setLoading(false);
      openModal();
    }
  }, [locationId, isLoggedIn]);

  if (loading) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  return (
    <div className="w-screen h-full flex justify-center text-black bg-white">
      <div className="max-w-sm w-full h-full flex flex-col items-center relative py-16">
        <div className="max-w-sm w-full text-center pt-6 pb-2 px-5 flex items-center gap-3 fixed top-0 left-1/2	-translate-x-2/4 bg-white z-20">
          <Link href="/wish">
            <Back className="cursor-pointer" />
          </Link>
          <span>{location}</span>
        </div>
        <div className="w-full flex flex-col px-6 items-center gap-2">
          {feedList.length > 0 ? (
            <>
              {feedList.map(item => (
                <Card
                  id={item.contentid}
                  key={item.contentid}
                  cardType="default"
                  serviceType="default"
                  title={item.title || item.empmnTtl || ''}
                  location={
                    item.wrkpAdres || item.addr1 + ' ' + item.addr2 || ''
                  }
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
