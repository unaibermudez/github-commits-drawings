import { useState } from 'react';

type CommitBoxProps = {
  isDragging: boolean;
  setDragging: (dragging: boolean) => void;
};

const CommitBox: React.FC<CommitBoxProps> = ({ isDragging, setDragging }) => {
  // State to track if the box is active (green) or not (white)
  const [isActive, setIsActive] = useState(false);

  // Colors for the states
  const colors = {
    inactive: 'bg-white',  // Inactive state (white)
    active: 'bg-green-500' // Active state (green)
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
