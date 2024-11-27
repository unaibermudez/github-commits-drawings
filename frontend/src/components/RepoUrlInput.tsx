import React, { useState } from "react";
import { useGridContext } from "../context/GridContext";

const RepoUrlInput: React.FC = () => {
  const { state, dispatch } = useGridContext();
  const [url, setUrl] = useState("");

  const validateUrl = (url: string) => {
    const regex = /^git@github\.com:[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+\.git$/;
    return regex.test(url);
  };

  const handleSave = () => {
    if (validateUrl(url)) {
      dispatch({ type: "SET_REPO_URL", payload: url });
    } else {
      alert("Please enter a valid GitHub repository URL.");
    }
  };

  if (!state.exportedData || state.repoUrl) return null; // Render only if exportedData exists and repoUrl is not set

  return (
    <div className="w-full max-w-md mb-8">
      <label htmlFor="repoUrl" className="block text-xl font-medium mb-2 text-center">
        Enter GitHub Repository URL (SSH)
      </label>
      <input
        id="repoUrl"
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="https://github.com/username/repo"
        className="w-full p-2 bg-gray-700 text-white rounded"
      />
      <button
        onClick={handleSave}
        className="mt-2 w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-500"
      >
        Save
      </button>
    </div>
  );
};

export default RepoUrlInput;
