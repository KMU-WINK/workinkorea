'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Back from '../../../public/svgs/back.svg';
import Character from '../../../public/svgs/character.svg';
import Map from '../../../public/svgs/map.svg';
import Dropdown from '../../../public/svgs/dropdown.svg';
import SearchIcon from '../../../public/svgs/search.svg';

export default function Search() {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('채용');
  const [selectedLocation, setSelectedLocation] = useState('제주');

  const router = useRouter(); // Next.js 라우터 사용

  const categories = ['채용', '숙박', '관광'];
  const locations = ['부산', '경주', '강릉', '여수', '전주', '제주', '춘천'];
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
    // URL에 선택한 검색어, 카테고리, 지역 정보를 추가합니다.
    const url = `/search-results?category=${encodeURIComponent(
      selectedCategory,
    )}&location=${encodeURIComponent(selectedLocation)}&query=${encodeURIComponent(
      searchQuery,
    )}`;
    console.log(url);
    router.push(url);
  };
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className=" min-h-screen flex flex-col">
      <div className="px-6 py-4">
        {/* 상단 바 */}
        <div className="flex items-center mb-4 relative justify-center">
          <button className="p-2 absolute left-0">
            <Back />
          </button>
          <p className="text-lg py-3">검색</p>
        </div>
        <div className="border border-gray-3 rounded-md ">
          <div className="flex items-center border-b border-b-gray-2 h-12">
            <SearchIcon className="ml-4" />
            <input
              type="text"
              placeholder="검색어를 입력해주세요"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)} // 입력값을 상태에 반영
              onKeyPress={handleKeyPress} // 엔터 키를 눌렀을 때 검색 실행
              className="w-full px-4 py-2 text-gray-600 outline-none"
            />
          </div>

          <div className="flex items-center h-12 relative w-full">
            {/* 카테고리 */}
            <div
              className="relative flex items-center pl-4 py-2 cursor-pointer min-w-44"
              onClick={() => setIsCategoryOpen(!isCategoryOpen)}
            >
              <Character className="mr-1" />
              <span className="text-gray-700">{selectedCategory}</span>
              <Dropdown className="mx-2" />

              {/* 카테고리 선택 드롭다운 */}
              {isCategoryOpen && (
                <ul className="absolute top-full left-0 mt-1 w-32 bg-white shadow-lg z-10">
                  {categories.map(category => (
                    <li
                      key={category}
                      onClick={() => {
                        setSelectedCategory(category);
                        setIsCategoryOpen(false);
                      }}
                      className="px-4 py-2 hover:bg-gray-1 cursor-pointer"
                    >
                      {category}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* 지역 선택 */}
            <div
              className="relative flex items-center py-2 cursor-pointer min-w-44"
              onClick={() => setIsLocationOpen(!isLocationOpen)}
            >
              <Map className="mr-2" />
              <span>{selectedLocation}</span>
              <Dropdown className="mx-2" />

              {/* 지역 선택 드롭다운 */}
              {isLocationOpen && (
                <ul className="absolute top-full left-0 pt-1 w-32 bg-white shadow-lg z-100">
                  {locations.map(location => (
                    <li
                      key={location}
                      onClick={() => {
                        setSelectedLocation(location);
                        setIsLocationOpen(false);
                      }}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      {location}
                    </li>
                  ))}
                </ul>
              )}
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
            <ul className="space-y-2">
              {trends.slice(0, 3).map((trend, index) => (
                <li key={trend} className="flex items-center">
                  <div className="w-6 flex justify-end text-main font-semibold pr-2">
                    {index + 1}
                  </div>
                  <div>{trend}</div>
                </li>
              ))}

              {/* 4, 5위 */}
              {trends.slice(3, 5).map((trend, index) => (
                <li key={trend} className="flex items-center">
                  <div className="w-6 flex justify-center text-gray-3 font-semi-bold pr-2 text-[14px]">
                    {index + 4}
                  </div>
                  <div>{trend}</div>
                </li>
              ))}
            </ul>

            <ul className="space-y-2">
              {trends.slice(5, 10).map((trend, index) => (
                <li key={trend} className="flex items-center">
                  <div className="w-6 text-gray-3 font-bold pr-2 flex justify-center text-[14px]">
                    {index + 6}
                  </div>
                  <div>{trend}</div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
