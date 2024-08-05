interface BannerProps {
  type:
    | 'white-filter-on'
    | 'white-filter-off'
    | 'black-filter-on'
    | 'black-filter-off';
  title: string;
  description: string;
}

export default function Banner({ type, title, description }: BannerProps) {
  const commonStyle = 'flex flex-col gap-5 rounded-xl px-6 py-8 min-h-[360px]';

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
    <div className={`${commonStyle} ${typeStyle}`}>
      {/* 24px -> xxl 로 수정 예정 */}
      <p className="text-[24px] font-semibold">{title}</p>
      <p>{description}</p>
    </div>
  );
}
