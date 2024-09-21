'use client';

import Link from 'next/link';
import Modal from './Modal';
import Close from 'public/svgs/close.svg';
import Kakao from 'public/svgs/kakao.svg';
import Naver from 'public/svgs/naver.svg';
import Google from 'public/svgs/google.svg';
import useModalStore from '@/app/stores/modalStore';

export default function LoginModal() {
  const { isOpen, closeModal } = useModalStore();
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Escape') closeModal();
  };

  const onClickKaKaoLogin = () => {
    window.Kakao.Auth.authorize({
      redirectUri: `${process.env.NEXT_PUBLIC_API_BASE_URI}/auth/kakao`,
    });
  };

  const onClickNaverLogin = () => {
    const clientId = process.env.NEXT_PUBLIC_NAVER_CLIENT_ID;
    const redirectUri = `${process.env.NEXT_PUBLIC_API_BASE_URI}/auth/naver`;
    const authUrl = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&state=state`;

    window.location.href = authUrl;
  };

  const onClickGoogleLogin = () => {
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
    const redirectUri = `${process.env.NEXT_PUBLIC_API_BASE_URI}/auth/google`;
    const scope = 'email profile';
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}&state=state`;

    window.location.href = authUrl;
  };

  return (
    <Modal isOpen={isOpen} onClose={closeModal} handleKeyDown={handleKeyDown}>
      <div
        className="flex flex-col justify-center pt-14 px-6
          pb-20 relative bg-white
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
              onClick={onClickKaKaoLogin}
              type="button"
              className="w-full p-[18px] border border-gray-2 rounded-xl bg-kakao relative text-center"
            >
              <Kakao className="absolute top-1/2 -translate-y-1/2" />
              카카오로 시작하기
            </button>
            <button
              onClick={onClickNaverLogin}
              type="button"
              className="w-full p-[18px] border border-gray-2 rounded-xl bg-naver text-white relative text-center"
            >
              <Naver className="absolute top-1/2 -translate-y-1/2" />
              네이버로 시작하기
            </button>
            <button
              onClick={onClickGoogleLogin}
              type="button"
              className="w-full p-[18px] border border-gray-2 rounded-xl relative text-center"
            >
              <Google className="absolute top-1/2 -translate-y-1/2" />
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
  );
}
