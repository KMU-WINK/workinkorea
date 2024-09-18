export type CardType = 'default' | 'map';
export type ServiceType = 'default' | 'work';

export interface CardProps {
  id: string;
  cardType: CardType;
  serviceType: ServiceType;
  title: string;
  location: string;
  image: string;
  price?: number;
  onCardClick: React.MouseEventHandler<HTMLDivElement>;
  onWishListClick: (id: string) => void;
  inWishlist?: boolean;
  company?: string;
  contenttypeid?: string;
  workType?: string;
}

export interface BannerProps {
  type:
    | 'white-filter-on'
    | 'white-filter-off'
    | 'black-filter-on'
    | 'black-filter-off';
  title: string;
  description: string;
  backgroundImage: React.ReactNode;
}

export interface FeedProps extends CardProps {
  contentid: string;
  firstimage: string;
  firstimage2: string;
  addr1: string;
  addr2: string;
}
// job 같은 경우에는 아직 안나와서 추후에 추가 예정

export interface SpotInfo {
  title: string;
  homepage: string;
  address: string;
  image: string;
  number: string;
  telName?: string;
  overview: string;
  link: string;
  time?: string;
  restDate: string;
  inTime?: string;
  outTime?: string;
}

export interface SpotExtraInfo {
  parking?: string; // 12, 14, 28, 32, 38
  expGuide?: string; // 12 : 체험 안내
  useFee?: string; // 14 : usefee - 이용 요금 / 28 : usefeeleports - 이장료
  eventPeriod?: string; // 14 : eventstartdate ~ eventenddate
  openDateShopping?: string; // 38 : 개장일
  firstMenu?: string; // 39 : 대표 메뉴
  packing?: string; // 39 : 포장 가능
}

export interface JobInfo extends CardProps {
  contentTypeId: string;
  contentId: string;
  cardType: CardType;
  serviceType: ServiceType;
  corpoNm: string;
  corpoLogoFileUrl?: string;
  empmnTtl?: string;
  wrkpAdres?: string;
  wageAmt?: string;
  salStle?: string;
}

// {
//   "contentTypeId": "tour",
//   "contentId": "ilsang111_5",
//   "corpoNm": "디오션리조트",
//   "corpoLogoFileUrl": "https://academy.visitkorea.or.kr/cmm/fms/FileDown.do?atchFileId=20230804172422701393&fileSn=0",
//   "empmnTtl": "디오션 호텔 프런트 신규 및 경력직 채용",
//   "wrkpAdres": "전라남도 여수시 소호로 295 (소호동)",
//   "wageAmt": "26000000"
// }
