'use client';

import React from 'react';

export default function Modal({
  children,
  isOpen,
  onClose,
}: {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <div
      className={`${isOpen ? 'fixed z-50 inset-0 overflow-y-auto min-w-full min-h-screen' : 'hidden'}`}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="fixed inset-0 bg-[#000000] bg-opacity-30"
        onClick={onClose}
        role="button"
        aria-label="Close modal"
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
        {children}
      </div>
    </div>
  );
}
