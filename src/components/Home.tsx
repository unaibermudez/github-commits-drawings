import { useEffect } from "react";
import { useGridContext } from "../context/GridContext";
import CommitBoxContainer from "./CommitBoxContainer";

const Home: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const { state, dispatch } = useGridContext(); // Access global grid state and dispatch.

  useEffect(() => {
    dispatch({ type: "INITIALIZE_GRID", payload: { year: currentYear } });
  }, [dispatch, currentYear]);


  const handleYearChange = (year: number) => {
    dispatch({ type: "INITIALIZE_GRID", payload: { year } });
  };
  return (
    <main className="bg-[#24292f] min-h-screen text-white flex flex-col items-center p-4">
      <div className="w-full max-w-md mb-8">
        <label htmlFor="year" className="block text-xl font-medium mb-2">
          Selecciona un Año
        </label>
        <select
          id="year"
          value={state.selectedYear}
          onChange={(e) => handleYearChange(Number(e.target.value))}
          className="w-full p-2 bg-gray-700 text-white rounded"
        >
          {Array.from(
            { length: new Date().getFullYear() - 2002 + 1 },
            (_, index) => 2002 + index
          )
            .reverse()
            .map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
        </select>
      </div>

      <CommitBoxContainer />
    </main>
  );
};

export default Home;
