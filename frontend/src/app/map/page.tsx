'use client';

import { useEffect, useRef, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Card from '@/components/Card';
import { CardProps } from '@/types/type';
import styled from 'styled-components';

declare global {
  interface Window {
    kakao: any;
  }
}

const testData: CardProps[] = [
  {
    id: 1,
    cardType: 'map',
    serviceType: 'default',
    title: '홍대점',
    location: '연희동',
    image: '/',
    price: 5000,
    onCardClick: () => {},
    onWishListClick: () => {},
  },
  {
    id: 2,
    cardType: 'map',
    serviceType: 'default',
    title: '홍대점',
    location: '연희동',
    image: '/',
    price: 5000,
    onCardClick: () => {},
    onWishListClick: () => {},
  },
  {
    id: 3,
    cardType: 'map',
    serviceType: 'default',
    title: '홍대점',
    location: '연희동',
    image: '/',
    price: 5000,
    onCardClick: () => {},
    onWishListClick: () => {},
  },
];

const SliderContainer = styled.div`
  position: relative;
  bottom: 184px;
  z-index: 10;
  padding: 20px;
  .slick-slide {
    padding-right: 10px;
  }
`;

type MappingData = {
  [index: number]: any;
};

export default function Map() {
  const mapRef = useRef<HTMLDivElement>(null);
  const markerImageSrc = '/svgs/ping.svg';
  const activeMarkerImageSrc = '/svgs/ping-active.svg';
  const activeMarkerRef = useRef<any>(null);
  const mapObjectRef = useRef<any>(null);

  const [mappingData, setMappingData] = useState<MappingData>({});

  const onSlideChange = (index: number) => {
    const currentMarker = mappingData[Math.round(index) + 1];
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

  const sliderSettings = {
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

  useEffect(() => {
    window.kakao.maps.load(() => {
      // 마커 샘플 데이터
      const positions = [
        {
          id: 1,
          title: '카카오',
          latlng: new window.kakao.maps.LatLng(33.450705, 126.570677),
        },
        {
          id: 2,
          title: '생태연못',
          latlng: new window.kakao.maps.LatLng(33.450936, 126.569477),
        },
        {
          id: 3,
          title: '텃밭',
          latlng: new window.kakao.maps.LatLng(33.450879, 126.56994),
        },
        {
          id: 4,
          title: '근린공원',
          latlng: new window.kakao.maps.LatLng(33.451393, 126.570738),
        },
      ];

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
      positions.forEach(position => {
        const marker = new window.kakao.maps.Marker({
          map,
          position: position.latlng,
          title: position.title,
          image: markerImage,
          clickable: true,
        });

        // 마커 객체 저장
        setMappingData(prevData => ({
          ...prevData,
          [position.id]: marker,
        }));

        // 마커 클릭 이벤트
        window.kakao.maps.event.addListener(marker, 'click', () => {
          if (!activeMarkerRef.current || activeMarkerRef.current !== marker) {
            if (activeMarkerRef.current)
              activeMarkerRef.current.setImage(markerImage); // 그 전 마커 비활성화
            marker.setImage(activeMarkerImage); // 클릭된 마커 활성화
          }
          activeMarkerRef.current = marker;
        });
      });
    });
  }, []);

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="max-w-sm h-full overflow-hidden relative">
        <div ref={mapRef} className="w-screen h-full" />
        <SliderContainer>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          <Slider {...sliderSettings}>
            {testData.map(list => (
              <Card
                key={list.id}
                id={list.id}
                cardType={list.cardType}
                serviceType={list.serviceType}
                title={list.title}
                location={list.location}
                image={list.image}
                price={list.price}
                onCardClick={list.onCardClick}
                onWishListClick={list.onWishListClick}
              />
            ))}
          </Slider>
        </SliderContainer>
      </div>
    </div>
  );
}
