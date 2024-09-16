export type CardType = 'default' | 'map';
export type ServiceType = 'default' | 'work';
export interface CardProps {
  id: number;
  cardType: CardType;
  serviceType: ServiceType;
  title: string;
  location: string;
  image: string;
  price?: number;
  onCardClick: React.MouseEventHandler<HTMLDivElement>;
  onWishListClick: (id: number) => void;
  inWishlist?: boolean;
  company?: string;
  contenttypeid?: string;
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
  contentid: number;
  firstimage: string;
  firstimage2: string;
  addr1: string;
  addr2: string;
}
// job 같은 경우에는 아직 안나와서 추후에 추가 예정

export interface UserDetail {
  user: {
    social: 'kakao' | 'naver' | 'google';
    nickname: string | null;
    gender: '남성' | '여성' | null;
    id: number;
    social_id: string;
    birth: string | null;
  };
  regions: string[] | null;
  interests: string[] | null;
  works: string[] | null;
}

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
  packing?: string; // 39 :s 포장 가능
}
