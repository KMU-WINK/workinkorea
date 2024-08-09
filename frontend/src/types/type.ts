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
