'use client';
import React from 'react';
import Button from '@/components/Button';

interface Props {
  children: React.ReactNode;
}

const MainLayout = ({ children }: Props) => {
  return (
    <div className="flex justify-center items-start relative h-screen bg-white ">
      <div className="pb-20">{children}</div>
      <div className="w-full fixed bottom-0 flex justify-center items-center sm:max-w-sm">
        <Button
          onClick={() => {
            console.log('gml');
          }}
          isAllowed={true} // TODO: 수정 필요할 수 있음. 24.09.16 Button 컴포넌트 수정 작업이 있었음
          text="상세 페이지로 이동"
        />
      </div>
    </div>
  );
};

export default MainLayout;
