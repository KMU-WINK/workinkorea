import React, { useEffect, useState } from 'react';
import SpinnerImage from '../../../public/svgs/spin.svg';

const AISpinner = () => {
  const phrases = [
    '인공지능이 일하고 있어요!',
    '워크인코리아에서 열심히 알아보고 있어요',
    '곧 완료됩니다!',
    '사용자 데이터를 불러오는 중이에요',
    '서버와 통신 중이에요',
    '함께 떠나요! 여행을 준비하고 있어요',
  ];

  const [currentPhrase, setCurrentPhrase] = useState(phrases[0]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * phrases.length);
      setCurrentPhrase(phrases[randomIndex]);
    }, 2000);

    return () => clearInterval(intervalId);
  }, [phrases]);

  // 각 문구에 따라 다른 색상을 적용하는 함수
  const renderColoredPhrase = () => {
    switch (currentPhrase) {
      case '인공지능이 일하고 있어요!':
        return (
          <span className="font-semibold text-gray-3">
            <span className="text-main">인공지능</span>이 <span>일하고</span>{' '}
            있어요!
          </span>
        );
      case '워크인코리아에서 열심히 알아보고 있어요':
        return (
          <span className="font-semibold text-gray-3">
            <span className=" text-main">워크인코리아</span>에서 <br />
            <span className="text-main">열심히</span> 알아보고 있어요
          </span>
        );
      case '곧 완료됩니다!':
        return (
          <span className="font-semibold text-gray-3">
            곧 <span className="text-main">완료</span>됩니다!
          </span>
        );
      case '사용자 데이터를 불러오는 중이에요':
        return (
          <span className="font-semibold text-gray-3">
            <span className="text-main">사용자 데이터</span>를{' '}
            <span>불러오는 중</span>이에요
          </span>
        );
      case '서버와 통신 중이에요':
        return (
          <span className="font-semibold text-gray-3">
            <span>서버</span>와 <span className="text-main">통신 중</span>이에요
          </span>
        );
      case '함께 떠나요! 여행을 준비하고 있어요':
        return (
          <span className="font-semibold text-gray-3">
            <span>함께 떠나요</span>! <br />
            <span className="text-main">여행을 준비</span>하고 있어요
          </span>
        );
      default:
        return <span>{currentPhrase}</span>;
    }
  };

  return (
    <div className="pt-[50%] flex flex-col justify-center w-full">
      <div className="flex justify-center w-20 h-20 self-center">
        <SpinnerImage />
      </div>
      <div className="mt-20 text-center">
        <p>{renderColoredPhrase()}</p>
      </div>
    </div>
  );
};

export default AISpinner;
