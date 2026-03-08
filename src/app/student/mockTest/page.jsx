// student/mockTest/page.js
"use client";
import React, { useState } from "react";
import JobDescription from "./_components/JobDescription";
import Interview from "./_components/Interview";
import Report from "./_components/Report";
import { Sparkles } from "lucide-react";

const Page = () => {
  const [stepCount, setStepCount] = useState(1);
  const [questionId, setQuestionId] = useState("");

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      {stepCount == 1 && (
        <JobDescription
          setStepCount={setStepCount}
          questionIdSetKar={setQuestionId}
        />
      )}
      {stepCount == 2 && (
        <Interview setStepCount={setStepCount} questionIdMilGaya={questionId} />
      )}
      {stepCount == 3 && (
        <Report setStepCount={setStepCount} questionIdMilGaya={questionId} />
      )}
    </div>
  );
};

export default Page;
