"use client";
import React, { useState } from "react";
import Component1 from "./Component1";
import Component2 from "./Component2";
import Component3 from "./Component3";
import { add } from "./Function";

const page = () => {
  const [isNumber, setIsNumber] = useState(0);

  const value = add(3, 5);

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-pink-100">
      <h1 className="text-5xl">
        {isNumber}
        {value.sum}
        {value.a}
        {value.b}
      </h1>
      <div className="flex flex-row">
        <Component1 AddKarnahai={setIsNumber} isNumber={isNumber} />
        <Component2 Minuskarnahai={setIsNumber} isNumber={isNumber} />
        <Component3 isNumber={isNumber} />
      </div>
    </div>
  );
};

export default page;
