interface TrendListProps {
  trends: string[];
  startIndex: number;
  isGray?: boolean; // 회색 텍스트 여부
}

const TrendList = ({ trends, startIndex, isGray }: TrendListProps) => {
  return (
    <ul className="space-y-2">
      {trends.map((trend, index) => (
        <li key={trend} className="flex items-center">
          <div
            className={`w-6 flex justify-center ${isGray ? 'text-gray-3' : 'text-main'} font-semibold pr-2`}
          >
            {startIndex + index}
          </div>
          <div>{trend}</div>
        </li>
      ))}
    </ul>
  );
};

export default TrendList;
