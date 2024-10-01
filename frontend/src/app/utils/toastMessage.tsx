'use client';
// app/utils/toastMessage.tsx
import React, { useState, useEffect } from 'react';

interface ToastMessageProps {
  message: string;
  duration?: number;
}

// 기본 duration 설정: 3000ms (3초)
const DEFAULT_DURATION = 3000;

export const showToastMessage = (
  message: string,
  duration: number = DEFAULT_DURATION,
) => {
  const event = new CustomEvent('show-toast', {
    detail: { message, duration },
  });
  window.dispatchEvent(event);
};

export const ToastMessage: React.FC = () => {
  const [toastData, setToastData] = useState<{
    message: string;
    duration: number;
  } | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleShowToast = (event: CustomEvent) => {
      const { message, duration } = event.detail;
      setToastData({ message, duration });
      setVisible(true);

      // 지정된 시간이 지나면 Toast를 숨기도록 설정
      setTimeout(() => {
        setVisible(false);
      }, duration - 500); // 사라지는 애니메이션을 고려해서 시간을 줄임
    };

    window.addEventListener('show-toast', handleShowToast as EventListener);

    return () => {
      window.removeEventListener(
        'show-toast',
        handleShowToast as EventListener,
      );
    };
  }, []);

  if (!toastData) return null;

  return (
    <>
      <style jsx>{`
        .toast {
          min-width: 210px;
          position: fixed;
          top: 10%;
          left: 50%;
          transform: translateX(-50%);
          padding: 10px 20px;
          background-color: #333;
          color: #fff;
          border-radius: 5px;
          z-index: 1000;
          opacity: 0;
          transition: opacity 0.5s ease-in-out;
        }
        .toast.show {
          opacity: 1;
        }
        .toast.hide {
          opacity: 0;
        }
      `}</style>
      <div className={`toast ${visible ? 'show' : 'hide'}`}>
        {toastData.message}
      </div>
    </>
  );
};
