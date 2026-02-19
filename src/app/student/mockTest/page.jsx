"use client";
import React, { useState } from "react";
import JobDescription from "./_components/JobDescription";
import Interview from "./_components/Interview";
import Report from "./_components/Report";
// import Mic from "./_components/Mic";

const page = () => {
  const [stepCount, setStepCount] = useState(3);
  const [questionId, setQuestionId] = useState("");
  return (
    <div className="w-full h-full">
      {stepCount == 1 && (
        <JobDescription
          setStepCount={setStepCount}
          questionIdSetKar={setQuestionId}
        />
      )}
      {stepCount == 2 && (
        <Interview setStepCount={setStepCount} questionIdMilGaya={questionId} />
      )}
      {stepCount == 3 && <Report setStepCount={setStepCount} />}
      {/* <Mic /> */}
    </div>
  );
};

export default page;
