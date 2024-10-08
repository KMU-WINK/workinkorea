'use client';

import Image from 'next/image';
import styled from 'styled-components';
import { CardProps, CardType, ServiceType } from '@/types/type';
import Heart from 'public/svgs/heart.svg';
import ColorHeart from 'public/svgs/heart-color.svg';

const Container = styled.div<{ $cardType: CardType }>`
  display: flex;
  flex-direction: ${props => (props.$cardType === 'map' ? 'row' : 'column')};
  background-color: white;
  border: 1px solid #d9d9d9;
  border-radius: 10px;
  cursor: pointer;
  width: 100%;
  height: ${props => (props.$cardType === 'map' ? '145px' : '237px')};
  overflow: hidden;
`;

const ImageSection = styled.div<{
  $cardType: CardType;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: ${props => (props.$cardType === 'map' ? '9rem' : '100%')};
  border-color: #d9d9d9;
  border-width: ${props =>
    props.$cardType === 'map' ? '0 1px 0 0' : '0 0 1px 0'};
  position: relative;
  flex: ${props => (props.$cardType === 'map' ? '' : '1')};
`;

const Content = styled.div<{ $cardType: CardType }>`
  padding: 1rem 0.875rem;
  display: flex;
  flex-direction: column;
  flex: ${props => (props.$cardType === 'map' ? '1' : '')};
  justify-content: ${props =>
    props.$cardType === 'map' ? 'space-between' : 'flex-start'};
  gap: ${props => (props.$cardType === 'map' ? '0' : '0.75rem')};
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

const Title = styled.p<{ $cardType: CardType }>`
  font-weight: 600;
  font-size: ${props => (props.$cardType === 'map' ? '0.875rem' : '1rem')};
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: ${props => (props.$cardType === 'map' ? '2' : '1')};
  overflow: hidden;
  text-overflow: ellipsis;
`;

const InfoContainer = styled.div<{
  $cardType: CardType;
  $serviceType: ServiceType;
}>`
  display: flex;
  flex-direction: ${props =>
    props.$cardType === 'map' ? 'column-reverse' : 'row'};
  gap: ${props =>
    props.$cardType === 'default' && props.$serviceType === 'default'
      ? '0'
      : '9px'};
`;

const BottomContainer = styled.div<{
  $serviceType: string;
  $price: number;
  $company: string;
}>`
  display: ${props =>
    props.$serviceType === 'work' && props.$company && !props.$price
      ? 'none'
      : 'flex'};
  justify-content: space-between;
`;

const Price = styled.pre<{ $cardType: CardType }>`
  font-size: ${props => (props.$cardType === 'map' ? '0.875rem' : '0.75rem')};
  font-weight: ${props => (props.$cardType === 'map' ? '500' : '400')};
`;

const Location = styled.p<{ $cardType: CardType }>`
  font-size: ${props => (props.$cardType === 'map' ? '0.625rem' : '0.75rem')};
  word-break: keep-all;
  white-space: nowrap; /* 한 줄로 처리 */
  overflow: hidden; /* 넘치는 텍스트는 숨김 */
  text-overflow: ellipsis; /* 넘치는 부분을 ...으로 처리 */
`;

const WishButton = styled.button`
  display: flex;
  align-items: flex-start;
  z-index: 10;
`;

export default function Card({
  id,
  cardType,
  serviceType,
  title,
  location,
  image,
  price,
  onCardClick,
  onWishListClick,
  inWishlist = false,
  company = '',
  workType,
}: CardProps) {
  return (
    <Container $cardType={cardType} onClick={onCardClick}>
      <ImageSection $cardType={cardType}>
        <Image
          src={image}
          alt="example"
          fill={serviceType === 'default'}
          style={
            serviceType === 'default'
              ? { objectFit: 'cover' }
              : { width: 80, height: 80, objectFit: 'cover' }
          }
          width={serviceType === 'default' ? 0 : 80}
          height={serviceType === 'default' ? 0 : 80}
          unoptimized
        />
      </ImageSection>
      <Content $cardType={cardType}>
        <DetailContainer>
          <Detail>
            {cardType === 'default' && serviceType === 'work' && company && (
              <p className="text-xs">{company}</p>
            )}
            <Title $cardType={cardType}>{title}</Title>
          </Detail>
          {cardType === 'default' && (
            <WishButton
              type="button"
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                e.stopPropagation(); // 이벤트 버블링 현상을 방지
                onWishListClick(id);
              }}
            >
              {inWishlist ? <ColorHeart /> : <Heart />}
            </WishButton>
          )}
        </DetailContainer>
        <InfoContainer $cardType={cardType} $serviceType={serviceType}>
          <BottomContainer
            $serviceType={serviceType}
            $price={price || 0}
            $company={company}
          >
            {serviceType === 'work' && company && (
              <>
                <Price $cardType={cardType}>
                  {workType} {Number(price)?.toLocaleString('ko-KR')}원
                </Price>
              </>
            )}
          </BottomContainer>
          <Location $cardType={cardType}>{location}</Location>
        </InfoContainer>
      </Content>
    </Container>
  );
}
