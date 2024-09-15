'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Back from '../../../public/svgs/back.svg';
import SearchIcon from '../../../public/svgs/search.svg';
import DropDown from '@/app/search/_components/DropDown';
import TrendList from '@/app/search/_components/TrendList';
import Button from '@/components/Button';

export default function Search() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('채용');
  const [selectedLocation, setSelectedLocation] = useState('제주');

  const router = useRouter();

  const trends = [
    '강릉',
    '여수',
    '부산',
    '속초',
    '가평',
    '파주',
    '성북',
    '서울',
    '이이',
    '아야',
  ];

  const handleSearch = () => {
    const url = `/search-results?category=${encodeURIComponent(
      selectedCategory,
    )}&location=${encodeURIComponent(selectedLocation)}&query=${encodeURIComponent(
      searchQuery,
    )}`;
    router.push(url);
  };

  return (
    <div className="flex justify-center min-h-screen">
      <div className=" w-full max-w-[393px] mx-auto flex flex-col items-center min-h-screen">
        <div className="px-4 py-4 w-full flex-1">
          {/* 상단 바 */}
          <div className="flex items-center mb-4 relative justify-center">
            <button className="p-2 absolute left-0">
              <Back />
            </button>
            <p className="text-lg py-3">검색</p>
          </div>
          <div>
            <div className="border border-gray-3 border-b-0 rounded-t-md">
              <div className="flex items-center border-b border-b-gray-2 h-12">
                <SearchIcon className="ml-4" />
                <input
                  type="text"
                  placeholder="검색어를 입력해주세요"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 text-gray-3 outline-none"
                />
              </div>
            </div>
            <div className="border border-gray-3 border-t-0 rounded-b-md">
              {/* DropDown 컴포넌트 */}
              <div className="flex items-center h-12 pl-4">
                <DropDown
                  options={['채용', '숙박', '관광']}
                  selectedOption={selectedCategory}
                  setSelectedOption={setSelectedCategory}
                  type="category"
                />

                <DropDown
                  options={[
                    '부산',
                    '경주',
                    '강릉',
                    '여수',
                    '전주',
                    '제주',
                    '춘천',
                  ]}
                  selectedOption={selectedLocation}
                  setSelectedOption={setSelectedLocation}
                  type="location"
                />
              </div>
            </div>
          </div>

          {/* 최신 트렌드 */}
          <div className="pt-24">
            <div className="flex items-center">
              <p className="text-md font-semibold pr-3">최신 트렌드</p>
              <p className="text-xs text-gray-4">2024.07.13 기준</p>
            </div>

            <div className="grid grid-cols-2 gap-x-4 pt-5">
              {/* TrendList 컴포넌트 */}
              <div>
                <TrendList trends={trends.slice(0, 3)} startIndex={1} />
                <div className="mt-2">
                  <TrendList
                    trends={trends.slice(3, 5)}
                    startIndex={4}
                    isGray={true}
                  />
                </div>
              </div>
              <div>
                <TrendList
                  trends={trends.slice(5, 10)}
                  startIndex={6}
                  isGray={true}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="w-full px-4 py-4">
          <Button onClick={handleSearch} isSelect text="검색하기" />
        </div>
      </div>
    </div>
  );
}