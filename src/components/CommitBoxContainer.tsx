import { useEffect, useState } from "react";
import CommitBox from "./CommitBox";
import { getDaysOfWeekCount, getFirstDayOfYear } from "../utils/years";

type CommitBoxContainerProps = {
  selectedYear: number;
};

const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const CommitBoxContainer: React.FC<CommitBoxContainerProps> = ({ selectedYear }) => {
  const [isDragging, setDragging] = useState(false);
  const [grid, setGrid] = useState<(0 | 1 | 2)[][]>([]);

  const createEmptyGrid = () => {
    const daysOfWeek = getDaysOfWeekCount(selectedYear);
    const firstDay = getFirstDayOfYear(selectedYear);

    // Create an empty grid for 7 rows and 53 columns
    const emptyGrid: (0 | 1 | 2)[][] = Array.from({ length: 7 }, () =>
      Array.from({ length: 53 }, () => 0) // 0 means empty cell
    );

    // Calculate the starting day index (0 = Sunday, ..., 6 = Saturday)
    const startDayIndex = weekDays.indexOf(firstDay.slice(0, 3));

    // Populate the grid based on the year's days
    let dayCounter = 0;
    for (let col = 0; col < 53; col++) {
      for (let row = 0; row < 7; row++) {
        if (col === 0 && row < startDayIndex) continue; // Skip cells before the first day
        if (dayCounter >= Object.values(daysOfWeek).reduce((a, b) => a + b, 0)) {
          break;
        } // End after all days
        emptyGrid[row][col] = 1; // Default state (inactive, white)
        dayCounter++;
      }
    }

    setGrid(emptyGrid);
  };

  useEffect(() => {
    createEmptyGrid();
  }, [selectedYear]);

  // Clear the grid (reset to initial state)
  const clearGrid = () => {
    console.log("Clearing the grid...");
    createEmptyGrid();
  };

  return (
    <div className="flex flex-col items-center">
      {/* Clear Button */}
      <button
        onClick={clearGrid}
        className="mb-4 p-2 bg-red-500 text-white rounded-md hover:bg-red-600"
      >
        Clear Grid
      </button>

      {/* Table Header */}
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
              {/* Day of the week */}
              <td className="text-white text-xs font-medium">{day}</td>
              {grid[rowIndex]?.map((level, colIndex) => (
                <td key={colIndex}>
                  {level === 0 ? (
                    <div className="w-4 h-4"></div> // Empty div for 0
                  ) : (
                    <CommitBox
                      level={level}
                      isDragging={isDragging}
                      setDragging={setDragging}
                    />
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CommitBoxContainer;
