import React from 'react';

export interface ButtonProps {
  text: string;
  isAllowed: boolean;
  onClick: () => void;
}

export default function Button({
  text,
  isAllowed,
  onClick = () => {},
}: ButtonProps) {
  return (
    <button
      disabled={!isAllowed}
      onClick={onClick}
      type="button"
      className={`flex fixed bottom-0 sm:max-w-sm w-full justify-center self-center pt-5 pb-10 px-11 ${isAllowed ? 'bg-main' : 'bg-unavailable cursor-default'}`}
    >
      <p className="flex align-center justify-center text-white">{text}</p>
    </button>
  );
}
