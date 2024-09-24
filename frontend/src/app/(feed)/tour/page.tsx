'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import Card from '@/components/Card';

import { FeedProps, WishItem, WishRes } from '@/types/type';

import { getSpots } from '@/services/spots';
import { parseUrl } from '@/app/(feed)/_utils/stringUtils';
import Image from 'next/image';
import useUserStore from '@/app/stores/loginStore';
import useModalStore from '@/app/stores/modalStore';
import { deleteWishItem, getWishList, postWishItem } from '@/services/wishs';

export default function Tour() {
  const [feedList, setFeedList] = useState<FeedProps[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [pageCount, setPageCount] = useState(1);
  const [area, setArea] = useState<string>('');
  const [keyword, setKeyword] = useState<string>('');
  const [type, setType] = useState<string>('');
  const [wishList, setWishList] = useState<WishRes[]>([]);
  const { isLoggedIn } = useUserStore();
  const { openModal } = useModalStore();

  const router = useRouter();

  const fetchData = async () => {
    if (loading || pageCount < page) return;
    setLoading(true);

    try {
      const response = await getSpots(area, keyword, page);
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
        image: item.firstimage || item.firstimage2 || '/svgs/job-default.svg',
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

  const mapClick = () => {
    router.push(`/map?type=${type}&location=${area}&keyword=${keyword}`);
  };

  useEffect(() => {
    const fullUrl = window.location.href;
    const feedInfo = parseUrl(fullUrl);
    if (feedInfo.location) {
      setType(feedInfo.type);
      setArea(feedInfo.location);
      setKeyword(feedInfo.keyword || '');
    }
  }, []);

  const fetchWishList = async () => {
    const wishListData = await getWishList();
    setWishList(wishListData);
  };

  useEffect(() => {
    if (area) fetchData();
    fetchWishList();
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

  useEffect(() => {
    if (wishList.length > 0 && feedList.length > 0) {
      const updatedFeedList = feedList.map(feedItem => {
        const isInWishlist = wishList.some(
          wishItem => wishItem.content_id === feedItem.contentid,
        );

        // 상태가 변경된 경우에만 업데이트
        if (feedItem.inWishlist !== isInWishlist) {
          return {
            ...feedItem,
            inWishlist: isInWishlist, // wishList에 있으면 true로 설정
          };
        }
        return feedItem; // 상태가 변경되지 않았으면 기존 상태 유지
      });

      // 변경 사항이 있을 때만 feedList 업데이트
      if (JSON.stringify(updatedFeedList) !== JSON.stringify(feedList)) {
        setFeedList(updatedFeedList);
      }
    }
  }, [wishList]);

  const cardClick = (id: string, contenttypeid?: string) => {
    router.push(`/spot/${id}?contenttypeid=${contenttypeid}`);
  };

  const wishClick = async (item: FeedProps) => {
    // if (!isLoggedIn) openModal();
    let res;
    const originState = item.inWishlist;
    item.inWishlist = !item.inWishlist;

    try {
      const data: WishItem = {
        type: 'spot',
        contentTypeId: item.contenttypeid || '39',
        contentId: item.contentid,
      };

      if (originState) {
        item.inWishlist = false;
        res = await deleteWishItem(data);
      } else {
        item.inWishlist = true;
        res = await postWishItem(data);
      }

      await fetchWishList();
    } catch (error) {
      console.error('Error in wishClick:', error);
      if (res.error) {
        // 에러가 발생한 경우, 원래 상태로 되돌림
        item.inWishlist = !item.inWishlist;
      }
    }
  };

  return (
    <div className="w-full flex flex-col items-center gap-5 text-black relative">
      {feedList.length > 0 ? (
        <>
          <div className="w-full pt-4 bg-white fixed z-20 flex items-center justify-center ">
            <div
              className="w-full h-20 relative rounded-xl px-6 max-w-sm"
              onClick={mapClick}
              role="button"
              tabIndex={0}
            >
              <Image
                src="/svgs/feed-banner.svg"
                alt="banner"
                layout="responsive"
                width={0}
                height={0}
              />
            </div>
          </div>
          <div className="flex flex-col gap-1 items-center w-full mb-10 mt-[120px]">
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
                onCardClick={() =>
                  cardClick(item.contentid, item.contenttypeid)
                }
                onWishListClick={() => wishClick(item)}
                contenttypeid={item.contenttypeid}
              />
            ))}
          </div>
        </>
      ) : (
        <div className="w-full flex flex-col items-center pt-20 gap-24">
          <span className="text-center">
            검색 결과가 없습니다.
            <br />
            다른 검색어를 입력해주세요.
          </span>
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
  );
}
