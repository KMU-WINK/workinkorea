export const formatSalary = (salaryType: string | undefined | null): string => {
  return salaryType === '연봉'
    ? '연'
    : salaryType === '월급'
      ? '월'
      : salaryType || '';
};
