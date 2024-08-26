import React from 'react';

interface ButtonProps {
  leftIcon?: React.ReactNode;
  text: string;
  isSelect: boolean;
  onClick: () => void;
}

export default function Button({
  leftIcon,
  text,
  isSelect,
  onClick,
}: ButtonProps) {
  return (
    <button
      type="button"
      className={`w-full h-14 flex items-center justify-center border-[1px] rounded-lg ${
        isSelect
          ? 'bg-white text-black border-black'
          : 'bg-secondary text-main border-main'
      }`}
      onClick={onClick}
    >
      {leftIcon}
      {text}
    </button>
  );
}
