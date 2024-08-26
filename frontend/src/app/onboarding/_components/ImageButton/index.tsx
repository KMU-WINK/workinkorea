import React from 'react';
import HeartOutline from '../../../../../public/svgs/heart.svg';
import HeartFilled from '../../../../../public/svgs/heart-color.svg';

export interface ImageButtonProps {
  image: React.ReactNode;
  locationName: string;
  isSelected?: boolean;
  onToggleSelect: () => void;
}

export default function ImageButton({
  image,
  locationName,
  isSelected = false,
  onToggleSelect,
}: ImageButtonProps) {
  return (
    <div
      className={`h-32 relative rounded-xl cursor-pointer overflow-hidden ${
        isSelected ? 'border-2 border-main' : 'border border-gray-200'
      }`}
      onClick={onToggleSelect}
    >
      <div className="w-full h-full">{image}</div>
      <div className="absolute top-2 right-2">
        <div className="text-red-500">
          {isSelected ? (
            <HeartFilled className="w-6 h-6" />
          ) : (
            <HeartOutline className="w-6 h-6" />
          )}
        </div>
      </div>
      <div className="absolute inset-0 flex items-center justify-center text-white text-lg font-medium">
        {locationName}
      </div>
    </div>
  );
}
