import { useState } from 'react';
import CommitBoxContainer from './CommitBoxContainer';

const Home: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 2002 + 1 }, (_, index) => 2002 + index).reverse();

  const [selectedYear, setSelectedYear] = useState<number>(currentYear);

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

      <CommitBoxContainer selectedYear={selectedYear} />
    </main>
  );
};

export default Home;
