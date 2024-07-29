'use client';

import Link from 'next/link';
import { useState } from 'react';
import Modal from './_components/Modal';
import './styles.css';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // @media screen and (max-width: 480px) {
  //   .modal-content{
  //       max-width: 100vw;
  //       width: 100vw;
  //       height: 100vh;
  //       border-radius: 0;
  //       justify-content: center;
  //     }
  //   }

  return (
    <main className="min-h-screen" style={{ padding: '24px' }}>
      <button
        className="flex flex-col items-center justify-center text-white w-full"
        style={{ backgroundColor: 'green', padding: '12px' }}
        type="button"
        onClick={openModal}
      >
        Open Modal
      </button>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {/*        <div*/}
        {/*          className="flex flex-col p-[52px_24px_36px_24px] relative bg-white rounded-[20px] gap-[100px] max-w-[392px] min-w-[392px]*/}
        {/*xs:max-w-screen xs:w-screen xs:h-screen xs:rounded-none xs:justify-center"*/}
        {/*          style={{*/}
        {/*            backgroundColor: '#ffffff',*/}
        {/*            borderRadius: '20px',*/}
        {/*            gap: '100px',*/}
        {/*            maxWidth: '392px',*/}
        {/*            minWidth: '392px',*/}
        {/*            padding: '52px 24px 36px 24px',*/}
        {/*          }}*/}
        {/*        >*/}
        <div className="modal-content">
          <div
            className="absolute top-4 right-4 cursor-pointer"
            style={{ top: '16px', right: '16px', cursor: 'pointer' }}
            onClick={closeModal}
          >
            x
          </div>
          <div className="flex flex-col" style={{ gap: '24px' }}>
            <div className="flex flex-col " style={{ gap: '6px' }}>
              <div
                className="text-xl font-semibold text-[#33C4A8]"
                style={{ color: '#33C4A8' }}
              >
                워크인코리아
              </div>
              <div
                className="text-[18px] font-medium"
                style={{ fontSize: '18px' }}
              >
                원하는 곳에서 머무르며 일하다
              </div>
            </div>
            <div className="text-[14px]" style={{ fontSize: '14px' }}>
              나에게 꼭 맞는 장소에서의 워케이션을 계획하세요
            </div>
          </div>
          <div className="flex flex-col gap-10" style={{ gap: '40px' }}>
            <div className="flex flex-col gap-[10px]" style={{ gap: '10px' }}>
              <button
                className="w-full p-4.5 border-none rounded-[10px] bg-[#FEE500]"
                type="button"
                style={{
                  backgroundColor: '#FEE500',
                  padding: ' 18px',
                  borderRadius: '10px',
                }}
              >
                카카오로 시작하기
              </button>
              <button
                className="w-full p-4.5 border-none rounded-xl bg-[#1EC800] text-white"
                type="button"
                style={{
                  backgroundColor: '#1EC800',
                  padding: ' 18px',
                  borderRadius: '10px',
                }}
              >
                네이버로 시작하기
              </button>
              <button
                className="w-full p-4.5 border-none rounded-xl bg-white border border-black"
                type="button"
                style={{
                  backgroundColor: 'white',
                  padding: ' 18px',
                  borderRadius: '10px',
                }}
              >
                Google로 시작하기
              </button>
            </div>
            <div
              className="text-[14px] font-medium"
              style={{ fontSize: '14px' }}
            >
              계속 진행하시면 워크인코리아의{' '}
              <Link
                className="underline"
                href="/"
                style={{ textDecoration: 'underline' }}
              >
                서비스 약관
              </Link>{' '}
              및{' '}
              <Link
                className="underline"
                href="/"
                style={{ textDecoration: 'underline' }}
              >
                개인정보처리방침
              </Link>
              에 동의하시는 것으로 간주됩니다.
            </div>
          </div>
        </div>
      </Modal>
    </main>
  );
}
