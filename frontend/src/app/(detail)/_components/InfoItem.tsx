import { SpotExtraInfo } from '@/types/type';
import React from 'react';
import styled from 'styled-components';
import { processTimeString } from '@/app/(detail)/_utils/stringUtils';

const InfoItem = styled.div`
  width: 100%;
  padding: 8px 16px;
  background-color: white;
`;

const RowWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-size: 0.75rem;
`;

export const InfoRow = styled.div`
  width: 100%;
  display: flex;
  gap: 16px;
  overflow-x: hidden;
  > span {
    min-width: 48px;
    font-weight: bold;
  }
  > pre {
    white-space: pre-wrap;
    word-break: keep-all;
  }
`;

export function InfoRowType12({ extraInfo }: { extraInfo: SpotExtraInfo }) {
  return (
    <InfoItem>
      <RowWrapper>
        <InfoRow>
          <span>주차시설</span>
          <pre>{processTimeString(extraInfo.parking || '')}</pre>
        </InfoRow>
        <InfoRow>
          <span>체험안내</span>
          <pre>{processTimeString(extraInfo.expGuide || '')}</pre>
        </InfoRow>
      </RowWrapper>
    </InfoItem>
  );
}

export function InfoRowType14({ extraInfo }: { extraInfo: SpotExtraInfo }) {
  return (
    <InfoItem>
      <RowWrapper>
        <InfoRow>
          <span>주차시설</span>
          <pre>{processTimeString(extraInfo.parking || '')}</pre>
        </InfoRow>
        <InfoRow>
          <span>이용요금</span>
          <pre>{processTimeString(extraInfo.useFee || '')}</pre>
        </InfoRow>
        <InfoRow>
          <span>행사기간</span>
          <pre>{extraInfo.eventPeriod}</pre>
        </InfoRow>
      </RowWrapper>
    </InfoItem>
  );
}

export function InfoRowType28({ extraInfo }: { extraInfo: SpotExtraInfo }) {
  return (
    <InfoItem>
      <RowWrapper>
        <InfoRow>
          <span>주차시설</span>
          <pre>{processTimeString(extraInfo.parking || '')}</pre>
        </InfoRow>
        <InfoRow>
          <span>입장료</span>
          <pre>{processTimeString(extraInfo.useFee || '')}</pre>
        </InfoRow>
      </RowWrapper>
    </InfoItem>
  );
}

export function InfoRowType32({ extraInfo }: { extraInfo: SpotExtraInfo }) {
  return (
    <InfoItem>
      <RowWrapper>
        <InfoRow>
          <span>주차시설</span>
          <pre>{processTimeString(extraInfo.parking || '')}</pre>
        </InfoRow>
      </RowWrapper>
    </InfoItem>
  );
}

export function InfoRowType38({ extraInfo }: { extraInfo: SpotExtraInfo }) {
  return (
    <InfoItem>
      <RowWrapper>
        <InfoRow>
          <span>주차시설</span>
          <pre>{processTimeString(extraInfo.parking || '')}</pre>
        </InfoRow>
      </RowWrapper>
    </InfoItem>
  );
}

export function InfoRowType39({ extraInfo }: { extraInfo: SpotExtraInfo }) {
  return (
    <InfoItem>
      <RowWrapper>
        <InfoRow>
          <span>대표메뉴</span>
          <pre>{processTimeString(extraInfo.firstMenu || '')}</pre>
        </InfoRow>
        <InfoRow>
          <span>포장가능</span>
          <pre>{processTimeString(extraInfo.packing || '')}</pre>
        </InfoRow>
      </RowWrapper>
    </InfoItem>
  );
}
