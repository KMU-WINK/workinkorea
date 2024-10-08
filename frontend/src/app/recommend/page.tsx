'use client';

import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

import Card from '@/components/Card';

import { WishInfo, WishItem } from '@/types/type';

import Back from 'public/svgs/back.svg';
import { deleteWishItem, postWishItem } from '@/services/wishs';
import { getRecommend } from '@/services/ai';
import AISpinner from '@/components/AISpinner';
import { bannerList } from '@/constants/bannerInfo';
import {getGoogleRecommends} from "@/services/google";

export default function RecommendPage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [feedList, setFeedList] = useState<WishInfo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [googleIdx, setGoogleIdx] = useState<{ keyword_idx?: number, region_idx?: number }>({});
  const cardClick = (id: string, contentTypeId?: string) => {
    const type = contentTypeId === '32' ? 'stay' : 'spot';
    router.push(`/spot/${id}?contenttypeid=${contentTypeId}?type=${type}`);
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
        type: item.contenttypeid === '32' ? 'stay' : 'spot',
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

  const fetchData = async (type: string, region_idx: string | null, keyword_idx?: string | null) => {
    try {
      const response = (type === 'google' && region_idx && keyword_idx) ? await getGoogleRecommends(region_idx, keyword_idx) : await getRecommend();
      setFeedList(response);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const location = urlParams.get('location') as
      | keyof typeof bannerList
      | null; // null을 처리
    if (location && bannerList[location]) {
      setTitle(bannerList[location].title);
    }

  }, [window.location.search]);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const region_idx = urlParams.get('region_idx');
    const keyword_idx = urlParams.get('keyword_idx');
    const recommendType = urlParams.get('type');

    if (recommendType)
      fetchData(recommendType || 'recommend', region_idx, keyword_idx);
  }, []);

  return (
    <div className="w-screen h-full flex justify-center text-black bg-white">
      <div className="max-w-sm w-full h-full flex flex-col items-center relative py-16">
        <div className="max-w-sm w-full text-center pt-6 pb-2 px-5 flex items-center gap-3 fixed top-0 left-1/2	-translate-x-2/4 bg-white z-20">
          <Link href="/main">
            <Back className="cursor-pointer" />
          </Link>
          <span className="overflow-hidden whitespace-nowrap text-ellipsis">{title}</span>
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
                    cardClick(item.contentid, item.contenttypeid)
                  }
                  onWishListClick={() => wishClick(item)}
                />
              ))}
            </>
          ) : (
            <div className="w-full flex flex-col items-center gap-24">
              {isLoading ? (
                <AISpinner />
              ) : (
                <span className="text-center">결과가 없습니다.</span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
