import React from 'react';

export interface SelectButtonProps {
  text: string;
  isSelect: boolean;
  onClick: () => void;
  leftIcon?: React.ReactNode;
}

export default function SelectButton({
  text,
  isSelect,
  onClick = () => {},
  leftIcon,
}: SelectButtonProps) {
  return (
    <button
      onClick={onClick}
      type="button"
      className={`flex items-center rounded-xl w-full justify-start self-center border-[1px] px-4 py-3.5 ${
        isSelect
          ? 'bg-secondary border-main text-main '
          : 'bg-white border-gray-3 text-gray-4'
      }`}
    >
      {leftIcon && <div className="flex-shrink-0">{leftIcon}</div>}
      <p className="flex-grow text-center ">{text}</p>
      {leftIcon && (
        <div className="flex-shrink-0" style={{ visibility: 'hidden' }}>
          {leftIcon}
        </div>
      )}
    </button>
  );
}
