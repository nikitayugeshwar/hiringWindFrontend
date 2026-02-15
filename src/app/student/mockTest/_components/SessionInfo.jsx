import React from "react";
import { formatTime } from "../../../../utils/formatters";

const SessionInfo = ({
  currentQuestion,
  totalQuestions,
  isRecording,
  cameraError,
  isFaceInFrame,
  timer,
}) => {
  return (
    <div className="bg-gray-50 rounded-xl p-5">
      <h4 className="font-semibold text-gray-800 mb-3">Session Information</h4>
      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-gray-600">Questions Completed</span>
          <span className="font-medium">
            {currentQuestion + 1}/{totalQuestions}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Current Status</span>
          <span
            className={`font-medium ${isRecording ? "text-green-600" : "text-gray-600"}`}
          >
            {isRecording ? "Recording Active" : "Not Recording"}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Camera Status</span>
          <span
            className={`font-medium ${cameraError ? "text-red-600" : "text-green-600"}`}
          >
            {cameraError ? "Error" : "Active"}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Face Detection</span>
          <span
            className={`font-medium ${isFaceInFrame ? "text-green-600" : "text-red-600"}`}
          >
            {isFaceInFrame ? "✓ Detected" : "⚠ Needs Attention"}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Session Duration</span>
          <span className="font-medium">{formatTime(timer)}</span>
        </div>
      </div>
    </div>
  );
};

export default SessionInfo;
