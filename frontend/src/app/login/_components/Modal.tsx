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
    <div className={`modal ${isOpen ? '' : 'hidden'}`}>
      <div
        className="modal-overlay"
        onClick={onClose}
        role="button"
        tabIndex={0}
        onKeyDown={handleKeyDown}
        aria-label="Close modal" // 추가된 부분
      />
      <div className="modal-content">{children}</div>
    </div>
  );
}
