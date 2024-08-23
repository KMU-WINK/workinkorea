import React from 'react';

interface InputProps {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  placeholder?: string;
  disabled?: boolean;
  onChange?: (value: string) => void;
  onClick?: () => void;
}

export default function Input({
  leftIcon,
  rightIcon,
  onChange,
  onClick,
  placeholder = '검색어',
  disabled = false,
}: InputProps) {
  return (
    <div
      className={`flex gap-2.5 w-full border border-gray-2 rounded-[10px] px-3.5 py-[18px] ${disabled ? 'bg-gray-2' : 'bg-white'}`}
      onClick={disabled ? onClick : undefined}
      onKeyDown={disabled ? onClick : undefined}
      role="button"
      tabIndex={0}
    >
      {leftIcon}
      <input
        className="bg-transparent outline-none flex-1 placeholder-gray-4"
        type="text"
        readOnly={disabled}
        placeholder={placeholder}
        onChange={e => onChange && onChange(e.target.value)}
      />
      {rightIcon}
    </div>
  );
}
