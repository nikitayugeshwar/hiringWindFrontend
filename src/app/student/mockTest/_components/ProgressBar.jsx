import React from "react";
import { calculateProgress } from "../../../../utils/formatters";

const ProgressBar = ({ current, total }) => {
  const progress = calculateProgress(current, total);

  return (
    <div>
      <div className="flex justify-between text-sm text-gray-600 mb-1">
        <span>Progress</span>
        <span>{progress}%</span>
      </div>
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-blue-600 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
