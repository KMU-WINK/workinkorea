'use client';

import React, { useState } from 'react';
import Step1 from '@/app/onboarding/_components/Step1';
import Step2 from '@/app/onboarding/_components/Step2';
import Step3 from '@/app/onboarding/_components/Step3';
import Step4 from '@/app/onboarding/_components/Step4';
import Step5 from '@/app/onboarding/_components/Step5';
import Badge from '@/app/onboarding/_components/Badge';
import Button from '@/components/Button';
import BackIcon from '../../../public/svgs/back.svg';

export default function Onboarding() {
  const [currentPage, setCurrentPage] = useState(1);

  const handleNextClick = () => {
    if (currentPage < 5) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevClick = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="bg-white min-h-screen flex flex-col justify-between overflow-scroll">
      <div className="px-6">
        <div className="py-3 min-h-14">
          {currentPage > 1 ? (
            <BackIcon onClick={handlePrevClick} className="cursor-pointer" />
          ) : (
            <div />
          )}
        </div>
        <div className="flex gap-2 ">
          <Badge number={1} isSelected={currentPage === 1} />
          <Badge number={2} isSelected={currentPage === 2} />
          <Badge number={3} isSelected={currentPage === 3} />
          <Badge number={4} isSelected={currentPage === 4} />
          <Badge number={5} isSelected={currentPage === 5} />
        </div>

        {currentPage === 1 && <Step1 />}
        {currentPage === 2 && <Step2 />}
        {currentPage === 3 && <Step3 />}
        {currentPage === 4 && <Step4 />}
        {currentPage === 5 && <Step5 />}
      </div>
      <div className="w-full fixed bottom-0 bg-white">
        <Button text="다음으로" isSelect onClick={handleNextClick} />
      </div>
    </div>
  );
}
