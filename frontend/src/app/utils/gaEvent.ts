declare global {
  interface Window {
    gtag: any;
  }
}

type gaEventProps = {
  name: string;
  category: string;
  label: string;
  value: string | null;
};

/**
 * Google Analytics 이벤트를 트래킹하는 함수입니다.
 * 주어진 이벤트 정보를 기반으로 gtag를 통해 이벤트 데이터를 전송합니다.
 *
 * @param {object} param 이벤트 트래킹에 필요한 정보입니다.
 * @param {string} param.name 이벤트의 이름을 지정합니다 (예: 'click').
 * @param {string} param.category 이벤트 카테고리를 지정합니다 (예: 'Event Banner').
 * @param {string} param.label 이벤트에 대한 라벨을 지정합니다 (예: 'AI Recommended Banner').
 * @param {string | null} param.value 이벤트에 대한 값을 설정합니다 (선택 사항, 예: '1').
 *
 * @returns {void} 반환값이 없는 함수입니다.
 */
export const gaEvent = ({
  name,
  category,
  label,
  value,
}: gaEventProps): void => {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function')
    return;

  window.gtag('event', name, {
    event_category: category,
    event_label: label,
    value: value,
  });
};
