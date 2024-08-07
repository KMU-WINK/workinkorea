'use client';

import React from 'react';

export default function Modal({
  children,
  isOpen,
  onClose,
  handleKeyDown,
}: {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLDivElement>) => void;
}) {
  return (
    <div
      className={`${isOpen ? 'fixed z-50 inset-0 overflow-y-auto min-w-full min-h-screen' : 'hidden'}`}
      role="dialog"
      tabIndex={-1}
      aria-modal="true"
    >
      <div
        className="fixed inset-0 bg-[#000000] bg-opacity-30"
        onClick={onClose}
        role="button"
        aria-label="Close modal"
        onKeyDown={handleKeyDown}
        tabIndex={0}
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
        {children}
      </div>
    </div>
  );
}
