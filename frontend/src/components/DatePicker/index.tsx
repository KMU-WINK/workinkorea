'use client';

import React, { useRef } from 'react';
import CalendarIcon from 'public/svgs/calender.svg';

interface InputProps {
  state: string | undefined;
  setState: React.Dispatch<string>;
  placeholder?: string;
  disabled?: boolean;
  readOnly?: boolean;
}

export default function DatePicker({
  state,
  setState,
  placeholder = 'YYYY-MM-DD',
  disabled = false,
  readOnly = false,
}: InputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div
      className={`flex gap-2.5 w-full border border-gray-2 rounded-[10px] px-3.5 py-[18px] ${disabled ? 'bg-[#F5F5F5] cursor-pointer' : 'bg-white cursor-default'}`}
      onClick={() => {
        inputRef.current?.showPicker();
      }}
    >
      <input
        type="date"
        placeholder={placeholder}
        ref={inputRef}
        value={state}
        className={`hide-calendar text-black bg-transparent outline-none flex-1 placeholder-gray-4 ${disabled && 'cursor-pointer'}`}
        readOnly={disabled || readOnly}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          const date = new Date(e.target.value);
          const formattedDate = date.toISOString().split('T')[0]; // YYYY-MM-DD 형식으로 변환, 서버에서 받는 규격과 통일
          setState(formattedDate);
        }}
      />
      <CalendarIcon />
    </div>
  );
}
