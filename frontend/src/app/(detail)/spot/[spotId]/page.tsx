'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import styled from 'styled-components';

import Heart from 'public/svgs/heart.svg';
import HeartColor from 'public/svgs/heart-color.svg';
import Location from 'public/svgs/location.svg';
import GoSmall from 'public/svgs/go-small.svg';
import BackWhite from 'public/svgs/back-white.svg';
import { useRouter } from 'next/navigation';
import Button from '@/components/Button';
import Spinner from '@/components/Spinner';
import {
  InfoRow,
  InfoRowType12,
  InfoRowType14,
  InfoRowType28,
  InfoRowType32,
  InfoRowType38,
  InfoRowType39,
} from '../../_components/InfoItem';
import { formatString, extractLinkOrValue } from '../../_utils/stringUtils';
import {
  SpotExtraInfo,
  SpotInfo,
  WishInfo,
  WishItem,
  WishRes,
} from '@/types/type';
import { getSpotDetail } from '@/services/spots';
import { deleteWishItem, getWishFeeds, postWishItem } from '@/services/wishs';
import useUserStore from '@/app/stores/loginStore';
import useModalStore from '@/app/stores/modalStore';

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  @media screen and (max-width: 639px) {
    width: 100vw;
  }
`;

export default function Tour() {
  const [inWish, setInWish] = useState<boolean>(false);
  const [wishList, setWishList] = useState<WishInfo[]>([]);

  const { isLoggedIn } = useUserStore();
  const { openModal } = useModalStore();

  const [spotInfo, setSpotInfo] = useState<SpotInfo>({
    title: '',
    homepage: '',
    address: '',
    image: '/images/spot-default.svg',
    number: '',
    telName: '',
    overview: '',
    link: '',
    time: '',
    restDate: '',
    inTime: '',
    outTime: '',
    mapx: 0,
    mapy: 0,
    inWishlist: false,
    location: '',
  });

  const [extraInfo, setExtraInfo] = useState<SpotExtraInfo>({
    parking: '',
    expGuide: '',
    useFee: '',
    eventPeriod: '',
    openDateShopping: '',
    firstMenu: '',
    packing: '',
  });

  const router = useRouter();
  const [contentId, setContentId] = useState<number>(0);
  const [contentTypeId, setContentTypeId] = useState<number>(0);
  const [type, setType] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    fetchWishList();

    const pathParts = window.location.pathname.split('/');

    const id = pathParts.pop() || pathParts.pop() || '';
    setContentId(parseInt(id) || 0);

    const search = window.location.search;

    const contentTypeIdMatch = search.match(/contenttypeid=([0-9]+)/);
    if (contentTypeIdMatch) {
      setContentTypeId(parseInt(contentTypeIdMatch[1]));
    }

    const typeMatch = search.match(/type=([^&]*)/);
    if (typeMatch) {
      setType(typeMatch[1]);
    }
  }, []);

  useEffect(() => {
    if (contentId && contentTypeId) {
      fetchData(contentId, contentTypeId);
    }
  }, [contentId, contentTypeId]);

  const fetchData = async (contentId: number, contentTypeId: number) => {
    try {
      const response = await getSpotDetail(contentId, contentTypeId);
      const data = response.data;
      setSpotInfo({
        title: data.title,
        homepage: data.homepage || data.eventhomepage,
        address: data.addr1 + data.addr2 || '정보 없음',
        image:
          data.firstimage || data.firstimage2 || '/images/spot-default.svg',
        number:
          data.tel ||
          data.infocenter ||
          data.infocenterculture ||
          data.sponsor1tel ||
          data.infocentertourcourse ||
          data.infocenterleports ||
          data.infocenterlodging ||
          data.infocentershopping ||
          data.infocenterfood ||
          '정보 없음',
        telName: data.telName || '',
        restDate:
          data.restdate ||
          data.restdateculture ||
          data.restdateleports ||
          data.restdateshopping ||
          data.restdatefood ||
          data.culturecenter ||
          '정보 없음',
        overview: data.overview,
        link: data.homepage || data.reservationurl,
        time:
          data.usetime ||
          data.usetimeculture ||
          data.playtime ||
          data.usetimeleports ||
          data.opentime ||
          data.opentimefood ||
          '정보 없음',
        inTime: data.checkintime || '',
        outTime: data.checkouttime || '',
        mapx: data.mapx,
        mapy: data.mapy,
        inWishlist: inWish || data.inWishlist,
        location: data.location,
      });

      setExtraInfo({
        parking:
          data.parking || // 12
          data.parkingculture || // 14
          data.parkingleports || // 28
          data.parkinglodging || // 32
          data.parkingshopping || // 38
          '정보 없음',
        expGuide: data.expguide || '정보 없음',
        useFee: data.usefee || data.usefeeleports || '정보 없음',
        eventPeriod:
          data.eventstartdate && data.eventenddate
            ? `${data.eventstartdate} ~ ${data.eventenddate}`
            : '정보 없음',
        openDateShopping: data.opendateshopping || '정보 없음',
        firstMenu: data.firstmenu || '정보 없음',
        packing: data.packing || '정보 없음',
      });
    } catch (error) {
      console.error('Error fetching data:', error);
      router.push('/not-found');
    } finally {
    }
  };

  const fetchWishList = async () => {
    const wishListData = await getWishFeeds();
    const allData: WishInfo[] = Object.values(wishListData)
      .flatMap(location => Object.values(location))
      .flat();
    setWishList(allData);
    await setIsLoading(false);
  };

  const wishClick = async () => {
    if (!isLoggedIn) {
      openModal();
      return;
    }

    let res;
    const originState = inWish;
    setInWish(!inWish);

    try {
      const data: WishItem = {
        type: type,
        contentTypeId: String(contentTypeId),
        contentId: String(contentId),
      };
      if (originState) {
        setInWish(false);
        res = await deleteWishItem(data);
      } else {
        setInWish(true);
        res = await postWishItem(data);
      }
    } catch (error) {
      console.error('Error in wishClick:', error);
      if (res.error) {
        // 에러가 발생한 경우, 원래 상태로 되돌림
        setInWish(!inWish);
      }
    }
  };

  const backClick = () => {
    router.back();
  };

  const bottomClick = (link: string) => {
    const url = extractLinkOrValue(link);
    window.open(url, '_blank'); // 새 탭에서 링크 열기
  };

  const addressClick = () => {
    router.push(
      `/map?contentId=${contentId}&contentTypeId=${contentTypeId}&type=${type}`,
    );
  };

  useEffect(() => {
    const isInWishList = wishList.some(
      item => item.contentid === String(contentId),
    );
    if (isInWishList) {
      setInWish(true);
    }
  }, [spotInfo, wishList]);

  return (
    <div className="flex flex-col justify-start items-center h-full w-screen bg-white text-black">
      <div
        className="flex flex-col justify-start items-center gap-3
        w-full bg-white sm:max-w-sm
        "
      >
        <ImageWrapper>
          <Image
            src={spotInfo.image}
            alt="Tour"
            layout="responsive"
            width="0"
            height="0"
          />
          <BackWhite
            className="absolute top-4 left-4 z-10 cursor-pointer"
            onClick={backClick}
          />
          <div className="absolute inset-0 h-1/4 bg-gradient-to-b from-[#00000080] to-transparent"></div>
        </ImageWrapper>
        <div className="w-full flex flex-col items-center gap-2 bg-gray-1 ">
          {isLoading ? (
            <div className="w-full flex flex-col items-center gap-24 bg-white">
              <Spinner />
            </div>
          ) : (
            <>
              <div className="w-full flex flex-col gap-4 px-4 py-2 bg-white">
                <div className="w-full flex justify-between items-center">
                  <span
                    className="text-xl font-medium
                              whitespace-pre-wrap break-keep
                              max-w-[92%]"
                  >
                    {spotInfo.title}
                  </span>
                  {inWish ? (
                    <HeartColor
                      className="cursor-pointer"
                      onClick={wishClick}
                    />
                  ) : (
                    <Heart className="cursor-pointer" onClick={wishClick} />
                  )}
                </div>
                <div
                  className="w-fit flex items-center cursor-pointer"
                  onClick={addressClick}
                >
                  <Location />
                  <span className="max-w-[80%] text-sm whitespace-nowrap overflow-hidden text-ellipsis">
                    {spotInfo.address}
                  </span>
                  <GoSmall />
                </div>
                <div className="w-full flex flex-col gap-2 text-xs">
                  <InfoRow>
                    <span>주소</span>
                    <pre>{spotInfo.address}</pre>
                  </InfoRow>
                  <InfoRow>
                    <span>
                      {contentTypeId === 32 ? '체크인/아웃 시간' : '운영 시간'}
                    </span>
                    <pre>
                      {contentTypeId === 32
                        ? `${spotInfo.inTime} ~ ${spotInfo.outTime}`
                        : formatString(spotInfo.time || '')}
                    </pre>
                  </InfoRow>
                  <InfoRow>
                    <span>휴무</span>
                    <pre>{spotInfo.restDate}</pre>
                  </InfoRow>
                  <InfoRow>
                    <span>문의</span>
                    <pre>
                      {spotInfo.number}
                      {spotInfo.telName ? `(${spotInfo.telName})` : null}
                    </pre>
                  </InfoRow>
                </div>
              </div>
              {contentTypeId == 12 && <InfoRowType12 extraInfo={extraInfo} />}
              {contentTypeId == 14 && <InfoRowType14 extraInfo={extraInfo} />}
              {contentTypeId == 28 && <InfoRowType28 extraInfo={extraInfo} />}
              {contentTypeId == 32 && <InfoRowType32 extraInfo={extraInfo} />}
              {contentTypeId == 38 && <InfoRowType38 extraInfo={extraInfo} />}
              {contentTypeId == 39 && <InfoRowType39 extraInfo={extraInfo} />}
              <div className="w-full flex flex-col gap-2 px-4 py-2 bg-white text-xs">
                <span className="font-bold">소개</span>
                <span className="whitespace-pre-wrap break-words">
                  {spotInfo.overview}
                </span>
              </div>
            </>
          )}
        </div>
      </div>
      <div className="w-full fixed bottom-0 flex justify-center items-center sm:max-w-sm">
        <Button
          onClick={() => {
            bottomClick(spotInfo.link);
          }}
          isAllowed={!!spotInfo.link}
          text="상세 페이지로 이동"
        />
      </div>
    </div>
  );
}
