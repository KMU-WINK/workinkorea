'use client';

import { useEffect, useRef, useState } from 'react';
import Slider, { Settings } from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Card from '@/components/Card';
import { FeedProps } from '@/types/type';
import styled from 'styled-components';
import Input from '@/components/Input';
import Back from '../../../public/svgs/back.svg';
import Filter from '../../../public/svgs/filter.svg';

// kakao 라는 객체가 window에 존재하고 있다고 인식시켜주기 위함
declare global {
  interface Window {
    kakao: any;
  }
}

type MarkersType = {
  [index: number]: any;
};

const testData: FeedProps[] = [
  {
    contentid: 1,
    cardType: 'map',
    serviceType: 'default',
    title: '파주 풀빌라',
    firstimage:
      'http://tong.visitkorea.or.kr/cms/resource/93/2571393_image2_1.PNG',
    firstimage2:
      'http://tong.visitkorea.or.kr/cms/resource/93/2571393_image2_1.PNG',
    addr1: '서울특별시 종로구 사직로 161',
    addr2: '',
    image: 'http://tong.visitkorea.or.kr/cms/resource/93/2571393_image2_1.PNG',
    inWishlist: false,
    location: '서울특별시 종로구 사직로 161',
    mapx: 33.450705,
    mapy: 126.570677,
  },
  {
    contentid: 2,
    cardType: 'map',
    serviceType: 'default',
    title: '파주 풀빌라',
    firstimage:
      'http://tong.visitkorea.or.kr/cms/resource/93/2571393_image2_1.PNG',
    firstimage2:
      'http://tong.visitkorea.or.kr/cms/resource/93/2571393_image2_1.PNG',
    addr1: '서울특별시 종로구 사직로 161',
    addr2: '',
    image: 'http://tong.visitkorea.or.kr/cms/resource/93/2571393_image2_1.PNG',
    inWishlist: false,
    location: '서울특별시 종로구 사직로 161',
    mapx: 33.450936,
    mapy: 126.569477,
  },
  {
    contentid: 3,
    cardType: 'map',
    serviceType: 'default',
    title: '파주 풀빌라',
    firstimage:
      'http://tong.visitkorea.or.kr/cms/resource/93/2571393_image2_1.PNG',
    firstimage2:
      'http://tong.visitkorea.or.kr/cms/resource/93/2571393_image2_1.PNG',
    addr1: '서울특별시 종로구 사직로 161',
    addr2: '',
    image: 'http://tong.visitkorea.or.kr/cms/resource/93/2571393_image2_1.PNG',
    inWishlist: false,
    location: '서울특별시 종로구 사직로 161',
    mapx: 33.450879,
    mapy: 126.56994,
  },
  {
    contentid: 4,
    cardType: 'map',
    serviceType: 'default',
    title: '파주 풀빌라',
    firstimage:
      'http://tong.visitkorea.or.kr/cms/resource/93/2571393_image2_1.PNG',
    firstimage2:
      'http://tong.visitkorea.or.kr/cms/resource/93/2571393_image2_1.PNG',
    addr1: '서울특별시 종로구 사직로 161',
    addr2: '',
    image: 'http://tong.visitkorea.or.kr/cms/resource/93/2571393_image2_1.PNG',
    inWishlist: false,
    location: '서울특별시 종로구 사직로 161',
    mapx: 33.451393,
    mapy: 126.570738,
  },
];

const SliderContainer = styled.div`
  position: relative;
  bottom: 196px;
  z-index: 10;
  padding: 20px;
  .slick-slide {
    padding-right: 10px;
  }
`;

export default function Map() {
  const mapRef = useRef<HTMLDivElement>(null);
  const markerImageSrc = '/svgs/ping.svg';
  const activeMarkerImageSrc = '/svgs/ping-active.svg';
  const activeMarkerRef = useRef<any>(null);
  const mapObjectRef = useRef<any>(null);
  const sliderRef = useRef<Slider | null>(null);
  const [markers, setMarkers] = useState<MarkersType>({});

  const [inputValue, setInputValue] = useState('');

  // 카드 슬라이드시 이벤트 함수
  const onSlideChange = (index: number) => {
    const currentMarker = markers[Math.round(index) + 1];
    // 마커 이미지
    const markerImage = new window.kakao.maps.MarkerImage(
      markerImageSrc,
      new window.kakao.maps.Size(20, 20),
    );
    const activeMarkerImage = new window.kakao.maps.MarkerImage(
      activeMarkerImageSrc,
      new window.kakao.maps.Size(36, 43),
    );

    // 그 전 마커 비활성화
    if (activeMarkerRef.current) activeMarkerRef.current.setImage(markerImage);

    // 현재 마커 좌표로 중심 이동
    mapObjectRef.current.setCenter(currentMarker.getPosition());

    // 현재 마커 활성화
    currentMarker.setImage(activeMarkerImage);
    activeMarkerRef.current = currentMarker;
  };

  // 슬라이드 설정
  const sliderSettings: Settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1.05,
    slidesToScroll: 1,
    arrows: false,
    afterChange: (index: number) => {
      onSlideChange(index);
    },
  };

  const onWishClick = (id: number) => {
    console.log(id);
    // api 연동 예정
  };

  useEffect(() => {
    window.kakao.maps.load(() => {
      const options = {
        // 지도 중심 좌표
        center: new window.kakao.maps.LatLng(33.450701, 126.570667),
        level: 3,
      };

      const map = new window.kakao.maps.Map(mapRef.current, options);
      mapObjectRef.current = map;

      // 마커 이미지
      const markerImage = new window.kakao.maps.MarkerImage(
        markerImageSrc,
        new window.kakao.maps.Size(20, 20),
      );
      const activeMarkerImage = new window.kakao.maps.MarkerImage(
        activeMarkerImageSrc,
        new window.kakao.maps.Size(36, 43),
      );

      // 여러개 마커 생성
      testData.forEach(list => {
        const marker = new window.kakao.maps.Marker({
          map,
          position: new window.kakao.maps.LatLng(list.mapx, list.mapy),
          id: list.contentid,
          title: list.title,
          image: markerImage,
          clickable: true,
        });

        // 마커 객체 저장
        setMarkers(prevData => ({
          ...prevData,
          [list.contentid]: marker,
        }));

        // 마커 클릭 이벤트
        window.kakao.maps.event.addListener(marker, 'click', () => {
          if (!activeMarkerRef.current || activeMarkerRef.current !== marker) {
            // 활성화 되어있는 마커가 없거나 클릭한 마커와 활성화된 마커가 다를 경우
            if (activeMarkerRef.current)
              activeMarkerRef.current.setImage(markerImage); // 그 전 마커 비활성화
            marker.setImage(activeMarkerImage); // 클릭된 마커 활성화
            sliderRef.current?.slickGoTo(list.contentid - 1);
          }
          activeMarkerRef.current = marker;
        });
      });
    });
  }, []);

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="max-w-sm h-full overflow-hidden relative">
        <div className="z-10 absolute top-[54px] w-full px-6">
          <Input
            leftIcon={<Back />}
            rightIcon={<Filter />}
            placeholder="검색어"
            // onChange={setInputValue}
          />
        </div>
        <div ref={mapRef} className="h-screen" />
        <SliderContainer>
          <Slider
            ref={(slider: Slider | null) => {
              sliderRef.current = slider;
            }}
            /* eslint-disable-next-line react/jsx-props-no-spreading */
            {...sliderSettings}
          >
            {testData.map(list => (
              <Card
                key={list.contentid}
                id={list.contentid}
                cardType={list.cardType}
                serviceType={list.serviceType}
                title={list.title}
                location={list.location}
                image={list.image}
                price={0}
                onCardClick={() => {}}
                onWishListClick={onWishClick}
              />
            ))}
          </Slider>
        </SliderContainer>
      </div>
    </div>
  );
}
