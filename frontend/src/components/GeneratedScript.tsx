import React from "react";
import { useGridContext } from "../context/GridContext";

const GeneratedScript: React.FC = () => {
  const { state } = useGridContext();

  if (!state.exportedData || !state.repoUrl) return null; // Render nothing if no exported data or repo URL is available

  const { year, days } = state.exportedData;
  const repoUrl = state.repoUrl;

  // Extract the folder name from the repo URL (e.g., "test" from "git@github.com:user/test.git")
  const folderName = repoUrl.split("/").pop()?.replace(".git", "") || "my-repo";

  // Helper function to convert day-of-year index to a date
  const getDateFromDayOfYear = (year: number, dayOfYear: number): string => {
    const date = new Date(year, 0); // January 1st of the year
    date.setDate(dayOfYear + 1); // Add days (dayOfYear is 0-indexed)
    return date.toISOString().split("T")[0]; // Format as YYYY-MM-DD
  };

  // Generate a list of dates from days array
  const selectedDates = days
    .map((value, index) => (value === 1 ? getDateFromDayOfYear(year, index) : null))
    .filter((date) => date !== null); // Remove null values

  // Generate the script
  const script = `#!/bin/bash

# Create a folder and navigate to it
mkdir -p ${folderName}
cd ${folderName}

# Initialize a new Git repository and push the first commit
echo "# ${folderName}" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin ${repoUrl}
git push -u origin main

# Loop over selected days in ${year}
for DAY in ${selectedDates.map((date) => `"${date}"`).join(" ")}; do
  # Change the date in the system (this will be reflected in the commit)
  export GIT_AUTHOR_DATE="$DAY 12:00:00"
  export GIT_COMMITTER_DATE="$DAY 12:00:00"
  
  # Make a commit (you can change the commit message as needed)
  git commit --allow-empty -m "Commit for $DAY"
done

# Push all commits
git push origin main
`;

  // Copy script to clipboard
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(script);
      alert("Script copied to clipboard!");
    } catch (err) {
      alert("Failed to copy script.");
    }
  };

  // Download script as a file
  const handleDownload = () => {
    const blob = new Blob([script], { type: "text/bash" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${folderName}_script.sh`; // Use the folder name as the file name
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full max-w-7xl bg-gray-800 text-white p-4 rounded mt-4">
      <h2 className="text-lg font-bold mb-4">Generated Script</h2>
      <pre className="whitespace-pre-wrap break-words bg-gray-700 p-2 rounded">
        {script}
      </pre>
      <div className="flex gap-4 mt-4">
        <button
          onClick={handleCopy}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Copy to Clipboard
        </button>
        <button
          onClick={handleDownload}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
        >
          Download Script
        </button>
      </div>
    </div>
  );
};

export default GeneratedScript;
