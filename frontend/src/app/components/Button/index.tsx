import React from 'react';

export interface ButtonProps {
  text: string;
  isSelect: boolean;
  onClick: () => void;
}

export default function Button({
  text,
  isSelect,
  onClick = () => {},
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      type="button"
      className={`flex w-full justify-center self-center pt-5 pb-10 px-11 ${isSelect ? 'bg-main' : 'bg-unavailable'}`}
    >
      <p className="flex align-center justify-center w-[303px] text-white">
        {text}
      </p>
    </button>
  );
}
