export const parseUrl = (url: string) => {
  const urlObj = new URL(url); // URL 객체 생성
  const pathParts = urlObj.pathname.split('/'); // 경로에서 'job, stay, tour' 추출
  const type = pathParts[1]; // 'job' 경로 추출

  const location = urlObj.searchParams.get('location'); // location 파라미터 추출
  const keyword = urlObj.searchParams.get('keyword'); // keyword 파라미터 추출

  return {
    type,
    location,
    keyword,
  };
};
