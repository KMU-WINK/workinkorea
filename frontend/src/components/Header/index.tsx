import Back from '../../../public/svgs/back.svg';

interface HeaderProps {
  onLeftClick?: () => void;
  text?: string;
  rightText?: string;
  onRightClick?: () => void;
}
export default function Header({
  onLeftClick,
  text,
  rightText,
  onRightClick,
}: HeaderProps) {
  return (
    <div className="flex justify-between px-6 py-[18px] items-center">
      {onLeftClick && (
        <div onClick={onLeftClick} className="cursor-pointer">
          <Back />
        </div>
      )}
      <p>{text}</p>
      <p
        className={`font-semibold ${rightText && 'cursor-pointer'}`}
        onClick={onRightClick}
      >
        {rightText}
      </p>
    </div>
  );
}
