'use client';
import React from 'react';

interface Props {
  children: React.ReactNode;
}

const MainLayout = ({ children }: Props) => {
  return (
    <div className="flex justify-center items-start relative h-screen bg-white ">
      <div className="pb-20">{children}</div>
    </div>
  );
};

export default MainLayout;
