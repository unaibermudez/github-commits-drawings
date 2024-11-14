// src/components/CommitBoxContainer.tsx

import { useEffect, useState } from 'react';
import CommitBox from './CommitBox';

type CommitBoxContainerProps = {
  selectedYear: number;
};

const CommitBoxContainer: React.FC<CommitBoxContainerProps> = ({ selectedYear }) => {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const weekDays = ["Mon", "Wed", "Fri"];

  const [commitData, setCommitData] = useState<(0 | 1 | 2 | 3 | 4)[]>([]);

  useEffect(() => {
    // Determinar si el año es bisiesto para calcular días
    const isLeapYear = (selectedYear % 4 === 0 && (selectedYear % 100 !== 0 || selectedYear % 400 === 0));
    const daysInYear = isLeapYear ? 366 : 365;
    
    // Generar datos simulados de commits (inicialmente 0)
    const data = Array(daysInYear).fill(0) as (0 | 1 | 2 | 3 | 4)[];
    setCommitData(data);

    // Obtener el primer día del año
    const firstDayOfWeek = new Date(selectedYear, 0, 1).getDay();
    console.log("Primer día del año:", ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][firstDayOfWeek]);
    console.log("Días en el año:", daysInYear);
  }, [selectedYear]);

  return (
    <div className="flex flex-col items-center">
      {/* Encabezado de los meses */}
      <div className="flex justify-center w-full mb-2">
        {months.map((month, index) => (
          <div key={index} className="text-white text-xs font-medium w-10 text-center">
            {month}
          </div>
        ))}
      </div>

      <div className="flex">
        {/* Días de la semana a la izquierda */}
        <div className="flex flex-col mr-2">
          {weekDays.map((day, index) => (
            <div key={index} className="text-white text-xs font-medium h-6 flex items-center">
              {day}
            </div>
          ))}
        </div>

        {/* Tabla de commits */}
        <div className="grid grid-cols-52 grid-rows-7 gap-1">
          {Array.from({ length: 7 * 52 }).map((_, index) => {
            const dayIndex = index % 7; // Fila del día de la semana
            const weekIndex = Math.floor(index / 7); // Columna de la semana

            // Rellenar los días del año con CommitBox de nivel 0
            return (
              <CommitBox key={index} level={commitData[index] || 0} />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CommitBoxContainer;
