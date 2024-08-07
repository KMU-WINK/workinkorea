'use client';

import Link from 'next/link';
import { useState } from 'react';
import Modal from './_components/Modal';
import Close from '../../../public/svgs/close.svg';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Escape') {
      closeModal();
    }
  };

  return (
    <main className="min-h-screen text-[#000000] p-6" onKeyDown={handleKeyDown}>
      <button
        className="flex flex-col items-center justify-center text-white w-full bg-main p-3"
        type="button"
        onClick={openModal}
      >
        Open Modal
      </button>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        handleKeyDown={handleKeyDown}
      >
        <div
          className="flex flex-col justify-center pt-14 px-6
          pb-20 relative bg-[#ffffff]
          gap-24 min-w-[100vw] min-h-screen rounded-none
          sm:rounded-[20px] sm:min-w-[392px] sm:min-h-[392px]"
        >
          <Close
            className="absolute top-4 right-4 cursor-pointer"
            onClick={closeModal}
          />
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-1.5">
              <span className="text-xl font-semibold text-main">
                워크인코리아
              </span>
              <span className="text-lg font-medium">
                원하는 곳에서 머무르며 일하다
              </span>
            </div>
            <span className="text-sm">
              나에게 꼭 맞는 장소에서의 워케이션을 계획하세요
            </span>
          </div>
          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-2.5">
              <button
                className="w-full p-[18px] border-none rounded-xl bg-kakao"
                type="button"
              >
                카카오로 시작하기
              </button>
              <button
                className="w-full p-[18px] border-none rounded-xl bg-naver text-[#ffffff]"
                type="button"
              >
                네이버로 시작하기
              </button>
              <button
                className="w-full p-[18px] border-gray-2 rounded-xl bg-[#ffffff] border"
                type="button"
              >
                Google로 시작하기
              </button>
            </div>
            <span className="text-[14px] font-medium">
              계속 진행하시면 워크인코리아의{' '}
              <Link className="underline" href="/">
                서비스 약관
              </Link>{' '}
              및{' '}
              <Link className="underline" href="/">
                개인정보처리방침
              </Link>
              에 동의하시는 것으로 간주됩니다.
            </span>
          </div>
        </div>
      </Modal>
    </main>
  );
}
