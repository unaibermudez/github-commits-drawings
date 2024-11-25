import { useGridContext } from "../context/GridContext";

const ExportedDaysList: React.FC = () => {
  const { state } = useGridContext();
  
  if (!state.exportedData) return null; // Return null if no exported data
  
  const { year, days } = state.exportedData;

  // Create an array of day strings (e.g., "01-01-2024")
  const exportedDays = days
    .map((day, index) => (day === 1 ? index : -1)) // Find indexes where the day is 1
    .filter(index => index !== -1); // Remove -1s

  const dateStrings = exportedDays.map((index) => {
    const date = new Date(year, 0, index + 1); // Create a date object for each day
    return `${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}-${date.getFullYear()}`;
  });

  return (
    <div className="my-6">
      <h3 className="text-xl font-semibold text-center text-white">Committed Days:</h3>
    <div className="grid grid-cols-5 gap-4 text-white">
      {dateStrings.map((day, index) => (
        <div key={index} className="col-span-1">
        {day}
        </div>
      ))}
    </div>
    </div>
  );
};

export default ExportedDaysList;
