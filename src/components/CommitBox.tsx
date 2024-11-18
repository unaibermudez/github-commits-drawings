// src/components/CommitBox.tsx

import { useState } from 'react';

type CommitBoxProps = {
  level: 0 | 1 | 2 | 3 | 4;
  isDragging: boolean;
  setDragging: (dragging: boolean) => void;
};

const CommitBox: React.FC<CommitBoxProps> = ({ level, isDragging, setDragging }) => {
  // State to track if the box is active (green)
  const [isActive, setIsActive] = useState(false);

  // Colors based on activity level, with active green as an override
  const colors = {
    0: 'bg-white-200',    // No activity
    1: 'bg-green-200',   // Low
    2: 'bg-green-400',   // Medium
    3: 'bg-green-600',   // High
    4: 'bg-green-800',   // Very high
    active: 'bg-green-500' // Active (colored)
  };

  // Toggle the active state on mouse events
  const handleMouseDown = () => {
    setIsActive(!isActive); // Toggle the active state on click
    setDragging(true); // Start dragging
  };

  const handleMouseEnter = () => {
    if (isDragging) {
      setIsActive(!isActive); // Toggle the active state while dragging
    }
  };

  const handleMouseUp = () => {
    setDragging(false); // Stop dragging
  };

  return (
    <div
      onMouseDown={handleMouseDown}
      onMouseEnter={handleMouseEnter}
      onMouseUp={handleMouseUp}
      className={`w-4 h-4 ${isActive ? colors.active : colors[level]} rounded-sm cursor-pointer`}
    ></div>
  );
};

export default CommitBox;
