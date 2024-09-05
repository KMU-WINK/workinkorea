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

export interface FeedProps {
  contentid: number;
  cardType: CardType;
  serviceType: ServiceType;
  title: string;
  firstimage: string;
  firstimage2: string;
  addr1: string;
  addr2: string;
  image: string;
  inWishlist: boolean;
  location: string;
  mapx?: number;
  mapy?: number;
}
// job 같은 경우에는 아직 안나와서 추후에 추가 예정
