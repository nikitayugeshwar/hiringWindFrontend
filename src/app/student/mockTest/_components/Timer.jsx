import React from "react";
import { formatTime } from "../../../../utils/formatters";

const Timer = ({ seconds, className = "" }) => {
  return (
    <div
      className={`bg-blue-100 text-blue-800 px-4 py-2 rounded-full font-medium ${className}`}
    >
      {formatTime(seconds)}
    </div>
  );
};

export default Timer;
