'use client';

import React from 'react';
import './styles.css';

export default function Modal({
  children,
  isOpen,
  onClose,
}: {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <div
      className={`${isOpen ? 'fixed z-50 inset-0 overflow-y-auto min-w-full min-h-screen' : 'hidden'}`}
    >
      <div
        className="fixed inset-0 bg-black bg-opacity-30"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }}
        onClick={onClose}
        role="button"
        tabIndex={0}
        onKeyDown={handleKeyDown}
        aria-label="Close modal" // 추가된 부분
      />
      <div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
        style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
      >
        {children}
      </div>
    </div>
  );
}
