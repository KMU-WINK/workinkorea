import React from 'react';

interface InputProps {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onChange?: (value: string) => void;
  placeholder?: string;
}

export default function Input({
  leftIcon,
  rightIcon,
  onChange,
  placeholder = '검색어',
}: InputProps) {
  return (
    <div className="flex gap-2.5 w-[345px] bg-white border border-gray-2 rounded-[10px] px-3.5 py-[18px]">
      {leftIcon}
      <input
        type="text"
        placeholder={placeholder}
        onChange={e => onChange && onChange(e.target.value)}
        className="outline-none flex-1"
      />
      {rightIcon}
    </div>
  );
}
