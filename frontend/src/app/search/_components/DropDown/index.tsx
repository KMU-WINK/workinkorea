import { useState } from 'react';
import Character from '../../../../../public/svgs/character.svg';
import Dropdown from '../../../../../public/svgs/dropdown.svg';
import Map from '../../../../../public/svgs/map.svg';

interface DropDownProps {
  options: string[];
  selectedOption: string;
  setSelectedOption: (option: string) => void;
  type: 'category' | 'location'; // 드롭다운 타입: 카테고리 or 지역
}

export default function DropDown({
  options,
  selectedOption,
  setSelectedOption,
  type,
}: DropDownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleDropdownClick = () => {
    setIsOpen(!isOpen);
  };

  const getIcon = () => {
    if (type === 'category') {
      return <Character className="mr-1" />;
    }
    return <Map className="mr-2" />;
  };

  const getLabel = () => {
    return type === 'category' ? '카테고리' : '지역';
  };

  return (
    <div
      className="relative flex items-center py-2 cursor-pointer min-w-44"
      onClick={handleDropdownClick}
    >
      {getIcon()}
      <span>{selectedOption}</span>
      <div className={`mx-2 transform ${isOpen ? 'rotate-180' : ''}`}>
        <Dropdown />
      </div>
      {isOpen && (
        <ul className="absolute top-full left-0 pt-1 w-32 bg-white shadow-lg z-10">
          {options.map(option => (
            <li
              key={option}
              onClick={() => {
                setSelectedOption(option);
                setIsOpen(false);
              }}
              className="px-4 py-2 hover:bg-gray-1 cursor-pointer"
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
