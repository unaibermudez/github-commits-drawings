import React, { createContext, useReducer, useContext } from "react";
import { getFirstDayOfYear, getTotalDaysInYear } from "../utils/years";

// Define the grid dimensions
const ROWS = 7;
const COLS = 53;

// Types for grid state
type GridCell = null | 0 | 1;
type GridState = {
  grid: GridCell[][]; // The grid itself
  selectedYear: number; // The currently selected year
  exportedData: { year: number; days: number[] } | null; // Store exported data (year and array of 0s and 1s)
};

// Types for actions
type Action =
  | { type: "INITIALIZE_GRID"; payload: { year: number } }
  | { type: "UPDATE_CELL"; payload: { row: number; col: number; value: 0 | 1 } }
  | { type: "CLEAR_GRID" }
  | { type: "PAINT_ALL_CELLS"; payload: { value: 0 | 1 } }
  | { type: "RANDOMIZE_CELLS" }
  | { type: "EXPORT_GRID"; payload: { year: number; days: number[] } }; // New action for exporting grid

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

      return { ...state, grid: newGrid, selectedYear: year, exportedData: null }; // Clear exported data when initializing grid
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

    case "PAINT_ALL_CELLS": {
      const { value } = action.payload;
      const paintedGrid = state.grid.map((row) =>
        row.map((cell) => (cell === null ? null : value)) // Set all non-null cells to the value (0 or 1)
      );
      return { ...state, grid: paintedGrid };
    }

    case "RANDOMIZE_CELLS": {
      const randomizedGrid = state.grid.map((row) =>
        row.map((cell) => (cell === null ? null : Math.random() > 0.5 ? 1 : 0)) // Randomly assign 0 or 1, leave null as null
      );
      return { ...state, grid: randomizedGrid };
    }

    case "EXPORT_GRID": {
      // Store the exported data (year and days array)
      return { ...state, exportedData: action.payload };
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
    exportedData: null, // Initialize exportedData as null
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
