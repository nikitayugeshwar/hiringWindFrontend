import React from "react";
import { AiOutlineWarning } from "react-icons/ai";

const GuidelinesCard = () => {
  return (
    <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
      <h4 className="font-semibold text-blue-800 mb-3 flex items-center gap-2">
        <AiOutlineWarning />
        Interview Guidelines
      </h4>
      <ul className="space-y-2 text-sm text-blue-700">
        <li className="flex items-start gap-2">
          <span className="mt-1">•</span>
          <span>Ensure good lighting on your face</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="mt-1">•</span>
          <span>Keep your face centered in the camera frame</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="mt-1">•</span>
          <span>Speak clearly and at a moderate pace</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="mt-1">•</span>
          <span>Answer each question before proceeding to next</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="mt-1">•</span>
          <span>You can pause and resume recording as needed</span>
        </li>
      </ul>
    </div>
  );
};

export default GuidelinesCard;
