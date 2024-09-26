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
  inWishlist: boolean;
  location: string;
  mapx?: number;
  mapy?: number;
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

export interface JobProps extends CardProps {
  contentTypeId: string;
  contentid: string;
  cardType: CardType;
  serviceType: ServiceType;
  corpoNm: string;
  corpoLogoFileUrl?: string;
  empmnTtl?: string;
  wrkpAdres?: string;
  wageAmt?: string;
  salStle?: string;
}

export interface JobInfo {
  empmnTtl: string; // 채용정보 글 제목 -> tour / open
  dtyCn: string; // 직무 내용 -> tour / open
  salStle: string; // 급여형태코드 -> tour / open
  wageAmt: string; // 임금금액 -> tour / open
  eplmtStleN1: string; // 고용형태 1코드 -> tour / open
  eplmtStleN2: string; // 고용형태 2코드 -> tour / open
  labrTimeCn: string; // 근로시간내용 -> tour / open
  ordtmEmpmnYn: string; // 상시채용여부 -> tour / open
  rcptDdlnDe: string; // 접수마감일 -> tour / open
  pvltrt: string; // 우대조건 -> tour / open
  wrkpAdres: string; // 근무지주소 -> tour / open
  tursmEmpmnInfoURL: string; // 페이지 URL -> tour / open
  rcritPnum?: string; // 모집인원수 -> tour
  corpoNm?: string; // 기업명 -> open
  corpoLogoFileUrl?: string; // 기업로고파일 URL -> open
}

export interface WishItem {
  // api post, delete 시 사용되는 데이터
  contentId: string;
  contentTypeId: string;
  type: string;
}

export interface WishRes extends WishItem {
  // api get 호출 시 담기는 데이터
  contentid: string;
}

export interface MapListInfo {
  contentid: string;
  title: string;
  addr1: string;
  firstImage: string;
  mapx: string;
  mapy: string;
}

export interface GetSpotListsProps {
  mapX: string;
  mapY: string;
  keyword: string | null;
  radius?: number;
  numOfRows?: number;
}
