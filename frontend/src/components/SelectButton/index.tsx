import React from 'react';

export interface SelectButtonProps {
  text: string;
  isSelect: boolean;
  onClick: () => void;
}

export default function SelectButton({
  text,
  isSelect,
  onClick = () => {},
}: SelectButtonProps) {
  return (
    <button
      onClick={onClick}
      type="button"
      className={`flex rounded-xl w-full justify-center self-center border-[1px] px-4.5 py-3.5 ${isSelect ? 'bg-secondary text-main border-main ' : 'bg-white border-gray-3 text-gray-3 border-gray-3'}`}
    >
      <p className="flex align-center justify-center w-72">{text}</p>
    </button>
  );
}
