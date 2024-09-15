export const processTimeString = (str: string) => {
  return str
    .replace(/<br\s*\/?>/g, '\n') // <br> 태그를 줄바꿈으로 대체
    .trim();
};

export const extractLinkOrValue = (str: string): string => {
  const regex = /<a\s+(?:[^>]*?\s+)?href="([^"]*)"/;
  const match = str.match(regex);
  return match ? match[1] : str;
};
