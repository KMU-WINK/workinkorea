export const formatString = (str: string) => {
  return str
    .replace(/<br\s*\/?>/g, '\n') // <br> 태그를 줄바꿈으로 대체
    .trim();
};

export const extractLinkOrValue = (str: string): string => {
  const regex = /<a\s+(?:[^>]*?\s+)?href="([^"]*)"/;
  const match = str.match(regex);
  return match ? match[1] : str;
};

export const formatDateString = (dateString: string): string => {
  if (dateString.length !== 8) {
    return dateString;
  }

  const year = dateString.substring(0, 4);
  const month = dateString.substring(4, 6);
  const day = dateString.substring(6, 8);

  return `${year}.${month}.${day}`;
};

export const formatRecruitString = (recruitString: string): string => {
  return recruitString === '0' ? '00명(인원미정)' : `${recruitString} 명`;
};

export const formatSalary = (salaryType: string): string => {
  return salaryType === '연봉'
    ? '연'
    : salaryType === '월급'
      ? '월'
      : salaryType;
};
