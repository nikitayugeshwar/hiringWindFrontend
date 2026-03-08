// student/mockTest/_components/QuestionCard.js
import React from "react";
import { HelpCircle, Clock, Tag } from "lucide-react";

const QuestionCard = ({
  currentIndex,
  totalQuestions,
  question,
  topic = "React",
}) => {
  const progress = ((currentIndex + 1) / totalQuestions) * 100;

  return (
    <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl border border-pink-500/20 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 flex items-center justify-center font-bold text-white">
            {currentIndex + 1}
          </div>
          <div>
            <span className="text-sm text-gray-400">Question</span>
            <p className="font-medium text-white">
              {currentIndex + 1} of {totalQuestions}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Tag className="w-4 h-4 text-pink-500" />
          <span className="text-sm text-gray-300">{topic}</span>
        </div>
      </div>

      {/* Question */}
      <div className="mt-4">
        <h2 className="text-xl font-semibold text-white mb-3">
          {question || "Loading question..."}
        </h2>
        <p className="text-gray-400 text-sm leading-relaxed">
          Please provide a clear and concise answer. Speak naturally as you
          would in a real interview scenario. Your answer will be recorded and
          analyzed for accuracy and completeness.
        </p>
      </div>

      {/* Progress Bar */}
      <div className="mt-6">
        <div className="flex justify-between text-sm text-gray-400 mb-2">
          <span>Progress</span>
          <span className="text-pink-500">{Math.round(progress)}%</span>
        </div>
        <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-pink-500 to-purple-500 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
