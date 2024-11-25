import { useGridContext } from "../context/GridContext";
import CommitBox from "./CommitBox";
import { useState } from "react";

const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const CommitBoxContainer: React.FC = () => {
  const { state } = useGridContext();
  const [isDragging, setIsDragging] = useState(false);

  // Mouse up event to stop dragging
  const handleMouseUp = () => {
    setIsDragging(false); // Stop dragging
  };

  return (
    <div
      className="flex flex-col items-center"
      onMouseUp={handleMouseUp} // Stop dragging when mouse is released
    >
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
    </div>
  );
};

export default CommitBoxContainer;
