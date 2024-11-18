import { useState } from "react";

type CommitBoxProps = {
  level: 1 | 2;  // Only two states: 1 (inactive) or 2 (active)
  isDragging: boolean;
  setDragging: (dragging: boolean) => void;
};

const CommitBox: React.FC<CommitBoxProps> = ({ level, isDragging, setDragging }) => {
  // State to track if the box is active (green)
  const [isActive, setIsActive] = useState(level === 2); // Start as active if level is 2

  // Colors based on activity level
  const colors = {
    inactive: "bg-white",  // Inactive state (white)
    active: "bg-green-500", // Active state (green)
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
      className={`w-4 h-4 ${isActive ? colors.active : colors.inactive} rounded-sm cursor-pointer`}
    ></div>
  );
};

export default CommitBox;
