import React from 'react';

export interface ButtonProps {
  buttonType: 'select' | 'button';
  text: string;
  isSelect: boolean;
}

export default function Button({ buttonType, text, isSelect }: ButtonProps) {
  if (buttonType === 'select') {
    return (
      <button
        type="button"
        className={`flex rounded-xl w-full justify-center self-center border-[1px] px-4.5 py-3.5 ${isSelect ? 'bg-secondary text-main border-main ' : 'border-gray-3 text-gray-3 border-gray-3'}`}
      >
        <p className="flex align-center justify-center w-[303px]">{text}</p>
      </button>
    );
  }
  return (
    <button
      type="button"
      className={`flex w-full justify-center self-center pt-5 pb-10 px-11 ${isSelect ? 'bg-main' : 'bg-unavailable'}`}
    >
      <p className="flex align-center justify-center w-[303px] text-white">
        {text}
      </p>
    </button>
  );
}
