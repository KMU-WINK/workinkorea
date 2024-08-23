import React from 'react';

interface BadgeProps {
  number: number;
  isSelected: boolean;
}

export default function Badge({ number, isSelected }: BadgeProps) {
  return (
    <div className="text-center content-center w-7 h-7">
      <div
        className={`flex items-center justify-center w-full h-full rounded-full border-[1px] ${
          isSelected
            ? 'bg-main text-white border-main'
            : 'bg-white text-main border-main'
        }`}
      >
        {number}
      </div>
    </div>
  );
}
