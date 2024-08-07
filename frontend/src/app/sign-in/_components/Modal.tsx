'use client';

import React, { useEffect, useRef } from 'react';

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
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && modalRef.current) {
      modalRef.current.focus();
    }
  }, [isOpen]);

  return (
    <div
      className={`${isOpen ? 'fixed z-50 inset-0 overflow-y-auto min-w-full min-h-screen' : 'hidden'}`}
      aria-modal="true"
      ref={modalRef}
      tabIndex={-1}
    >
      <div
        className="fixed inset-0 bg-[#000000] bg-opacity-30"
        onClick={onClose}
        role="button"
        aria-label="Close modal"
        tabIndex={0}
        onKeyDown={handleKeyDown}
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
        {children}
      </div>
    </div>
  );
}
