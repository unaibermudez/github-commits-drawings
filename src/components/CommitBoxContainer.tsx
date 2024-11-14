// src/components/CommitBoxContainer.tsx

import { useEffect, useState } from 'react';
import CommitBox from './CommitBox';

type CommitBoxContainerProps = {
  selectedYear: number;
};

const CommitBoxContainer: React.FC<CommitBoxContainerProps> = ({ selectedYear }) => {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const weekDays = ["Mon", "Wed", "Fri"];

  // Track drag state
  const [isDragging, setDragging] = useState(false);

  const [commitData, setCommitData] = useState<(0 | 1 | 2 | 3 | 4)[]>([]);

  useEffect(() => {
    const isLeapYear = (selectedYear % 4 === 0 && (selectedYear % 100 !== 0 || selectedYear % 400 === 0));
    const daysInYear = isLeapYear ? 366 : 365;

    const data = Array(daysInYear).fill(0) as (0 | 1 | 2 | 3 | 4)[];
    setCommitData(data);

    const firstDayOfWeek = new Date(selectedYear, 0, 1).getDay();
    console.log(`Primer día del año ${selectedYear}:`, ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][firstDayOfWeek]);
    console.log("Días en el año:", daysInYear);
  }, [selectedYear]);

  return (
    <div className="flex flex-col items-center">
      {/* Tabla de commits */}
      <table className="table-fixed border-separate border-spacing-1">
        {/* <thead>
          <tr>
            <th></th> 
            {months.map((month, index) => (
              <>
                <th key={month} className="text-white text-xs font-medium ">{month}</th>
                {index < months.length - 1 && (
                  <>
                    <th></th>
                    <th></th>
                    <th></th>
                  </>
                )} 
              </>
            ))}
          </tr>
        </thead> */}

        <tbody>
          {Array.from({ length: 7 }).map((_, rowIndex) => (
            <tr key={rowIndex}>
              {rowIndex % 2 === 0 ? (
                <td className="text-white text-xs font-medium">{weekDays[rowIndex / 2]}</td>
              ) : (
                <td></td>
              )}

              {Array.from({ length: 52 }).map((_, colIndex) => {
                const dayIndex = colIndex * 7 + rowIndex;
                return (
                  <td key={colIndex} >
                    {dayIndex < commitData.length ? (
                      <CommitBox
                        level={commitData[dayIndex] || 0}
                        isDragging={isDragging}
                        setDragging={setDragging}
                      />
                    ) : (
                      <div className="w-4 h-4"></div>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CommitBoxContainer;
