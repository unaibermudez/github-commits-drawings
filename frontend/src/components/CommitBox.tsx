import { useGridContext } from "../context/GridContext";
import { getDateFromGridPosition } from "../utils/years";

type CommitBoxProps = {
  row: number;
  col: number;
  isDragging: boolean;
  setIsDragging: React.Dispatch<React.SetStateAction<boolean>>;
};

const CommitBox: React.FC<CommitBoxProps> = ({ row, col, isDragging, setIsDragging }) => {
  const { state, dispatch } = useGridContext();
  const cellValue = state.grid[row][col];

  // Handle the toggling of the cell
  const toggleCell = () => {
    dispatch({
      type: "UPDATE_CELL",
      payload: { row, col, value: cellValue === 0 ? 1 : 0 },
    });
  };

  // Mouse down event to start dragging
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevents text selection while dragging
    setIsDragging(true); // Start dragging
    toggleCell(); // Toggle the cell's state immediately
  };

  // Mouse up event to stop dragging
  const handleMouseUp = () => {
    setIsDragging(false); // Stop dragging
  };

  // Mouse enter event to continue dragging
  const handleMouseEnter = () => {
    if (isDragging) {
      toggleCell(); // Toggle cell while dragging
    }
  };



  return (
    <div
      onMouseDown={handleMouseDown}
      onMouseEnter={handleMouseEnter}
      onMouseUp={handleMouseUp}
      className={`w-4 h-4 ${cellValue === 1 ? "bg-green-500" : "bg-white"} rounded-sm cursor-pointer`}
      // title={`Cell (${col}, ${row})`}
      title={getDateFromGridPosition(state.selectedYear, col, row)}
    ></div>
  );
};

export default CommitBox;
