import Back from '../../../public/svgs/back.svg';

interface ContentProps {
  text: string;
  onClick: () => void;
  hasBorder?: boolean;
}

export default function Content({ text, onClick, hasBorder }: ContentProps) {
  return (
    <div onClick={onClick} className="cursor-pointer">
      <div className="flex justify-between py-[18px] px-[14px]">
        <p>{text}</p>
        <div className="rotate-180">
          <Back />
        </div>
      </div>
      {hasBorder && <hr className="mt-1" />}
    </div>
  );
}
