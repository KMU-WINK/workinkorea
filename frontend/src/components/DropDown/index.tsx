import { ReactNode, useEffect, useRef, useState } from 'react';
import Dropdown from 'public/svgs/dropdown.svg';

interface DropDownProps {
  options: string[];
  selectedOption: string;
  setSelectedOption: (option: string) => void;
  icon?: ReactNode;
}

export default function DropDown({
  options,
  selectedOption,
  setSelectedOption,
  icon,
}: DropDownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropDownRef = useRef<HTMLDivElement>(null);

  const handleDropdownClick = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        dropDownRef.current &&
        !dropDownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    } else {
      document.removeEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen]);

  return (
    <div
      className="relative flex items-center py-2 cursor-pointer"
      onClick={handleDropdownClick}
      ref={dropDownRef} // ref 설정
    >
      <div className="mr-2">{icon}</div>
      <span>{selectedOption}</span>
      <div className={`ml-2 transform  ${isOpen ? 'rotate-180' : ''}`}>
        <Dropdown />
      </div>
      {isOpen && (
        <ul className="absolute top-full left-0 pt-1 bg-white shadow-lg z-10">
          {options.map(option => (
            <li
              key={option}
              onClick={() => {
                setSelectedOption(option);
                setIsOpen(false);
              }}
              className="px-5 py-2 hover:bg-gray-1 cursor-pointer whitespace-nowrap"
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
