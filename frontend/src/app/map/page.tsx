'use client';

import { useEffect, useRef } from 'react';
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
  useEffect(() => {
    window.kakao.maps.load(() => {
      const options = {
        center: new window.kakao.maps.LatLng(33.450701, 126.570667),
        level: 3,
      };

      const map = new window.kakao.maps.Map(mapRef.current, options);
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
