import { useGridContext } from "../context/GridContext";
import CommitBox from "./CommitBox";

const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const CommitBoxContainer: React.FC = () => {
  const { state } = useGridContext();

  // console.table(state.grid);

  return (
    <div className="flex flex-col items-center">
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
                    <CommitBox row={rowIndex} col={colIndex} />
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
