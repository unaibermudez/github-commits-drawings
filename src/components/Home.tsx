import { useEffect, useState } from "react";
import { useGridContext } from "../context/GridContext";
import CommitBoxContainer from "./CommitBoxContainer";
import { Modal, ModalHeader, ModalBody } from "reactstrap"; // Importing Reactstrap modal components
import ExportedDaysList from "./ExportedDaysList";

const Home: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const { state, dispatch } = useGridContext(); // Access global grid state and dispatch.

  // State to manage visibility of the modal and screen width
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth); // Track the screen width

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (screenWidth < 1200) {
      setIsModalVisible(true);
    } else {
      setIsModalVisible(false);
    }
  }, [screenWidth]); // Re-run this effect whenever the screen width changes

  useEffect(() => {
    dispatch({ type: "INITIALIZE_GRID", payload: { year: currentYear } });
  }, [dispatch, currentYear]);

  const handleYearChange = (year: number) => {
    dispatch({ type: "INITIALIZE_GRID", payload: { year } });
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  return (
    <main className="bg-[#24292f] min-h-screen text-white flex flex-col items-center p-4 overflow-auto">
      {/* Year selection */}
      <div className="w-full max-w-md mb-8">
        <label htmlFor="year" className="block text-xl font-medium mb-2 text-center">
          Select a year
        </label>
        <select
          id="year"
          value={state.selectedYear}
          onChange={(e) => handleYearChange(Number(e.target.value))}
          className="w-full p-2 bg-gray-700 text-white rounded"
        >
          {Array.from(
            { length: new Date().getFullYear() - 2002 + 1 },
            (_, index) => 2002 + index
          )
            .reverse()
            .map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
        </select>
      </div>

      {/* Reactstrap Modal */}
      <Modal isOpen={isModalVisible} toggle={handleCloseModal}>
        <ModalHeader toggle={handleCloseModal}>Mobile Experience</ModalHeader>
        <ModalBody>
          For a better experience, switch to a PC or a bigger screen.
        </ModalBody>
      </Modal>

      {/* CommitBoxContainer */}
      <CommitBoxContainer />
      <ExportedDaysList />
    </main>
  );
};

export default Home;
