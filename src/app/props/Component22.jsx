import React from "react";

const Component22 = ({ Minuskarnahai2, isNumber }) => {
  return (
    <div
      className="h-20 w-auto border border-gray-500 flex items-center justify-center px-5"
      onClick={() => {
        Minuskarnahai2(isNumber - 1);
      }}
    >
      Minus
    </div>
  );
};

export default Component22;
