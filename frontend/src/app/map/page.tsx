'use client';

import { useEffect, useRef, useState } from 'react';
import Card from '@/components/Card';
import { CardProps } from '@/types/type';

declare global {
  interface Window {
    kakao: any;
  }
}

const testData: CardProps[] = [
  {
    cardType: 'map',
    serviceType: 'default',
    title: '홍대점',
    location: '연희동',
    image: '/',
    price: 5000,
  },
  {
    cardType: 'map',
    serviceType: 'default',
    title: '홍대점',
    location: '연희동',
    image: '/',
    price: 5000,
  },
  {
    cardType: 'map',
    serviceType: 'default',
    title: '홍대점',
    location: '연희동',
    image: '/',
    price: 5000,
  },
];

export default function Map() {
  const mapRef = useRef<HTMLDivElement>(null);
  const markerImageSrc = '/svgs/ping.svg';
  const activeMarkerImageSrc = '/svgs/ping-active.svg';
  const activeMarkerRef = useRef<any>(null);

  useEffect(() => {
    window.kakao.maps.load(() => {
      // 마커 샘플 데이터
      const positions = [
        {
          title: '카카오',
          latlng: new window.kakao.maps.LatLng(33.450705, 126.570677),
        },
        {
          title: '생태연못',
          latlng: new window.kakao.maps.LatLng(33.450936, 126.569477),
        },
        {
          title: '텃밭',
          latlng: new window.kakao.maps.LatLng(33.450879, 126.56994),
        },
        {
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

        window.kakao.maps.event.addListener(marker, 'click', () => {
          if (!activeMarkerRef.current || activeMarkerRef.current !== marker) {
            if (activeMarkerRef.current)
              activeMarkerRef.current.setImage(markerImage);
            // 마커 클릭시 active
            marker.setImage(activeMarkerImage);
          }
          activeMarkerRef.current = marker;
        });
      });
    });
  }, []);

  return (
    <div>
      <div ref={mapRef} className="w-screen h-screen" />
      <div className="fixed bottom-10 left-6 z-10 flex gap-2.5">
        {testData.map(list => (
          <Card
            cardType={list.cardType}
            serviceType={list.serviceType}
            title={list.title}
            location={list.location}
            image={list.image}
            price={list.price}
          />
        ))}
      </div>
    </div>
  );
}
