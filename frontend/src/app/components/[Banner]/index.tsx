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

  let typeClass = '';

  switch (type) {
    case 'white-filter-on':
      typeClass = 'bg-[#ffffff1a] text-[#ffffff]';
      break;
    case 'white-filter-off':
      typeClass = 'text-white';
      break;
    case 'black-filter-on':
      typeClass = 'bg-[#0000001a] text-[#000000]';
      break;
    case 'black-filter-off':
      typeClass = 'text-[#000000]';
      break;
    default:
      break;
  }

  return (
    <div className={`${commonStyle} ${typeClass}`}>
      {/* 24px -> xxl 로 수정 예정 */}
      <div className="text-[24px] font-semibold">{title}</div>
      <div>{description}</div>
    </div>
  );
}
