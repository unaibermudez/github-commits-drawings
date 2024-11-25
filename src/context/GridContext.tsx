import React, { createContext, useReducer, useContext } from "react";
import { getFirstDayOfYear, getTotalDaysInYear } from "../utils/years";

// Define the grid dimensions
const ROWS = 7;
const COLS = 53;

// Types for grid state
type GridCell = null | 0 | 1;
type GridState = {
  grid: GridCell[][];
  selectedYear: number;
};

type Action =
  | { type: "INITIALIZE_GRID"; payload: { year: number } }
  | { type: "UPDATE_CELL"; payload: { row: number; col: number; value: 0 | 1 } }
  | { type: "CLEAR_GRID" };

// Reducer function
const gridReducer = (state: GridState, action: Action): GridState => {
  switch (action.type) {
    case "INITIALIZE_GRID": {
      const { year } = action.payload;

      const newGrid: GridCell[][] = Array.from({ length: ROWS }, () =>
        Array.from({ length: COLS }, () => null)
      );

      const totalDays = getTotalDaysInYear(year);
      const firstDay = getFirstDayOfYear(year); // Example: "Sunday"
      const startDayIndex = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].indexOf(firstDay);

      let dayCounter = 0;

      for (let col = 0; col < COLS; col++) {
        for (let row = 0; row < ROWS; row++) {
          if (col === 0 && row < startDayIndex) continue; // Skip cells before the first day.
          if (dayCounter >= totalDays) break; // Stop after all days are added.
          newGrid[row][col] = 0; // Default state for a valid day (white box).
          dayCounter++;
        }
      }

      return { ...state, grid: newGrid, selectedYear: year };
    }

    case "UPDATE_CELL": {
      const { row, col, value } = action.payload;
      const updatedGrid = state.grid.map((r, rowIndex) =>
        rowIndex === row
          ? r.map((cell, colIndex) => (colIndex === col ? value : cell))
          : r
      );
      return { ...state, grid: updatedGrid };
    }

    case "CLEAR_GRID": {
      const clearedGrid = state.grid.map((row) =>
        row.map((cell) => (cell === null ? null : 0))
      );
      return { ...state, grid: clearedGrid };
    }

    default:
      return state;
  }
};

// Context and provider
const GridContext = createContext<{
  state: GridState;
  dispatch: React.Dispatch<Action>;
} | null>(null);

export const GridProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const currentYear = new Date().getFullYear();
  const [state, dispatch] = useReducer(gridReducer, {
    grid: Array.from({ length: ROWS }, () => Array.from({ length: COLS }, () => null)),
    selectedYear: currentYear,
  });

  return (
    <GridContext.Provider value={{ state, dispatch }}>
      {children}
    </GridContext.Provider>
  );
};

// Custom hook for accessing grid context
export const useGridContext = () => {
  const context = useContext(GridContext);
  if (!context) throw new Error("useGridContext must be used within a GridProvider");
  return context;
};
