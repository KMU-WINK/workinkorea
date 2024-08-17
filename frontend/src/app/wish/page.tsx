'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Back from '../../../public/svgs/back.svg';
import Go from '../../../public/svgs/go.svg';

interface WishType {
  id: number;
  location: string;
  count: number;
}

export default function Wish() {
  const [wishList, setWishList] = useState<WishType[]>([]);

  useEffect(() => {
    setWishList([
      {
        id: 0,
        location: '전체',
        count: 11,
      },
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
    ]);
  }, []);

  return (
    <div className="w-screen h-full flex justify-center text-black bg-white">
      <div className="max-w-sm w-full h-full flex flex-col items-center gap-2">
        <div className="w-full relative text-center py-3">
          <Back className="absolute top-3 left-6 cursor-pointer" />
          <span>위시리스트</span>
        </div>
        <div className="w-full flex flex-col px-6 items-center">
          {wishList.map(item => (
            <Link
              href={`/wish/${item.id}`}
              key={item.id}
              passHref
              className="w-full"
            >
              <div
                className="w-full flex justify-between px-3 py-4 border-b"
                role="button"
                tabIndex={0}
              >
                <span>
                  {item.location}({item.count})
                </span>
                <Go />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
