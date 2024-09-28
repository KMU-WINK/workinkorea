'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

type ExceptionPageTemplateProps = {
  alertText: string;
  buttonText?: string;
};

const ExceptionPageTemplate = ({
  alertText,
  buttonText = '메인으로 이동하기',
}: ExceptionPageTemplateProps): React.ReactNode => {
  const router = useRouter();

  return (
    <div className="flex flex-col w-screen h-screen justify-center items-center">
      <Image
        src="/images/error.svg"
        width={73}
        height={150}
        alt="에러 안내 도우미"
      />
      <p className="text-lg my-8">{alertText}</p>
      <button
        className="bg-[#33C4A8] text-white rounded-[10px] font-semibold text-md px-[14px] py-[18px]"
        type="button"
        onClick={() => router.replace('/main')}
      >
        {buttonText}
      </button>
    </div>
  );
};

export default ExceptionPageTemplate;
