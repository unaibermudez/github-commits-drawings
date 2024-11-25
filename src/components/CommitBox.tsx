import { useGridContext } from "../context/GridContext";

type CommitBoxProps = {
  row: number;
  col: number;
};

const CommitBox: React.FC<CommitBoxProps> = ({ row, col }) => {
  const { state, dispatch } = useGridContext();
  const cellValue = state.grid[row][col];

  const toggleCell = () => {
    dispatch({
      type: "UPDATE_CELL",
      payload: { row, col, value: cellValue === 0 ? 1 : 0 },
    });
  };

  return (
    <div
      onClick={toggleCell}
      className={`w-4 h-4 ${
        cellValue === 1 ? "bg-green-500" : "bg-white"
      } rounded-sm cursor-pointer`}
    ></div>
  );
};

export default CommitBox;
