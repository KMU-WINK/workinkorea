import { BannerProps } from '@/types/type';

export default function Banner({
  type,
  title,
  description,
  backgroundImage,
  onClick,
}: BannerProps) {
  const commonStyle =
    'flex flex-col gap-5 rounded-xl px-6 py-8 min-h-[360px] relative overflow-hidden cursor-pointer';

  let typeStyle = '';

  switch (type) {
    case 'white-filter-on':
      typeStyle = 'bg-[#ffffff1a] text-white';
      break;
    case 'white-filter-off':
      typeStyle = 'text-white';
      break;
    case 'black-filter-on':
      typeStyle = 'bg-[#0000001a] text-black';
      break;
    case 'black-filter-off':
      typeStyle = 'text-black';
      break;
    default:
      break;
  }

  return (
    <div className={`${commonStyle} ${typeStyle}`} onClick={onClick}>
      {/* Background Image */}
      <div className="absolute inset-0 z-0">{backgroundImage}</div>

      {/* Content */}
      <div className="relative z-10">
        <p className="text-[24px] font-semibold">{title}</p>
        <p>{description}</p>
      </div>
    </div>
  );
}
