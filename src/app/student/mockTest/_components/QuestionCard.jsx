import React from "react";
import ProgressBar from "./ProgressBar";

const QuestionCard = ({
  currentIndex,
  totalQuestions,
  question,
  category = "React - Intermediate Level",
}) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-3">
          <div className="bg-blue-100 text-blue-800 w-10 h-10 rounded-lg flex items-center justify-center font-bold">
            {currentIndex + 1}
          </div>
          <div>
            <span className="text-sm text-gray-500">Question</span>
            <p className="font-medium">
              {currentIndex + 1} of {totalQuestions}
            </p>
          </div>
        </div>
        <div className="bg-gray-100 text-gray-800 px-4 py-2 rounded-full text-sm font-medium">
          {category}
        </div>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-3">
          {question || "Loading question..."}
        </h2>
        <p className="text-gray-600">
          Please provide a clear and concise answer. Speak naturally as you
          would in a real interview scenario. Your answer will be recorded and
          analyzed.
        </p>
      </div>

      <div className="mt-8">
        <ProgressBar current={currentIndex + 1} total={totalQuestions} />
      </div>
    </div>
  );
};

export default QuestionCard;
