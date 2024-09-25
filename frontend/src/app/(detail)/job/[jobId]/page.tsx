'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import styled from 'styled-components';

import Heart from '../../../../../public/svgs/heart.svg';
import HeartColor from '../../../../../public/svgs/heart-color.svg';
import BackWhite from '../../../../../public/svgs/back-white.svg';
import { useRouter } from 'next/navigation';
import Button from '@/components/Button';
import { InfoRow } from '../../_components/InfoItem';
import {
  formatDateString,
  extractLinkOrValue,
  formatRecruitString,
} from '../../_utils/stringUtils';
import { formatSalary } from '../../../utils/stringUtils';
import { JobInfo } from '@/types/type';
import PublicAxiosInstance from '@/services/publicAxiosInstance';
import { getJobDetail } from '@/services/jobs';

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  @media screen and (max-width: 639px) {
    width: 100vw;
  }
`;

export default function Job() {
  const [selected, setSelected] = useState<boolean>(false);
  const [jobInfo, setJobInfo] = useState<JobInfo>({
    empmnTtl: '',
    dtyCn: '',
    salStle: '',
    wageAmt: '',
    eplmtStleN1: '',
    eplmtStleN2: '',
    labrTimeCn: '',
    ordtmEmpmnYn: '',
    rcptDdlnDe: '20000207',
    pvltrt: '',
    wrkpAdres: '',
    tursmEmpmnInfoURL: '',
    rcritPnum: '',
    corpoNm: '',
    corpoLogoFileUrl: '',
  });

  const router = useRouter();
  const [contentId, setContentId] = useState<string>('');
  const [contentTypeId, setContentTypeId] = useState<string>('');
  const [image, setImage] = useState<string>('');

  useEffect(() => {
    const pathParts = window.location.pathname.split('/');
    const contentId = pathParts.pop() || pathParts.pop() || '';
    setContentId(contentId);

    const queryString = window.location.search;
    const paramsArray = queryString.split('?');

    const contentTypeId = paramsArray[1].split('=')[1] || '';

    const thumbnailIndex =
      queryString.indexOf('thumbnail=') + 'thumbnail='.length;
    const thumbnail = queryString.substring(thumbnailIndex);
    setContentTypeId(contentTypeId);
    setImage(thumbnail);
  }, []);

  useEffect(() => {
    if (contentId && contentTypeId) {
      fetchData(contentId, contentTypeId);
    }
  }, [contentId, contentTypeId]);

  const fetchData = async (contentId: string, contentTypeId: string) => {
    try {
      const response = await getJobDetail(contentId, contentTypeId);
      const data = response.data;
      console.log('data : ', response);
      setJobInfo({
        empmnTtl: data.empmnTtl,
        dtyCn: data.dtyCn,
        salStle: data.salStle,
        wageAmt: data.wageAmt,
        eplmtStleN1: data.eplmtStleN1,
        eplmtStleN2: data.eplmtStleN2,
        labrTimeCn: data.labrTimeCn,
        ordtmEmpmnYn: data.ordtmEmpmnYn,
        rcptDdlnDe: data.rcptDdlnDe,
        pvltrt: data.pvltrt,
        wrkpAdres: data.wrkpAdres,
        tursmEmpmnInfoURL: data.tursmEmpmnInfoURL,
        rcritPnum: data.rcritPnum,
        corpoNm: data.corpoNm,
        corpoLogoFileUrl: data.corpoLogoFileUrl,
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
    }
  };

  const clickHeart = () => {
    setSelected(!selected);
    console.log('selected', selected);
    const data = {
      type: 'job',
      contentTypeId: contentTypeId,
      contentId: contentId,
    };
    console.log('data : ', data);
  };

  const backClick = () => {
    router.back();
  };

  const bottomClick = (link: string) => {
    const url = extractLinkOrValue(link);
    window.open(url, '_blank'); // 새 탭에서 링크 열기
  };

  return (
    <div className="flex flex-col justify-start items-center h-full w-screen bg-white text-black">
      <div
        className="flex flex-col justify-start items-center gap-3
        w-full bg-white sm:max-w-sm
        "
      >
        <ImageWrapper>
          <Image
            src={
              jobInfo.corpoLogoFileUrl || image || '/images/spot-default.svg' // corpoLogoFileUrl 가 있는 친구를
            }
            alt="Tour"
            layout="responsive"
            width="0"
            height="0"
          />
          <BackWhite
            className="absolute top-4 left-4 z-10 cursor-pointer"
            onClick={backClick}
          />
          <div className="absolute inset-0 h-1/4 bg-gradient-to-b from-[#00000080] to-transparent"></div>
        </ImageWrapper>
        <div className="w-full flex flex-col items-center gap-2 bg-gray-1 ">
          <div className="w-full flex flex-col gap-4 px-4 py-2 bg-white">
            <div className="w-full flex justify-between items-center">
              <span
                className="text-xl font-medium
              whitespace-pre-wrap break-keep
              max-w-[92%]"
              >
                {jobInfo.empmnTtl}
              </span>
              {selected ? (
                <HeartColor className="cursor-pointer" onClick={clickHeart} />
              ) : (
                <Heart className="cursor-pointer" onClick={clickHeart} />
              )}
            </div>
            <span className="max-w-[80%] text-sm whitespace-nowrap overflow-hidden text-ellipsis">
              {jobInfo.wrkpAdres}
            </span>
            <span className="text-xs">{jobInfo.corpoNm}</span>
            <div className="w-full flex flex-col gap-2 text-xs">
              {jobInfo.wrkpAdres && (
                <InfoRow>
                  <span>근무 위치</span>
                  <pre>{jobInfo.wrkpAdres}</pre>
                </InfoRow>
              )}
              {jobInfo.salStle && jobInfo.wageAmt && (
                <InfoRow>
                  <span>근로 수당</span>
                  <pre>
                    {formatSalary(jobInfo.salStle)}{' '}
                    {parseInt(jobInfo.wageAmt).toLocaleString('ko-KR')} 원
                  </pre>
                </InfoRow>
              )}
              {jobInfo.labrTimeCn && (
                <InfoRow>
                  <span>근무 시간</span>
                  <pre>주 {jobInfo.labrTimeCn} 시간</pre>
                </InfoRow>
              )}
              {(jobInfo.ordtmEmpmnYn || jobInfo.rcptDdlnDe) && (
                <InfoRow>
                  <span>모집 마감</span>
                  <pre>
                    {jobInfo.ordtmEmpmnYn
                      ? '상시 채용'
                      : formatDateString(jobInfo.rcptDdlnDe)}
                  </pre>
                </InfoRow>
              )}
            </div>
          </div>
          <div className="w-full flex flex-col gap-2 px-4 py-2 bg-white text-xs">
            <span className="font-bold text-sm">모집 조건</span>
            {(jobInfo.ordtmEmpmnYn || jobInfo.rcptDdlnDe) && (
              <InfoRow>
                <span>모집 마감</span>
                <pre>
                  {jobInfo.ordtmEmpmnYn
                    ? '상시 채용'
                    : formatDateString(jobInfo.rcptDdlnDe)}
                </pre>
              </InfoRow>
            )}
            {jobInfo.rcritPnum && (
              <InfoRow>
                <span>모집 인원</span>
                <pre>{formatRecruitString(jobInfo.rcritPnum)}</pre>
              </InfoRow>
            )}
            {jobInfo.pvltrt && (
              <InfoRow>
                <span>우대 사항</span>
                <pre>{jobInfo.pvltrt.trim()}</pre>
              </InfoRow>
            )}
          </div>
          <div className="w-full flex flex-col gap-2 px-4 py-2 bg-white text-xs">
            <span className="font-bold text-sm">근무 조건</span>
            {jobInfo.wrkpAdres && (
              <InfoRow>
                <span>근무 위치</span>
                <pre>{jobInfo.wrkpAdres}</pre>
              </InfoRow>
            )}
            {jobInfo.salStle && jobInfo.wageAmt && (
              <InfoRow>
                <span>근로 수당</span>
                <pre>
                  {jobInfo.salStle} {jobInfo.wageAmt}
                </pre>
              </InfoRow>
            )}
            {jobInfo.labrTimeCn && (
              <InfoRow>
                <span>근무 시간</span>
                <pre>주 {jobInfo.labrTimeCn} 시간</pre>
              </InfoRow>
            )}
            {(jobInfo.eplmtStleN1 || jobInfo.eplmtStleN2) && (
              <InfoRow>
                <span>고용 형태</span>
                <pre>
                  {jobInfo.eplmtStleN1} {jobInfo.eplmtStleN2}
                </pre>
              </InfoRow>
            )}
          </div>
          <div className="w-full flex flex-col gap-2 px-4 py-2 bg-white text-xs">
            <span className="font-bold">업무 내용</span>
            <pre className="whitespace-pre-wrap break-words">
              {jobInfo.dtyCn}
            </pre>
          </div>
        </div>
      </div>
      <div className="w-full fixed bottom-0 flex justify-center items-center sm:max-w-sm">
        <Button
          onClick={() => {
            bottomClick(jobInfo.tursmEmpmnInfoURL);
          }}
          isAllowed={!!jobInfo.tursmEmpmnInfoURL}
          text="상세 페이지로 이동"
        />
      </div>
    </div>
  );
}
