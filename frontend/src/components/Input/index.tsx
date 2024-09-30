'use client';

import React, { useRef } from 'react';

interface InputProps {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  readOnly?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick?: () => void;
}

export default function Input({
  leftIcon,
  rightIcon,
  onChange,
  onClick,
  value,
  placeholder = '검색어',
  disabled = false,
  readOnly = false,
}: InputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div
      className={`flex gap-2.5 w-full border border-gray-2 rounded-[10px] px-3.5 py-[18px] ${disabled ? 'bg-[#F5F5F5] cursor-pointer' : 'bg-white cursor-default'}`}
      onClick={() => inputRef.current?.focus()}
      onKeyDown={disabled ? onClick : undefined}
      role="button"
      tabIndex={0}
    >
      <div onClick={onClick} className="z-10">
        {leftIcon}
      </div>
      <input
        type="text"
        placeholder={placeholder}
        ref={inputRef}
        value={value}
        className={`text-black bg-transparent outline-none flex-1 placeholder-gray-4 ${disabled && 'cursor-pointer'}`}
        readOnly={disabled || readOnly}
        onChange={onChange}
      />
      {rightIcon}
    </div>
  );
}
