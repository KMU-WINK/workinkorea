'use client';

import React, { useEffect, useState, useCallback } from 'react';
import Step1 from '@/app/onboarding/_components/Step1';
import Step2 from '@/app/onboarding/_components/Step2';
import Step3 from '@/app/onboarding/_components/Step3';
import Step4 from '@/app/onboarding/_components/Step4';
import Step5 from '@/app/onboarding/_components/Step5';
import Badge from '@/app/onboarding/_components/Badge';
import Button from '@/components/Button';
import PublicAxiosInstance from '@/services/publicAxiosInstance';
import BackIcon from '../../../public/svgs/back.svg';

export default function Onboarding() {
  const [currentPage, setCurrentPage] = useState(1);
  const [nickname, setNickname] = useState('');
  const [age, setAge] = useState(''); // Step2에서 사용할 상태
  const [location, setLocation] = useState(''); // Step3에서 사용할 상태
  const [jobPreference, setJobPreference] = useState(''); // Step4에서 사용할 상태

  const updateNickname = async () => {
    try {
      const response = await PublicAxiosInstance.patch('/users/nickname', {
        id: 1,
        nickname,
      });
      console.log('Nickname updated:', response.data);
    } catch (error) {
      console.error('Error updating nickname:', error);
    }
  };

  const handleNextClick = useCallback(() => {
    if (currentPage === 1) {
      updateNickname(); // API 호출
      setCurrentPage(prev => prev + 1);
    } else {
      setCurrentPage(prev => prev + 1);
    }
  }, [currentPage, nickname]);

  const handlePrevClick = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
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

        {currentPage === 1 && (
          <Step1 nickname={nickname} onNicknameChange={setNickname} />
        )}
        {currentPage === 2 && <Step2 age={age} onAgeChange={setAge} />}
        {currentPage === 3 && (
          <Step3 location={location} onLocationChange={setLocation} />
        )}
        {currentPage === 4 && (
          <Step4
            jobPreference={jobPreference}
            onJobPreferenceChange={setJobPreference}
          />
        )}
        {currentPage === 5 && <Step5 />}
      </div>
      <div className="w-full fixed bottom-0 bg-white">
        <Button text="다음으로" isSelect onClick={handleNextClick} />
      </div>
    </div>
  );
}
