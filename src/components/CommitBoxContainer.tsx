import { useGridContext } from "../context/GridContext";
import CommitBox from "./CommitBox";
import { useState } from "react";

const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const months = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

const CommitBoxContainer: React.FC = () => {
  const { state, dispatch } = useGridContext();
  const [isDragging, setIsDragging] = useState(false);

  const exportDisabled = state.grid.every(row => row.every(cell => cell === null || cell === 0));

  const handleMouseUp = () => {
    setIsDragging(false); // Stop dragging
  };

  const handleClearGrid = () => {
    dispatch({ type: "CLEAR_GRID" });
  };

  const handlePaintAllCells = () => {
    dispatch({ type: "PAINT_ALL_CELLS", payload: { value: 1 } });
  }

  const handleRandomizeCells = () => {
    dispatch({ type: "CLEAR_GRID" })
    dispatch({ type: "RANDOMIZE_CELLS" });
  };

  // Function to export the grid as JSON
  const handleExportGrid = () => {
    const gridData: number[] = [];

    // Iterate through columns first, then rows
    for (let col = 0; col < state.grid[0].length; col++) {
      for (let row = 0; row < state.grid.length; row++) {
        const cellValue = state.grid[row][col];
        if (cellValue === null) continue; // Skip empty cells
        gridData.push(cellValue === 1 ? 1 : 0); // 1 for green, 0 for non-green
      }
    }

    const json = {
      year: state.selectedYear,
      days: gridData, // Array of 1s and 0s representing the grid
    };

    console.log(JSON.stringify(json, null, 2)); // Print formatted JSON to console
    handleClearGrid(); // Clear the grid after exporting
  };

  return (
    <div
      className="flex flex-col items-center"
      onMouseUp={handleMouseUp} // Stop dragging when mouse is released
    >

      {/* Grid Table */}
      <table className="table-fixed border-separate border-spacing-1">
        <thead>
          <tr>
            <th></th>
            {months.map((month, index) => {
              const colSpans = [4, 4, 5, 4, 4, 5, 4, 5, 4, 4, 5, 5];
              return (
              <th key={index} colSpan={colSpans[index]} className="text-white text-xs font-medium">{month}</th>
              );
            })}
          </tr>
          
        </thead>
        <tbody>
          {weekDays.map((day, rowIndex) => (
            <tr key={rowIndex}>
              <td className="text-white text-xs font-medium">{day}</td>
              {state.grid[rowIndex]?.map((cell, colIndex) => (
                <td key={colIndex}>
                  {cell === null ? (
                    <div className="w-4 h-4"></div>
                  ) : (
                    <CommitBox
                      row={rowIndex}
                      col={colIndex}
                      isDragging={isDragging}
                      setIsDragging={setIsDragging}
                    />
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex w-full justify-between my-6">
        <div className="flex space-x-4">
          <button
            onClick={handlePaintAllCells}
            className="bg-green-500 font-bold uppercase text-white px-4 py-2 rounded-md"
          >
            Fill Grid
          </button>
          <button
            onClick={handleRandomizeCells}
            className="bg-orange-500 font-bold uppercase text-white px-4 py-2 rounded-md"
          >
            Random Pattern
          </button>
          <button
            onClick={handleClearGrid}
            className="bg-red-500 font-bold uppercase text-white px-4 py-2 rounded-md"
          >
            Clear Grid
          </button>
        </div>
        <button
          onClick={handleExportGrid}
          disabled={exportDisabled}
          className={`bg-blue-500 font-bold uppercase text-white px-4 py-2 rounded-md ${exportDisabled && 'opacity-50 cursor-not-allowed'}`}
        >
          Export Grid
        </button>
      </div>
    </div>
  );
};

export default CommitBoxContainer;
