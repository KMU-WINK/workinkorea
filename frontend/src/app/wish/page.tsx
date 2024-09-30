'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Back from 'public/svgs/back.svg';
import Go from 'public/svgs/go.svg';
import { useRouter } from 'next/navigation';
import { getWishFeeds } from '@/services/wishs';
import { LocationInfo } from '@/types/type';

interface WishType {
  id: number;
  location: string;
  count: number;
}

type LocCountType = {
  [key: string]: {
    id: number;
    count: number;
    items: LocCountType[];
    length: number;
  };
};

export default function Wish() {
  const router = useRouter();
  const [locCount, setLocCount] = useState<LocCountType>({
    전체: {
      id: 0,
      count: 0,
      items: [],
      length: 0,
    },
    강릉: {
      id: 1,
      count: 0,
      items: [],
      length: 0,
    },
    경주: {
      id: 2,
      count: 0,
      items: [],
      length: 0,
    },
    부산: {
      id: 3,
      count: 0,
      items: [],
      length: 0,
    },
    여수: {
      id: 4,
      count: 0,
      items: [],
      length: 0,
    },
    전주: {
      id: 5,
      count: 0,
      items: [],
      length: 0,
    },
    제주: {
      id: 6,
      count: 0,
      items: [],
      length: 0,
    },
    춘천: {
      id: 7,
      count: 0,
      items: [],
      length: 0,
    },
  });

  const fetchData = async () => {
    try {
      const response: LocationInfo[] = await getWishFeeds(); // 배열로 처리
      let totalCount = 0;

      const updatedLocCount = { ...locCount };
      Object.entries(response).forEach(([key, value]) => {
        // @ts-ignore
        updatedLocCount[key].count = response[key].length;
        // @ts-ignore
        totalCount += response[key].length;
      });
      updatedLocCount['전체'].count = totalCount;

      setLocCount(updatedLocCount);
    } catch (error) {
      console.log('error : ', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const backClick = () => {
    router.push('/main');
  };

  return (
    <div className="w-screen h-full flex justify-center text-black bg-white">
      <div className="max-w-sm w-full h-full flex flex-col items-center gap-2 py-4">
        <div className="w-full relative text-center py-3">
          <Back
            className="absolute top-3 left-6 cursor-pointer"
            onClick={backClick}
          />
          <span>위시리스트</span>
        </div>
        <div className="w-full flex flex-col px-6 items-center">
          {(Object.keys(locCount) as (keyof LocationInfo)[]).map(item => (
            <Link
              href={`/wish/${locCount[item].id}`}
              key={locCount[item].id}
              passHref
              className="w-full"
            >
              <div
                className="w-full flex justify-between px-3 py-4 border-b"
                role="button"
                tabIndex={0}
              >
                <span>
                  {item}({locCount[item].count})
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
