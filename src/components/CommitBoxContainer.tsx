import { useGridContext } from "../context/GridContext";
import CommitBox from "./CommitBox";
import { useState } from "react";

const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const CommitBoxContainer: React.FC = () => {
  const { state, dispatch } = useGridContext();
  const [isDragging, setIsDragging] = useState(false);

  // Mouse up event to stop dragging
  const handleMouseUp = () => {
    setIsDragging(false); // Stop dragging
  };

  // Handle the clear button click to reset the grid
  const handleClearGrid = () => {
    dispatch({ type: "CLEAR_GRID" });
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
            {Array.from({ length: 12 }).map((_, index) => (
              <th key={index} colSpan={4} className="text-white text-xs font-medium">
                {/* Placeholder for months */}
              </th>
            ))}
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
      <div className="flex space-x-4 my-4">
        <button
          onClick={handleClearGrid}
          className="bg-red-500 text-xl font-bold uppercase text-white px-4 py-2 rounded-md"
        >
          Clear Grid
        </button>
        <button
          onClick={handleExportGrid}
          className="bg-blue-500 text-xl font-bold uppercase text-white px-4 py-2 rounded-md"
        >
          Export Grid
        </button>

      </div>

    </div>
  );
};

export default CommitBoxContainer;
