'use client';

import ExceptionPageTemplate from '@/components/ExceptionPage/page-template';
import React from 'react';

interface Props {
  error: Error;
}

// 에러 페이지도 임의로 추가해두었습니다. 해당 부분 때문에 원하는 동작이 이루어지지 않는다면 주석 처리해주세요.
const ErrorPage = ({ error }: Props) => {
  <ExceptionPageTemplate
    alertText={`예기치 못한 오류가 발생하였습니다.\n${error.message}`}
  />;
};

export default ErrorPage;
