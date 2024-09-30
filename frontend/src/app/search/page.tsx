'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Back from 'public/svgs/back.svg';
import SearchIcon from 'public/svgs/search.svg';
import DropDown from '../../components/DropDown';
import TrendList from '@/app/search/_components/TrendList';
import Button from '@/components/Button';
import Character from 'public/svgs/character.svg';
import Map from 'public/svgs/map.svg';
import Header from '@/components/Header';

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
    const basePath =
      selectedCategory === '채용'
        ? '/job'
        : selectedCategory === '숙박'
          ? '/stay'
          : selectedCategory === '관광'
            ? '/tour'
            : '';

    const url = `${basePath}?location=${encodeURIComponent(selectedLocation)}&keyword=${encodeURIComponent(
      searchQuery,
    )}`;

    router.push(url);
  };

  return (
    <div className="flex justify-center min-h-screen">
      <Header
        text="검색"
        onLeftClick={() => router.back()} // 이전 페이지로 이동하는 로직 추가
      />
      <div className="w-full max-w-[393px] mx-auto flex flex-col items-center min-h-screen">
        <div className="px-6 py-6 w-full flex-1">
          {/* 상단 바 */}
          <div className="pt-14">
            <div className="border border-gray-3 border-b-0 rounded-t-md">
              <div className="flex items-center border-b border-b-gray-2 h-12">
                <SearchIcon className="ml-4" />
                <input
                  type="text"
                  placeholder="검색어를 입력해주세요"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 text-black outline-none placeholder:text-gray-3"
                />
              </div>
            </div>
            <div className="border border-gray-3 border-t-0 rounded-b-md">
              {/* DropDown 컴포넌트 */}
              <div className="flex items-center h-12 px-4">
                <div className="flex-1">
                  <DropDown
                    options={['채용', '숙박', '관광']}
                    selectedOption={selectedCategory}
                    setSelectedOption={setSelectedCategory}
                    icon={<Character />}
                  />
                </div>
                <div className="flex-1">
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
                    icon={<Map />}
                  />
                </div>
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
        <div className="w-full fixed bottom-0 flex justify-center items-center sm:max-w-sm">
          <Button onClick={handleSearch} isAllowed text="검색하기" />
        </div>
      </div>
    </div>
  );
}
