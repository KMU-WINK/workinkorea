'use client';

import Image from 'next/image';
import priceToString from '@/utils/priceToString';
import styled from 'styled-components';
import Example from '../../../public/images/company-example.png';
import Wish from '../../../public/svgs/heart.svg';

type CardType = 'default' | 'map';
type ServiceType = 'default' | 'work';

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

const Container = styled.div<{ cardType: CardType }>`
  display: flex;
  flex-direction: ${props => (props.cardType === 'map' ? 'row' : 'column')};
  background-color: white;
  border: 1px solid #d9d9d9;
  border-radius: 10px;
  cursor: pointer;
  height: ${props => (props.cardType === 'map' ? '145px' : '237px')};
  overflow: hidden;
`;

const ImageSection = styled.div<{
  cardType: CardType;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${props => (props.cardType === 'map' ? '9rem' : '100%')};
  border-color: #d9d9d9;
  border-width: ${props =>
    props.cardType === 'map' ? '0 1px 0 0' : '0 0 1px 0'};
  position: relative;
  flex: ${props => (props.cardType === 'map' ? '' : '1')};
`;

const Content = styled.div<{ cardType: CardType }>`
  padding: 1rem 0.875rem;
  display: flex;
  flex-direction: column;
  flex: ${props => (props.cardType === 'map' ? '1' : '')};
  justify-content: ${props =>
    props.cardType === 'map' ? 'space-between' : 'flex-start'};
  gap: ${props => (props.cardType === 'map' ? '0' : '12px')};
`;

const DetailContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 0.25rem;
`;

const Detail = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  gap: 0.5rem;
`;

const Title = styled.p<{ cardType: CardType }>`
  font-weight: 600;
  font-size: ${props => (props.cardType === 'map' ? '0.875rem' : '1rem')};
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: ${props => (props.cardType === 'map' ? '2' : '1')};
  overflow: hidden;
  text-overflow: ellipsis;
`;

const InfoContainer = styled.div<{
  cardType: CardType;
  serviceType: ServiceType;
}>`
  display: flex;
  flex-direction: ${props =>
    props.cardType === 'map' ? 'column-reverse' : 'row'};
  gap: ${props =>
    props.cardType === 'default' && props.serviceType === 'default'
      ? '0'
      : '9px'};
`;

const BottomContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Price = styled.p<{ cardType: CardType }>`
  font-size: ${props => (props.cardType === 'map' ? '0.875rem' : '0.75rem')};
  font-weight: ${props => (props.cardType === 'map' ? '500' : '400')};
`;

const Location = styled.p<{ cardType: CardType }>`
  font-size: ${props => (props.cardType === 'map' ? '0.625rem' : '0.75rem')};
`;

export default function Card({
  cardType,
  serviceType,
  title,
  location,
  image,
  price,
  inWishlist,
  company,
}: CardProps) {
  return (
    <Container cardType={cardType}>
      <ImageSection cardType={cardType}>
        <Image
          src={Example}
          alt="example"
          fill={serviceType === 'default'}
          style={
            serviceType === 'default'
              ? { objectFit: 'cover' }
              : { width: 80, height: 80 }
          }
        />
      </ImageSection>
      <Content cardType={cardType}>
        <DetailContainer>
          <Detail>
            {cardType === 'default' && serviceType === 'work' && company && (
              <p className="text-xs">{company}</p>
            )}
            <Title cardType={cardType}>{title}</Title>
          </Detail>
          {cardType === 'default' && (
            <div>
              <Wish />
            </div>
          )}
        </DetailContainer>
        <InfoContainer cardType={cardType} serviceType={serviceType}>
          <BottomContainer>
            {serviceType === 'work' && company && (
              <Price cardType={cardType}>시급 {priceToString(price)}원</Price>
            )}
            {serviceType === 'default' && cardType === 'map' && (
              <Price cardType={cardType}>{priceToString(price)}원~</Price>
            )}
            {cardType === 'map' && (
              <div>
                <Wish />
              </div>
            )}
          </BottomContainer>
          <Location cardType={cardType}>{location}</Location>
        </InfoContainer>
      </Content>
    </Container>
  );
}
