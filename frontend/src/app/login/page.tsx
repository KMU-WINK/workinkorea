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

  return (
    <main className="main">
      <button className="modal-btn" type="button" onClick={openModal}>
        Open Modal
      </button>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div className="modal-content">
          <div className="x-btn" onClick={closeModal}>
            x
          </div>
          <div className="modal-header">
            <div className="modal-sub-header">
              <div className="modal-title">워크인코리아</div>
              <div className="modal-sub-title">
                원하는 곳에서 머무르며 일하다
              </div>
            </div>
            <div className="modal-info">
              나에게 꼭 맞는 장소에서의 워케이션을 계획하세요
            </div>
          </div>
          <div className="content-wrapper">
            <div className="btn-wrapper">
              <button className="btn kakao" type="button">
                카카오로 시작하기
              </button>
              <button className="btn naver" type="button">
                네이버로 시작하기
              </button>
              <button className="btn google" type="button">
                Google로 시작하기
              </button>
            </div>
            <div className="footer-info">
              계속 진행하시면 워크인코리아의 <Link href="/">서비스 약관</Link>{' '}
              및 <Link href="/">개인정보처리방침</Link>에 동의하시는 것으로
              간주됩니다.
            </div>
          </div>
        </div>
      </Modal>
    </main>
  );
}
