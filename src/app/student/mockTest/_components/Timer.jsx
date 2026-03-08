// student/mockTest/_components/Timer.js
import React from "react";
import { Clock } from "lucide-react";

const Timer = ({ seconds, className = "" }) => {
  const formatTime = (totalSeconds) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Calculate color based on time
  const getTimerColor = () => {
    if (seconds > 300) return "from-green-500 to-green-400"; // > 5 mins
    if (seconds > 120) return "from-yellow-500 to-yellow-400"; // > 2 mins
    return "from-red-500 to-red-400"; // < 2 mins
  };

  return (
    <div
      className={`
      flex items-center gap-2 px-4 py-2 rounded-xl
      bg-gradient-to-r ${getTimerColor()} bg-opacity-10
      border border-pink-500/20 ${className}
    `}
    >
      <Clock className="w-4 h-4 text-pink-500" />
      <span className="font-mono font-bold text-white">
        {formatTime(seconds)}
      </span>
    </div>
  );
};

export default Timer;
