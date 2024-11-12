// src/components/Home.tsx

import { useState, useEffect } from 'react';
import CommitBox from './CommitBox';

const Home: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 2002 + 1 }, (_, index) => 2002 + index).reverse();

  const [selectedYear, setSelectedYear] = useState<number>(currentYear);
  const [commitData, setCommitData] = useState<(0 | 1 | 2 | 3 | 4)[]>([0]);

  // Generar datos simulados de commits
  useEffect(() => {
    const generateCommitData = () => {
      // Para cada día del año (365 días, sin considerar años bisiestos)
      // Generamos un array de 7 filas por 52 columnas.
      const daysInYear = 365;
      const weeksInYear = Math.ceil(daysInYear / 7);
      const data = Array.from({ length: weeksInYear * 7 }, () => Math.floor(Math.random() * 5) as 0 | 1 | 2 | 3 | 4);

      // Devolver solo los primeros 365 días (ignorando días adicionales en años de 365 días)
      return data.slice(0, daysInYear);
    };

    setCommitData(generateCommitData());
  }, [selectedYear]);

  return (
    <main className="bg-[#24292f] min-h-screen text-white flex flex-col items-center p-4">
      <div className="w-full max-w-md mb-8">
        <label htmlFor="year" className="block text-xl font-medium mb-2">Selecciona un Año</label>
        <select
          id="year"
          value={selectedYear}
          onChange={(e) => setSelectedYear(Number(e.target.value))}
          className="w-full p-2 bg-gray-700 text-white rounded"
        >
          {years.map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </div>

      {/* Crear una cuadrícula de 52 columnas y 7 filas */}
      <div className="grid grid-rows-7 grid-flow-col gap-1">
        {commitData.map((level, index) => (
          <CommitBox key={index} level={level} />
        ))}
      </div>
    </main>
  );
};

export default Home;
