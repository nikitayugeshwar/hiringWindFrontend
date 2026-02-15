import React from "react";
import Component11 from "./Component11";

const component1 = ({ AddKarnahai, isNumber }) => {
  return (
    <div className="h-auto w-42 border border-gray-500 flex flex-col gap-5 items-center justify-center ">
      <button className="text-black text-2xl font-semibold">I</button>
      <Component11 AddKarnahai11={AddKarnahai} isNumber={isNumber} />
    </div>
  );
};

export default component1;
