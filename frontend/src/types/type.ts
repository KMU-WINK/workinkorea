export type CardType = 'default' | 'map';
export type ServiceType = 'default' | 'work';

export interface CardProps {
  cardType: CardType;
  serviceType: ServiceType;
  title: string;
  location: string;
  image: string;
  price: number;
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
