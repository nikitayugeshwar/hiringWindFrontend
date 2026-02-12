"use client";
import React, { useState } from "react";
import JobDescription from "./_components/JobDescription";
import Interview from "./_components/Interview";
import Report from "./_components/Report";
// import Mic from "./_components/Mic";

const page = () => {
  const [stepCount, setStepCount] = useState(1);
  return (
    <div className="w-full h-full">
      {stepCount == 1 && <JobDescription setStepCount={setStepCount} />}
      {stepCount == 2 && <Interview setStepCount={setStepCount} />}
      {stepCount == 3 && <Report setStepCount={setStepCount} />}
      {/* <Mic /> */}
    </div>
  );
};

export default page;
